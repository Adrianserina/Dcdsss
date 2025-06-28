"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Clock, User, Search, Eye } from "lucide-react"

export function CaseTimeline() {
  const [searchTerm, setSearchTerm] = useState("")
  const [filterStatus, setFilterStatus] = useState("all")
  const [filterPriority, setFilterPriority] = useState("all")

  const cases = [
    {
      id: "SC-2024-001",
      clientName: "Sarah Johnson",
      type: "Mental Health Support",
      status: "active" as const,
      priority: "high" as const,
      assignedTo: "Dr. Emily Chen",
      lastUpdate: "2 hours ago",
      nextAction: "Follow-up appointment scheduled",
      riskScore: 7.2,
      timeline: [
        { date: "2024-01-15", event: "Initial assessment completed", type: "milestone" },
        { date: "2024-01-18", event: "Treatment plan developed", type: "milestone" },
        { date: "2024-01-22", event: "First counseling session", type: "appointment" },
        { date: "2024-01-25", event: "Risk assessment updated", type: "update" },
      ],
    },
    {
      id: "SC-2024-002",
      clientName: "Robert Martinez",
      type: "Elder Care",
      status: "completed" as const,
      priority: "medium" as const,
      assignedTo: "Maria Rodriguez",
      lastUpdate: "1 day ago",
      nextAction: "Case closed - successful outcome",
      riskScore: 2.1,
      timeline: [
        { date: "2024-01-10", event: "Referral received", type: "milestone" },
        { date: "2024-01-12", event: "Home visit conducted", type: "appointment" },
        { date: "2024-01-20", event: "Support services arranged", type: "milestone" },
        { date: "2024-01-24", event: "Case successfully closed", type: "milestone" },
      ],
    },
    {
      id: "SC-2024-003",
      clientName: "Lisa Thompson",
      type: "Child Protection",
      status: "urgent" as const,
      priority: "critical" as const,
      assignedTo: "James Wilson",
      lastUpdate: "30 minutes ago",
      nextAction: "Emergency intervention required",
      riskScore: 9.1,
      timeline: [
        { date: "2024-01-24", event: "Emergency referral received", type: "alert" },
        { date: "2024-01-24", event: "Initial safety assessment", type: "appointment" },
        { date: "2024-01-25", event: "Multi-agency meeting scheduled", type: "milestone" },
      ],
    },
    {
      id: "SC-2024-004",
      clientName: "Michael Brown",
      type: "Housing Support",
      status: "active" as const,
      priority: "medium" as const,
      assignedTo: "Anna Davis",
      lastUpdate: "4 hours ago",
      nextAction: "Housing application review",
      riskScore: 5.8,
      timeline: [
        { date: "2024-01-20", event: "Housing needs assessment", type: "milestone" },
        { date: "2024-01-22", event: "Application submitted", type: "update" },
        { date: "2024-01-24", event: "Supporting documents provided", type: "update" },
      ],
    },
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case "urgent":
        return "destructive"
      case "active":
        return "default"
      case "completed":
        return "secondary"
      default:
        return "outline"
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "critical":
        return "border rounded-lg"
      case "high":
        return "border rounded-lg"
      case "medium":
        return "border rounded-lg"
      case "low":
        return "border rounded-lg"
      default:
        return "border rounded-lg"
    }
  }

  const getPriorityDotColor = (priority: string) => {
    switch (priority) {
      case "critical":
        return "bg-red-500"
      case "high":
        return "bg-orange-500"
      case "medium":
        return "bg-yellow-500"
      case "low":
        return "bg-green-500"
      default:
        return "bg-gray-500"
    }
  }

  const getRiskColor = (score: number) => {
    if (score >= 8) return "text-red-600"
    if (score >= 6) return "text-orange-600"
    if (score >= 4) return "text-yellow-600"
    return "text-green-600"
  }

  const filteredCases = cases.filter((case_) => {
    const matchesSearch =
      case_.clientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      case_.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      case_.type.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = filterStatus === "all" || case_.status === filterStatus
    const matchesPriority = filterPriority === "all" || case_.priority === filterPriority

    return matchesSearch && matchesStatus && matchesPriority
  })

  return (
    <div className="space-y-6">
      {/* Filters */}
      <Card>
        <CardHeader>
          <CardTitle>Case Management</CardTitle>
          <CardDescription>Track and manage all active social care cases</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search cases, clients, or case IDs..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <Select value={filterStatus} onValueChange={setFilterStatus}>
              <SelectTrigger className="w-full md:w-40">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="urgent">Urgent</SelectItem>
                <SelectItem value="completed">Completed</SelectItem>
              </SelectContent>
            </Select>
            <Select value={filterPriority} onValueChange={setFilterPriority}>
              <SelectTrigger className="w-full md:w-40">
                <SelectValue placeholder="Priority" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Priority</SelectItem>
                <SelectItem value="critical">Critical</SelectItem>
                <SelectItem value="high">High</SelectItem>
                <SelectItem value="medium">Medium</SelectItem>
                <SelectItem value="low">Low</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Cases List */}
      <div className="space-y-4">
        {filteredCases.map((case_, index) => (
          <Card key={index} className="hover:shadow-md transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="text-lg font-semibold">{case_.clientName}</h3>
                    <Badge variant={getStatusColor(case_.status)}>{case_.status}</Badge>
                    <div
                      className={`px-2 py-1 rounded-full text-xs font-medium border ${getPriorityColor(case_.priority)}`}
                    >
                      <span
                        className={`w-2 h-2 rounded-full mr-1 inline-block ${getPriorityDotColor(case_.priority)}`}
                      ></span>
                      {case_.priority} priority
                    </div>
                  </div>
                  <div className="flex items-center gap-4 text-sm text-gray-600 mb-2">
                    <span className="flex items-center gap-1">
                      <User className="w-4 h-4" />
                      Case ID: {case_.id}
                    </span>
                    <span>{case_.type}</span>
                    <span>Assigned to: {case_.assignedTo}</span>
                  </div>
                  <div className="flex items-center gap-4 text-sm">
                    <span className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      Updated {case_.lastUpdate}
                    </span>
                    <span className={`font-medium ${getRiskColor(case_.riskScore)}`}>
                      Risk Score: {case_.riskScore}/10
                    </span>
                  </div>
                </div>
                <Button variant="outline" size="sm">
                  <Eye className="w-4 h-4 mr-2" />
                  View Details
                </Button>
              </div>

              <div className="bg-muted p-3 rounded-lg mb-4">
                <div className="text-sm font-medium mb-1">Next Action:</div>
                <div className="text-sm text-gray-700">{case_.nextAction}</div>
              </div>

              {/* Timeline */}
              <div className="space-y-2">
                <div className="text-sm font-medium">Recent Timeline:</div>
                <div className="space-y-2">
                  {case_.timeline.slice(-3).map((event, idx) => (
                    <div key={idx} className="flex items-center gap-3 text-sm">
                      <div
                        className={`w-1 h-1 rounded-full ${
                          event.type === "alert"
                            ? "bg-red-500"
                            : event.type === "milestone"
                              ? "bg-blue-500"
                              : event.type === "appointment"
                                ? "bg-green-500"
                                : "bg-gray-500"
                        }`}
                      />
                      <span className="text-gray-600">{event.date}</span>
                      <span>{event.event}</span>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredCases.length === 0 && (
        <Card>
          <CardContent className="text-center py-8">
            <div className="text-gray-500">No cases found matching your criteria</div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
