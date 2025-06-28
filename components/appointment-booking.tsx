"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Badge } from "@/components/ui/badge"
import { CalendarIcon, Clock, User, MapPin, Plus, X } from "lucide-react"
import { format } from "date-fns"

interface AppointmentBookingProps {
  userRole: string
  onBookingComplete?: (appointment: any) => void
}

export function AppointmentBooking({ userRole, onBookingComplete }: AppointmentBookingProps) {
  const [selectedDate, setSelectedDate] = useState<Date>()
  const [selectedTime, setSelectedTime] = useState("")
  const [appointmentType, setAppointmentType] = useState("")
  const [location, setLocation] = useState("")
  const [notes, setNotes] = useState("")
  const [participants, setParticipants] = useState<string[]>([])
  const [newParticipant, setNewParticipant] = useState("")

  const appointmentTypes =
    userRole === "parent" || userRole === "guardian"
      ? ["Regular Check-in", "Family Meeting", "Care Plan Review", "Emergency Consultation", "Resource Planning"]
      : [
          "Client Assessment",
          "Home Visit",
          "Team Meeting",
          "Court Hearing",
          "Multi-agency Meeting",
          "Family Conference",
          "Crisis Intervention",
          "Follow-up Visit",
        ]

  const timeSlots = [
    "09:00 AM",
    "09:30 AM",
    "10:00 AM",
    "10:30 AM",
    "11:00 AM",
    "11:30 AM",
    "01:00 PM",
    "01:30 PM",
    "02:00 PM",
    "02:30 PM",
    "03:00 PM",
    "03:30 PM",
    "04:00 PM",
    "04:30 PM",
  ]

  const locations = [
    "Office - Main Building",
    "Office - Satellite Location",
    "Client Home",
    "Community Center",
    "School",
    "Court House",
    "Virtual Meeting",
  ]

  const addParticipant = () => {
    if (newParticipant.trim() && !participants.includes(newParticipant.trim())) {
      setParticipants([...participants, newParticipant.trim()])
      setNewParticipant("")
    }
  }

  const removeParticipant = (participant: string) => {
    setParticipants(participants.filter((p) => p !== participant))
  }

  const handleBooking = () => {
    if (!selectedDate || !selectedTime || !appointmentType || !location) {
      return
    }

    const appointment = {
      id: Date.now().toString(),
      date: selectedDate,
      time: selectedTime,
      type: appointmentType,
      location,
      notes,
      participants,
      status: "scheduled",
      createdBy: userRole,
    }

    onBookingComplete?.(appointment)

    // Reset form
    setSelectedDate(undefined)
    setSelectedTime("")
    setAppointmentType("")
    setLocation("")
    setNotes("")
    setParticipants([])
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <CalendarIcon className="w-5 h-5" />
          Book Appointment
        </CardTitle>
        <CardDescription>Schedule a new appointment or meeting</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Date Selection */}
        <div className="space-y-2">
          <Label>Select Date</Label>
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline" className="w-full justify-start text-left font-normal">
                <CalendarIcon className="mr-2 h-4 w-4" />
                {selectedDate ? format(selectedDate, "PPP") : "Pick a date"}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
              <Calendar mode="single" selected={selectedDate} onSelect={setSelectedDate} initialFocus />
            </PopoverContent>
          </Popover>
        </div>

        {/* Time Selection */}
        <div className="space-y-2">
          <Label>Select Time</Label>
          <Select value={selectedTime} onValueChange={setSelectedTime}>
            <SelectTrigger>
              <SelectValue placeholder="Choose time slot" />
            </SelectTrigger>
            <SelectContent>
              {timeSlots.map((time) => (
                <SelectItem key={time} value={time}>
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4" />
                    {time}
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Appointment Type */}
        <div className="space-y-2">
          <Label>Appointment Type</Label>
          <Select value={appointmentType} onValueChange={setAppointmentType}>
            <SelectTrigger>
              <SelectValue placeholder="Select appointment type" />
            </SelectTrigger>
            <SelectContent>
              {appointmentTypes.map((type) => (
                <SelectItem key={type} value={type}>
                  {type}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Location */}
        <div className="space-y-2">
          <Label>Location</Label>
          <Select value={location} onValueChange={setLocation}>
            <SelectTrigger>
              <SelectValue placeholder="Select location" />
            </SelectTrigger>
            <SelectContent>
              {locations.map((loc) => (
                <SelectItem key={loc} value={loc}>
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4" />
                    {loc}
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Participants (for professionals) */}
        {userRole !== "parent" && userRole !== "guardian" && (
          <div className="space-y-2">
            <Label>Participants</Label>
            <div className="flex gap-2">
              <Input
                placeholder="Add participant name or email"
                value={newParticipant}
                onChange={(e) => setNewParticipant(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && addParticipant()}
              />
              <Button type="button" onClick={addParticipant} size="sm">
                <Plus className="w-4 h-4" />
              </Button>
            </div>
            {participants.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-2">
                {participants.map((participant) => (
                  <Badge key={participant} variant="secondary" className="flex items-center gap-1">
                    <User className="w-3 h-3" />
                    {participant}
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-auto p-0 ml-1"
                      onClick={() => removeParticipant(participant)}
                    >
                      <X className="w-3 h-3" />
                    </Button>
                  </Badge>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Notes */}
        <div className="space-y-2">
          <Label>Notes (Optional)</Label>
          <Textarea
            placeholder="Add any additional notes or special requirements..."
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            rows={3}
          />
        </div>

        {/* Book Button */}
        <Button
          onClick={handleBooking}
          className="w-full"
          disabled={!selectedDate || !selectedTime || !appointmentType || !location}
        >
          <CalendarIcon className="w-4 h-4 mr-2" />
          Book Appointment
        </Button>
      </CardContent>
    </Card>
  )
}
