"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Crown, Trophy, Flame, Coins, Target, BarChart3, Calendar, Share2 } from "lucide-react"
import ChessBoard from "@/components/chess-board"
import Leaderboard from "@/components/leaderboard"
import TournamentSection from "@/components/tournament-section"
import ProInsights from "@/components/pro-insights"

export default function ChessPuzzleApp() {
  const [isLoaded, setIsLoaded] = useState(false)
  // const [currentStreak, setCurrentStreak] = useState(12)
  const currentStreak = 12
  // const [dailyPuzzlesSolved, setDailyPuzzlesSolved] = useState(1)
  const dailyPuzzlesSolved = 1
  // const [chessTokens, setChessTokens] = useState(2450)
  const chessTokens = 2450
  const [activeTab, setActiveTab] = useState("puzzles")

  useEffect(() => {
    setIsLoaded(true)
  }, [])

  const streakMilestones = [
    { days: 7, reward: "+2 puzzles/day NFT", icon: "🎯", unlocked: currentStreak >= 7 },
    { days: 30, reward: "+5 puzzles/day NFT", icon: "🏆", unlocked: currentStreak >= 30 },
    { days: 90, reward: "Pro Insights NFT", icon: "👑", unlocked: false },
  ]

  return (
    <div
      className={`min-h-screen bg-slate-900 relative transition-all duration-1000 ${isLoaded ? "opacity-100 blur-0" : "opacity-0 blur-sm"}`}
      style={{
        backgroundImage: `radial-gradient(circle, rgba(255,255,255,0.1) 1px, transparent 1px)`,
        backgroundSize: "20px 20px",
      }}
    >
      <div className="relative z-10 container mx-auto px-4 py-6 max-w-7xl">
        {/* Header */}
        <div className="mb-8 text-center">
          <div className="inline-flex items-center gap-3 mb-4 p-4 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20">
            <div className="text-4xl">👑</div>
            <div>
              <h1 className="text-3xl font-bold text-white">Check&apos;0Chess</h1>
              <p className="text-purple-200 text-sm">Solve • Stake • Earn</p>
            </div>
          </div>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <Card className="bg-white/10 backdrop-blur-md border-white/20 hover:bg-white/15 transition-all duration-300 hover:scale-105">
            <CardContent className="p-4 text-center">
              <div className="text-2xl mb-2">🔥</div>
              <div className="text-2xl font-bold text-white">{currentStreak}</div>
              <div className="text-xs text-purple-200">Day Streak</div>
            </CardContent>
          </Card>

          <Card className="bg-white/10 backdrop-blur-md border-white/20 hover:bg-white/15 transition-all duration-300 hover:scale-105">
            <CardContent className="p-4 text-center">
              <div className="text-2xl mb-2">🪙</div>
              <div className="text-2xl font-bold text-amber-400">{chessTokens.toLocaleString()}</div>
              <div className="text-xs text-purple-200">$CHESS</div>
            </CardContent>
          </Card>

          <Card className="bg-white/10 backdrop-blur-md border-white/20 hover:bg-white/15 transition-all duration-300 hover:scale-105">
            <CardContent className="p-4 text-center">
              <div className="text-2xl mb-2">🎯</div>
              <div className="text-2xl font-bold text-green-400">{dailyPuzzlesSolved}/3</div>
              <div className="text-xs text-purple-200">Daily Free</div>
            </CardContent>
          </Card>

          <Card className="bg-white/10 backdrop-blur-md border-white/20 hover:bg-white/15 transition-all duration-300 hover:scale-105">
            <CardContent className="p-4 text-center">
              <div className="text-2xl mb-2">🏆</div>
              <div className="text-2xl font-bold text-blue-400">#47</div>
              <div className="text-xs text-purple-200">Global Rank</div>
            </CardContent>
          </Card>
        </div>

        {/* Main Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-4 bg-white/10 backdrop-blur-md border-white/20 rounded-2xl p-1">
            <TabsTrigger
              value="puzzles"
              className="rounded-xl data-[state=active]:bg-white/20 data-[state=active]:text-white text-purple-200"
            >
              <Target className="w-4 h-4 mr-2" />
              Puzzles
            </TabsTrigger>
            <TabsTrigger
              value="tournaments"
              className="rounded-xl data-[state=active]:bg-white/20 data-[state=active]:text-white text-purple-200"
            >
              <Trophy className="w-4 h-4 mr-2" />
              Tournaments
            </TabsTrigger>
            <TabsTrigger
              value="leaderboard"
              className="rounded-xl data-[state=active]:bg-white/20 data-[state=active]:text-white text-purple-200"
            >
              <Crown className="w-4 h-4 mr-2" />
              Leaderboard
            </TabsTrigger>
            <TabsTrigger
              value="insights"
              className="rounded-xl data-[state=active]:bg-white/20 data-[state=active]:text-white text-purple-200"
            >
              <BarChart3 className="w-4 h-4 mr-2" />
              Insights
            </TabsTrigger>
          </TabsList>

          <TabsContent value="puzzles" className="mt-6">
            <div className="grid lg:grid-cols-3 gap-6">
              {/* Chess Board */}
              <div className="lg:col-span-2">
                <ChessBoard />
              </div>

              {/* Puzzle Info & Actions */}
              <div className="space-y-6">
                {/* Daily Puzzles */}
                <Card className="bg-white/10 backdrop-blur-md border-white/20">
                  <CardHeader>
                    <CardTitle className="text-white flex items-center gap-2">
                      <Calendar className="w-5 h-5" />
                      Daily Puzzles
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-purple-200">Free puzzles today</span>
                      <Badge variant="secondary" className="bg-green-500/20 text-green-300">
                        {3 - dailyPuzzlesSolved} remaining
                      </Badge>
                    </div>
                    <Progress value={(dailyPuzzlesSolved / 3) * 100} className="h-2" />

                    <Button
                      className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white rounded-xl"
                      disabled={dailyPuzzlesSolved >= 3}
                    >
                      {dailyPuzzlesSolved >= 3 ? "Daily Limit Reached" : "Solve Next Puzzle"}
                    </Button>

                    <div className="border-t border-white/20 pt-4">
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-purple-200">Extra puzzles</span>
                        <span className="text-amber-400 font-semibold">100 $CHESS each</span>
                      </div>
                      <Button
                        variant="outline"
                        className="w-full border-amber-400/50 text-amber-400 hover:bg-amber-400/10 rounded-xl bg-transparent"
                      >
                        <Coins className="w-4 h-4 mr-2" />
                        Buy Extra Puzzle
                      </Button>
                    </div>
                  </CardContent>
                </Card>

                {/* Streak Rewards */}
                <Card className="bg-white/10 backdrop-blur-md border-white/20">
                  <CardHeader>
                    <CardTitle className="text-white flex items-center gap-2">
                      <Flame className="w-5 h-5 text-orange-400" />
                      Streak Rewards
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    {streakMilestones.map((milestone, index) => (
                      <div
                        key={index}
                        className={`p-3 rounded-xl border transition-all duration-300 ${
                          milestone.unlocked ? "bg-green-500/20 border-green-500/50" : "bg-white/5 border-white/20"
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <div className="text-2xl">{milestone.icon}</div>
                          <div className="flex-1">
                            <div className="text-white font-medium">{milestone.days} days</div>
                            <div className="text-xs text-purple-200">{milestone.reward}</div>
                          </div>
                          {milestone.unlocked && <Badge className="bg-green-500 text-white">Unlocked</Badge>}
                        </div>
                      </div>
                    ))}
                  </CardContent>
                </Card>

                {/* Share Results */}
                <Card className="bg-white/10 backdrop-blur-md border-white/20">
                  <CardContent className="p-4">
                    <Button className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-xl">
                      <Share2 className="w-4 h-4 mr-2" />
                      Share on Farcaster
                    </Button>
                    <p className="text-xs text-purple-200 text-center mt-2">Earn bonus points for sharing!</p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="tournaments" className="mt-6">
            <TournamentSection />
          </TabsContent>

          <TabsContent value="leaderboard" className="mt-6">
            <Leaderboard />
          </TabsContent>

          <TabsContent value="insights" className="mt-6">
            <ProInsights />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
