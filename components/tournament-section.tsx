"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Trophy, Users, Clock, Coins, Zap, Target, Crown } from "lucide-react"

export default function TournamentSection() {
  const [activeTab, setActiveTab] = useState("weekly")

  const weeklyTournaments = [
    {
      id: 1,
      name: "Tactical Combinations",
      type: "Mixed Themes",
      entryFee: 500,
      prizePool: 15000,
      participants: 127,
      maxParticipants: 200,
      timeLeft: "2d 14h",
      status: "open",
      difficulty: "Expert",
      themes: ["fork", "pin", "skewer"],
    },
    {
      id: 2,
      name: "Mate in 2-3 Masters",
      type: "Checkmate Puzzles",
      entryFee: 300,
      prizePool: 8500,
      participants: 89,
      maxParticipants: 150,
      timeLeft: "5d 8h",
      status: "open",
      difficulty: "Advanced",
      themes: ["mateIn2", "mateIn3", "sacrifice"],
    },
    {
      id: 3,
      name: "Endgame Excellence",
      type: "Endgame Focus",
      entryFee: 750,
      prizePool: 22000,
      participants: 156,
      maxParticipants: 200,
      timeLeft: "1d 3h",
      status: "filling",
      difficulty: "Master",
      themes: ["endgame", "promotion", "zugzwang"],
    },
  ]

  const customContests = [
    {
      id: 1,
      name: "Friends Only Battle",
      creator: "ChessMaster2024",
      entryFee: 100,
      prizePool: 2000,
      participants: 8,
      maxParticipants: 16,
      type: "Private",
      timeLeft: "12h 30m",
    },
    {
      id: 2,
      name: "Beginner's Luck",
      creator: "PuzzleQueen",
      entryFee: 50,
      prizePool: 800,
      participants: 12,
      maxParticipants: 20,
      type: "Open",
      timeLeft: "1d 18h",
    },
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case "open":
        return "bg-green-500/20 text-green-300"
      case "filling":
        return "bg-yellow-500/20 text-yellow-300"
      case "closed":
        return "bg-red-500/20 text-red-300"
      default:
        return "bg-gray-500/20 text-gray-300"
    }
  }

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "Master":
        return "bg-purple-500/20 text-purple-300"
      case "Expert":
        return "bg-blue-500/20 text-blue-300"
      case "Advanced":
        return "bg-green-500/20 text-green-300"
      case "Intermediate":
        return "bg-yellow-500/20 text-yellow-300"
      default:
        return "bg-gray-500/20 text-gray-300"
    }
  }

  return (
    <div className="space-y-6">
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-2 bg-white/10 backdrop-blur-md border-white/20 rounded-2xl p-1">
          <TabsTrigger
            value="weekly"
            className="rounded-xl data-[state=active]:bg-white/20 data-[state=active]:text-white text-purple-200"
          >
            <Trophy className="w-4 h-4 mr-2" />
            Weekly Tournaments
          </TabsTrigger>
          <TabsTrigger
            value="custom"
            className="rounded-xl data-[state=active]:bg-white/20 data-[state=active]:text-white text-purple-200"
          >
            <Users className="w-4 h-4 mr-2" />
            Custom Contests
          </TabsTrigger>
        </TabsList>

        <TabsContent value="weekly" className="mt-6">
          <div className="grid gap-6">
            {/* Tournament Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card className="bg-white/10 backdrop-blur-md border-white/20">
                <CardContent className="p-4 text-center">
                  <div className="text-3xl mb-2">🏆</div>
                  <div className="text-2xl font-bold text-amber-400">45,500</div>
                  <div className="text-xs text-purple-200">Total Prize Pool</div>
                </CardContent>
              </Card>

              <Card className="bg-white/10 backdrop-blur-md border-white/20">
                <CardContent className="p-4 text-center">
                  <div className="text-3xl mb-2">👥</div>
                  <div className="text-2xl font-bold text-blue-400">372</div>
                  <div className="text-xs text-purple-200">Active Players</div>
                </CardContent>
              </Card>

              <Card className="bg-white/10 backdrop-blur-md border-white/20">
                <CardContent className="p-4 text-center">
                  <div className="text-3xl mb-2">⚡</div>
                  <div className="text-2xl font-bold text-green-400">3</div>
                  <div className="text-xs text-purple-200">Live Tournaments</div>
                </CardContent>
              </Card>
            </div>

            {/* Tournament List */}
            <div className="space-y-4">
              {weeklyTournaments.map((tournament) => (
                <Card
                  key={tournament.id}
                  className="bg-white/10 backdrop-blur-md border-white/20 hover:bg-white/15 transition-all duration-300"
                >
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle className="text-white flex items-center gap-2">
                          <Trophy className="w-5 h-5 text-amber-400" />
                          {tournament.name}
                        </CardTitle>
                        {tournament.themes && (
                          <div className="flex gap-1 flex-wrap mt-1">
                            {tournament.themes.map((theme, index) => (
                              <Badge key={index} className="bg-purple-500/20 text-purple-300 text-xs">
                                {theme}
                              </Badge>
                            ))}
                          </div>
                        )}
                        <p className="text-purple-200 text-sm mt-1">{tournament.type}</p>
                      </div>
                      <div className="flex gap-2">
                        <Badge className={getStatusColor(tournament.status)}>{tournament.status}</Badge>
                        <Badge className={getDifficultyColor(tournament.difficulty)}>{tournament.difficulty}</Badge>
                      </div>
                    </div>
                  </CardHeader>

                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                      <div className="flex items-center gap-2">
                        <Coins className="w-4 h-4 text-amber-400" />
                        <div>
                          <div className="text-white font-semibold">{tournament.entryFee} $CHESS</div>
                          <div className="text-purple-200 text-xs">Entry Fee</div>
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        <Crown className="w-4 h-4 text-purple-400" />
                        <div>
                          <div className="text-white font-semibold">{tournament.prizePool.toLocaleString()} $CHESS</div>
                          <div className="text-purple-200 text-xs">Prize Pool</div>
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        <Users className="w-4 h-4 text-blue-400" />
                        <div>
                          <div className="text-white font-semibold">
                            {tournament.participants}/{tournament.maxParticipants}
                          </div>
                          <div className="text-purple-200 text-xs">Players</div>
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        <Clock className="w-4 h-4 text-green-400" />
                        <div>
                          <div className="text-white font-semibold">{tournament.timeLeft}</div>
                          <div className="text-purple-200 text-xs">Time Left</div>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-purple-200">Registration Progress</span>
                        <span className="text-white">
                          {Math.round((tournament.participants / tournament.maxParticipants) * 100)}%
                        </span>
                      </div>
                      <Progress value={(tournament.participants / tournament.maxParticipants) * 100} className="h-2" />
                    </div>

                    <div className="flex gap-3">
                      <Button className="flex-1 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white rounded-xl">
                        <Zap className="w-4 h-4 mr-2" />
                        Join Tournament
                      </Button>
                      <Button
                        variant="outline"
                        className="border-white/20 text-purple-200 hover:bg-white/10 rounded-xl bg-transparent"
                      >
                        View Details
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </TabsContent>

        <TabsContent value="custom" className="mt-6">
          <div className="space-y-6">
            {/* Create Contest Button */}
            <Card className="bg-gradient-to-r from-purple-500/20 to-blue-500/20 backdrop-blur-md border-purple-500/30">
              <CardContent className="p-6 text-center">
                <div className="text-4xl mb-4">🎯</div>
                <h3 className="text-xl font-bold text-white mb-2">Create Your Own Contest</h3>
                <p className="text-purple-200 mb-4">Set up a custom tournament with your own rules and prize pool</p>
                <Button className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white rounded-xl">
                  <Target className="w-4 h-4 mr-2" />
                  Create Contest
                </Button>
              </CardContent>
            </Card>

            {/* Custom Contests List */}
            <div className="space-y-4">
              {customContests.map((contest) => (
                <Card
                  key={contest.id}
                  className="bg-white/10 backdrop-blur-md border-white/20 hover:bg-white/15 transition-all duration-300"
                >
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle className="text-white flex items-center gap-2">
                          <Users className="w-5 h-5 text-blue-400" />
                          {contest.name}
                        </CardTitle>
                        <p className="text-purple-200 text-sm mt-1">Created by {contest.creator}</p>
                      </div>
                      <Badge
                        className={
                          contest.type === "Private"
                            ? "bg-orange-500/20 text-orange-300"
                            : "bg-green-500/20 text-green-300"
                        }
                      >
                        {contest.type}
                      </Badge>
                    </div>
                  </CardHeader>

                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                      <div className="flex items-center gap-2">
                        <Coins className="w-4 h-4 text-amber-400" />
                        <div>
                          <div className="text-white font-semibold">{contest.entryFee} $CHESS</div>
                          <div className="text-purple-200 text-xs">Entry Fee</div>
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        <Crown className="w-4 h-4 text-purple-400" />
                        <div>
                          <div className="text-white font-semibold">{contest.prizePool} $CHESS</div>
                          <div className="text-purple-200 text-xs">Prize Pool</div>
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        <Users className="w-4 h-4 text-blue-400" />
                        <div>
                          <div className="text-white font-semibold">
                            {contest.participants}/{contest.maxParticipants}
                          </div>
                          <div className="text-purple-200 text-xs">Players</div>
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        <Clock className="w-4 h-4 text-green-400" />
                        <div>
                          <div className="text-white font-semibold">{contest.timeLeft}</div>
                          <div className="text-purple-200 text-xs">Starts In</div>
                        </div>
                      </div>
                    </div>

                    <Button className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-xl">
                      Join Contest
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}

