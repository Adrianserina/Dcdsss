"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Calendar,
  MessageSquare,
  FileText,
  Phone,
  Clock,
  User,
  Heart,
  Home,
  AlertCircle,
  CheckCircle,
  Settings,
  LogOut,
} from "lucide-react"
import { ThemeToggle } from "./theme-toggle"

interface FamilyDashboardProps {
  userId: string
  userRole: string
  onLogout: () => void
}

export function FamilyDashboard({ userId, userRole, onLogout }: FamilyDashboardProps) {
  const [activeTab, setActiveTab] = useState("overview")

  const getRoleDisplayName = (role: string) => {
    return role === "parent" ? "Parent/Caregiver" : "Guardian"
  }

  // Mock data for family dashboard
  const familyData = {
    childName: "Emma Johnson",
    caseWorker: "Sarah Martinez",
    nextAppointment: "Jan 28, 2024 at 2:00 PM",
    recentUpdates: [
      { date: "Jan 20", update: "Care plan updated with new goals", type: "update" },
      { date: "Jan 18", update: "Appointment scheduled for next week", type: "appointment" },
      { date: "Jan 15", update: "Progress review completed", type: "milestone" },
    ],
    upcomingAppointments: [
      { date: "Jan 28", time: "2:00 PM", type: "Regular Check-in", location: "Community Center" },
      { date: "Feb 5", time: "10:00 AM", type: "Family Meeting", location: "Office Visit" },
    ],
    carePlan: {
      goals: [
        { goal: "Improve school attendance", status: "in-progress", progress: 75 },
        { goal: "Family communication skills", status: "completed", progress: 100 },
        { goal: "Community engagement", status: "not-started", progress: 0 },
      ],
      services: ["Family Counseling", "Educational Support", "Community Resources"],
    },
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b bg-card">
        <div className="max-w-6xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div>
                <h1 className="text-xl md:text-2xl font-bold">Social Care Sync</h1>
                <p className="text-sm text-muted-foreground">Welcome back, {getRoleDisplayName(userRole)}</p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
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

      <div className="max-w-6xl mx-auto p-4 space-y-6">
        {/* Quick Info Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm text-muted-foreground">Care Recipient</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-3">
                <div className="p-2 bg-muted rounded-lg">
                  <User className="h-5 w-5" />
                </div>
                <div>
                  <div className="font-semibold">{familyData.childName}</div>
                  <div className="text-sm text-muted-foreground">Active Care Plan</div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm text-muted-foreground">Case Worker</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-3">
                <div className="p-2 bg-muted rounded-lg">
                  <Heart className="h-5 w-5" />
                </div>
                <div>
                  <div className="font-semibold">{familyData.caseWorker}</div>
                  <Button variant="link" size="sm" className="p-0 h-auto text-xs">
                    <Phone className="h-3 w-3 mr-1" />
                    Contact
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm text-muted-foreground">Next Appointment</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-3">
                <div className="p-2 bg-muted rounded-lg">
                  <Calendar className="h-5 w-5" />
                </div>
                <div>
                  <div className="font-semibold text-sm">{familyData.nextAppointment}</div>
                  <Button variant="link" size="sm" className="p-0 h-auto text-xs">
                    View Details
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="appointments">Appointments</TabsTrigger>
            <TabsTrigger value="care-plan">Care Plan</TabsTrigger>
            <TabsTrigger value="resources">Resources</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Recent Updates */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <MessageSquare className="w-5 h-5" />
                    Recent Updates
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {familyData.recentUpdates.map((update, index) => (
                      <div key={index} className="flex items-start gap-3 p-3 border rounded-lg">
                        <div
                          className={`w-2 h-2 rounded-full mt-2 ${
                            update.type === "milestone"
                              ? "bg-green-500"
                              : update.type === "appointment"
                                ? "bg-blue-500"
                                : "bg-gray-500"
                          }`}
                        />
                        <div className="flex-1">
                          <div className="text-sm">{update.update}</div>
                          <div className="text-xs text-muted-foreground mt-1">{update.date}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Quick Actions */}
              <Card>
                <CardHeader>
                  <CardTitle>Quick Actions</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Button variant="outline" className="w-full justify-start">
                    <Calendar className="w-4 h-4 mr-2" />
                    Schedule Appointment
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <MessageSquare className="w-4 h-4 mr-2" />
                    Message Case Worker
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <FileText className="w-4 h-4 mr-2" />
                    View Documents
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <Home className="w-4 h-4 mr-2" />
                    Find Resources
                  </Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="appointments">
            <Card>
              <CardHeader>
                <CardTitle>Upcoming Appointments</CardTitle>
                <CardDescription>Your scheduled meetings and check-ins</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {familyData.upcomingAppointments.map((appointment, index) => (
                    <div key={index} className="border rounded-lg p-4">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-3">
                          <Calendar className="w-5 h-5 text-blue-500" />
                          <div>
                            <div className="font-semibold">{appointment.type}</div>
                            <div className="text-sm text-muted-foreground">
                              {appointment.date} at {appointment.time}
                            </div>
                          </div>
                        </div>
                        <Badge variant="outline">{appointment.location}</Badge>
                      </div>
                      <div className="flex gap-2 mt-3">
                        <Button variant="outline" size="sm">
                          <Clock className="w-3 w-3 mr-1" />
                          Reschedule
                        </Button>
                        <Button variant="outline" size="sm">
                          <MessageSquare className="w-3 w-3 mr-1" />
                          Add Note
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="care-plan">
            <Card>
              <CardHeader>
                <CardTitle>Care Plan Progress</CardTitle>
                <CardDescription>Track progress on care goals and services</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div>
                    <h4 className="font-semibold mb-3">Current Goals</h4>
                    <div className="space-y-4">
                      {familyData.carePlan.goals.map((goal, index) => (
                        <div key={index} className="border rounded-lg p-4">
                          <div className="flex items-center justify-between mb-2">
                            <div className="font-medium">{goal.goal}</div>
                            <div className="flex items-center gap-2">
                              {goal.status === "completed" ? (
                                <CheckCircle className="w-4 h-4 text-green-500" />
                              ) : goal.status === "in-progress" ? (
                                <Clock className="w-4 h-4 text-blue-500" />
                              ) : (
                                <AlertCircle className="w-4 h-4 text-gray-400" />
                              )}
                              <Badge
                                variant={
                                  goal.status === "completed"
                                    ? "default"
                                    : goal.status === "in-progress"
                                      ? "secondary"
                                      : "outline"
                                }
                              >
                                {goal.status.replace("-", " ")}
                              </Badge>
                            </div>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-2">
                            <div
                              className="bg-blue-500 h-2 rounded-full transition-all duration-300"
                              style={{ width: `${goal.progress}%` }}
                            />
                          </div>
                          <div className="text-xs text-muted-foreground mt-1">{goal.progress}% complete</div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h4 className="font-semibold mb-3">Active Services</h4>
                    <div className="flex flex-wrap gap-2">
                      {familyData.carePlan.services.map((service, index) => (
                        <Badge key={index} variant="secondary">
                          {service}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="resources">
            <Card>
              <CardHeader>
                <CardTitle>Available Resources</CardTitle>
                <CardDescription>Helpful resources and support materials</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="border rounded-lg p-4">
                    <div className="flex items-center gap-3 mb-2">
                      <Home className="w-5 h-5 text-blue-500" />
                      <div className="font-semibold">Housing Assistance</div>
                    </div>
                    <p className="text-sm text-muted-foreground mb-3">
                      Information about local housing programs and support
                    </p>
                    <Button variant="outline" size="sm">
                      View Resources
                    </Button>
                  </div>

                  <div className="border rounded-lg p-4">
                    <div className="flex items-center gap-3 mb-2">
                      <Heart className="w-5 h-5 text-red-500" />
                      <div className="font-semibold">Mental Health Support</div>
                    </div>
                    <p className="text-sm text-muted-foreground mb-3">
                      Counseling services and mental health resources
                    </p>
                    <Button variant="outline" size="sm">
                      View Resources
                    </Button>
                  </div>

                  <div className="border rounded-lg p-4">
                    <div className="flex items-center gap-3 mb-2">
                      <FileText className="w-5 h-5 text-green-500" />
                      <div className="font-semibold">Educational Support</div>
                    </div>
                    <p className="text-sm text-muted-foreground mb-3">School programs and educational assistance</p>
                    <Button variant="outline" size="sm">
                      View Resources
                    </Button>
                  </div>

                  <div className="border rounded-lg p-4">
                    <div className="flex items-center gap-3 mb-2">
                      <Phone className="w-5 h-5 text-purple-500" />
                      <div className="font-semibold">Emergency Contacts</div>
                    </div>
                    <p className="text-sm text-muted-foreground mb-3">Important phone numbers and crisis support</p>
                    <Button variant="outline" size="sm">
                      View Contacts
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
