"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ScrollArea } from "@/components/ui/scroll-area"
import {
  Heart,
  Calendar,
  FileText,
  MessageSquare,
  Phone,
  Video,
  Download,
  Upload,
  Bell,
  Home,
  GraduationCap,
  Stethoscope,
  DollarSign,
  MapPin,
  Clock,
  Info,
} from "lucide-react"

export default function GuardianPortal() {
  const [activeChild, setActiveChild] = useState("emma")

  const children = [
    {
      id: "emma",
      name: "Emma Johnson",
      age: 8,
      status: "active",
      caseworker: "Sarah Wilson",
      nextVisit: "Dec 15, 2024",
      photo: "/placeholder.svg?height=40&width=40&text=EJ",
    },
    {
      id: "michael",
      name: "Michael Johnson",
      age: 12,
      status: "active",
      caseworker: "Sarah Wilson",
      nextVisit: "Dec 15, 2024",
      photo: "/placeholder.svg?height=40&width=40&text=MJ",
    },
  ]

  const caseUpdates = [
    {
      date: "Dec 10, 2024",
      type: "visit",
      title: "Home Visit Completed",
      description: "Regular check-in completed. Emma is doing well in school and at home.",
      caseworker: "Sarah Wilson",
      status: "completed",
    },
    {
      date: "Dec 8, 2024",
      type: "document",
      title: "School Report Received",
      description: "Emma's quarterly school report shows excellent progress in reading and math.",
      caseworker: "Sarah Wilson",
      status: "new",
    },
    {
      date: "Dec 5, 2024",
      type: "appointment",
      title: "Medical Checkup Scheduled",
      description: "Annual physical examination scheduled for December 20th.",
      caseworker: "Sarah Wilson",
      status: "scheduled",
    },
  ]

  const upcomingAppointments = [
    {
      date: "Dec 15, 2024",
      time: "2:00 PM",
      type: "Home Visit",
      with: "Sarah Wilson",
      location: "Your Home",
      status: "confirmed",
    },
    {
      date: "Dec 20, 2024",
      time: "10:30 AM",
      type: "Medical Checkup",
      with: "Dr. Martinez",
      location: "Children's Health Center",
      status: "confirmed",
    },
    {
      date: "Dec 22, 2024",
      time: "3:00 PM",
      type: "Therapy Session",
      with: "Lisa Thompson",
      location: "Family Services Center",
      status: "pending",
    },
  ]

  const documents = [
    { name: "Care Plan - December 2024", type: "PDF", date: "Dec 10, 2024", size: "2.3 MB", status: "new" },
    { name: "School Report - Q4", type: "PDF", date: "Dec 8, 2024", size: "1.1 MB", status: "viewed" },
    { name: "Medical Records Update", type: "PDF", date: "Dec 5, 2024", size: "3.2 MB", status: "viewed" },
    { name: "Court Order - Custody", type: "PDF", date: "Nov 28, 2024", size: "1.8 MB", status: "viewed" },
  ]

  const resources = [
    {
      title: "Parenting Support Groups",
      description: "Weekly support meetings for foster and adoptive parents",
      category: "Support",
      icon: Heart,
      link: "#",
    },
    {
      title: "Educational Resources",
      description: "Tutoring and educational support programs",
      category: "Education",
      icon: GraduationCap,
      link: "#",
    },
    {
      title: "Healthcare Navigation",
      description: "Help accessing medical and mental health services",
      category: "Health",
      icon: Stethoscope,
      link: "#",
    },
    {
      title: "Financial Assistance",
      description: "Information about available financial support programs",
      category: "Financial",
      icon: DollarSign,
      link: "#",
    },
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case "new":
        return "bg-blue-100 text-blue-800"
      case "completed":
        return "bg-green-100 text-green-800"
      case "scheduled":
        return "bg-yellow-100 text-yellow-800"
      case "confirmed":
        return "bg-green-100 text-green-800"
      case "pending":
        return "bg-orange-100 text-orange-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "visit":
        return Home
      case "document":
        return FileText
      case "appointment":
        return Calendar
      default:
        return Info
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-4 py-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Guardian Portal</h1>
            <p className="text-sm text-gray-600">Welcome back, Jennifer Johnson</p>
          </div>
          <div className="flex items-center space-x-3">
            <Button variant="outline" size="sm">
              <MessageSquare className="h-4 w-4 mr-2" />
              Contact Caseworker
            </Button>
            <Button variant="outline" size="sm" className="relative">
              <Bell className="h-4 w-4" />
              <span className="absolute -top-1 -right-1 h-3 w-3 bg-red-500 rounded-full"></span>
            </Button>
          </div>
        </div>
      </div>

      <div className="p-6 space-y-6">
        {/* Child Selection */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Your Children</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex space-x-4">
              {children.map((child) => (
                <div
                  key={child.id}
                  onClick={() => setActiveChild(child.id)}
                  className={`flex items-center space-x-3 p-3 rounded-lg border cursor-pointer transition-colors ${
                    activeChild === child.id ? "border-blue-500 bg-blue-50" : "border-gray-200 hover:bg-gray-50"
                  }`}
                >
                  <Avatar className="h-12 w-12">
                    <AvatarImage src={child.photo || "/placeholder.svg"} />
                    <AvatarFallback>
                      {child.name.split(" ")[0][0]}
                      {child.name.split(" ")[1][0]}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-medium">{child.name}</p>
                    <p className="text-sm text-gray-600">Age {child.age}</p>
                    <p className="text-xs text-gray-500">Next visit: {child.nextVisit}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <Button variant="outline" className="h-20 flex-col space-y-2">
            <Phone className="h-5 w-5 text-blue-600" />
            <span className="text-sm">Call Caseworker</span>
          </Button>
          <Button variant="outline" className="h-20 flex-col space-y-2">
            <Video className="h-5 w-5 text-green-600" />
            <span className="text-sm">Video Call</span>
          </Button>
          <Button variant="outline" className="h-20 flex-col space-y-2">
            <Calendar className="h-5 w-5 text-purple-600" />
            <span className="text-sm">Schedule Visit</span>
          </Button>
          <Button variant="outline" className="h-20 flex-col space-y-2">
            <Upload className="h-5 w-5 text-orange-600" />
            <span className="text-sm">Upload Document</span>
          </Button>
        </div>

        <Tabs defaultValue="updates" className="space-y-4">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="updates">Case Updates</TabsTrigger>
            <TabsTrigger value="appointments">Appointments</TabsTrigger>
            <TabsTrigger value="documents">Documents</TabsTrigger>
            <TabsTrigger value="resources">Resources</TabsTrigger>
          </TabsList>

          <TabsContent value="updates" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Recent Case Updates</CardTitle>
              </CardHeader>
              <CardContent>
                <ScrollArea className="h-96">
                  <div className="space-y-4">
                    {caseUpdates.map((update, index) => {
                      const IconComponent = getTypeIcon(update.type)
                      return (
                        <div key={index} className="flex items-start space-x-4 p-4 border rounded-lg">
                          <div className="bg-blue-100 p-2 rounded-lg">
                            <IconComponent className="h-4 w-4 text-blue-600" />
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center justify-between mb-2">
                              <h3 className="font-medium">{update.title}</h3>
                              <Badge className={getStatusColor(update.status)}>{update.status}</Badge>
                            </div>
                            <p className="text-sm text-gray-600 mb-2">{update.description}</p>
                            <div className="flex items-center space-x-4 text-xs text-gray-500">
                              <span>{update.date}</span>
                              <span>By {update.caseworker}</span>
                            </div>
                          </div>
                        </div>
                      )
                    })}
                  </div>
                </ScrollArea>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="appointments" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Upcoming Appointments</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {upcomingAppointments.map((appointment, index) => (
                    <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center space-x-4">
                        <div className="bg-green-100 p-2 rounded-lg">
                          <Calendar className="h-4 w-4 text-green-600" />
                        </div>
                        <div>
                          <h3 className="font-medium">{appointment.type}</h3>
                          <p className="text-sm text-gray-600">with {appointment.with}</p>
                          <div className="flex items-center space-x-2 text-xs text-gray-500 mt-1">
                            <Clock className="h-3 w-3" />
                            <span>
                              {appointment.date} at {appointment.time}
                            </span>
                            <MapPin className="h-3 w-3 ml-2" />
                            <span>{appointment.location}</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Badge className={getStatusColor(appointment.status)}>{appointment.status}</Badge>
                        <Button variant="outline" size="sm">
                          Reschedule
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="documents" className="space-y-4">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg">Case Documents</CardTitle>
                  <Button variant="outline" size="sm">
                    <Upload className="h-4 w-4 mr-2" />
                    Upload Document
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {documents.map((doc, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-3 border rounded-lg hover:bg-gray-50"
                    >
                      <div className="flex items-center space-x-3">
                        <FileText className="h-5 w-5 text-blue-600" />
                        <div>
                          <p className="font-medium text-sm">{doc.name}</p>
                          <div className="flex items-center space-x-2 text-xs text-gray-500">
                            <span>{doc.date}</span>
                            <span>•</span>
                            <span>{doc.size}</span>
                            <span>•</span>
                            <span>{doc.type}</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        {doc.status === "new" && <Badge className="bg-blue-100 text-blue-800 text-xs">New</Badge>}
                        <Button variant="outline" size="sm">
                          <Download className="h-3 w-3 mr-1" />
                          Download
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="resources" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Available Resources</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-4">
                  {resources.map((resource, index) => (
                    <Card
                      key={index}
                      className="border border-gray-200 hover:shadow-md transition-shadow cursor-pointer"
                    >
                      <CardContent className="p-4">
                        <div className="flex items-start space-x-3">
                          <div className="bg-blue-100 p-2 rounded-lg">
                            <resource.icon className="h-5 w-5 text-blue-600" />
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center justify-between mb-2">
                              <h3 className="font-medium">{resource.title}</h3>
                              <Badge variant="outline" className="text-xs">
                                {resource.category}
                              </Badge>
                            </div>
                            <p className="text-sm text-gray-600 mb-3">{resource.description}</p>
                            <Button variant="outline" size="sm" className="w-full">
                              Learn More
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
