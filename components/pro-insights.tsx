"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { BarChart3, TrendingUp, Target, Clock, Brain, Zap, Lock, Crown } from "lucide-react"

export default function ProInsights() {
  const [hasProAccess, setHasProAccess] = useState(false)

  const performanceData = {
    averageSolveTime: "2:34",
    accuracy: 87,
    streakBest: 45,
    totalPuzzlesSolved: 1247,
    weeklyImprovement: 12,
    strongestCategory: "Tactics",
    weakestCategory: "Endgames",
  }

  // const heatmapData = [
  //   { day: "Mon", hour: "6AM", intensity: 20 },
  //   { day: "Mon", hour: "12PM", intensity: 60 },
  //   { day: "Mon", hour: "6PM", intensity: 90 },
  //   { day: "Tue", hour: "6AM", intensity: 30 },
  //   { day: "Tue", hour: "12PM", intensity: 70 },
  //   { day: "Tue", hour: "6PM", intensity: 85 },
  //   // ... more data points
  // ]

  const errorPatterns = [
    { type: "Time Pressure", frequency: 34, trend: "increasing" },
    { type: "Calculation Errors", frequency: 28, trend: "stable" },
    { type: "Pattern Recognition", frequency: 22, trend: "decreasing" },
    { type: "Tactical Oversight", frequency: 16, trend: "decreasing" },
  ]

  if (!hasProAccess) {
    return (
      <div className="space-y-6 mb-[6rem]">
        {/* Pro Access Locked */}
        <Card className="bg-gradient-to-r from-purple-500/20 to-amber-500/20 backdrop-blur-md border-purple-500/30">
          <CardContent className="p-8 text-center">
            <div className="text-6xl mb-4">🔒</div>
            <h3 className="text-2xl font-bold text-white mb-4">Pro Insights Locked</h3>
            <p className="text-purple-200 mb-6 max-w-md mx-auto">
              Unlock advanced analytics, heatmaps, and personalized insights to take your chess puzzle solving to the
              next level.
            </p>

            <div className="grid md:grid-cols-2 gap-4 mb-6">
              <div className="p-4 bg-white/10 rounded-xl border border-white/20">
                <Crown className="w-8 h-8 text-amber-400 mx-auto mb-2" />
                <h4 className="font-semibold text-white mb-2">30-Day Streak NFT</h4>
                <p className="text-sm text-purple-200">
                  Maintain a 30-day solving streak to unlock Pro Insights permanently
                </p>
              </div>

              <div className="p-4 bg-white/10 rounded-xl border border-white/20">
                <Zap className="w-8 h-8 text-blue-400 mx-auto mb-2" />
                <h4 className="font-semibold text-white mb-2">$CHESS Purchase</h4>
                <p className="text-sm text-purple-200">
                  Buy 1000+ $CHESS tokens in the last 30 days for instant access
                </p>
              </div>
            </div>

            <div className="flex gap-3 justify-center">
              <Button className="bg-gradient-to-r from-purple-600 to-amber-600 hover:from-purple-700 hover:to-amber-700 text-white rounded-xl">
                <Crown className="w-4 h-4 mr-2" />
                Buy $CHESS Tokens
              </Button>
              <Button
                variant="outline"
                className="border-purple-400/50 text-purple-300 hover:bg-purple-400/10 rounded-xl bg-transparent"
                onClick={() => setHasProAccess(true)}
              >
                Preview (Demo)
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Feature Preview */}
        <div className="grid md:grid-cols-3 gap-4">
          <Card className="bg-white/5 backdrop-blur-md border-white/10 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-transparent to-black/50 z-10"></div>
            <div className="absolute top-2 right-2 z-20">
              <Lock className="w-5 h-5 text-white" />
            </div>
            <CardContent className="p-6 relative z-10">
              <div className="text-2xl mb-3">📊</div>
              <h4 className="font-semibold text-white mb-2">Puzzle Theme Analysis</h4>
              <p className="text-sm text-purple-200">
                Track your performance across different puzzle themes from Lichess database
              </p>
            </CardContent>
          </Card>

          <Card className="bg-white/5 backdrop-blur-md border-white/10 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-transparent to-black/50 z-10"></div>
            <div className="absolute top-2 right-2 z-20">
              <Lock className="w-5 h-5 text-white" />
            </div>
            <CardContent className="p-6 relative z-10">
              <div className="text-2xl mb-3">🧠</div>
              <h4 className="font-semibold text-white mb-2">Opening-Based Puzzles</h4>
              <p className="text-sm text-purple-200">Analyze puzzles by chess opening to improve your repertoire</p>
            </CardContent>
          </Card>

          <Card className="bg-white/5 backdrop-blur-md border-white/10 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-transparent to-black/50 z-10"></div>
            <div className="absolute top-2 right-2 z-20">
              <Lock className="w-5 h-5 text-white" />
            </div>
            <CardContent className="p-6 relative z-10">
              <div className="text-2xl mb-3">📈</div>
              <h4 className="font-semibold text-white mb-2">Rating Progression</h4>
              <p className="text-sm text-purple-200">Track your puzzle rating using Glicko2 system like Lichess</p>
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Pro Badge */}
      <div className="flex justify-center">
        <Badge className="bg-gradient-to-r from-purple-500 to-amber-500 text-white px-4 py-2 text-lg">
          <Crown className="w-5 h-5 mr-2" />
          Pro Insights Unlocked
        </Badge>
      </div>

      <Tabs defaultValue="overview" className="w-full">
        <TabsList className="grid w-full grid-cols-4 bg-white/10 backdrop-blur-md border-white/20 rounded-2xl p-1">
          <TabsTrigger
            value="overview"
            className="rounded-xl data-[state=active]:bg-white/20 data-[state=active]:text-white text-purple-200"
          >
            <BarChart3 className="w-4 h-4 mr-2" />
            Overview
          </TabsTrigger>
          <TabsTrigger
            value="heatmap"
            className="rounded-xl data-[state=active]:bg-white/20 data-[state=active]:text-white text-purple-200"
          >
            <Target className="w-4 h-4 mr-2" />
            Heatmap
          </TabsTrigger>
          <TabsTrigger
            value="errors"
            className="rounded-xl data-[state=active]:bg-white/20 data-[state=active]:text-white text-purple-200"
          >
            <Brain className="w-4 h-4 mr-2" />
            Errors
          </TabsTrigger>
          <TabsTrigger
            value="trends"
            className="rounded-xl data-[state=active]:bg-white/20 data-[state=active]:text-white text-purple-200"
          >
            <TrendingUp className="w-4 h-4 mr-2" />
            Trends
          </TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="mt-6">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Performance Stats */}
            <Card className="bg-white/10 backdrop-blur-md border-white/20">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <Clock className="w-5 h-5 text-blue-400" />
                  Solve Time
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-blue-400 mb-2">{performanceData.averageSolveTime}</div>
                <p className="text-purple-200 text-sm">Average per puzzle</p>
                <div className="mt-4 p-3 bg-blue-500/10 rounded-lg">
                  <p className="text-xs text-blue-300">12% faster than last month</p>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white/10 backdrop-blur-md border-white/20">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <Target className="w-5 h-5 text-green-400" />
                  Accuracy
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-green-400 mb-2">{performanceData.accuracy}%</div>
                <p className="text-purple-200 text-sm">Success rate</p>
                <Progress value={performanceData.accuracy} className="mt-4 h-2" />
              </CardContent>
            </Card>

            <Card className="bg-white/10 backdrop-blur-md border-white/20">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <TrendingUp className="w-5 h-5 text-purple-400" />
                  Best Streak
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-purple-400 mb-2">{performanceData.streakBest}</div>
                <p className="text-purple-200 text-sm">Days in a row</p>
                <div className="mt-4 p-3 bg-purple-500/10 rounded-lg">
                  <p className="text-xs text-purple-300">Personal record!</p>
                </div>
              </CardContent>
            </Card>

            {/* Category Performance */}
            <Card className="bg-white/10 backdrop-blur-md border-white/20 md:col-span-2 lg:col-span-3">
              <CardHeader>
                <CardTitle className="text-white">Category Performance</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="text-green-400 font-semibold mb-3 flex items-center gap-2">
                      <div className="w-3 h-3 bg-green-400 rounded-full"></div>
                      Strongest: {performanceData.strongestCategory}
                    </h4>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-purple-200">Success Rate</span>
                        <span className="text-white">94%</span>
                      </div>
                      <Progress value={94} className="h-2" />
                      <div className="flex justify-between">
                        <span className="text-purple-200">Avg. Time</span>
                        <span className="text-white">1:45</span>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h4 className="text-orange-400 font-semibold mb-3 flex items-center gap-2">
                      <div className="w-3 h-3 bg-orange-400 rounded-full"></div>
                      Focus Area: {performanceData.weakestCategory}
                    </h4>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-purple-200">Success Rate</span>
                        <span className="text-white">73%</span>
                      </div>
                      <Progress value={73} className="h-2" />
                      <div className="flex justify-between">
                        <span className="text-purple-200">Avg. Time</span>
                        <span className="text-white">3:22</span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white/10 backdrop-blur-md border-white/20 md:col-span-2 lg:col-span-3">
              <CardHeader>
                <CardTitle className="text-white">Lichess Theme Performance</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-3 gap-4">
                  <div className="p-3 bg-green-500/10 rounded-xl border border-green-500/20">
                    <h4 className="text-green-400 font-semibold mb-2">🎯 Best Themes</h4>
                    <div className="space-y-1 text-sm">
                      <div className="flex justify-between">
                        <span className="text-purple-200">Fork</span>
                        <span className="text-white">94%</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-purple-200">Pin</span>
                        <span className="text-white">91%</span>
                      </div>
                    </div>
                  </div>

                  <div className="p-3 bg-orange-500/10 rounded-xl border border-orange-500/20">
                    <h4 className="text-orange-400 font-semibold mb-2">⚡ Improving</h4>
                    <div className="space-y-1 text-sm">
                      <div className="flex justify-between">
                        <span className="text-purple-200">Sacrifice</span>
                        <span className="text-white">78%</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-purple-200">Deflection</span>
                        <span className="text-white">82%</span>
                      </div>
                    </div>
                  </div>

                  <div className="p-3 bg-red-500/10 rounded-xl border border-red-500/20">
                    <h4 className="text-red-400 font-semibold mb-2">📚 Focus Areas</h4>
                    <div className="space-y-1 text-sm">
                      <div className="flex justify-between">
                        <span className="text-purple-200">Zugzwang</span>
                        <span className="text-white">65%</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-purple-200">Underpromotion</span>
                        <span className="text-white">71%</span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="heatmap" className="mt-6">
          <Card className="bg-white/10 backdrop-blur-md border-white/20">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Target className="w-5 h-5 text-purple-400" />
                Activity Heatmap
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="mb-6">
                <h4 className="text-white font-semibold mb-4">Peak Performance Times</h4>
                <div className="grid grid-cols-7 gap-2 mb-4">
                  {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((day) => (
                    <div key={day} className="text-center text-purple-200 text-sm font-medium">
                      {day}
                    </div>
                  ))}
                </div>

                <div className="grid grid-cols-7 gap-2">
                  {Array.from({ length: 7 }, (_, dayIndex) => (
                    <div key={dayIndex} className="space-y-1">
                      {Array.from({ length: 24 }, (_, hourIndex) => {
                        const intensity = Math.random() * 100
                        return (
                          <div
                            key={hourIndex}
                            className={`w-full h-3 rounded-sm transition-all duration-200 hover:scale-110 ${
                              intensity > 80
                                ? "bg-green-500"
                                : intensity > 60
                                  ? "bg-yellow-500"
                                  : intensity > 40
                                    ? "bg-orange-500"
                                    : intensity > 20
                                      ? "bg-red-500/50"
                                      : "bg-gray-500/20"
                            }`}
                            title={`${["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"][dayIndex]} ${hourIndex}:00 - ${Math.round(intensity)}% activity`}
                          />
                        )
                      })}
                    </div>
                  ))}
                </div>

                <div className="flex items-center justify-between mt-4 text-sm">
                  <span className="text-purple-200">Less active</span>
                  <div className="flex gap-1">
                    <div className="w-3 h-3 bg-gray-500/20 rounded-sm"></div>
                    <div className="w-3 h-3 bg-red-500/50 rounded-sm"></div>
                    <div className="w-3 h-3 bg-orange-500 rounded-sm"></div>
                    <div className="w-3 h-3 bg-yellow-500 rounded-sm"></div>
                    <div className="w-3 h-3 bg-green-500 rounded-sm"></div>
                  </div>
                  <span className="text-purple-200">More active</span>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div className="p-4 bg-green-500/10 rounded-xl border border-green-500/20">
                  <h5 className="text-green-400 font-semibold mb-2">🔥 Peak Hours</h5>
                  <p className="text-sm text-purple-200">6-8 PM weekdays show highest accuracy (91%)</p>
                </div>
                <div className="p-4 bg-blue-500/10 rounded-xl border border-blue-500/20">
                  <h5 className="text-blue-400 font-semibold mb-2">⚡ Best Days</h5>
                  <p className="text-sm text-purple-200">Tuesday & Thursday are your strongest days</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="errors" className="mt-6">
          <Card className="bg-white/10 backdrop-blur-md border-white/20">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Brain className="w-5 h-5 text-orange-400" />
                Error Pattern Analysis
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {errorPatterns.map((pattern, index) => (
                <div key={index} className="p-4 bg-white/5 rounded-xl border border-white/10">
                  <div className="flex justify-between items-center mb-3">
                    <h4 className="text-white font-semibold">{pattern.type}</h4>
                    <div className="flex items-center gap-2">
                      <Badge
                        className={
                          pattern.trend === "decreasing"
                            ? "bg-green-500/20 text-green-300"
                            : pattern.trend === "increasing"
                              ? "bg-red-500/20 text-red-300"
                              : "bg-gray-500/20 text-gray-300"
                        }
                      >
                        {pattern.trend === "decreasing" ? "↓" : pattern.trend === "increasing" ? "↑" : "→"}{" "}
                        {pattern.trend}
                      </Badge>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-purple-200">Frequency</span>
                      <span className="text-white">{pattern.frequency}%</span>
                    </div>
                    <Progress value={pattern.frequency} className="h-2" />
                  </div>

                  {pattern.type === "Time Pressure" && (
                    <div className="mt-3 p-3 bg-orange-500/10 rounded-lg">
                      <p className="text-xs text-orange-300">
                        💡 Tip: Try solving puzzles with unlimited time to improve pattern recognition
                      </p>
                    </div>
                  )}
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="trends" className="mt-6">
          <div className="grid gap-6">
            <Card className="bg-white/10 backdrop-blur-md border-white/20">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <TrendingUp className="w-5 h-5 text-green-400" />
                  Performance Trends
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-3 gap-4 mb-6">
                  <div className="text-center p-4 bg-green-500/10 rounded-xl border border-green-500/20">
                    <div className="text-2xl font-bold text-green-400">+12%</div>
                    <div className="text-sm text-purple-200">Weekly Improvement</div>
                  </div>
                  <div className="text-center p-4 bg-blue-500/10 rounded-xl border border-blue-500/20">
                    <div className="text-2xl font-bold text-blue-400">-23s</div>
                    <div className="text-sm text-purple-200">Avg. Time Reduction</div>
                  </div>
                  <div className="text-center p-4 bg-purple-500/10 rounded-xl border border-purple-500/20">
                    <div className="text-2xl font-bold text-purple-400">+5%</div>
                    <div className="text-sm text-purple-200">Accuracy Gain</div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="p-4 bg-white/5 rounded-xl">
                    <h4 className="text-white font-semibold mb-2">📈 Strongest Growth Areas</h4>
                    <ul className="space-y-2 text-sm text-purple-200">
                      <li>• Tactical combinations (+18% accuracy)</li>
                      <li>• Pin and fork patterns (+15% speed)</li>
                      <li>• Mate in 2 puzzles (+22% success rate)</li>
                    </ul>
                  </div>

                  <div className="p-4 bg-white/5 rounded-xl">
                    <h4 className="text-white font-semibold mb-2">🎯 Recommended Focus</h4>
                    <ul className="space-y-2 text-sm text-purple-200">
                      <li>• Endgame positions (current weakness)</li>
                      <li>• Complex tactical sequences</li>
                      <li>• Time management in blitz puzzles</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
