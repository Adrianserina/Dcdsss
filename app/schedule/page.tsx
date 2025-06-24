"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import {
  Calendar,
  Clock,
  MapPin,
  Plus,
  Search,
  Filter,
  ChevronLeft,
  ChevronRight,
  User,
  Phone,
  Video,
  Home,
  Building,
  Car,
  Edit,
  Trash2,
} from "lucide-react"

interface Appointment {
  id: string
  title: string
  clientName: string
  caseId: string
  type: "home-visit" | "office-meeting" | "phone-call" | "video-call" | "court-hearing" | "medical-transport"
  date: string
  time: string
  duration: number
  location: string
  status: "scheduled" | "confirmed" | "completed" | "cancelled" | "no-show"
  priority: "low" | "medium" | "high" | "urgent"
  notes?: string
  aiSuggested?: boolean
}

export default function SchedulePage() {
  const [currentDate, setCurrentDate] = useState(new Date())
  const [viewMode, setViewMode] = useState<"month" | "week" | "day">("week")
  const [selectedDate, setSelectedDate] = useState<Date | null>(null)
  const [isAddingAppointment, setIsAddingAppointment] = useState(false)
  const [appointments, setAppointments] = useState<Appointment[]>([
    {
      id: "1",
      title: "Home Visit - Wellness Check",
      clientName: "Sarah Johnson",
      caseId: "C001",
      type: "home-visit",
      date: "2024-12-15",
      time: "14:00",
      duration: 60,
      location: "123 Main St, Downtown",
      status: "confirmed",
      priority: "high",
      notes: "Follow up on medication compliance and heating concerns",
    },
    {
      id: "2",
      title: "Medical Transport",
      clientName: "Michael Chen",
      caseId: "C002",
      type: "medical-transport",
      date: "2024-12-15",
      time: "10:30",
      duration: 120,
      location: "City Medical Center",
      status: "scheduled",
      priority: "medium",
    },
    {
      id: "3",
      title: "Case Review Meeting",
      clientName: "Emma Davis",
      caseId: "C003",
      type: "office-meeting",
      date: "2024-12-16",
      time: "09:00",
      duration: 45,
      location: "Office Conference Room A",
      status: "confirmed",
      priority: "medium",
    },
    {
      id: "4",
      title: "Court Hearing",
      clientName: "Robert Wilson",
      caseId: "C004",
      type: "court-hearing",
      date: "2024-12-16",
      time: "13:30",
      duration: 90,
      location: "Family Court Building",
      status: "scheduled",
      priority: "urgent",
    },
    {
      id: "5",
      title: "AI Suggested: Crisis Check-in",
      clientName: "Lisa Anderson",
      caseId: "C005",
      type: "phone-call",
      date: "2024-12-17",
      time: "11:00",
      duration: 30,
      location: "Phone Call",
      status: "scheduled",
      priority: "urgent",
      aiSuggested: true,
      notes: "AI detected increased risk factors - immediate check-in recommended",
    },
  ])

  const getAppointmentIcon = (type: string) => {
    switch (type) {
      case "home-visit":
        return Home
      case "office-meeting":
        return Building
      case "phone-call":
        return Phone
      case "video-call":
        return Video
      case "court-hearing":
        return Building
      case "medical-transport":
        return Car
      default:
        return Calendar
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "confirmed":
        return "bg-green-100 text-green-800"
      case "scheduled":
        return "bg-blue-100 text-blue-800"
      case "completed":
        return "bg-gray-100 text-gray-800"
      case "cancelled":
        return "bg-red-100 text-red-800"
      case "no-show":
        return "bg-orange-100 text-orange-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "urgent":
        return "border-l-red-500"
      case "high":
        return "border-l-orange-500"
      case "medium":
        return "border-l-yellow-500"
      case "low":
        return "border-l-green-500"
      default:
        return "border-l-gray-500"
    }
  }

  const formatTime = (time: string) => {
    const [hours, minutes] = time.split(":")
    const hour = Number.parseInt(hours)
    const ampm = hour >= 12 ? "PM" : "AM"
    const displayHour = hour % 12 || 12
    return `${displayHour}:${minutes} ${ampm}`
  }

  const getWeekDays = () => {
    const start = new Date(currentDate)
    start.setDate(start.getDate() - start.getDay())

    const days = []
    for (let i = 0; i < 7; i++) {
      const day = new Date(start)
      day.setDate(start.getDate() + i)
      days.push(day)
    }
    return days
  }

  const getAppointmentsForDate = (date: Date) => {
    const dateString = date.toISOString().split("T")[0]
    return appointments.filter((apt) => apt.date === dateString)
  }

  const navigateWeek = (direction: "prev" | "next") => {
    const newDate = new Date(currentDate)
    newDate.setDate(newDate.getDate() + (direction === "next" ? 7 : -7))
    setCurrentDate(newDate)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Schedule Management</h1>
            <p className="text-sm text-gray-600">Manage appointments, visits, and meetings</p>
          </div>
          <div className="flex items-center space-x-3">
            <div className="flex items-center space-x-2">
              <Button variant="outline" size="sm" onClick={() => navigateWeek("prev")}>
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="sm" onClick={() => setCurrentDate(new Date())}>
                Today
              </Button>
              <Button variant="outline" size="sm" onClick={() => navigateWeek("next")}>
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
            <Select value={viewMode} onValueChange={(value: "month" | "week" | "day") => setViewMode(value)}>
              <SelectTrigger className="w-32">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="day">Day</SelectItem>
                <SelectItem value="week">Week</SelectItem>
                <SelectItem value="month">Month</SelectItem>
              </SelectContent>
            </Select>
            <Dialog open={isAddingAppointment} onOpenChange={setIsAddingAppointment}>
              <DialogTrigger asChild>
                <Button>
                  <Plus className="h-4 w-4 mr-2" />
                  New Appointment
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-md">
                <DialogHeader>
                  <DialogTitle>Schedule New Appointment</DialogTitle>
                </DialogHeader>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label>Client</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select client" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="C001">Sarah Johnson</SelectItem>
                        <SelectItem value="C002">Michael Chen</SelectItem>
                        <SelectItem value="C003">Emma Davis</SelectItem>
                        <SelectItem value="C004">Robert Wilson</SelectItem>
                        <SelectItem value="C005">Lisa Anderson</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label>Appointment Type</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="home-visit">Home Visit</SelectItem>
                        <SelectItem value="office-meeting">Office Meeting</SelectItem>
                        <SelectItem value="phone-call">Phone Call</SelectItem>
                        <SelectItem value="video-call">Video Call</SelectItem>
                        <SelectItem value="court-hearing">Court Hearing</SelectItem>
                        <SelectItem value="medical-transport">Medical Transport</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Date</Label>
                      <Input type="date" />
                    </div>
                    <div className="space-y-2">
                      <Label>Time</Label>
                      <Input type="time" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label>Duration (minutes)</Label>
                    <Input type="number" placeholder="60" />
                  </div>
                  <div className="space-y-2">
                    <Label>Location</Label>
                    <Input placeholder="Enter location" />
                  </div>
                  <div className="space-y-2">
                    <Label>Priority</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select priority" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="low">Low</SelectItem>
                        <SelectItem value="medium">Medium</SelectItem>
                        <SelectItem value="high">High</SelectItem>
                        <SelectItem value="urgent">Urgent</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label>Notes</Label>
                    <Textarea placeholder="Additional notes..." rows={3} />
                  </div>
                  <div className="flex justify-end space-x-2">
                    <Button variant="outline" onClick={() => setIsAddingAppointment(false)}>
                      Cancel
                    </Button>
                    <Button onClick={() => setIsAddingAppointment(false)}>Schedule</Button>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </div>

      <div className="p-6">
        {/* Week View */}
        {viewMode === "week" && (
          <div className="space-y-4">
            {/* Week Header */}
            <div className="text-center">
              <h2 className="text-xl font-semibold">
                {currentDate.toLocaleDateString("en-US", { month: "long", year: "numeric" })}
              </h2>
            </div>

            {/* Calendar Grid */}
            <div className="grid grid-cols-7 gap-4">
              {getWeekDays().map((day, index) => {
                const dayAppointments = getAppointmentsForDate(day)
                const isToday = day.toDateString() === new Date().toDateString()

                return (
                  <Card key={index} className={`min-h-96 ${isToday ? "ring-2 ring-blue-500" : ""}`}>
                    <CardHeader className="pb-2">
                      <div className="text-center">
                        <p className="text-sm font-medium text-gray-600">
                          {day.toLocaleDateString("en-US", { weekday: "short" })}
                        </p>
                        <p className={`text-lg font-bold ${isToday ? "text-blue-600" : "text-gray-900"}`}>
                          {day.getDate()}
                        </p>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-2">
                      {dayAppointments.map((appointment) => {
                        const IconComponent = getAppointmentIcon(appointment.type)
                        return (
                          <div
                            key={appointment.id}
                            className={`p-2 rounded-lg border-l-4 ${getPriorityColor(appointment.priority)} bg-white shadow-sm hover:shadow-md transition-shadow cursor-pointer`}
                          >
                            <div className="flex items-start space-x-2">
                              <IconComponent className="h-3 w-3 mt-1 text-gray-600" />
                              <div className="flex-1 min-w-0">
                                <p className="text-xs font-medium text-gray-900 truncate">
                                  {formatTime(appointment.time)}
                                </p>
                                <p className="text-xs text-gray-600 truncate">{appointment.clientName}</p>
                                <p className="text-xs text-gray-500 truncate">{appointment.title}</p>
                                <div className="flex items-center justify-between mt-1">
                                  <Badge className={`text-xs ${getStatusColor(appointment.status)}`}>
                                    {appointment.status}
                                  </Badge>
                                  {appointment.aiSuggested && (
                                    <Badge variant="outline" className="text-xs bg-purple-100 text-purple-800">
                                      AI
                                    </Badge>
                                  )}
                                </div>
                              </div>
                            </div>
                          </div>
                        )
                      })}
                      {dayAppointments.length === 0 && (
                        <div className="text-center py-8 text-gray-400">
                          <Calendar className="h-6 w-6 mx-auto mb-2 opacity-50" />
                          <p className="text-xs">No appointments</p>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                )
              })}
            </div>
          </div>
        )}

        {/* Upcoming Appointments List */}
        <Card className="mt-6">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg">Upcoming Appointments</CardTitle>
              <div className="flex items-center space-x-2">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input placeholder="Search appointments..." className="pl-10 w-64" />
                </div>
                <Button variant="outline" size="sm">
                  <Filter className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {appointments
                .filter((apt) => new Date(apt.date) >= new Date())
                .sort((a, b) => new Date(a.date + " " + a.time).getTime() - new Date(b.date + " " + b.time).getTime())
                .map((appointment) => {
                  const IconComponent = getAppointmentIcon(appointment.type)
                  return (
                    <div
                      key={appointment.id}
                      className={`flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 border-l-4 ${getPriorityColor(appointment.priority)}`}
                    >
                      <div className="flex items-center space-x-4">
                        <div className="bg-blue-100 p-2 rounded-lg">
                          <IconComponent className="h-4 w-4 text-blue-600" />
                        </div>
                        <div>
                          <div className="flex items-center space-x-2 mb-1">
                            <h4 className="font-medium">{appointment.title}</h4>
                            {appointment.aiSuggested && (
                              <Badge variant="outline" className="text-xs bg-purple-100 text-purple-800">
                                AI Suggested
                              </Badge>
                            )}
                          </div>
                          <div className="flex items-center space-x-4 text-sm text-gray-600">
                            <div className="flex items-center space-x-1">
                              <User className="h-3 w-3" />
                              <span>{appointment.clientName}</span>
                            </div>
                            <div className="flex items-center space-x-1">
                              <Clock className="h-3 w-3" />
                              <span>
                                {appointment.date} at {formatTime(appointment.time)}
                              </span>
                            </div>
                            <div className="flex items-center space-x-1">
                              <MapPin className="h-3 w-3" />
                              <span>{appointment.location}</span>
                            </div>
                          </div>
                          {appointment.notes && <p className="text-xs text-gray-500 mt-1">{appointment.notes}</p>}
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Badge className={getStatusColor(appointment.status)}>{appointment.status}</Badge>
                        <Button variant="outline" size="sm">
                          <Edit className="h-3 w-3 mr-1" />
                          Edit
                        </Button>
                        <Button variant="outline" size="sm">
                          <Trash2 className="h-3 w-3" />
                        </Button>
                      </div>
                    </div>
                  )
                })}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
