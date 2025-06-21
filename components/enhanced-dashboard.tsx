"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { TrendingUp, AlertTriangle, Users, Brain, Activity, Shield, Target, Settings, LogOut } from "lucide-react"
import { TrendChart } from "./trend-chart"
import { RiskHeatmap } from "./risk-heatmap"
import { CaseTimeline } from "./case-timeline"
import { AIInsightsPanel } from "./ai-insights-panel"
import { ThemeToggle } from "./theme-toggle"
import { QuickReferenceSidebar } from "./quick-reference-sidebar"
import { ResourceIndex } from "./resource-index"

interface DashboardProps {
  userId: string
  userRole: string
  onLogout: () => void
}

export function EnhancedDashboard({ userId, userRole, onLogout }: DashboardProps) {
  const [activeTab, setActiveTab] = useState("overview")
  const [aiInsights, setAiInsights] = useState<any>(null)
  const [isAnalyzing, setIsAnalyzing] = useState(false)

  // Mock data - in real app, this would come from your database
  const mockData = {
    totalCases: 156,
    activeCases: 89,
    highRiskCases: 12,
    completedThisMonth: 23,
    trends: [
      { category: "Mental Health", trend: "Increasing", severity: "medium" as const, confidence: 0.85 },
      { category: "Elder Care", trend: "Stable", severity: "low" as const, confidence: 0.92 },
      { category: "Child Protection", trend: "Decreasing", severity: "high" as const, confidence: 0.78 },
    ],
    redFlags: [
      { type: "Missed Appointments", count: 8, severity: "high" as const },
      { type: "Family Conflict", count: 5, severity: "critical" as const },
      { type: "Financial Issues", count: 12, severity: "medium" as const },
    ],
  }

  const runAIAnalysis = async () => {
    setIsAnalyzing(true)
    // Simulate AI analysis
    await new Promise((resolve) => setTimeout(resolve, 2000))
    setAiInsights({
      riskScore: 7.2,
      keyInsights: [
        "Increased mental health cases in North district",
        "Resource allocation efficiency down 12%",
        "Family support services showing positive outcomes",
      ],
      recommendations: [
        "Deploy additional mental health specialists to North district",
        "Review resource allocation algorithms",
        "Expand family support program capacity",
      ],
    })
    setIsAnalyzing(false)
  }

  const getRoleDisplayName = (role: string) => {
    const roleMap: { [key: string]: string } = {
      "social-worker": "Social Worker",
      supervisor: "Supervisor",
      manager: "Manager",
      specialist: "Specialist",
      admin: "Administrator",
      coordinator: "Care Coordinator",
    }
    return roleMap[role] || role
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b bg-card">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div>
                <h1 className="text-2xl font-bold">Social Care Sync</h1>
                <p className="text-sm text-muted-foreground">Welcome back, {getRoleDisplayName(userRole)}</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Button onClick={runAIAnalysis} disabled={isAnalyzing} variant="outline" size="sm">
                <Brain className="w-4 h-4 mr-2" />
                {isAnalyzing ? "Analyzing..." : "Run AI Analysis"}
              </Button>
              <ThemeToggle />
              <Button variant="outline" size="sm">
                <Settings className="w-4 h-4 mr-2" />
                Settings
              </Button>
              <Button variant="outline" size="sm" onClick={onLogout}>
                <LogOut className="w-4 h-4 mr-2" />
                Logout
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto p-6 space-y-6">
        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Total Cases</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{mockData.totalCases}</div>
              <p className="text-xs text-muted-foreground">+12% from last month</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Active Cases</CardTitle>
              <Activity className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{mockData.activeCases}</div>
              <p className="text-xs text-muted-foreground">Currently in progress</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">High Risk</CardTitle>
              <AlertTriangle className="h-4 w-4 text-orange-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-orange-600">{mockData.highRiskCases}</div>
              <p className="text-xs text-muted-foreground">Require immediate attention</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Completed</CardTitle>
              <Target className="h-4 w-4 text-green-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">{mockData.completedThisMonth}</div>
              <p className="text-xs text-muted-foreground">This month</p>
            </CardContent>
          </Card>
        </div>

        {/* AI Insights Alert */}
        {aiInsights && (
          <Alert className="border-l-4 border-l-primary">
            <Brain className="h-4 w-4" />
            <AlertTitle>AI Analysis Complete</AlertTitle>
            <AlertDescription>
              Risk Score:{" "}
              <Badge variant="outline" className="ml-2">
                {aiInsights.riskScore}/10
              </Badge>
              <div className="mt-2 space-y-1">
                {aiInsights.keyInsights.map((insight: string, index: number) => (
                  <div key={index} className="text-sm">
                    • {insight}
                  </div>
                ))}
              </div>
            </AlertDescription>
          </Alert>
        )}

        <div className="flex flex-col lg:flex-row gap-6">
          {/* Main Content */}
          <div className="flex-1 min-w-0">
            <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
              <TabsList className="grid w-full grid-cols-6">
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="trends">Trends</TabsTrigger>
                <TabsTrigger value="risks">Risk Map</TabsTrigger>
                <TabsTrigger value="cases">Cases</TabsTrigger>
                <TabsTrigger value="insights">AI Insights</TabsTrigger>
                <TabsTrigger value="resources">Resources</TabsTrigger>
              </TabsList>

              <TabsContent value="overview" className="space-y-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <TrendingUp className="w-5 h-5" />
                        Trend Analysis
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {mockData.trends.map((trend, index) => (
                          <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                            <div>
                              <div className="font-medium">{trend.category}</div>
                              <div className="text-sm text-muted-foreground">{trend.trend}</div>
                            </div>
                            <div className="flex items-center gap-2">
                              <div
                                className={`w-3 h-3 rounded-full ${
                                  trend.severity === "high"
                                    ? "bg-red-500"
                                    : trend.severity === "medium"
                                      ? "bg-yellow-500"
                                      : "bg-green-500"
                                }`}
                              />
                              <div className="text-sm text-muted-foreground">{Math.round(trend.confidence * 100)}%</div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Shield className="w-5 h-5" />
                        Red Flags
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {mockData.redFlags.map((flag, index) => (
                          <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                            <div>
                              <div className="font-medium">{flag.type}</div>
                              <div className="text-sm text-muted-foreground">{flag.count} cases affected</div>
                            </div>
                            <div
                              className={`w-3 h-3 rounded-full ${
                                flag.severity === "critical"
                                  ? "bg-red-500"
                                  : flag.severity === "high"
                                    ? "bg-orange-500"
                                    : "bg-yellow-500"
                              }`}
                            />
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>

              <TabsContent value="trends">
                <TrendChart />
              </TabsContent>

              <TabsContent value="risks">
                <RiskHeatmap />
              </TabsContent>

              <TabsContent value="cases">
                <CaseTimeline />
              </TabsContent>

              <TabsContent value="insights">
                <AIInsightsPanel insights={aiInsights} />
              </TabsContent>

              <TabsContent value="resources">
                <ResourceIndex userRole={userRole} />
              </TabsContent>
            </Tabs>
          </div>

          {/* Mobile Quick Reference - show on small screens */}
          <div className="lg:hidden">
            <QuickReferenceSidebar userRole={userRole} />
          </div>

          {/* Desktop Sidebar */}
          <div className="hidden lg:block w-80 space-y-4">
            <QuickReferenceSidebar userRole={userRole} />
          </div>
        </div>
      </div>
    </div>
  )
}
