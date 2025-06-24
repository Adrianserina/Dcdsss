"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  BarChart3,
  Users,
  TrendingUp,
  AlertTriangle,
  CheckCircle2,
  Clock,
  DollarSign,
  FileText,
  Shield,
  Target,
  MapPin,
  Filter,
  Download,
  Settings,
  Bell,
} from "lucide-react"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"

export default function ManagementPortal() {
  const [selectedPeriod, setSelectedPeriod] = useState("month")

  const overviewStats = [
    { label: "Total Cases", value: "1,247", change: "+12%", trend: "up", icon: FileText, color: "text-blue-600" },
    { label: "Active Caseworkers", value: "48", change: "+3", trend: "up", icon: Users, color: "text-green-600" },
    { label: "Cases Closed", value: "89", change: "+15%", trend: "up", icon: CheckCircle2, color: "text-purple-600" },
    {
      label: "Avg Response Time",
      value: "2.3h",
      change: "-0.5h",
      trend: "down",
      icon: Clock,
      color: "text-orange-600",
    },
    { label: "Budget Utilization", value: "78%", change: "+5%", trend: "up", icon: DollarSign, color: "text-red-600" },
    { label: "Compliance Score", value: "94%", change: "+2%", trend: "up", icon: Shield, color: "text-indigo-600" },
  ]

  const teamPerformance = [
    {
      name: "Sarah Johnson",
      role: "Senior Caseworker",
      cases: 32,
      completion: 94,
      satisfaction: 4.8,
      status: "excellent",
    },
    { name: "Michael Chen", role: "Caseworker", cases: 28, completion: 89, satisfaction: 4.6, status: "good" },
    { name: "Emma Davis", role: "Caseworker", cases: 35, completion: 91, satisfaction: 4.7, status: "excellent" },
    { name: "Robert Wilson", role: "Junior Caseworker", cases: 22, completion: 85, satisfaction: 4.4, status: "good" },
    { name: "Lisa Anderson", role: "Senior Caseworker", cases: 30, completion: 88, satisfaction: 4.5, status: "good" },
  ]

  const alerts = [
    { type: "urgent", message: "3 cases overdue for review", time: "2h ago", icon: AlertTriangle },
    { type: "warning", message: "Budget threshold reached for Q4", time: "4h ago", icon: DollarSign },
    { type: "info", message: "Monthly compliance report ready", time: "1d ago", icon: FileText },
    { type: "success", message: "Team exceeded satisfaction targets", time: "2d ago", icon: Target },
  ]

  const regionalData = [
    { region: "North District", cases: 312, workers: 12, utilization: 89, satisfaction: 4.6 },
    { region: "South District", cases: 298, workers: 11, utilization: 92, satisfaction: 4.4 },
    { region: "East District", cases: 334, workers: 13, utilization: 85, satisfaction: 4.7 },
    { region: "West District", cases: 303, workers: 12, utilization: 88, satisfaction: 4.5 },
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case "excellent":
        return "bg-green-100 text-green-800"
      case "good":
        return "bg-blue-100 text-blue-800"
      case "needs-improvement":
        return "bg-yellow-100 text-yellow-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getAlertColor = (type: string) => {
    switch (type) {
      case "urgent":
        return "border-red-200 bg-red-50"
      case "warning":
        return "border-yellow-200 bg-yellow-50"
      case "success":
        return "border-green-200 bg-green-50"
      default:
        return "border-blue-200 bg-blue-50"
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-4 py-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Management Dashboard</h1>
            <p className="text-sm text-gray-600">Department of Social Services - Administrative Overview</p>
          </div>
          <div className="flex items-center space-x-3">
            <Button variant="outline" size="sm">
              <Download className="h-4 w-4 mr-2" />
              Export Report
            </Button>
            <Button variant="outline" size="sm">
              <Settings className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="sm" className="relative">
              <Bell className="h-4 w-4" />
              <span className="absolute -top-1 -right-1 h-3 w-3 bg-red-500 rounded-full"></span>
            </Button>
          </div>
        </div>
      </div>

      <div className="p-6 space-y-6">
        {/* Overview Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-6 gap-4">
          {overviewStats.map((stat, index) => (
            <Card key={index} className="border-0 shadow-sm">
              <CardContent className="p-4">
                <div className="flex items-center justify-between mb-2">
                  <stat.icon className={`h-5 w-5 ${stat.color}`} />
                  <div
                    className={`flex items-center text-xs ${stat.trend === "up" ? "text-green-600" : "text-red-600"}`}
                  >
                    <TrendingUp className={`h-3 w-3 mr-1 ${stat.trend === "down" ? "rotate-180" : ""}`} />
                    {stat.change}
                  </div>
                </div>
                <div className="space-y-1">
                  <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                  <p className="text-sm text-gray-600">{stat.label}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <Tabs defaultValue="overview" className="space-y-4">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="team">Team Performance</TabsTrigger>
            <TabsTrigger value="regional">Regional Data</TabsTrigger>
            <TabsTrigger value="compliance">Compliance</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-4">
            <div className="grid lg:grid-cols-3 gap-6">
              {/* Alerts */}
              <Card className="lg:col-span-1">
                <CardHeader>
                  <CardTitle className="text-lg flex items-center space-x-2">
                    <AlertTriangle className="h-5 w-5 text-orange-600" />
                    <span>System Alerts</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ScrollArea className="h-64">
                    <div className="space-y-3">
                      {alerts.map((alert, index) => (
                        <div key={index} className={`p-3 rounded-lg border ${getAlertColor(alert.type)}`}>
                          <div className="flex items-start space-x-2">
                            <alert.icon className="h-4 w-4 mt-0.5" />
                            <div className="flex-1">
                              <p className="text-sm font-medium">{alert.message}</p>
                              <p className="text-xs text-gray-500 mt-1">{alert.time}</p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </ScrollArea>
                </CardContent>
              </Card>

              {/* Performance Metrics */}
              <Card className="lg:col-span-2">
                <CardHeader>
                  <CardTitle className="text-lg flex items-center space-x-2">
                    <BarChart3 className="h-5 w-5 text-blue-600" />
                    <span>Department Performance</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Case Resolution Rate</span>
                        <span className="font-medium">87%</span>
                      </div>
                      <Progress value={87} className="h-2" />
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Client Satisfaction</span>
                        <span className="font-medium">92%</span>
                      </div>
                      <Progress value={92} className="h-2" />
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Staff Utilization</span>
                        <span className="font-medium">89%</span>
                      </div>
                      <Progress value={89} className="h-2" />
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Budget Efficiency</span>
                        <span className="font-medium">94%</span>
                      </div>
                      <Progress value={94} className="h-2" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="team" className="space-y-4">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg">Team Performance Overview</CardTitle>
                  <div className="flex items-center space-x-2">
                    <Input placeholder="Search team members..." className="w-64" />
                    <Button variant="outline" size="sm">
                      <Filter className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {teamPerformance.map((member, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50"
                    >
                      <div className="flex items-center space-x-4">
                        <Avatar className="h-12 w-12">
                          <AvatarImage
                            src={`/placeholder.svg?height=48&width=48&text=${member.name.split(" ")[0][0]}${member.name.split(" ")[1][0]}`}
                          />
                          <AvatarFallback>
                            {member.name.split(" ")[0][0]}
                            {member.name.split(" ")[1][0]}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-medium">{member.name}</p>
                          <p className="text-sm text-gray-600">{member.role}</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-6 text-sm">
                        <div className="text-center">
                          <p className="font-medium">{member.cases}</p>
                          <p className="text-gray-600">Cases</p>
                        </div>
                        <div className="text-center">
                          <p className="font-medium">{member.completion}%</p>
                          <p className="text-gray-600">Completion</p>
                        </div>
                        <div className="text-center">
                          <p className="font-medium">{member.satisfaction}</p>
                          <p className="text-gray-600">Rating</p>
                        </div>
                        <Badge className={getStatusColor(member.status)}>{member.status}</Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="regional" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center space-x-2">
                  <MapPin className="h-5 w-5 text-green-600" />
                  <span>Regional Performance</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid lg:grid-cols-2 gap-4">
                  {regionalData.map((region, index) => (
                    <Card key={index} className="border border-gray-200">
                      <CardContent className="p-4">
                        <div className="flex items-center justify-between mb-3">
                          <h3 className="font-medium">{region.region}</h3>
                          <Badge variant="outline">{region.workers} workers</Badge>
                        </div>
                        <div className="space-y-3">
                          <div className="flex justify-between text-sm">
                            <span>Active Cases</span>
                            <span className="font-medium">{region.cases}</span>
                          </div>
                          <div className="space-y-1">
                            <div className="flex justify-between text-sm">
                              <span>Utilization</span>
                              <span className="font-medium">{region.utilization}%</span>
                            </div>
                            <Progress value={region.utilization} className="h-2" />
                          </div>
                          <div className="flex justify-between text-sm">
                            <span>Satisfaction</span>
                            <span className="font-medium">{region.satisfaction}/5.0</span>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="compliance" className="space-y-4">
            <div className="grid lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg flex items-center space-x-2">
                    <Shield className="h-5 w-5 text-blue-600" />
                    <span>Compliance Metrics</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Documentation Compliance</span>
                        <span className="font-medium">96%</span>
                      </div>
                      <Progress value={96} className="h-2" />
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Visit Schedule Adherence</span>
                        <span className="font-medium">89%</span>
                      </div>
                      <Progress value={89} className="h-2" />
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Safety Protocol Compliance</span>
                        <span className="font-medium">98%</span>
                      </div>
                      <Progress value={98} className="h-2" />
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Training Requirements</span>
                        <span className="font-medium">92%</span>
                      </div>
                      <Progress value={92} className="h-2" />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Upcoming Audits</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-3 border rounded-lg">
                      <div>
                        <p className="font-medium">State Compliance Review</p>
                        <p className="text-sm text-gray-600">Quarterly assessment</p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-medium">Dec 15, 2024</p>
                        <Badge variant="outline" className="text-xs">
                          Scheduled
                        </Badge>
                      </div>
                    </div>
                    <div className="flex items-center justify-between p-3 border rounded-lg">
                      <div>
                        <p className="font-medium">Safety Protocol Audit</p>
                        <p className="text-sm text-gray-600">Annual review</p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-medium">Jan 8, 2025</p>
                        <Badge variant="outline" className="text-xs">
                          Upcoming
                        </Badge>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
