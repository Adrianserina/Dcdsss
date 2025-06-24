"use client"

import { useState } from "react"
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
  Bell,
  Menu,
  Search,
  Filter,
  Plus,
  Activity,
  Target,
  Award,
  Zap,
} from "lucide-react"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Input } from "@/components/ui/input"

export default function CaseworkerPortal() {
  const [activeTab, setActiveTab] = useState("overview")

  const stats = [
    { label: "Active Cases", value: "24", change: "+3", trend: "up", icon: Users, color: "text-blue-600" },
    { label: "Completed Today", value: "8", change: "+2", trend: "up", icon: CheckCircle2, color: "text-green-600" },
    { label: "Urgent Cases", value: "3", change: "-1", trend: "down", icon: AlertCircle, color: "text-red-600" },
    { label: "Response Time", value: "12m", change: "-3m", trend: "down", icon: Clock, color: "text-orange-600" },
    { label: "Satisfaction", value: "94%", change: "+2%", trend: "up", icon: Heart, color: "text-pink-600" },
    { label: "Team Efficiency", value: "87%", change: "+5%", trend: "up", icon: Target, color: "text-purple-600" },
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
      nextAction: "Emergency response needed",
      caseType: "Crisis Intervention",
    },
  ]

  const quickActions = [
    { label: "New Case", icon: Plus, color: "bg-blue-600" },
    { label: "Schedule Visit", icon: Calendar, color: "bg-green-600" },
    { label: "Emergency", icon: AlertCircle, color: "bg-red-600" },
    { label: "Reports", icon: Activity, color: "bg-purple-600" },
  ]

  const todaySchedule = [
    { time: "9:00 AM", client: "Sarah Johnson", type: "Home Visit", location: "Downtown", status: "confirmed" },
    { time: "11:30 AM", client: "Michael Chen", type: "Phone Check-in", location: "Office", status: "completed" },
    { time: "2:00 PM", client: "Emma Davis", type: "Assessment", location: "Eastside", status: "upcoming" },
    { time: "4:00 PM", client: "Robert Wilson", type: "Court Hearing", location: "Courthouse", status: "upcoming" },
  ]

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

  const getScheduleStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-green-100 text-green-800"
      case "confirmed":
        return "bg-blue-100 text-blue-800"
      case "upcoming":
        return "bg-orange-100 text-orange-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
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
            <span className="font-semibold text-sm">Caseworker Portal</span>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <Button variant="ghost" size="sm">
            <Search className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="sm" className="relative">
            <Bell className="h-4 w-4" />
            <span className="absolute -top-1 -right-1 h-3 w-3 bg-red-500 rounded-full text-xs"></span>
          </Button>
        </div>
      </div>

      <div className="p-4 space-y-4">
        {/* Welcome Section */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-xl font-bold text-gray-900 lg:text-2xl">Good morning, Alex</h1>
            <p className="text-sm text-gray-600">You have 3 urgent cases requiring attention</p>
          </div>
          <Avatar className="h-10 w-10 lg:h-12 lg:w-12">
            <AvatarImage src="/placeholder.svg?height=40&width=40" />
            <AvatarFallback>AC</AvatarFallback>
          </Avatar>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-4 gap-2 lg:hidden">
          {quickActions.map((action, index) => (
            <Button key={index} variant="outline" className="h-16 flex-col space-y-1 border-dashed">
              <div className={`p-1.5 rounded-md ${action.color}`}>
                <action.icon className="h-4 w-4 text-white" />
              </div>
              <span className="text-xs">{action.label}</span>
            </Button>
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
        </div>

        <div className="grid lg:grid-cols-3 gap-4">
          {/* Recent Cases */}
          <Card className="lg:col-span-2 border-0 shadow-sm">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg">Active Cases</CardTitle>
                <Button variant="ghost" size="sm" className="text-blue-600">
                  View All
                </Button>
              </div>
            </CardHeader>
            <CardContent className="p-0">
              <ScrollArea className="h-80">
                <div className="space-y-1">
                  {recentCases.map((case_, index) => (
                    <div
                      key={case_.id}
                      className="flex items-center justify-between p-3 hover:bg-gray-50 border-b border-gray-100 last:border-b-0"
                    >
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
                  ))}
                </div>
              </ScrollArea>
            </CardContent>
          </Card>

          {/* Today's Schedule */}
          <Card className="border-0 shadow-sm">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg flex items-center space-x-2">
                <Calendar className="h-4 w-4 text-blue-600" />
                <span>Today's Schedule</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {todaySchedule.map((appointment, index) => (
                <div key={index} className="flex items-start space-x-3 p-2 rounded-lg hover:bg-gray-50">
                  <div className="text-xs font-medium text-gray-600 w-16 mt-1">{appointment.time}</div>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-sm text-gray-900 truncate">{appointment.client}</p>
                    <p className="text-xs text-gray-600">{appointment.type}</p>
                    <div className="flex items-center space-x-1 mt-1">
                      <MapPin className="h-3 w-3 text-gray-400" />
                      <span className="text-xs text-gray-500">{appointment.location}</span>
                    </div>
                  </div>
                  <Badge className={`text-xs ${getScheduleStatusColor(appointment.status)}`}>
                    {appointment.status}
                  </Badge>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

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
                  <span>Response Time Goal</span>
                  <span className="font-medium">15/20</span>
                </div>
                <Progress value={75} className="h-2" />
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
                <span>Achievements</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center space-x-3 p-2 bg-green-50 rounded-lg">
                <div className="bg-green-600 p-1.5 rounded-full">
                  <Zap className="h-3 w-3 text-white" />
                </div>
                <div>
                  <p className="text-sm font-medium text-green-800">Quick Responder</p>
                  <p className="text-xs text-green-600">Avg response under 15 min</p>
                </div>
              </div>
              <div className="flex items-center space-x-3 p-2 bg-blue-50 rounded-lg">
                <div className="bg-blue-600 p-1.5 rounded-full">
                  <Heart className="h-3 w-3 text-white" />
                </div>
                <div>
                  <p className="text-sm font-medium text-blue-800">Client Champion</p>
                  <p className="text-xs text-blue-600">95%+ satisfaction rate</p>
                </div>
              </div>
              <div className="flex items-center space-x-3 p-2 bg-purple-50 rounded-lg">
                <div className="bg-purple-600 p-1.5 rounded-full">
                  <Target className="h-3 w-3 text-white" />
                </div>
                <div>
                  <p className="text-sm font-medium text-purple-800">Goal Crusher</p>
                  <p className="text-xs text-purple-600">Exceeded monthly targets</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
