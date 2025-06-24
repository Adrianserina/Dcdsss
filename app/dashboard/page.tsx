"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  Heart,
  Users,
  Calendar,
  TrendingUp,
  AlertCircle,
  CheckCircle2,
  Clock,
  MapPin,
  Phone,
  MessageSquare,
  Menu,
  Search,
  Filter,
  Plus,
  Activity,
  Target,
  Award,
  Zap,
  Brain,
  BarChart3,
} from "lucide-react"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Input } from "@/components/ui/input"
import { NotificationSystem } from "@/components/notification-system"
import { AIService, type CaseData } from "@/lib/ai-service"
import Link from "next/link"

export default function DashboardPage() {
  const [activeTab, setActiveTab] = useState("overview")
  const [aiInsights, setAiInsights] = useState<any[]>([])
  const [urgentFlags, setUrgentFlags] = useState<any[]>([])
  const [isAnalyzing, setIsAnalyzing] = useState(false)

  const stats = [
    { label: "Active Cases", value: "24", change: "+3", trend: "up", icon: Users, color: "text-blue-600" },
    { label: "Completed Today", value: "8", change: "+2", trend: "up", icon: CheckCircle2, color: "text-green-600" },
    { label: "Urgent Cases", value: "3", change: "-1", trend: "down", icon: AlertCircle, color: "text-red-600" },
    { label: "Response Time", value: "12m", change: "-3m", trend: "down", icon: Clock, color: "text-orange-600" },
    { label: "Satisfaction", value: "94%", change: "+2%", trend: "up", icon: Heart, color: "text-pink-600" },
    { label: "AI Efficiency", value: "87%", change: "+5%", trend: "up", icon: Brain, color: "text-purple-600" },
  ]

  const recentCases = [
    {
      id: "C001",
      name: "Sarah Johnson",
      age: 78,
      status: "urgent",
      location: "Downtown",
      lastContact: "2h ago",
      priority: "high",
      aiRiskScore: 85,
      nextAction: "Home visit scheduled",
      caseType: "Elder Care",
    },
    {
      id: "C002",
      name: "Michael Chen",
      age: 65,
      status: "active",
      location: "Westside",
      lastContact: "4h ago",
      priority: "medium",
      aiRiskScore: 62,
      nextAction: "Medical appointment follow-up",
      caseType: "Disability Services",
    },
    {
      id: "C003",
      name: "Emma Davis",
      age: 82,
      status: "completed",
      location: "Eastside",
      lastContact: "1d ago",
      priority: "low",
      aiRiskScore: 23,
      nextAction: "Case closure documentation",
      caseType: "Elder Care",
    },
    {
      id: "C004",
      name: "Robert Wilson",
      age: 71,
      status: "pending",
      location: "Northside",
      lastContact: "6h ago",
      priority: "medium",
      aiRiskScore: 45,
      nextAction: "Assessment review",
      caseType: "Housing Assistance",
    },
    {
      id: "C005",
      name: "Lisa Anderson",
      age: 69,
      status: "active",
      location: "Central",
      lastContact: "3h ago",
      priority: "high",
      aiRiskScore: 78,
      nextAction: "Emergency response needed",
      caseType: "Crisis Intervention",
    },
  ]

  const quickActions = [
    { label: "New Case", icon: Plus, color: "bg-blue-600", href: "/case/new" },
    { label: "Schedule Visit", icon: Calendar, color: "bg-green-600", href: "/schedule" },
    { label: "Emergency", icon: AlertCircle, color: "bg-red-600", href: "/emergency" },
    { label: "AI Reports", icon: Brain, color: "bg-purple-600", href: "/reports" },
  ]

  const aiAlerts = [
    {
      type: "risk",
      message: "3 cases showing elevated risk patterns requiring immediate attention",
      confidence: 92,
      action: "Review high-risk cases",
    },
    {
      type: "prediction",
      message: "AI predicts 15% increase in elder care cases next month",
      confidence: 87,
      action: "Prepare resource allocation",
    },
    {
      type: "optimization",
      message: "Route optimization can save 2.5 hours daily travel time",
      confidence: 94,
      action: "Implement suggested routes",
    },
  ]

  useEffect(() => {
    // Run AI analysis on dashboard load
    runAIAnalysis()
  }, [])

  const runAIAnalysis = async () => {
    setIsAnalyzing(true)
    try {
      // Simulate AI analysis of all cases
      const mockCases: CaseData[] = recentCases.map((c) => ({
        id: c.id,
        clientName: c.name,
        age: c.age,
        caseType: c.caseType,
        status: c.status,
        priority: c.priority,
        interactions: [
          {
            date: "2024-12-10",
            type: "Home Visit",
            notes: "Regular check completed",
            outcome: "positive",
          },
        ],
        riskFactors: ["Social isolation", "Health concerns"],
        demographics: {
          location: c.location,
          familySize: 1,
        },
      }))

      // Get AI insights and urgent flags
      const flags = await AIService.flagUrgentCases(mockCases)
      setUrgentFlags(flags)
    } catch (error) {
      console.error("AI Analysis failed:", error)
    } finally {
      setIsAnalyzing(false)
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "urgent":
        return "bg-red-100 text-red-800 border-red-200"
      case "active":
        return "bg-blue-100 text-blue-800 border-blue-200"
      case "completed":
        return "bg-green-100 text-green-800 border-green-200"
      case "pending":
        return "bg-yellow-100 text-yellow-800 border-yellow-200"
      default:
        return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "bg-red-500"
      case "medium":
        return "bg-yellow-500"
      case "low":
        return "bg-green-500"
      default:
        return "bg-gray-500"
    }
  }

  const getRiskColor = (score: number) => {
    if (score >= 80) return "text-red-600"
    if (score >= 60) return "text-orange-600"
    if (score >= 40) return "text-yellow-600"
    return "text-green-600"
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Mobile Header */}
      <div className="bg-white border-b border-gray-200 px-4 py-3 flex items-center justify-between lg:hidden">
        <div className="flex items-center space-x-3">
          <Button variant="ghost" size="sm">
            <Menu className="h-5 w-5" />
          </Button>
          <div className="flex items-center space-x-2">
            <Heart className="h-5 w-5 text-blue-600" />
            <span className="font-semibold text-sm">SocialCareSync</span>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <Button variant="ghost" size="sm">
            <Search className="h-4 w-4" />
          </Button>
          <NotificationSystem />
        </div>
      </div>

      <div className="p-4 space-y-4">
        {/* Welcome Section */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-xl font-bold text-gray-900 lg:text-2xl">Good morning, Alex</h1>
            <p className="text-sm text-gray-600">
              AI has identified 3 urgent cases requiring attention
              {isAnalyzing && <span className="ml-2 text-blue-600">• Analyzing...</span>}
            </p>
          </div>
          <Avatar className="h-10 w-10 lg:h-12 lg:w-12">
            <AvatarImage src="/placeholder.svg?height=40&width=40" />
            <AvatarFallback>AC</AvatarFallback>
          </Avatar>
        </div>

        {/* AI Alerts Banner */}
        {aiAlerts.length > 0 && (
          <Card className="border-purple-200 bg-purple-50">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg flex items-center space-x-2">
                <Brain className="h-5 w-5 text-purple-600" />
                <span>AI Intelligence Center</span>
                {isAnalyzing && (
                  <div className="animate-spin h-4 w-4 border-2 border-purple-600 border-t-transparent rounded-full" />
                )}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-3 gap-4">
                {aiAlerts.map((alert, index) => (
                  <div key={index} className="p-3 bg-white rounded-lg border border-purple-200">
                    <div className="flex items-start justify-between mb-2">
                      <h4 className="font-medium text-sm capitalize">{alert.type}</h4>
                      <Badge variant="outline" className="text-xs">
                        {alert.confidence}% confidence
                      </Badge>
                    </div>
                    <p className="text-sm text-gray-700 mb-2">{alert.message}</p>
                    <Button size="sm" variant="outline" className="text-xs">
                      {alert.action}
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Quick Actions */}
        <div className="grid grid-cols-4 gap-2 lg:hidden">
          {quickActions.map((action, index) => (
            <Link key={index} href={action.href}>
              <Button variant="outline" className="h-16 flex-col space-y-1 border-dashed w-full">
                <div className={`p-1.5 rounded-md ${action.color}`}>
                  <action.icon className="h-4 w-4 text-white" />
                </div>
                <span className="text-xs">{action.label}</span>
              </Button>
            </Link>
          ))}
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-6 gap-3">
          {stats.map((stat, index) => (
            <Card key={index} className="border-0 shadow-sm">
              <CardContent className="p-3 lg:p-4">
                <div className="flex items-center justify-between mb-2">
                  <stat.icon className={`h-4 w-4 ${stat.color}`} />
                  <div
                    className={`flex items-center text-xs ${stat.trend === "up" ? "text-green-600" : "text-red-600"}`}
                  >
                    <TrendingUp className={`h-3 w-3 mr-1 ${stat.trend === "down" ? "rotate-180" : ""}`} />
                    {stat.change}
                  </div>
                </div>
                <div className="space-y-1">
                  <p className="text-lg lg:text-xl font-bold text-gray-900">{stat.value}</p>
                  <p className="text-xs text-gray-600 leading-tight">{stat.label}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Search and Filter */}
        <div className="flex space-x-2">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input placeholder="Search cases, clients..." className="pl-10 h-10" />
          </div>
          <Button variant="outline" size="sm" className="px-3">
            <Filter className="h-4 w-4" />
          </Button>
          <Link href="/reports">
            <Button variant="outline" size="sm" className="px-3">
              <BarChart3 className="h-4 w-4" />
            </Button>
          </Link>
        </div>

        {/* Recent Cases with AI Risk Scores */}
        <Card className="border-0 shadow-sm">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg">Active Cases with AI Risk Assessment</CardTitle>
              <Button variant="ghost" size="sm" className="text-blue-600">
                View All
              </Button>
            </div>
          </CardHeader>
          <CardContent className="p-0">
            <ScrollArea className="h-80">
              <div className="space-y-1">
                {recentCases.map((case_, index) => (
                  <Link key={case_.id} href={`/case/${case_.id}`}>
                    <div className="flex items-center justify-between p-3 hover:bg-gray-50 border-b border-gray-100 last:border-b-0 cursor-pointer">
                      <div className="flex items-center space-x-3 flex-1 min-w-0">
                        <div className="relative">
                          <Avatar className="h-10 w-10">
                            <AvatarImage
                              src={`/placeholder.svg?height=40&width=40&text=${case_.name.split(" ")[0][0]}${case_.name.split(" ")[1][0]}`}
                            />
                            <AvatarFallback className="text-xs">
                              {case_.name.split(" ")[0][0]}
                              {case_.name.split(" ")[1][0]}
                            </AvatarFallback>
                          </Avatar>
                          <div
                            className={`absolute -bottom-1 -right-1 h-3 w-3 rounded-full border-2 border-white ${getPriorityColor(case_.priority)}`}
                          ></div>
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center space-x-2 mb-1">
                            <p className="font-medium text-sm text-gray-900 truncate">{case_.name}</p>
                            <span className="text-xs text-gray-500">({case_.age})</span>
                            <div className="flex items-center space-x-1">
                              <Brain className="h-3 w-3 text-purple-600" />
                              <span className={`text-xs font-medium ${getRiskColor(case_.aiRiskScore)}`}>
                                {case_.aiRiskScore}%
                              </span>
                            </div>
                          </div>
                          <div className="flex items-center space-x-3 text-xs text-gray-500 mb-1">
                            <div className="flex items-center space-x-1">
                              <MapPin className="h-3 w-3" />
                              <span>{case_.location}</span>
                            </div>
                            <div className="flex items-center space-x-1">
                              <Clock className="h-3 w-3" />
                              <span>{case_.lastContact}</span>
                            </div>
                          </div>
                          <p className="text-xs text-gray-600 truncate">{case_.nextAction}</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <div className="text-right">
                          <Badge variant="outline" className={`text-xs px-2 py-1 ${getStatusColor(case_.status)}`}>
                            {case_.status}
                          </Badge>
                          <p className="text-xs text-gray-500 mt-1">{case_.caseType}</p>
                        </div>
                        <div className="flex flex-col space-y-1">
                          <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
                            <Phone className="h-3 w-3" />
                          </Button>
                          <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
                            <MessageSquare className="h-3 w-3" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </ScrollArea>
          </CardContent>
        </Card>

        {/* Performance Metrics */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <Card className="border-0 shadow-sm">
            <CardHeader className="pb-3">
              <CardTitle className="text-base flex items-center space-x-2">
                <Activity className="h-4 w-4 text-blue-600" />
                <span>Weekly Performance</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Cases Completed</span>
                  <span className="font-medium">32/40</span>
                </div>
                <Progress value={80} className="h-2" />
              </div>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>AI Accuracy</span>
                  <span className="font-medium">94/100</span>
                </div>
                <Progress value={94} className="h-2" />
              </div>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Client Satisfaction</span>
                  <span className="font-medium">47/50</span>
                </div>
                <Progress value={94} className="h-2" />
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-sm">
            <CardHeader className="pb-3">
              <CardTitle className="text-base flex items-center space-x-2">
                <Award className="h-4 w-4 text-green-600" />
                <span>AI-Powered Achievements</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center space-x-3 p-2 bg-green-50 rounded-lg">
                <div className="bg-green-600 p-1.5 rounded-full">
                  <Zap className="h-3 w-3 text-white" />
                </div>
                <div>
                  <p className="text-sm font-medium text-green-800">AI Quick Responder</p>
                  <p className="text-xs text-green-600">Avg response under 15 min</p>
                </div>
              </div>
              <div className="flex items-center space-x-3 p-2 bg-blue-50 rounded-lg">
                <div className="bg-blue-600 p-1.5 rounded-full">
                  <Brain className="h-3 w-3 text-white" />
                </div>
                <div>
                  <p className="text-sm font-medium text-blue-800">Predictive Excellence</p>
                  <p className="text-xs text-blue-600">92% prediction accuracy</p>
                </div>
              </div>
              <div className="flex items-center space-x-3 p-2 bg-purple-50 rounded-lg">
                <div className="bg-purple-600 p-1.5 rounded-full">
                  <Target className="h-3 w-3 text-white" />
                </div>
                <div>
                  <p className="text-sm font-medium text-purple-800">Risk Prevention</p>
                  <p className="text-xs text-purple-600">15 crises prevented this month</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
