"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
  Crown,
  Trophy,
  Flame,
  Coins,
  Target,
  BarChart3,
  Calendar,
  Play,
  ArrowLeft,
  Home,
} from "lucide-react";
import ChessBoard from "@/components/chess-board";
import Leaderboard from "@/components/leaderboard";
import TournamentSection from "@/components/tournament-section";
import ProInsights from "@/components/pro-insights";
import Image from "next/image";

export default function ChessPuzzleApp() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [currentScreen, setCurrentScreen] = useState("home");
  const currentStreak = 12;
  const dailyPuzzlesSolved = 1;
  const chessTokens = 2450;

  const userData = {
    username: "DevDanny",
    avatar:
      "https://pbs.twimg.com/profile_images/1741411753404084224/yLULBONw_400x400.jpg",
    walletAddress: "0x7085...48ed",
    rank: 47,
    rating: 1650,
  };

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  const streakMilestones = [
    {
      days: 7,
      reward: "+2 puzzles/day NFT",
      icon: "🎯",
      unlocked: currentStreak >= 7,
    },
    {
      days: 30,
      reward: "+5 puzzles/day NFT",
      icon: "🏆",
      unlocked: currentStreak >= 30,
    },
    { days: 90, reward: "Pro Insights NFT", icon: "👑", unlocked: false },
  ];

  const navigateToScreen = (screen: string) => {
    setCurrentScreen(screen);
  };

  const HomeScreen = () => (
    <div className="space-y-8">
      {/* Personalized Header Card */}
      <Card className="bg-gradient-to-r from-purple-500/20 to-blue-500/20 backdrop-blur-md border-purple-500/30">
        <CardContent className="p-6">
          <div className="flex items-center gap-4 mb-6">
            <Image
              src={userData.avatar || "/placeholder.svg"}
              alt="Profile"
              width={64}
              height={64}
              quality={100}
              className="w-16 h-16 rounded-full border-2 border-white/20"
            />
            <div className="flex-1">
              <h2 className="text-2xl font-bold text-white">
                {userData.username}
              </h2>
              {/* <p className="text-purple-200">
                Connected: {userData.walletAddress}
              </p> */}
              <div className="flex items-center gap-4 mt-2">
                <Badge className="bg-blue-500/20 text-blue-300">
                  #{userData.rank} Global
                </Badge>
                <Badge className="bg-green-500/20 text-green-300">
                  {userData.rating} Rating
                </Badge>
              </div>
            </div>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            <div className="text-center p-3 bg-white/10 rounded-xl">
              <div className="text-2xl mb-1">🔥</div>
              <div className="text-xl font-bold text-white">
                {currentStreak}
              </div>
              <div className="text-xs text-purple-200">Day Streak</div>
            </div>
            <div className="text-center p-3 bg-white/10 rounded-xl">
              <div className="text-2xl mb-1">🪙</div>
              <div className="text-xl font-bold text-amber-400">
                {chessTokens.toLocaleString()}
              </div>
              <div className="text-xs text-purple-200">$CHESS</div>
            </div>
            <div className="text-center p-3 bg-white/10 rounded-xl">
              <div className="text-2xl mb-1">🎯</div>
              <div className="text-xl font-bold text-green-400">
                {dailyPuzzlesSolved}/3
              </div>
              <div className="text-xs text-purple-200">Daily Free</div>
            </div>
            <div className="text-center p-3 bg-white/10 rounded-xl">
              <div className="text-2xl mb-1">🏆</div>
              <div className="text-xl font-bold text-blue-400">
                #{userData.rank}
              </div>
              <div className="text-xs text-purple-200">Global Rank</div>
            </div>
          </div>

          {/* Call to Action */}
          <Button
            onClick={() => navigateToScreen("puzzles")}
            className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white rounded-xl text-lg py-6"
          >
            <Play className="w-6 h-6 mr-3" />
            Solve Puzzles
          </Button>
        </CardContent>
      </Card>

      {/* Quick Stats */}
      <div className="grid md:grid-cols-2 gap-6">
        <Card className="bg-white/10 backdrop-blur-md border-white/20">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <Flame className="w-5 h-5 text-orange-400" />
              Streak Progress
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {streakMilestones.map((milestone, index) => (
              <div
                key={index}
                className={`p-3 rounded-xl border transition-all duration-300 ${
                  milestone.unlocked
                    ? "bg-green-500/20 border-green-500/50"
                    : "bg-white/5 border-white/20"
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className="text-2xl">{milestone.icon}</div>
                  <div className="flex-1">
                    <div className="text-white font-medium">
                      {milestone.days} days
                    </div>
                    <div className="text-xs text-purple-200">
                      {milestone.reward}
                    </div>
                  </div>
                  {milestone.unlocked && (
                    <Badge className="bg-green-500 text-white">Unlocked</Badge>
                  )}
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card className="bg-white/10 backdrop-blur-md border-white/20 mb-[6rem]">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <Calendar className="w-5 h-5" />
              Today&apos;s Progress
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-purple-200">Free puzzles</span>
              <Badge
                variant="secondary"
                className="bg-green-500/20 text-green-300"
              >
                {3 - dailyPuzzlesSolved} remaining
              </Badge>
            </div>
            <Progress value={(dailyPuzzlesSolved / 3) * 100} className="h-3" />

            <div className="border-t border-white/20 pt-4">
              <Button
                variant="outline"
                className="w-full border-amber-400/50 text-amber-400 hover:bg-amber-400/10 rounded-xl bg-transparent"
              >
                <Coins className="w-4 h-4 mr-2" />
                Buy Extra Puzzles (100 $CHESS)
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );

  const PuzzleScreen = () => (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Button
          onClick={() => navigateToScreen("home")}
          variant="outline"
          className="border-white/20 text-purple-200 hover:bg-white/10 rounded-xl bg-transparent"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back
        </Button>
        <h2 className="text-2xl font-bold text-white">Solve Puzzle</h2>
      </div>

      {/* Full-width chess board */}
      <div className="max-w-4xl mx-auto">
        <ChessBoard />
      </div>
    </div>
  );

  const renderScreen = () => {
    switch (currentScreen) {
      case "home":
        return <HomeScreen />;
      case "puzzles":
        return <PuzzleScreen />;
      case "tournaments":
        return (
          <div className="space-y-6">
            <div className="flex items-center gap-4">
              <Button
                onClick={() => navigateToScreen("home")}
                variant="outline"
                className="border-white/20 text-purple-200 hover:bg-white/10 rounded-xl bg-transparent"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back
              </Button>
              <h2 className="text-2xl font-bold text-white">Tournaments</h2>
            </div>
            <TournamentSection />
          </div>
        );
      case "leaderboard":
        return (
          <div className="space-y-6">
            <div className="flex items-center gap-4">
              <Button
                onClick={() => navigateToScreen("home")}
                variant="outline"
                className="border-white/20 text-purple-200 hover:bg-white/10 rounded-xl bg-transparent"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back
              </Button>
              <h2 className="text-2xl font-bold text-white">Leaderboard</h2>
            </div>
            <Leaderboard />
          </div>
        );
      case "insights":
        return (
          <div className="space-y-6">
            <div className="flex items-center gap-4">
              <Button
                onClick={() => navigateToScreen("home")}
                variant="outline"
                className="border-white/20 text-purple-200 hover:bg-white/10 rounded-xl bg-transparent"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back
              </Button>
              <h2 className="text-2xl font-bold text-white">Pro Insights</h2>
            </div>
            <ProInsights />
          </div>
        );
      default:
        return <HomeScreen />;
    }
  };

  return (
    <div
      className={`min-h-screen bg-slate-900 relative transition-all duration-1000 ${
        isLoaded ? "opacity-100 blur-0" : "opacity-0 blur-sm"
      }`}
      style={{
        backgroundImage: `radial-gradient(circle, rgba(255,255,255,0.1) 1px, transparent 1px)`,
        backgroundSize: "20px 20px",
      }}
    >
      <div className="relative z-10 container mx-auto px-4 py-6 max-w-7xl">
        {/* Header - only show on home screen */}
        {currentScreen === "home" && (
          <div className="mb-8 text-center">
            <div className="inline-flex items-center gap-3 mb-4 p-4 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20">
              <div className="text-4xl">👑</div>
              <div>
                <h1 className="text-3xl font-bold text-white">
                  Check&apos;0Chess
                </h1>
                <p className="text-purple-200 text-sm">Solve • Stake • Earn</p>
              </div>
            </div>
          </div>
        )}

        {/* Main Content */}
        {renderScreen()}

        {/* Bottom Navigation - Always visible across all screens */}
        <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 z-50 w-full max-w-lg px-4">
          <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-2">
            <div className="flex gap-1 justify-between">
              <Button
                onClick={() => navigateToScreen("home")}
                className={`flex-1 min-w-0 rounded-xl flex flex-col items-center h-14 text-xs sm:text-sm ${
                  currentScreen === "home"
                    ? "bg-gradient-to-r from-purple-600 to-blue-600 text-white"
                    : "border-white/20 text-purple-200 hover:bg-white/10 bg-transparent"
                }`}
              >
                <Home className="w-4 h-4 mb-1" />
                <p className="text-[0.6rem]">Home</p>
              </Button>
              <Button
                onClick={() => navigateToScreen("puzzles")}
                className={`flex-1 min-w-0 rounded-xl flex flex-col items-center h-14 text-xs sm:text-sm ${
                  currentScreen === "puzzles"
                    ? "bg-gradient-to-r from-purple-600 to-blue-600 text-white"
                    : "border-white/20 text-purple-200 hover:bg-white/10 bg-transparent"
                }`}
              >
                <Target className="w-4 h-4 mb-1" />
                <p className="text-[0.6rem]">Puzzles</p>
              </Button>
              <Button
                onClick={() => navigateToScreen("tournaments")}
                className={`flex-1 min-w-0 rounded-xl flex flex-col items-center h-14 text-xs sm:text-sm ${
                  currentScreen === "tournaments"
                    ? "bg-gradient-to-r from-purple-600 to-blue-600 text-white"
                    : "border-white/20 text-purple-200 hover:bg-white/10 bg-transparent"
                }`}
              >
                <Trophy className="w-4 h-4 mb-1" />
                <p className="text-[0.6rem]">Tournaments</p>
              </Button>
              <Button
                onClick={() => navigateToScreen("leaderboard")}
                className={`flex-1 min-w-0 rounded-xl flex flex-col items-center h-14 text-xs sm:text-sm ${
                  currentScreen === "leaderboard"
                    ? "bg-gradient-to-r from-purple-600 to-blue-600 text-white"
                    : "border-white/20 text-purple-200 hover:bg-white/10 bg-transparent"
                }`}
              >
                <Crown className="w-4 h-4 mb-1" />
                <p className="text-[0.6rem]">Leaderboard</p>
              </Button>
              <Button
                onClick={() => navigateToScreen("insights")}
                className={`flex-1 min-w-0 rounded-xl flex flex-col items-center h-14 text-xs sm:text-sm ${
                  currentScreen === "insights"
                    ? "bg-gradient-to-r from-purple-600 to-blue-600 text-white"
                    : "border-white/20 text-purple-200 hover:bg-white/10 bg-transparent"
                }`}
              >
                <BarChart3 className="w-4 h-4 mb-1" />
                <p className="text-[0.6rem]">Insights</p>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
