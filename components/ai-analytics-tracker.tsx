"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Brain, TrendingUp, Activity, Zap, Eye, BarChart3 } from "lucide-react"

interface AIAnalyticsTrackerProps {
  userRole: string
  onInsightsUpdate: (insights: any) => void
}

export function AIAnalyticsTracker({ userRole, onInsightsUpdate }: AIAnalyticsTrackerProps) {
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [lastAnalysis, setLastAnalysis] = useState<Date | null>(null)
  const [analysisProgress, setAnalysisProgress] = useState(0)
  const [autoAnalysisEnabled, setAutoAnalysisEnabled] = useState(true)
  const [insights, setInsights] = useState<any>(null)

  useEffect(() => {
    // Auto-run analysis for professional users
    if (userRole !== "parent" && userRole !== "guardian") {
      runInitialAnalysis()

      // Set up periodic analysis
      const interval = setInterval(() => {
        if (autoAnalysisEnabled) {
          runBackgroundAnalysis()
        }
      }, 30000) // Every 30 seconds

      return () => clearInterval(interval)
    }
  }, [userRole, autoAnalysisEnabled])

  const runInitialAnalysis = async () => {
    setIsAnalyzing(true)
    setAnalysisProgress(0)

    // Simulate AI analysis with progress
    const progressInterval = setInterval(() => {
      setAnalysisProgress((prev) => {
        if (prev >= 100) {
          clearInterval(progressInterval)
          return 100
        }
        return prev + Math.random() * 15
      })
    }, 200)

    // Simulate analysis completion
    setTimeout(() => {
      const newInsights = {
        riskScore: 7.2,
        trendsAnalyzed: 12,
        redFlagsDetected: 3,
        predictionsGenerated: 8,
        keyInsights: [
          "Mental health cases increased 23% in North District",
          "Resource allocation efficiency down 12%",
          "Family support services showing 89% success rate",
        ],
        recommendations: [
          "Deploy additional mental health specialists to North District",
          "Review resource allocation algorithms",
          "Expand family support program capacity",
        ],
        confidence: 94,
        dataPoints: 1247,
      }

      setInsights(newInsights)
      onInsightsUpdate(newInsights)
      setLastAnalysis(new Date())
      setIsAnalyzing(false)
      setAnalysisProgress(100)
    }, 3000)
  }

  const runBackgroundAnalysis = async () => {
    // Silent background analysis
    const newInsights = {
      ...insights,
      lastUpdated: new Date(),
      dataPoints: (insights?.dataPoints || 1247) + Math.floor(Math.random() * 50),
    }

    setInsights(newInsights)
    onInsightsUpdate(newInsights)
    setLastAnalysis(new Date())
  }

  const manualAnalysis = () => {
    runInitialAnalysis()
  }

  const getTimeAgo = (date: Date) => {
    const now = new Date()
    const diff = now.getTime() - date.getTime()
    const minutes = Math.floor(diff / 60000)
    const hours = Math.floor(minutes / 60)

    if (hours > 0) return `${hours}h ago`
    if (minutes > 0) return `${minutes}m ago`
    return "Just now"
  }

  return (
    <Card className="border-2 border-primary/20 bg-gradient-to-r from-purple-50 to-blue-50 dark:from-purple-950/20 dark:to-blue-950/20">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2 text-lg">
            <div className="relative">
              <Brain className="w-6 h-6 text-primary" />
              {isAnalyzing && (
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full animate-pulse" />
              )}
            </div>
            AI Analytics Engine
            <Badge variant="secondary" className="ml-2">
              {autoAnalysisEnabled ? "Auto" : "Manual"}
            </Badge>
          </CardTitle>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" onClick={() => setAutoAnalysisEnabled(!autoAnalysisEnabled)}>
              <Activity className="w-4 h-4 mr-1" />
              {autoAnalysisEnabled ? "Disable Auto" : "Enable Auto"}
            </Button>
            <Button onClick={manualAnalysis} disabled={isAnalyzing} size="sm" className="bg-primary">
              <Zap className="w-4 h-4 mr-1" />
              {isAnalyzing ? "Analyzing..." : "Run Analysis"}
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {isAnalyzing && (
          <div className="space-y-2">
            <div className="flex items-center justify-between text-sm">
              <span>Analyzing data patterns...</span>
              <span>{Math.round(analysisProgress)}%</span>
            </div>
            <Progress value={analysisProgress} className="h-2" />
          </div>
        )}

        {insights && (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center p-3 bg-white/50 dark:bg-gray-800/50 rounded-lg">
              <div className="text-2xl font-bold text-primary">{insights.riskScore}/10</div>
              <div className="text-xs text-muted-foreground">Risk Score</div>
            </div>
            <div className="text-center p-3 bg-white/50 dark:bg-gray-800/50 rounded-lg">
              <div className="text-2xl font-bold text-blue-600">{insights.trendsAnalyzed}</div>
              <div className="text-xs text-muted-foreground">Trends</div>
            </div>
            <div className="text-center p-3 bg-white/50 dark:bg-gray-800/50 rounded-lg">
              <div className="text-2xl font-bold text-red-600">{insights.redFlagsDetected}</div>
              <div className="text-xs text-muted-foreground">Red Flags</div>
            </div>
            <div className="text-center p-3 bg-white/50 dark:bg-gray-800/50 rounded-lg">
              <div className="text-2xl font-bold text-green-600">{insights.confidence}%</div>
              <div className="text-xs text-muted-foreground">Confidence</div>
            </div>
          </div>
        )}

        <div className="flex items-center justify-between text-sm text-muted-foreground">
          <div className="flex items-center gap-4">
            {lastAnalysis && (
              <span className="flex items-center gap-1">
                <Eye className="w-3 h-3" />
                Last analysis: {getTimeAgo(lastAnalysis)}
              </span>
            )}
            {insights && (
              <span className="flex items-center gap-1">
                <BarChart3 className="w-3 h-3" />
                {insights.dataPoints} data points
              </span>
            )}
          </div>
          <div className="flex items-center gap-1">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
            <span>Live monitoring</span>
          </div>
        </div>

        {insights && insights.keyInsights && (
          <div className="space-y-2">
            <div className="text-sm font-medium">Latest Insights:</div>
            <div className="space-y-1">
              {insights.keyInsights.slice(0, 2).map((insight: string, index: number) => (
                <div key={index} className="flex items-start gap-2 text-sm">
                  <TrendingUp className="w-3 h-3 text-blue-500 mt-0.5 flex-shrink-0" />
                  <span className="text-muted-foreground">{insight}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
