"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Bell, X, AlertTriangle, Calendar, MessageSquare, Users, CheckCircle } from "lucide-react"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"

interface Notification {
  id: string
  type: "urgent" | "appointment" | "message" | "update" | "success"
  title: string
  message: string
  timestamp: Date
  read: boolean
  actionUrl?: string
}

interface NotificationSystemProps {
  userRole: string
}

export function NotificationSystem({ userRole }: NotificationSystemProps) {
  const [notifications, setNotifications] = useState<Notification[]>([])
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    // Simulate receiving notifications
    const mockNotifications: Notification[] = [
      {
        id: "1",
        type: "urgent",
        title: "High Risk Case Alert",
        message: "Case SC-2024-003 requires immediate attention",
        timestamp: new Date(Date.now() - 5 * 60 * 1000),
        read: false,
      },
      {
        id: "2",
        type: "appointment",
        title: "Upcoming Appointment",
        message: "Family meeting scheduled in 30 minutes",
        timestamp: new Date(Date.now() - 10 * 60 * 1000),
        read: false,
      },
      {
        id: "3",
        type: "message",
        title: "New Message",
        message: "Sarah Martinez sent you a message",
        timestamp: new Date(Date.now() - 15 * 60 * 1000),
        read: true,
      },
      {
        id: "4",
        type: "update",
        title: "Case Update",
        message: "Care plan has been updated for Emma Johnson",
        timestamp: new Date(Date.now() - 30 * 60 * 1000),
        read: true,
      },
    ]

    setNotifications(mockNotifications)

    // Simulate real-time notifications
    const interval = setInterval(() => {
      const newNotification: Notification = {
        id: Date.now().toString(),
        type: Math.random() > 0.5 ? "message" : "update",
        title: "New Update",
        message: "You have a new update in your dashboard",
        timestamp: new Date(),
        read: false,
      }

      setNotifications((prev) => [newNotification, ...prev.slice(0, 9)])
    }, 30000) // New notification every 30 seconds

    return () => clearInterval(interval)
  }, [])

  const unreadCount = notifications.filter((n) => !n.read).length

  const markAsRead = (id: string) => {
    setNotifications((prev) => prev.map((n) => (n.id === id ? { ...n, read: true } : n)))
  }

  const markAllAsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })))
  }

  const removeNotification = (id: string) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id))
  }

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case "urgent":
        return <AlertTriangle className="w-4 h-4 text-red-500" />
      case "appointment":
        return <Calendar className="w-4 h-4 text-blue-500" />
      case "message":
        return <MessageSquare className="w-4 h-4 text-green-500" />
      case "update":
        return <Users className="w-4 h-4 text-purple-500" />
      case "success":
        return <CheckCircle className="w-4 h-4 text-green-500" />
      default:
        return <Bell className="w-4 h-4" />
    }
  }

  const getTimeAgo = (timestamp: Date) => {
    const now = new Date()
    const diff = now.getTime() - timestamp.getTime()
    const minutes = Math.floor(diff / 60000)
    const hours = Math.floor(minutes / 60)
    const days = Math.floor(hours / 24)

    if (days > 0) return `${days}d ago`
    if (hours > 0) return `${hours}h ago`
    if (minutes > 0) return `${minutes}m ago`
    return "Just now"
  }

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <Button variant="outline" size="sm" className="relative">
          <Bell className="w-4 h-4" />
          {unreadCount > 0 && (
            <Badge className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center p-0 text-xs">
              {unreadCount > 9 ? "9+" : unreadCount}
            </Badge>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80 p-0" align="end">
        <Card className="border-0 shadow-none">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-base">Notifications</CardTitle>
              {unreadCount > 0 && (
                <Button variant="ghost" size="sm" onClick={markAllAsRead}>
                  Mark all read
                </Button>
              )}
            </div>
          </CardHeader>
          <CardContent className="p-0">
            <div className="max-h-96 overflow-y-auto">
              {notifications.length === 0 ? (
                <div className="p-4 text-center text-muted-foreground">No notifications</div>
              ) : (
                <div className="space-y-1">
                  {notifications.map((notification) => (
                    <div
                      key={notification.id}
                      className={`p-3 border-b hover:bg-muted/50 cursor-pointer ${
                        !notification.read ? "bg-blue-50 dark:bg-blue-950/20" : ""
                      }`}
                      onClick={() => markAsRead(notification.id)}
                    >
                      <div className="flex items-start justify-between gap-2">
                        <div className="flex items-start gap-3 flex-1">
                          {getNotificationIcon(notification.type)}
                          <div className="flex-1 min-w-0">
                            <div className="font-medium text-sm">{notification.title}</div>
                            <div className="text-xs text-muted-foreground mt-1">{notification.message}</div>
                            <div className="text-xs text-muted-foreground mt-1">
                              {getTimeAgo(notification.timestamp)}
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center gap-1">
                          {!notification.read && <div className="w-2 h-2 bg-blue-500 rounded-full" />}
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-6 w-6 p-0"
                            onClick={(e) => {
                              e.stopPropagation()
                              removeNotification(notification.id)
                            }}
                          >
                            <X className="w-3 h-3" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </PopoverContent>
    </Popover>
  )
}
