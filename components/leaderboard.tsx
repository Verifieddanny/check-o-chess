"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Crown, Users, TrendingUp, Medal, Star } from "lucide-react"

export default function Leaderboard() {
  const [viewType, setViewType] = useState("global")

  const globalLeaders = [
    { rank: 1, name: "ChessMaster2024", avatar: "👑", score: 15420, streak: 45, badge: "Grandmaster" },
    { rank: 2, name: "PuzzleQueen", avatar: "👸", score: 14890, streak: 38, badge: "Master" },
    { rank: 3, name: "TacticalGenius", avatar: "🧠", score: 14250, streak: 29, badge: "Expert" },
    { rank: 4, name: "CheckmateKing", avatar: "⚡", score: 13800, streak: 33, badge: "Expert" },
    { rank: 5, name: "EndgameHero", avatar: "🏆", score: 13450, streak: 25, badge: "Advanced" },
    { rank: 6, name: "BlitzSolver", avatar: "⚡", score: 13100, streak: 22, badge: "Advanced" },
    { rank: 7, name: "PositionalPro", avatar: "🎯", score: 12850, streak: 19, badge: "Intermediate" },
  ]

  const friendsLeaders = [
    { rank: 1, name: "AliceChess", avatar: "🦄", score: 8420, streak: 15, badge: "Advanced" },
    { rank: 2, name: "BobTactical", avatar: "🎮", score: 7890, streak: 12, badge: "Intermediate" },
    { rank: 3, name: "CharlieGambit", avatar: "🚀", score: 7250, streak: 8, badge: "Intermediate" },
  ]

  const weeklyTop = [
    { rank: 1, name: "WeeklyChamp", avatar: "🔥", score: 2840, puzzlesSolved: 28 },
    { rank: 2, name: "SpeedSolver", avatar: "⚡", score: 2650, puzzlesSolved: 25 },
    { rank: 3, name: "ConsistentPlayer", avatar: "📈", score: 2420, puzzlesSolved: 24 },
  ]

  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1:
        return <Crown className="w-5 h-5 text-yellow-400" />
      case 2:
        return <Medal className="w-5 h-5 text-gray-400" />
      case 3:
        return <Medal className="w-5 h-5 text-amber-600" />
      default:
        return <span className="w-5 h-5 flex items-center justify-center text-purple-300 font-bold">#{rank}</span>
    }
  }

  const getBadgeColor = (badge: string) => {
    switch (badge) {
      case "Grandmaster":
        return "bg-purple-500/20 text-purple-300"
      case "Master":
        return "bg-blue-500/20 text-blue-300"
      case "Expert":
        return "bg-green-500/20 text-green-300"
      case "Advanced":
        return "bg-orange-500/20 text-orange-300"
      case "Intermediate":
        return "bg-yellow-500/20 text-yellow-300"
      default:
        return "bg-gray-500/20 text-gray-300"
    }
  }

  return (
    <div className="space-y-6 mb-[6rem]">
      <Tabs value={viewType} onValueChange={setViewType} className="w-full">
        <TabsList className="grid w-full grid-cols-3 bg-white/10 backdrop-blur-md border-white/20 rounded-2xl p-1">
          <TabsTrigger
            value="global"
            className="rounded-xl data-[state=active]:bg-white/20 data-[state=active]:text-white text-purple-200"
          >
            <TrendingUp className="w-4 h-4 mr-2" />
            Global
          </TabsTrigger>
          <TabsTrigger
            value="friends"
            className="rounded-xl data-[state=active]:bg-white/20 data-[state=active]:text-white text-purple-200"
          >
            <Users className="w-4 h-4 mr-2" />
            Friends
          </TabsTrigger>
          <TabsTrigger
            value="weekly"
            className="rounded-xl data-[state=active]:bg-white/20 data-[state=active]:text-white text-purple-200"
          >
            <Star className="w-4 h-4 mr-2" />
            Weekly
          </TabsTrigger>
        </TabsList>

        <TabsContent value="global" className="mt-6">
          <Card className="bg-white/10 backdrop-blur-md border-white/20">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Crown className="w-6 h-6 text-yellow-400" />
                Global Leaderboard
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {globalLeaders.map((player, index) => (
                <div
                  key={index}
                  className={`p-4 rounded-xl border transition-all duration-300 hover:scale-[1.02] ${
                    player.rank <= 3
                      ? "bg-gradient-to-r from-yellow-500/10 to-amber-500/10 border-yellow-500/30"
                      : "bg-white/5 border-white/10 hover:bg-white/10"
                  }`}
                >
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2">{getRankIcon(player.rank)}</div>

                    <div className="text-3xl">{player.avatar}</div>

                    <div className="flex-1">
                      <div className="font-semibold text-white">{player.name}</div>
                      <div className="flex items-center gap-2 mt-1">
                        <Badge className={getBadgeColor(player.badge)}>{player.badge}</Badge>
                        <span className="text-xs text-purple-200">🔥 {player.streak} day streak</span>
                      </div>
                    </div>

                    <div className="text-right">
                      <div className="text-xl font-bold text-amber-400">{player.score.toLocaleString()}</div>
                      <div className="text-xs text-purple-200">points</div>
                    </div>
                  </div>
                </div>
              ))}

              {/* Current User Position */}
              <div className="p-4 rounded-xl bg-blue-500/20 border-blue-500/50 border-2">
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2">
                    <span className="w-5 h-5 flex items-center justify-center text-blue-300 font-bold">#47</span>
                  </div>

                  <div className="text-3xl">🎯</div>

                  <div className="flex-1">
                    <div className="font-semibold text-white">You</div>
                    <div className="flex items-center gap-2 mt-1">
                      <Badge className="bg-green-500/20 text-green-300">Advanced</Badge>
                      <span className="text-xs text-purple-200">🔥 12 day streak</span>
                    </div>
                  </div>

                  <div className="text-right">
                    <div className="text-xl font-bold text-amber-400">8,420</div>
                    <div className="text-xs text-purple-200">points</div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="friends" className="mt-6">
          <Card className="bg-white/10 backdrop-blur-md border-white/20">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Users className="w-6 h-6 text-blue-400" />
                Friends Leaderboard
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {friendsLeaders.map((player, index) => (
                <div
                  key={index}
                  className="p-4 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all duration-300 hover:scale-[1.02]"
                >
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2">{getRankIcon(player.rank)}</div>

                    <div className="text-3xl">{player.avatar}</div>

                    <div className="flex-1">
                      <div className="font-semibold text-white">{player.name}</div>
                      <div className="flex items-center gap-2 mt-1">
                        <Badge className={getBadgeColor(player.badge)}>{player.badge}</Badge>
                        <span className="text-xs text-purple-200">🔥 {player.streak} day streak</span>
                      </div>
                    </div>

                    <div className="text-right">
                      <div className="text-xl font-bold text-amber-400">{player.score.toLocaleString()}</div>
                      <div className="text-xs text-purple-200">points</div>
                    </div>
                  </div>
                </div>
              ))}

              <div className="text-center py-8">
                <div className="text-6xl mb-4">👥</div>
                <p className="text-purple-200 mb-4">Invite friends to compete!</p>
                <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-xl">
                  Invite Friends
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="weekly" className="mt-6">
          <Card className="bg-white/10 backdrop-blur-md border-white/20">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Star className="w-6 h-6 text-purple-400" />
                This Week&apos;s Champions
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {weeklyTop.map((player, index) => (
                <div
                  key={index}
                  className={`p-4 rounded-xl border transition-all duration-300 hover:scale-[1.02] ${
                    player.rank <= 3
                      ? "bg-gradient-to-r from-purple-500/10 to-pink-500/10 border-purple-500/30"
                      : "bg-white/5 border-white/10 hover:bg-white/10"
                  }`}
                >
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2">{getRankIcon(player.rank)}</div>

                    <div className="text-3xl">{player.avatar}</div>

                    <div className="flex-1">
                      <div className="font-semibold text-white">{player.name}</div>
                      <div className="text-xs text-purple-200 mt-1">
                        {player.puzzlesSolved} puzzles solved this week
                      </div>
                    </div>

                    <div className="text-right">
                      <div className="text-xl font-bold text-purple-400">{player.score.toLocaleString()}</div>
                      <div className="text-xs text-purple-200">weekly pts</div>
                    </div>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
