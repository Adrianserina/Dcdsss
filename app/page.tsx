"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { NavigationSidebar } from "@/components/navigation-sidebar"
import { BrandLogo } from "@/components/brand-logo"
import { CareIllustration } from "@/components/graphics/care-illustration"
import { StatsVisualization } from "@/components/graphics/stats-visualization"
import {
  Users,
  FileText,
  Star,
  Brain,
  Target,
  Zap,
  Activity,
  Bell,
  Plus,
  ChevronRight,
  BarChart3,
  Shield,
  Clock,
  Mic,
  Sparkles,
  TrendingUp,
} from "lucide-react"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from "recharts"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"

// Mock data for the dashboard
const careMetrics = [
  { month: "Jan", clients: 45, satisfaction: 92, incidents: 2 },
  { month: "Feb", clients: 52, satisfaction: 94, incidents: 1 },
  { month: "Mar", clients: 48, satisfaction: 96, incidents: 0 },
  { month: "Apr", clients: 61, satisfaction: 93, incidents: 3 },
  { month: "May", clients: 67, satisfaction: 97, incidents: 1 },
  { month: "Jun", clients: 73, satisfaction: 95, incidents: 2 },
]

const aiInsights = [
  { category: "Risk Assessment", score: 85, trend: "+12%" },
  { category: "Care Quality", score: 92, trend: "+8%" },
  { category: "Resource Optimization", score: 78, trend: "+15%" },
  { category: "Compliance", score: 96, trend: "+3%" },
]

const gamificationData = {
  level: 7,
  xp: 2450,
  nextLevelXp: 3000,
  badges: [
    { name: "Care Champion", icon: "🏆", earned: true },
    { name: "AI Innovator", icon: "🤖", earned: true },
    { name: "Team Leader", icon: "👥", earned: true },
    { name: "Quality Master", icon: "⭐", earned: false },
  ],
  achievements: [
    { title: "Perfect Week", description: "Zero incidents for 7 days", points: 500, completed: true },
    { title: "Client Satisfaction", description: "95%+ satisfaction rating", points: 300, completed: true },
    { title: "AI Adoption", description: "Use AI insights 10 times", points: 200, completed: false },
  ],
}

const recentActivities = [
  { id: 1, type: "care_plan", client: "Sarah Johnson", action: "Updated care plan", time: "2 hours ago", points: 50 },
  {
    id: 2,
    type: "assessment",
    client: "Michael Brown",
    action: "Completed risk assessment",
    time: "4 hours ago",
    points: 75,
  },
  {
    id: 3,
    type: "medication",
    client: "Emma Davis",
    action: "Medication administered",
    time: "6 hours ago",
    points: 25,
  },
  { id: 4, type: "incident", client: "Robert Wilson", action: "Incident report filed", time: "1 day ago", points: 100 },
]

export default function Dashboard() {
  const [currentView, setCurrentView] = useState("overview")
  const [notifications, setNotifications] = useState(3)
  const [aiRecommendations, setAiRecommendations] = useState([
    {
      id: 1,
      type: "urgent",
      title: "High-Risk Client Alert",
      description: "Client #247 shows elevated risk factors. Recommend immediate assessment.",
      confidence: 94,
      action: "Schedule Assessment",
    },
    {
      id: 2,
      type: "optimization",
      title: "Resource Allocation",
      description: "AI suggests redistributing staff for 15% efficiency improvement.",
      confidence: 87,
      action: "View Details",
    },
    {
      id: 3,
      type: "quality",
      title: "Care Plan Enhancement",
      description: "Personalized care suggestions for 5 clients based on outcome patterns.",
      confidence: 91,
      action: "Review Plans",
    },
  ])

  const handleNotificationClick = () => {
    setNotifications(0)
  }

  const handleAiRecommendation = (id: number) => {
    setAiRecommendations((prev) => prev.filter((rec) => rec.id !== id))
    // Add points for acting on AI recommendations
    gamificationData.xp += 50
  }

  const renderContent = () => {
    switch (currentView) {
      case "overview":
        return (
          <div className="space-y-8">
            {/* Hero Section with Illustration */}
            <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600 p-8 text-white">
              <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
                <div>
                  <div className="flex items-center space-x-2 mb-4">
                    <Sparkles className="h-6 w-6" />
                    <Badge variant="secondary" className="bg-white/20 text-white border-white/30">
                      AI-Powered Dashboard
                    </Badge>
                  </div>
                  <h1 className="text-4xl font-bold mb-4">Welcome back, Care Professional</h1>
                  <p className="text-xl text-white/90 mb-6">
                    Your intelligent care management system is optimizing outcomes for 73 clients with 95% satisfaction.
                  </p>
                  <div className="flex items-center space-x-4">
                    <Button variant="secondary" className="bg-white text-purple-600 hover:bg-white/90">
                      <Plus className="h-4 w-4 mr-2" />
                      Quick Action
                    </Button>
                    <Button variant="outline" className="border-white/30 text-white hover:bg-white/10">
                      <Mic className="h-4 w-4 mr-2" />
                      Voice Update
                    </Button>
                  </div>
                </div>
                <div className="hidden lg:block">
                  <CareIllustration />
                </div>
              </div>

              {/* Decorative elements */}
              <div className="absolute top-4 right-4 opacity-20">
                <div className="w-32 h-32 rounded-full bg-white/10 backdrop-blur-sm" />
              </div>
              <div className="absolute bottom-4 left-4 opacity-10">
                <div className="w-24 h-24 rounded-full bg-white/10 backdrop-blur-sm" />
              </div>
            </div>

            {/* XP Progress Bar */}
            <Card className="bg-gradient-to-r from-purple-500 to-pink-500 text-white border-0 shadow-xl">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h3 className="text-lg font-semibold">Your Progress</h3>
                    <p className="text-purple-100">Level {gamificationData.level} Care Professional</p>
                  </div>
                  <div className="text-right">
                    <p className="text-2xl font-bold">{gamificationData.xp} XP</p>
                    <p className="text-purple-100">Next: {gamificationData.nextLevelXp} XP</p>
                  </div>
                </div>
                <Progress
                  value={(gamificationData.xp / gamificationData.nextLevelXp) * 100}
                  className="h-3 bg-purple-400"
                />
              </CardContent>
            </Card>

            {/* Enhanced Key Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <StatsVisualization
                title="Active Clients"
                value="73"
                change="+8% from last month"
                icon={<Users className="h-6 w-6" />}
                color="blue"
              />
              <StatsVisualization
                title="Satisfaction Score"
                value="95%"
                change="+2% from last month"
                icon={<Star className="h-6 w-6" />}
                color="yellow"
              />
              <StatsVisualization
                title="Care Plans"
                value="68"
                change="12 updated today"
                icon={<FileText className="h-6 w-6" />}
                color="green"
              />
              <StatsVisualization
                title="AI Insights"
                value="24"
                change="Generated today"
                icon={<Brain className="h-6 w-6" />}
                color="purple"
              />
            </div>

            {/* AI Recommendations */}
            <Card className="shadow-lg border-0 bg-gradient-to-br from-white to-blue-50">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <div className="p-2 rounded-lg bg-gradient-to-br from-blue-500 to-purple-600">
                    <Brain className="h-5 w-5 text-white" />
                  </div>
                  <span>AI Recommendations</span>
                  <Badge variant="secondary" className="bg-green-100 text-green-800 animate-pulse">
                    Live
                  </Badge>
                </CardTitle>
                <CardDescription>Intelligent insights to improve care quality and efficiency</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {aiRecommendations.map((rec) => (
                  <div
                    key={rec.id}
                    className="flex items-start space-x-4 p-4 border rounded-xl hover:bg-white/50 transition-all duration-200 hover:shadow-md"
                  >
                    <div
                      className={`p-3 rounded-xl shadow-lg ${
                        rec.type === "urgent"
                          ? "bg-gradient-to-br from-red-500 to-red-600 text-white"
                          : rec.type === "optimization"
                            ? "bg-gradient-to-br from-blue-500 to-blue-600 text-white"
                            : "bg-gradient-to-br from-green-500 to-green-600 text-white"
                      }`}
                    >
                      {rec.type === "urgent" ? (
                        <Shield className="h-5 w-5" />
                      ) : rec.type === "optimization" ? (
                        <Zap className="h-5 w-5" />
                      ) : (
                        <Target className="h-5 w-5" />
                      )}
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold text-gray-900">{rec.title}</h4>
                      <p className="text-sm text-gray-600 mb-3">{rec.description}</p>
                      <div className="flex items-center justify-between">
                        <Badge variant="outline" className="bg-purple-50 text-purple-700 border-purple-200">
                          {rec.confidence}% Confidence
                        </Badge>
                        <Button
                          size="sm"
                          onClick={() => handleAiRecommendation(rec.id)}
                          className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 shadow-lg"
                        >
                          {rec.action}
                          <ChevronRight className="h-4 w-4 ml-1" />
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Charts */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="shadow-lg border-0">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <TrendingUp className="h-5 w-5 text-blue-600" />
                    <span>Client Growth & Satisfaction</span>
                  </CardTitle>
                  <CardDescription>Monthly trends and performance metrics</CardDescription>
                </CardHeader>
                <CardContent>
                  <ChartContainer
                    config={{
                      clients: { label: "Clients", color: "hsl(var(--chart-1))" },
                      satisfaction: { label: "Satisfaction", color: "hsl(var(--chart-2))" },
                    }}
                    className="h-[300px]"
                  >
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={careMetrics}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="month" />
                        <YAxis />
                        <ChartTooltip content={<ChartTooltipContent />} />
                        <Line type="monotone" dataKey="clients" stroke="var(--color-clients)" strokeWidth={3} />
                        <Line
                          type="monotone"
                          dataKey="satisfaction"
                          stroke="var(--color-satisfaction)"
                          strokeWidth={3}
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  </ChartContainer>
                </CardContent>
              </Card>

              <Card className="shadow-lg border-0 bg-gradient-to-br from-white to-purple-50">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <div className="p-2 rounded-lg bg-gradient-to-br from-purple-500 to-pink-600">
                      <BarChart3 className="h-5 w-5 text-white" />
                    </div>
                    <span>AI Performance Metrics</span>
                  </CardTitle>
                  <CardDescription>Real-time AI analytics and insights</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {aiInsights.map((insight, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between p-4 bg-white rounded-xl shadow-sm border"
                      >
                        <div>
                          <p className="font-medium text-gray-900">{insight.category}</p>
                          <p className="text-sm text-gray-600">Score: {insight.score}%</p>
                        </div>
                        <div className="text-right">
                          <Badge variant="secondary" className="bg-green-100 text-green-800">
                            {insight.trend}
                          </Badge>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Recent Activities */}
            <Card className="shadow-lg border-0">
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Activity className="h-5 w-5 text-green-600" />
                    <span>Recent Activities</span>
                  </div>
                  <Button variant="outline" size="sm" className="border-green-200 text-green-700 hover:bg-green-50">
                    <Plus className="h-4 w-4 mr-2" />
                    Add Activity
                  </Button>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentActivities.map((activity) => (
                    <div
                      key={activity.id}
                      className="flex items-center space-x-4 p-4 border rounded-xl hover:bg-gray-50 transition-colors"
                    >
                      <div
                        className={`p-3 rounded-xl shadow-lg ${
                          activity.type === "care_plan"
                            ? "bg-gradient-to-br from-blue-500 to-blue-600 text-white"
                            : activity.type === "assessment"
                              ? "bg-gradient-to-br from-green-500 to-green-600 text-white"
                              : activity.type === "medication"
                                ? "bg-gradient-to-br from-yellow-500 to-yellow-600 text-white"
                                : "bg-gradient-to-br from-red-500 to-red-600 text-white"
                        }`}
                      >
                        {activity.type === "care_plan" ? (
                          <FileText className="h-5 w-5" />
                        ) : activity.type === "assessment" ? (
                          <Activity className="h-5 w-5" />
                        ) : activity.type === "medication" ? (
                          <Clock className="h-5 w-5" />
                        ) : (
                          <Shield className="h-5 w-5" />
                        )}
                      </div>
                      <div className="flex-1">
                        <p className="font-medium text-gray-900">{activity.client}</p>
                        <p className="text-sm text-gray-600">{activity.action}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm text-gray-500">{activity.time}</p>
                        <Badge variant="secondary" className="bg-purple-100 text-purple-700">
                          +{activity.points} XP
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        )

      case "clients":
        return (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <div>
                <h2 className="text-3xl font-bold text-gray-900">Client Management</h2>
                <p className="text-gray-600 mt-1">Manage and monitor your client care plans</p>
              </div>
              <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 shadow-lg">
                <Plus className="h-4 w-4 mr-2" />
                Add New Client
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                { name: "Sarah Johnson", age: 78, riskLevel: "Low", lastVisit: "2 days ago", satisfaction: 98 },
                { name: "Michael Brown", age: 65, riskLevel: "Medium", lastVisit: "1 day ago", satisfaction: 92 },
                { name: "Emma Davis", age: 82, riskLevel: "High", lastVisit: "4 hours ago", satisfaction: 95 },
                { name: "Robert Wilson", age: 71, riskLevel: "Low", lastVisit: "3 days ago", satisfaction: 89 },
                { name: "Linda Garcia", age: 69, riskLevel: "Medium", lastVisit: "1 day ago", satisfaction: 96 },
                { name: "James Miller", age: 75, riskLevel: "Low", lastVisit: "2 days ago", satisfaction: 94 },
              ].map((client, index) => (
                <Card
                  key={index}
                  className="hover:shadow-xl transition-all duration-200 cursor-pointer border-0 shadow-lg"
                >
                  <CardContent className="p-6">
                    <div className="flex items-center space-x-4 mb-4">
                      <Avatar className="h-12 w-12 border-2 border-blue-200">
                        <AvatarFallback className="bg-gradient-to-br from-blue-500 to-purple-600 text-white font-semibold">
                          {client.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <h3 className="font-semibold text-gray-900">{client.name}</h3>
                        <p className="text-sm text-gray-600">Age: {client.age}</p>
                      </div>
                    </div>

                    <div className="space-y-3">
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-600">Risk Level:</span>
                        <Badge
                          variant={
                            client.riskLevel === "Low"
                              ? "secondary"
                              : client.riskLevel === "Medium"
                                ? "default"
                                : "destructive"
                          }
                          className={
                            client.riskLevel === "Low"
                              ? "bg-green-100 text-green-800"
                              : client.riskLevel === "Medium"
                                ? "bg-yellow-100 text-yellow-800"
                                : "bg-red-100 text-red-800"
                          }
                        >
                          {client.riskLevel}
                        </Badge>
                      </div>

                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-600">Last Visit:</span>
                        <span className="text-sm font-medium text-gray-900">{client.lastVisit}</span>
                      </div>

                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-600">Satisfaction:</span>
                        <div className="flex items-center space-x-1">
                          <Star className="h-4 w-4 text-yellow-500 fill-current" />
                          <span className="text-sm font-medium text-gray-900">{client.satisfaction}%</span>
                        </div>
                      </div>
                    </div>

                    <Button
                      className="w-full mt-4 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                      variant="default"
                    >
                      View Details
                      <ChevronRight className="h-4 w-4 ml-2" />
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )

      default:
        return (
          <div className="flex items-center justify-center h-96">
            <div className="text-center">
              <div className="w-24 h-24 mx-auto mb-4 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                <Sparkles className="h-12 w-12 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Feature Coming Soon</h3>
              <p className="text-gray-600">This section is under development with AI-powered enhancements.</p>
            </div>
          </div>
        )
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex">
      {/* Sidebar Navigation */}
      <NavigationSidebar currentView={currentView} onViewChange={setCurrentView} notifications={notifications} />

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Top Header */}
        <header className="bg-white/80 backdrop-blur-sm shadow-sm border-b border-gray-200 sticky top-0 z-40">
          <div className="px-6 py-4">
            <div className="flex justify-between items-center">
              <div className="flex items-center space-x-4">
                <div className="lg:hidden">
                  <BrandLogo size="sm" showText={false} />
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-gray-900">
                    {currentView === "overview"
                      ? "Dashboard Overview"
                      : currentView === "clients"
                        ? "Client Management"
                        : currentView === "analytics"
                          ? "AI Analytics"
                          : currentView === "gamification"
                            ? "Achievements"
                            : currentView === "care-plans"
                              ? "Care Plans"
                              : currentView === "reports"
                                ? "Reports"
                                : "SocialCareSync"}
                  </h1>
                  <p className="text-sm text-gray-600">
                    {currentView === "overview"
                      ? "Your intelligent care management dashboard"
                      : currentView === "clients"
                        ? "Monitor and manage client care"
                        : "AI-powered insights and analytics"}
                  </p>
                </div>
              </div>

              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white px-4 py-2 rounded-full shadow-lg">
                  <Star className="h-4 w-4" />
                  <span className="text-sm font-medium">Level {gamificationData.level}</span>
                </div>

                <Button variant="ghost" size="sm" className="relative" onClick={handleNotificationClick}>
                  <Bell className="h-5 w-5" />
                  {notifications > 0 && (
                    <Badge className="absolute -top-1 -right-1 h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs bg-red-500">
                      {notifications}
                    </Badge>
                  )}
                </Button>

                <Avatar className="h-10 w-10 border-2 border-purple-200">
                  <AvatarImage src="/placeholder.svg?height=40&width=40" />
                  <AvatarFallback className="bg-gradient-to-br from-purple-500 to-pink-600 text-white font-semibold">
                    JD
                  </AvatarFallback>
                </Avatar>
              </div>
            </div>
          </div>
        </header>

        {/* Main Content Area */}
        <main className="flex-1 p-6 overflow-auto">{renderContent()}</main>
      </div>
    </div>
  )
}
