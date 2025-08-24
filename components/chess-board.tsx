"use client"

import type React from "react"
import { useState, useEffect, useRef } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Clock, Lightbulb, RotateCcw, CheckCircle } from "lucide-react"

interface Square {
  piece: string | null
  color: "light" | "dark"
}

interface Move {
  from: string
  to: string
  piece: string
  captured?: string
}

interface PuzzleData {
  id: string
  fen: string
  moves: string[]
  rating: number
  themes: string[]
  popularity: number
}

// default position used before a puzzle is fetched. This corresponds to the
// starting position of the sample puzzle provided in the original code.
const DEFAULT_FEN = "q3k1nr/1pp1nQpp/3p4/1P2p3/4P3/B1PP1b2/B5PP/5K2 b k - 0 17"

export default function ChessBoard() {
  const [board, setBoard] = useState<Square[][]>([])
  const [selectedSquare, setSelectedSquare] = useState<string | null>(null)
  const [legalMoves, setLegalMoves] = useState<string[]>([])
  const [moveHistory, setMoveHistory] = useState<Move[]>([])
  const [currentMove, setCurrentMove] = useState(0)
  const [draggedPiece, setDraggedPiece] = useState<{ piece: string; from: string } | null>(null)
  // const [timeElapsed, setTimeElapsed] = useState(0)
  const timeElapsed = 0
  const [hintsUsed, setHintsUsed] = useState(0)
  const [puzzleSolved, setPuzzleSolved] = useState(false)
  const [showHint, setShowHint] = useState(false)
  const [currentPuzzle, setCurrentPuzzle] = useState<PuzzleData>({
    id: "",
    fen: DEFAULT_FEN,
    moves: [],
    rating: 0,
    themes: [],
    popularity: 0,
  })

  const boardRef = useRef<HTMLDivElement>(null)

  // const pieceSymbols: { [key: string]: string } = {
  //   K: "♔",
  //   Q: "♕",
  //   R: "♖",
  //   B: "♗",
  //   N: "♘",
  //   P: "♙",
  //   k: "♚",
  //   q: "♛",
  //   r: "♜",
  //   b: "♝",
  //   n: "♞",
  //   p: "♟",
  // }
    const pieceSymbols: { [key: string]: string } = {
    K: "♚",
    Q: "♛",
    R: "♜",
    B: "♝",
    N: "♞",
    P: "♟",
    k: "♚",
    q: "♛",
    r: "♜",
    b: "♝",
    n: "♞",
    p: "♟",
  }

  /*
   * On mount fetch a puzzle from the Lichess API.  The Lichess puzzle
   * endpoint returns both the underlying game PGN and the puzzle metadata.
   * We use this information to reconstruct the board position at the ply
   * where the puzzle begins.  Because the API does not provide a FEN
   * directly we parse the PGN up to the `initialPly` value and derive
   * a FEN string.  The rest of the component can then rely on this FEN
   * to render the board accurately.  Should the API call fail we fall
   * back to a default FEN defined above.
   */
  useEffect(() => {
    async function fetchPuzzle() {
      try {
        const res = await fetch("https://lichess.org/api/puzzle/daily")
        const data = await res.json()
        // The Lichess API returns an object with a `game` (containing a PGN)
        // and a `puzzle` (containing solution moves and metadata).  We use
        // the PGN and initialPly to rebuild the puzzle position.
        const pgn: string | undefined = data?.game?.pgn
        const puzzle = data?.puzzle

        if (pgn && puzzle && typeof puzzle.initialPly === "number") {
          // Generate a board from the PGN up to the puzzle start ply.  The
          // PGN is formatted in standard algebraic notation and may include
          // move numbers and annotations.  We strip those out and apply
          // each move to a starting position to derive the correct board.
          const generatedBoard = generateBoardFromPGN(pgn, puzzle.initialPly)
          const fen = boardToFen(generatedBoard, puzzle.initialPly % 2 === 0 ? "w" : "b")
          setCurrentPuzzle({
            id: puzzle.id,
            fen,
            moves: puzzle.solution || [],
            rating: puzzle.rating || 0,
            themes: puzzle.themes || [],
            popularity: puzzle.plays || 0,
          })
          initializeBoardFromFEN(fen)
        } else {
          // If the API response does not conform to expectations, fall back
          setCurrentPuzzle({
            id: "",
            fen: DEFAULT_FEN,
            moves: [],
            rating: 0,
            themes: [],
            popularity: 0,
          })
          initializeBoardFromFEN(DEFAULT_FEN)
        }
      } catch (err) {
        console.error("Failed to fetch puzzle:", err)
        // Fallback to a known position if the API call fails
        setCurrentPuzzle({
          id: "",
          fen: DEFAULT_FEN,
          moves: [],
          rating: 0,
          themes: [],
          popularity: 0,
        })
        initializeBoardFromFEN(DEFAULT_FEN)
      }
    }
    fetchPuzzle()
    // We intentionally omit dependencies here because we only want to fetch
    // once on mount.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  /**
   * Parse a single SAN (standard algebraic notation) token into its
   * components.  SAN moves can specify a piece (e.g. 'N' for knight), an
   * optional disambiguation (file and/or rank), an optional capture 'x', a
   * destination square, optional promotion (e.g. '=Q'), and optional
   * check/mate suffix (+/#).  Castling is represented as 'O-O' or 'O-O-O'.
   */
  function parseSAN(token: string): MoveData {
    // Normalise zeros to capital letter O for castling notation
    const move = token.replace(/0/g, "O")
    // Check castling
    const castleMatch = /^(O-O(-O)?)$/.exec(move)
    if (castleMatch) {
      const castle = castleMatch[1] === "O-O" ? "O-O" : "O-O-O"
      // Provide all required fields for MoveData, using defaults
      return {
        piece: "K",
        disambiguation: "",
        capture: false,
        dest: "",
        promotion: null,
        castle,
      }
    }
    // Standard SAN: optional piece, optional from file, optional from rank,
    // optional capture, required dest square, optional promotion, optional check/mate
    const regex = /^([KQRBN])?([a-h])?([1-8])?(x)?([a-h][1-8])(=([QRBN]))?[+#]?$/
    const m = regex.exec(move)
    if (!m) {
      // If parsing fails return a minimal object that will cause the move to fail
      return { piece: "P", disambiguation: "", capture: false, dest: "", promotion: null, castle: null }
    }
    const piece = m[1] ?? "P"
    const fromFile = m[2] ?? ""
    const fromRank = m[3] ?? ""
    const capture = !!m[4]
    const dest = m[5]
    const promotion = m[7] ?? null
    // Combine file and rank disambiguation into a single string for simplicity
    const disambiguation = fromFile + fromRank
    return { piece, disambiguation, capture, dest, promotion, castle: null }
  }

  /**
   * Initialise the standard chess starting position.  The board is an
   * 8x8 array with uppercase letters representing white pieces and lowercase
   * letters representing black pieces.  Empty squares are null.
   */
  function initialCharBoard(): (string | null)[][] {
    return [
      ["r", "n", "b", "q", "k", "b", "n", "r"],
      ["p", "p", "p", "p", "p", "p", "p", "p"],
      [null, null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null, null],
      ["P", "P", "P", "P", "P", "P", "P", "P"],
      ["R", "N", "B", "Q", "K", "B", "N", "R"],
    ]
  }

  /**
   * Determine whether two pieces belong to opposing sides.  Empty squares are
   * treated as non-opponents.
   */
  function isOpponent(a: string | null, b: string | null): boolean {
    if (!a || !b) return false
    const aWhite = a === a.toUpperCase()
    const bWhite = b === b.toUpperCase()
    return aWhite !== bWhite
  }

  /**
   * Determine whether a piece can move from (fromRank, fromFile) to
   * (toRank, toFile) according to basic chess movement rules.  This helper
   * ignores check, en passant and castling rights, as the goal is only to
   * reconstruct the static board state.
   */
  interface MoveData {
    piece: string
    disambiguation: string
    capture: boolean
    dest: string
    promotion: string | null
    castle: string | null
  }

  function canPieceMove(
    board: (string | null)[][],
    fromRank: number,
    fromFile: number,
    toRank: number,
    toFile: number,
    moveData: MoveData,
    color: "w" | "b",
  ): boolean {
    const piece = board[fromRank][fromFile]
    if (!piece) return false
    const isWhite = piece === piece.toUpperCase()
    if ((color === "w" && !isWhite) || (color === "b" && isWhite)) return false
    const target = board[toRank][toFile]
    const dr = toRank - fromRank
    const df = toFile - fromFile
    const absDr = Math.abs(dr)
    const absDf = Math.abs(df)
    const pieceType = piece.toUpperCase()

    // Verify target occupancy matches capture flag
    if (moveData.capture) {
      if (!target || !isOpponent(piece, target)) return false
    } else {
      if (target) return false
    }

    switch (pieceType) {
      case "P": {
        const forward = isWhite ? -1 : 1
        const startRank = isWhite ? 6 : 1
        // Capturing move
        if (moveData.capture) {
          if (dr === forward && absDf === 1) {
            return true
          }
          return false
        }
        // Single forward
        if (df === 0 && dr === forward) {
          return !target
        }
        // Double forward from start rank
        if (df === 0 && dr === 2 * forward && fromRank === startRank) {
          // Ensure intermediate square is empty
          const intermediateRank = fromRank + forward
          return !board[intermediateRank][fromFile] && !target
        }
        return false
      }
      case "N":
        return (absDr === 2 && absDf === 1) || (absDr === 1 && absDf === 2)
      case "B": {
        if (absDr !== absDf) return false
        const stepR = dr > 0 ? 1 : -1
        const stepF = df > 0 ? 1 : -1
        let r = fromRank + stepR
        let f = fromFile + stepF
        while (r !== toRank && f !== toFile) {
          if (board[r][f]) return false
          r += stepR
          f += stepF
        }
        return true
      }
      case "R": {
        if (dr !== 0 && df !== 0) return false
        const stepR = dr === 0 ? 0 : dr > 0 ? 1 : -1
        const stepF = df === 0 ? 0 : df > 0 ? 1 : -1
        let r = fromRank + stepR
        let f = fromFile + stepF
        while (r !== toRank || f !== toFile) {
          if (board[r][f]) return false
          r += stepR
          f += stepF
        }
        return true
      }
      case "Q": {
        // Queen combines rook and bishop
        if (absDr === absDf) {
          // Diagonal
          const stepR = dr > 0 ? 1 : -1
          const stepF = df > 0 ? 1 : -1
          let r = fromRank + stepR
          let f = fromFile + stepF
          while (r !== toRank && f !== toFile) {
            if (board[r][f]) return false
            r += stepR
            f += stepF
          }
          return true
        }
        if (dr === 0 || df === 0) {
          // Horizontal or vertical
          const stepR = dr === 0 ? 0 : dr > 0 ? 1 : -1
          const stepF = df === 0 ? 0 : df > 0 ? 1 : -1
          let r = fromRank + stepR
          let f = fromFile + stepF
          while (r !== toRank || f !== toFile) {
            if (board[r][f]) return false
            r += stepR
            f += stepF
          }
          return true
        }
        return false
      }
      case "K": {
        // King moves one square any direction
        if (absDr <= 1 && absDf <= 1) return true
        return false
      }
    }
    return false
  }

  /**
   * Apply a single SAN move to a character board.  Returns the updated
   * board along with a boolean indicating whether the move was successfully
   * applied.  Castling moves reposition both the king and the associated
   * rook.  Promotions replace the pawn with the promoted piece.
   */
  function applyMove(
    board: (string | null)[][],
    moveData: MoveData,
    color: "w" | "b",
  ): { board: (string | null)[][]; success: boolean } {
    const b = board.map((row) => row.slice())
    // Handle castling
    if (moveData.castle) {
      if (moveData.castle === "O-O") {
        if (color === "w") {
          // White kingside: e1g1 and h1f1
          if (b[7][4] === "K" && b[7][7] === "R") {
            b[7][6] = "K"
            b[7][5] = "R"
            b[7][4] = null
            b[7][7] = null
            return { board: b, success: true }
          }
        } else {
          // Black kingside
          if (b[0][4] === "k" && b[0][7] === "r") {
            b[0][6] = "k"
            b[0][5] = "r"
            b[0][4] = null
            b[0][7] = null
            return { board: b, success: true }
          }
        }
        return { board, success: false }
      }
      if (moveData.castle === "O-O-O") {
        if (color === "w") {
          // White queenside: e1c1 and a1d1
          if (b[7][4] === "K" && b[7][0] === "R") {
            b[7][2] = "K"
            b[7][3] = "R"
            b[7][4] = null
            b[7][0] = null
            return { board: b, success: true }
          }
        } else {
          // Black queenside
          if (b[0][4] === "k" && b[0][0] === "r") {
            b[0][2] = "k"
            b[0][3] = "r"
            b[0][4] = null
            b[0][0] = null
            return { board: b, success: true }
          }
        }
        return { board, success: false }
      }
    }
    // Determine destination
    const toFile = moveData.dest.charCodeAt(0) - "a".charCodeAt(0)
    const toRank = 8 - Number.parseInt(moveData.dest[1], 10)
    const pieceType = moveData.piece
    // We will search for candidate pieces that can legally move to the
    // destination.
    const candidates: { r: number; f: number }[] = []
    for (let r = 0; r < 8; r++) {
      for (let f = 0; f < 8; f++) {
        const piece = b[r][f]
        if (!piece) continue
        const isWhite = piece === piece.toUpperCase()
        if ((color === "w" && !isWhite) || (color === "b" && isWhite)) continue
        if (piece.toUpperCase() !== pieceType) continue
        // Disambiguation: may include a file and/or rank character.  For
        // example 'bd' from 'Nbd2' means the knight on the b-file moves.
        if (moveData.disambiguation) {
          const disFileMatch = moveData.disambiguation.match(/[a-h]/)
          const disRankMatch = moveData.disambiguation.match(/[1-8]/)
          if (disFileMatch) {
            const specFile = disFileMatch[0].charCodeAt(0) - "a".charCodeAt(0)
            if (f !== specFile) continue
          }
          if (disRankMatch) {
            const specRank = 8 - Number.parseInt(disRankMatch[0], 10)
            if (r !== specRank) continue
          }
        }
        // Check if piece can move to destination
        if (canPieceMove(b, r, f, toRank, toFile, moveData, color)) {
          candidates.push({ r, f })
        }
      }
    }
    if (candidates.length === 0) {
      return { board, success: false }
    }
    // Choose the first candidate
    const { r: fromRank, f: fromFile } = candidates[0]
    // Handle promotion
    let movingPiece = b[fromRank][fromFile]!
    if (moveData.promotion) {
      const promo = moveData.promotion
      movingPiece = color === "w" ? promo : promo.toLowerCase()
    }
    // Move the piece
    b[toRank][toFile] = movingPiece
    b[fromRank][fromFile] = null
    return { board: b, success: true }
  }

  /**
   * Generate a board state from a PGN string and an initial ply number.  The
   * PGN contains the entire game; the puzzle begins after `initialPly`
   * half-moves have been played.  This function applies each SAN move up
   * to the specified ply and returns the resulting board.  It ignores
   * annotations, comments and result markers.
   */
  function generateBoardFromPGN(pgn: string, initialPly: number): (string | null)[][] {
    let board = initialCharBoard()
    // Remove comments {...} and variations (...) from PGN
    let cleaned = pgn.replace(/\{[^}]*\}/g, "")
    cleaned = cleaned.replace(/$$[^)]*$$/g, "")
    // Split tokens on whitespace and strip move numbers like "1." or "1..."
    const tokens = cleaned
      .split(/\s+/)
      .filter((tok) => tok.length > 0)
      // Filter out move numbers like '1.', '2...', etc.
      .filter((tok) => {
        return !/^\d+\.*$/.test(tok)
      })
    let moveIndex = 0
    let color: "w" | "b" = "w"
    for (const token of tokens) {
      if (moveIndex >= initialPly) break
      // Skip result markers
      if (/^(1-0|0-1|1\/2-1\/2|\*)$/.test(token)) {
        continue
      }
      const moveData = parseSAN(token)
      const result = applyMove(board, moveData, color)
      if (!result.success) {
        // If parsing fails, break early
        break
      }
      board = result.board
      moveIndex++
      // Alternate color after each ply
      color = color === "w" ? "b" : "w"
    }
    return board
  }

  /**
   * Convert a character board into a FEN string.  We ignore castling rights,
   * en passant target squares and halfmove/fullmove counters because the
   * puzzle engine does not rely on them.  They are replaced with '-' and
   * default values, respectively.
   */
  function boardToFen(board: (string | null)[][], sideToMove: "w" | "b"): string {
    const rows = []
    for (let r = 0; r < 8; r++) {
      let row = ""
      let empty = 0
      for (let f = 0; f < 8; f++) {
        const piece = board[r][f]
        if (piece) {
          if (empty > 0) {
            row += empty
            empty = 0
          }
          row += piece
        } else {
          empty++
        }
      }
      if (empty > 0) row += empty
      rows.push(row)
    }
    const placement = rows.join("/")
    // We omit castling rights and en passant (set to '-') and counters (set to '0 1').
    return `${placement} ${sideToMove} - - 0 1`
  }

  // Initialize the board when the component mounts or when the FEN changes.
  const initializeBoardFromFEN = (fen: string) => {
    const fenParts = fen.split(" ")
    const position = fenParts[0]
    const rows = position.split("/")

    const newBoard: Square[][] = []

    for (let rank = 0; rank < 8; rank++) {
      const row: Square[] = []
      const fenRow = rows[rank]
      let file = 0

      for (const char of fenRow) {
        if (isNaN(Number.parseInt(char))) {
          // It's a piece
          row.push({
            piece: char,
            color: (rank + file) % 2 === 0 ? "light" : "dark",
          })
          file++
        } else {
          // It's a number of empty squares
          const emptySquares = Number.parseInt(char)
          for (let i = 0; i < emptySquares; i++) {
            row.push({
              piece: null,
              color: (rank + file) % 2 === 0 ? "light" : "dark",
            })
            file++
          }
        }
      }
      newBoard.push(row)
    }

    setBoard(newBoard)
  }

  // Convert algebraic square (e.g. "e4") to matrix coordinates [rank, file].
  const squareToCoords = (square: string): [number, number] => {
    const file = square.charCodeAt(0) - 97 // a=0, b=1, etc.
    const rank = 8 - Number.parseInt(square[1]) // 8=0, 7=1, etc.
    return [rank, file]
  }

  // Convert matrix coordinates [rank, file] back to algebraic square.
  const coordsToSquare = (rank: number, file: number): string => {
    return String.fromCharCode(97 + file) + (8 - rank).toString()
  }

  // Check whether a move is legal for a piece at a given square. This helper
  // looks up the precomputed legal moves and ensures the destination square
  // belongs to that list. It also prevents capturing one's own pieces.
  const isValidMove = (from: string, to: string): boolean => {
    const [fromRank, fromFile] = squareToCoords(from)
    const [toRank, toFile] = squareToCoords(to)

    // Bounds check
    if (fromRank < 0 || fromRank > 7 || fromFile < 0 || fromFile > 7) return false
    if (toRank < 0 || toRank > 7 || toFile < 0 || toFile > 7) return false

    const piece = board[fromRank]?.[fromFile]?.piece
    if (!piece) return false

    // Prevent capturing own piece
    const targetPiece = board[toRank]?.[toFile]?.piece
    if (targetPiece && (piece === piece.toUpperCase()) === (targetPiece === targetPiece.toUpperCase())) {
      return false
    }

    // Generate all legal moves for this square and check membership.
    const moves = getLegalMovesForSquare(from)
    return moves.includes(to)
  }

  // Generate simplified legal moves for the piece at the given square. This
  // implementation handles the standard movement rules for each piece type.
  // It does not currently implement advanced rules such as castling, en passant
  // or promotions. Capturing is permitted when landing on an opponent's piece.
  const getLegalMovesForSquare = (square: string): string[] => {
    const [rank, file] = squareToCoords(square)
    const piece = board[rank]?.[file]?.piece
    if (!piece) return []

    const moves: string[] = []
    const isWhite = piece === piece.toUpperCase()
    const directions: [number, number][] = []

    // Helper to add ray moves until blocked
    const addRayMoves = (dirRank: number, dirFile: number) => {
      let r = rank + dirRank
      let f = file + dirFile
      while (r >= 0 && r < 8 && f >= 0 && f < 8) {
        const targetPiece = board[r][f].piece
        if (targetPiece) {
          if ((targetPiece === targetPiece.toUpperCase()) !== isWhite) {
            moves.push(coordsToSquare(r, f))
          }
          break
        } else {
          moves.push(coordsToSquare(r, f))
        }
        r += dirRank
        f += dirFile
      }
    }

    switch (piece.toLowerCase()) {
      case "p": {
        const forward = isWhite ? -1 : 1
        const startRank = isWhite ? 6 : 1

        // Single step forward
        const fr = rank + forward
        if (fr >= 0 && fr < 8 && !board[fr][file].piece) {
          moves.push(coordsToSquare(fr, file))
          // Two steps from starting rank
          if (rank === startRank) {
            const fr2 = rank + 2 * forward
            if (!board[fr2][file].piece) {
              moves.push(coordsToSquare(fr2, file))
            }
          }
        }

        // Captures
        const captureFiles = [file - 1, file + 1]
        for (const cf of captureFiles) {
          if (fr >= 0 && fr < 8 && cf >= 0 && cf < 8) {
            const target = board[fr][cf].piece
            if (target && (target === target.toUpperCase()) !== isWhite) {
              moves.push(coordsToSquare(fr, cf))
            }
          }
        }
        break
      }
      case "n": {
        const offsets = [
          [-2, -1],
          [-2, 1],
          [-1, -2],
          [-1, 2],
          [1, -2],
          [1, 2],
          [2, -1],
          [2, 1],
        ]
        for (const [dr, df] of offsets) {
          const r = rank + dr
          const f = file + df
          if (r >= 0 && r < 8 && f >= 0 && f < 8) {
            const target = board[r][f].piece
            if (!target || (target === target.toUpperCase()) !== isWhite) {
              moves.push(coordsToSquare(r, f))
            }
          }
        }
        break
      }
      case "b":
        directions.push([-1, -1], [-1, 1], [1, -1], [1, 1])
        directions.forEach(([dr, df]) => addRayMoves(dr, df))
        break
      case "r":
        directions.push([-1, 0], [1, 0], [0, -1], [0, 1])
        directions.forEach(([dr, df]) => addRayMoves(dr, df))
        break
      case "q":
        directions.push([-1, -1], [-1, 1], [1, -1], [1, 1], [-1, 0], [1, 0], [0, -1], [0, 1])
        directions.forEach(([dr, df]) => addRayMoves(dr, df))
        break
      case "k": {
        const kingOffsets = [
          [-1, -1],
          [-1, 0],
          [-1, 1],
          [0, -1],
          [0, 1],
          [1, -1],
          [1, 0],
          [1, 1],
        ]
        for (const [dr, df] of kingOffsets) {
          const r = rank + dr
          const f = file + df
          if (r >= 0 && r < 8 && f >= 0 && f < 8) {
            const target = board[r][f].piece
            if (!target || (target === target.toUpperCase()) !== isWhite) {
              moves.push(coordsToSquare(r, f))
            }
          }
        }
        break
      }
    }
    return moves
  }

  // Attempt to make a move and update state. If the move is not legal, return false.
  const makeMove = (from: string, to: string): boolean => {
    if (!isValidMove(from, to)) return false
    const [fromRank, fromFile] = squareToCoords(from)
    const [toRank, toFile] = squareToCoords(to)

    const newBoard = board.map((row) => row.map((sq) => ({ ...sq })))
    const piece = newBoard[fromRank][fromFile].piece
    const captured = newBoard[toRank][toFile].piece

    newBoard[toRank][toFile].piece = piece
    newBoard[fromRank][fromFile].piece = null
    setBoard(newBoard)

    // record move
    const move: Move = {
      from,
      to,
      piece: piece!,
      captured: captured || undefined,
    }
    setMoveHistory((prev) => [...prev, move])
    setCurrentMove((prev) => prev + 1)

    // Compare with puzzle solution
    checkPuzzleSolution(from + to)
    return true
  }

  // Check if the latest move corresponds to the expected puzzle move. If the
  // entire solution has been played, mark the puzzle as solved. Otherwise
  // automatically play the next move from the solution.
  const checkPuzzleSolution = (moveUCI: string) => {
    const expectedMove = currentPuzzle.moves[currentMove]
    if (moveUCI === expectedMove) {
      if (currentMove + 1 >= currentPuzzle.moves.length) {
        setPuzzleSolved(true)
        setTimeout(() => {
          alert("🎉 Puzzle solved! Great job!")
        }, 500)
      } else {
        setTimeout(() => {
          const nextMove = currentPuzzle.moves[currentMove + 1]
          if (nextMove) {
            const from = nextMove.slice(0, 2)
            const to = nextMove.slice(2, 4)
            makeMove(from, to)
          }
        }, 1000)
      }
    } else {
      alert("❌ That's not the best move. Try again!")
    }
  }

  // Handle user clicking on a square. Select a piece or attempt to make a move.
  const handleSquareClick = (rank: number, file: number) => {
    const square = coordsToSquare(rank, file)
    const piece = board[rank][file].piece

    if (selectedSquare) {
      if (selectedSquare === square) {
        setSelectedSquare(null)
        setLegalMoves([])
      } else {
        if (makeMove(selectedSquare, square)) {
          setSelectedSquare(null)
          setLegalMoves([])
        } else {
          if (piece) {
            setSelectedSquare(square)
            setLegalMoves(getLegalMovesForSquare(square))
          } else {
            setSelectedSquare(null)
            setLegalMoves([])
          }
        }
      }
    } else {
      if (piece) {
        setSelectedSquare(square)
        setLegalMoves(getLegalMovesForSquare(square))
      }
    }
  }

  const handleDragStart = (e: React.DragEvent, rank: number, file: number) => {
    const square = coordsToSquare(rank, file)
    const piece = board[rank][file].piece
    if (piece) {
      setDraggedPiece({ piece, from: square })
      setSelectedSquare(square)
      setLegalMoves(getLegalMovesForSquare(square))
      const dragImage = document.createElement("div")
      dragImage.innerHTML = pieceSymbols[piece]
      dragImage.style.fontSize = "40px"
      dragImage.style.position = "absolute"
      dragImage.style.top = "-1000px"
      document.body.appendChild(dragImage)
      e.dataTransfer.setDragImage(dragImage, 20, 20)
      setTimeout(() => document.body.removeChild(dragImage), 0)
    }
  }

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
  }

  const handleDrop = (e: React.DragEvent, rank: number, file: number) => {
    e.preventDefault()
    if (draggedPiece) {
      const to = coordsToSquare(rank, file)
      makeMove(draggedPiece.from, to)
      setDraggedPiece(null)
      setSelectedSquare(null)
      setLegalMoves([])
    }
  }

  // Reset the puzzle back to its initial state. This resets board, move
  // history, move index and hint state.
  const resetPuzzle = () => {
    initializeBoardFromFEN(currentPuzzle.fen)
    setSelectedSquare(null)
    setLegalMoves([])
    setMoveHistory([])
    setCurrentMove(0)
    setPuzzleSolved(false)
    setShowHint(false)
  }

  // Show a hint by highlighting the next correct move.
  const showHintMove = () => {
    if (currentMove < currentPuzzle.moves.length) {
      const nextMove = currentPuzzle.moves[currentMove]
      const from = nextMove.slice(0, 2)
      const to = nextMove.slice(2, 4)
      setSelectedSquare(from)
      setLegalMoves([to])
      setShowHint(true)
      setHintsUsed((prev) => prev + 1)
      setTimeout(() => {
        setShowHint(false)
        setSelectedSquare(null)
        setLegalMoves([])
      }, 3000)
    }
  }

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, "0")}`
  }

  return (
    <Card className="bg-white/10 backdrop-blur-md border-white/20">
      <CardHeader>
        <div className="flex justify-between items-center">
          <CardTitle className="text-white flex items-center gap-2">
            <div className="text-2xl">♞</div>
            Puzzle #{currentPuzzle.id || "00sHx"}
          </CardTitle>
          <div className="flex gap-2">
            {currentPuzzle.themes.map((theme, index) => (
              <Badge key={index} className="bg-purple-500/20 text-purple-300 text-xs">
                {theme}
              </Badge>
            ))}
            <Badge className="bg-blue-500/20 text-blue-300">📊 {currentPuzzle.rating || 1760}</Badge>
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-6">
        {/* Puzzle Status */}
        <div className="flex justify-between items-center p-4 bg-white/5 rounded-xl">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-blue-400" />
              <span className="text-white font-mono">{formatTime(timeElapsed)}</span>
            </div>
            <div className="flex items-center gap-2">
              <Lightbulb className="w-4 h-4 text-yellow-400" />
              <span className="text-white">{hintsUsed}/3</span>
            </div>
          </div>
          {puzzleSolved && (
            <div className="flex items-center gap-2 text-green-400">
              <CheckCircle className="w-5 h-5" />
              <span className="font-semibold">Solved!</span>
            </div>
          )}
        </div>

        {/* Chess Board - Made larger and improved piece styling */}
        <div className="flex justify-center">
          <div className="grid grid-cols-8 gap-0 border-2 border-amber-400/50 rounded-xl overflow-hidden shadow-2xl w-full max-w-2xl">
            {board.map((row, rankIndex) =>
              row.map((square, fileIndex) => {
                const squareName = coordsToSquare(rankIndex, fileIndex)
                const isSelected = selectedSquare === squareName
                const isLegalMove = legalMoves.includes(squareName)
                const isHintSquare = showHint && legalMoves.includes(squareName)

                return (
                  <div
                    key={`${rankIndex}-${fileIndex}`}
                    className={`
                       aspect-square flex items-center justify-center text-4xl cursor-pointer
                       transition-all duration-200 hover:scale-105 relative select-none
                       ${square.color === "light" ? "bg-amber-400 hover:bg-amber-200" : "bg-amber-800 hover:bg-amber-700"}
                       ${isSelected ? "ring-4 ring-blue-400 ring-inset" : ""}
                       ${isLegalMove ? "ring-2 ring-green-400 ring-inset" : ""}
                       ${isHintSquare ? "ring-4 ring-yellow-400 ring-inset animate-pulse" : ""}
                     `}
                    onClick={() => handleSquareClick(rankIndex, fileIndex)}
                    onDragOver={handleDragOver}
                    onDrop={(e) => handleDrop(e, rankIndex, fileIndex)}
                  >
                    {square.piece && (
                      <span
                        className={`
                           drop-shadow-lg transition-transform duration-200 chess-piece
                           ${isSelected ? "scale-110" : ""}
                           ${
                             square.piece === square.piece.toUpperCase()
                               ? "text-white filter drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]"
                               : "text-black filter drop-shadow-[0_2px_4px_rgba(255,255,255,0.3)]"
                           }
                         `}
                        draggable
                        onDragStart={(e) => handleDragStart(e, rankIndex, fileIndex)}
                      >
                        {pieceSymbols[square.piece]}
                      </span>
                    )}

                    {/* Legal move indicators */}
                    {isLegalMove && !square.piece && (
                      <div className="w-5 h-5 bg-green-400 rounded-full opacity-60"></div>
                    )}

                    {/* Square coordinates for selected square */}
                    {isSelected && (
                      <div className="absolute bottom-0 right-0 text-xs bg-blue-500 text-white px-1 rounded-tl">
                        {squareName}
                      </div>
                    )}

                    {/* Hint indicator */}
                    {isHintSquare && (
                      <div className="absolute top-0 left-0 text-xs bg-yellow-500 text-black px-1 rounded-br">💡</div>
                    )}
                  </div>
                )
              }),
            )}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3">
          <Button
            onClick={showHintMove}
            disabled={hintsUsed >= 3 || puzzleSolved}
            className="flex-1 bg-gradient-to-r from-yellow-600 to-orange-600 hover:from-yellow-700 hover:to-orange-700 text-white rounded-xl disabled:opacity-50"
          >
            <Lightbulb className="w-4 h-4 mr-2" />
            Hint ({3 - hintsUsed} left)
          </Button>

          <Button
            onClick={resetPuzzle}
            variant="outline"
            className="flex-1 border-white/20 text-purple-200 hover:bg-white/10 rounded-xl bg-transparent"
          >
            <RotateCcw className="w-4 h-4 mr-2" />
            Reset
          </Button>
        </div>

        {/* Move History */}
        {moveHistory.length > 0 && (
          <div className="p-4 bg-white/5 rounded-xl">
            <h4 className="text-white font-semibold mb-2">Move History</h4>
            <div className="flex flex-wrap gap-2">
              {moveHistory.map((move, index) => (
                <Badge key={index} className="bg-blue-500/20 text-blue-300">
                  {index + 1}. {move.from}-{move.to}
                </Badge>
              ))}
            </div>
          </div>
        )}

        {/* Solution hint */}
        {showHint && (
          <div className="p-4 bg-yellow-500/10 rounded-xl border border-yellow-500/30">
            <p className="text-yellow-300 text-sm">
              💡 Look for tactical opportunities! The highlighted squares show possible moves.
            </p>
          </div>
        )}

        {/* Puzzle solved message */}
        {puzzleSolved && (
          <div className="p-4 bg-green-500/10 rounded-xl border border-green-500/30 text-center">
            <div className="text-4xl mb-2">🎉</div>
            <h3 className="text-green-400 font-bold text-lg mb-2">Puzzle Solved!</h3>
            <p className="text-green-300 text-sm mb-4">
              Great job! You earned 50 $CHESS tokens and maintained your streak.
            </p>
            <Button className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white rounded-xl">
              Next Puzzle
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
