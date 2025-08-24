"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { RefreshCw, Download, ExternalLink } from "lucide-react"

interface LichessPuzzle {
  id: string
  fen: string
  moves: string[]
  rating: number
  ratingDeviation: number
  popularity: number
  nbPlays: number
  themes: string[]
  gameUrl: string
  openingTags: string[]
}

export default function PuzzleLoader() {
  const [isLoading, setIsLoading] = useState(false)
  // const [puzzleStats, setPuzzleStats] = useState({
  //   totalPuzzles: 5036915,
  //   lastUpdated: "2025-07-02",
  //   avgRating: 1650,
  //   themes: 47,
  // })

  const puzzleStats = {
    totalPuzzles: 5036915,
    lastUpdated: "2025-07-02",
    avgRating: 1650,
    themes: 47,
  }

  // Sample puzzle data in Lichess format
  const samplePuzzles: LichessPuzzle[] = [
    {
      id: "00sHx",
      fen: "q3k1nr/1pp1nQpp/3p4/1P2p3/4P3/B1PP1b2/B5PP/5K2 b k - 0 17",
      moves: ["e8d7", "a2e6", "d7d8", "f7f8"],
      rating: 1760,
      ratingDeviation: 80,
      popularity: 83,
      nbPlays: 72,
      themes: ["mate", "mateIn2", "middlegame", "short"],
      gameUrl: "https://lichess.org/yyznGmXs/black#34",
      openingTags: ["Italian_Game", "Italian_Game_Classical_Variation"],
    },
    {
      id: "00sJ9",
      fen: "r3r1k1/p4ppp/2p2n2/1p6/3P1qb1/2NQR3/PPB2PP1/R1B3K1 w - - 5 18",
      moves: ["e3g3", "e8e1", "g1h2", "e1c1", "a1c1", "f4h6", "h2g1", "h6c1"],
      rating: 2671,
      ratingDeviation: 105,
      popularity: 87,
      nbPlays: 325,
      themes: ["advantage", "attraction", "fork", "middlegame", "sacrifice", "veryLong"],
      gameUrl: "https://lichess.org/gyFeQsOE#35",
      openingTags: ["French_Defense", "French_Defense_Exchange_Variation"],
    },
  ]

  const loadNewPuzzle = () => {
    setIsLoading(true)
    // Simulate loading from Lichess database
    setTimeout(() => {
      setIsLoading(false)
    }, 1500)
  }

  const getThemeEmoji = (theme: string) => {
    const themeEmojis: { [key: string]: string } = {
      mate: "👑",
      mateIn2: "⚡",
      mateIn3: "🎯",
      fork: "🍴",
      pin: "📌",
      skewer: "🗡️",
      sacrifice: "💥",
      attraction: "🧲",
      deflection: "↗️",
      endgame: "🏁",
      middlegame: "⚔️",
      opening: "🚀",
      tactics: "🧠",
      advantage: "📈",
      short: "⚡",
      long: "⏳",
      veryLong: "🕐",
    }
    return themeEmojis[theme] || "🎲"
  }

  return (
    <div className="space-y-6">
      {/* Lichess Database Info */}
      <Card className="bg-white/10 backdrop-blur-md border-white/20">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <div className="text-2xl">♞</div>
            Lichess Puzzle Database
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center p-3 bg-blue-500/10 rounded-xl border border-blue-500/20">
              <div className="text-xl font-bold text-blue-400">{puzzleStats.totalPuzzles.toLocaleString()}</div>
              <div className="text-xs text-purple-200">Total Puzzles</div>
            </div>
            <div className="text-center p-3 bg-green-500/10 rounded-xl border border-green-500/20">
              <div className="text-xl font-bold text-green-400">{puzzleStats.avgRating}</div>
              <div className="text-xs text-purple-200">Avg Rating</div>
            </div>
            <div className="text-center p-3 bg-purple-500/10 rounded-xl border border-purple-500/20">
              <div className="text-xl font-bold text-purple-400">{puzzleStats.themes}</div>
              <div className="text-xs text-purple-200">Themes</div>
            </div>
            <div className="text-center p-3 bg-amber-500/10 rounded-xl border border-amber-500/20">
              <div className="text-xl font-bold text-amber-400">CC0</div>
              <div className="text-xs text-purple-200">License</div>
            </div>
          </div>

          <div className="flex gap-3">
            <Button
              onClick={loadNewPuzzle}
              disabled={isLoading}
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-xl"
            >
              {isLoading ? <RefreshCw className="w-4 h-4 mr-2 animate-spin" /> : <RefreshCw className="w-4 h-4 mr-2" />}
              Load New Puzzle
            </Button>

            <Button
              variant="outline"
              className="border-white/20 text-purple-200 hover:bg-white/10 rounded-xl bg-transparent"
            >
              <Download className="w-4 h-4 mr-2" />
              Database Info
            </Button>
          </div>

          <div className="text-xs text-purple-300 bg-white/5 p-3 rounded-lg">
            <strong>📊 Database Format:</strong> Puzzles use FEN notation with UCI moves. Rating calculated via Glicko2
            system. Last updated: {puzzleStats.lastUpdated}
          </div>
        </CardContent>
      </Card>

      {/* Sample Puzzles */}
      <div className="space-y-4">
        <h3 className="text-xl font-bold text-white flex items-center gap-2">
          <div className="text-2xl">🎯</div>
          Featured Puzzles
        </h3>

        {samplePuzzles.map((puzzle) => (
          <Card
            key={puzzle.id}
            className="bg-white/10 backdrop-blur-md border-white/20 hover:bg-white/15 transition-all duration-300"
          >
            <CardHeader>
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="text-white flex items-center gap-2">
                    <span className="text-lg">#{puzzle.id}</span>
                    <Badge className="bg-blue-500/20 text-blue-300">📊 {puzzle.rating}</Badge>
                  </CardTitle>
                  <div className="flex items-center gap-2 mt-2">
                    <span className="text-xs text-purple-200">⭐ {puzzle.popularity}% popularity</span>
                    <span className="text-xs text-purple-200">🎮 {puzzle.nbPlays} plays</span>
                  </div>
                </div>

                <Button
                  variant="outline"
                  size="sm"
                  className="border-white/20 text-purple-200 hover:bg-white/10 rounded-lg bg-transparent"
                >
                  <ExternalLink className="w-3 h-3 mr-1" />
                  View Game
                </Button>
              </div>
            </CardHeader>

            <CardContent className="space-y-3">
              {/* Themes */}
              <div className="flex gap-2 flex-wrap">
                {puzzle.themes.map((theme, themeIndex) => (
                  <Badge key={themeIndex} className="bg-purple-500/20 text-purple-300 text-xs flex items-center gap-1">
                    <span>{getThemeEmoji(theme)}</span>
                    {theme}
                  </Badge>
                ))}
              </div>

              {/* Opening Tags */}
              {puzzle.openingTags.length > 0 && (
                <div className="flex gap-2 flex-wrap">
                  {puzzle.openingTags.map((opening, openingIndex) => (
                    <Badge key={openingIndex} className="bg-green-500/20 text-green-300 text-xs">
                      🚀 {opening.replace(/_/g, " ")}
                    </Badge>
                  ))}
                </div>
              )}

              {/* FEN Position */}
              <div className="bg-white/5 p-3 rounded-lg">
                <div className="text-xs text-purple-200 mb-1">FEN Position:</div>
                <div className="text-xs font-mono text-white break-all">{puzzle.fen}</div>
              </div>

              {/* Solution Moves */}
              <div className="bg-white/5 p-3 rounded-lg">
                <div className="text-xs text-purple-200 mb-1">Solution (UCI):</div>
                <div className="text-xs font-mono text-amber-400">{puzzle.moves.join(" → ")}</div>
              </div>

              <Button className="w-full bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white rounded-xl">
                🎯 Solve This Puzzle
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
