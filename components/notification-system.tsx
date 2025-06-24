"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Bell, AlertTriangle, CheckCircle2, X, Flag, Brain } from "lucide-react"

interface Notification {
  id: string
  type: "urgent" | "warning" | "info" | "success" | "ai-alert"
  title: string
  message: string
  timestamp: Date
  caseId?: string
  clientName?: string
  read: boolean
  actionRequired: boolean
  aiGenerated?: boolean
}

export function NotificationSystem() {
  const [notifications, setNotifications] = useState<Notification[]>([])
  const [unreadCount, setUnreadCount] = useState(0)
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    // Initialize with mock notifications
    const mockNotifications: Notification[] = [
      {
        id: "1",
        type: "urgent",
        title: "Critical Case Alert",
        message: "Sarah Johnson (Case #C001) has missed 2 consecutive appointments. Immediate follow-up required.",
        timestamp: new Date(Date.now() - 30 * 60 * 1000),
        caseId: "C001",
        clientName: "Sarah Johnson",
        read: false,
        actionRequired: true,
      },
      {
        id: "2",
        type: "ai-alert",
        title: "AI Risk Assessment Alert",
        message: "Behavioral pattern analysis indicates increased risk factors for Michael Chen. Review recommended.",
        timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
        caseId: "C002",
        clientName: "Michael Chen",
        read: false,
        actionRequired: true,
        aiGenerated: true,
      },
      {
        id: "3",
        type: "warning",
        title: "Documentation Overdue",
        message: "Case report for Emma Davis is 3 days overdue. Please complete by end of day.",
        timestamp: new Date(Date.now() - 4 * 60 * 60 * 1000),
        caseId: "C003",
        clientName: "Emma Davis",
        read: false,
        actionRequired: true,
      },
      {
        id: "4",
        type: "info",
        title: "Schedule Reminder",
        message: "You have 3 home visits scheduled for tomorrow. Review your calendar.",
        timestamp: new Date(Date.now() - 6 * 60 * 60 * 1000),
        read: true,
        actionRequired: false,
      },
      {
        id: "5",
        type: "success",
        title: "Case Milestone Achieved",
        message: "Robert Wilson has successfully completed his housing stability program.",
        timestamp: new Date(Date.now() - 8 * 60 * 60 * 1000),
        caseId: "C004",
        clientName: "Robert Wilson",
        read: true,
        actionRequired: false,
      },
    ]

    setNotifications(mockNotifications)
    setUnreadCount(mockNotifications.filter((n) => !n.read).length)

    // Simulate real-time notifications
    const interval = setInterval(() => {
      generateAINotification()
    }, 30000) // Every 30 seconds

    return () => clearInterval(interval)
  }, [])

  const generateAINotification = async () => {
    // Simulate AI-generated notifications based on case analysis
    const aiNotifications = [
      {
        type: "ai-alert" as const,
        title: "Predictive Analytics Alert",
        message: "AI model predicts 85% likelihood of case escalation for Lisa Anderson within 7 days.",
        caseId: "C005",
        clientName: "Lisa Anderson",
      },
      {
        type: "ai-alert" as const,
        title: "Behavioral Pattern Detected",
        message: "Unusual communication pattern detected. Client may be experiencing increased stress.",
        caseId: "C001",
        clientName: "Sarah Johnson",
      },
      {
        type: "ai-alert" as const,
        title: "Resource Optimization Suggestion",
        message: "AI recommends reallocating resources from low-risk to high-risk cases this week.",
      },
    ]

    const randomNotification = aiNotifications[Math.floor(Math.random() * aiNotifications.length)]

    const newNotification: Notification = {
      id: Date.now().toString(),
      ...randomNotification,
      timestamp: new Date(),
      read: false,
      actionRequired: true,
      aiGenerated: true,
    }

    setNotifications((prev) => [newNotification, ...prev])
    setUnreadCount((prev) => prev + 1)
  }

  const markAsRead = (id: string) => {
    setNotifications((prev) => prev.map((n) => (n.id === id ? { ...n, read: true } : n)))
    setUnreadCount((prev) => Math.max(0, prev - 1))
  }

  const dismissNotification = (id: string) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id))
    const notification = notifications.find((n) => n.id === id)
    if (notification && !notification.read) {
      setUnreadCount((prev) => Math.max(0, prev - 1))
    }
  }

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case "urgent":
        return AlertTriangle
      case "warning":
        return Flag
      case "info":
        return Bell
      case "success":
        return CheckCircle2
      case "ai-alert":
        return Brain
      default:
        return Bell
    }
  }

  const getNotificationColor = (type: string) => {
    switch (type) {
      case "urgent":
        return "border-red-200 bg-red-50"
      case "warning":
        return "border-orange-200 bg-orange-50"
      case "info":
        return "border-blue-200 bg-blue-50"
      case "success":
        return "border-green-200 bg-green-50"
      case "ai-alert":
        return "border-purple-200 bg-purple-50"
      default:
        return "border-gray-200 bg-gray-50"
    }
  }

  const formatTimestamp = (timestamp: Date) => {
    const now = new Date()
    const diff = now.getTime() - timestamp.getTime()
    const minutes = Math.floor(diff / 60000)
    const hours = Math.floor(diff / 3600000)
    const days = Math.floor(diff / 86400000)

    if (minutes < 60) return `${minutes}m ago`
    if (hours < 24) return `${hours}h ago`
    return `${days}d ago`
  }

  return (
    <div className="relative">
      <Button variant="ghost" size="sm" onClick={() => setIsOpen(!isOpen)} className="relative">
        <Bell className="h-4 w-4" />
        {unreadCount > 0 && (
          <span className="absolute -top-1 -right-1 h-5 w-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
            {unreadCount > 9 ? "9+" : unreadCount}
          </span>
        )}
      </Button>

      {isOpen && (
        <div className="absolute right-0 top-full mt-2 w-96 bg-white border border-gray-200 rounded-lg shadow-lg z-50">
          <Card className="border-0">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg">Notifications</CardTitle>
                <Button variant="ghost" size="sm" onClick={() => setIsOpen(false)}>
                  <X className="h-4 w-4" />
                </Button>
              </div>
            </CardHeader>
            <CardContent className="p-0">
              <ScrollArea className="h-96">
                <div className="space-y-2 p-4">
                  {notifications.length === 0 ? (
                    <div className="text-center py-8 text-gray-500">
                      <Bell className="h-8 w-8 mx-auto mb-2 opacity-50" />
                      <p>No notifications</p>
                    </div>
                  ) : (
                    notifications.map((notification) => {
                      const IconComponent = getNotificationIcon(notification.type)
                      return (
                        <div
                          key={notification.id}
                          className={`p-3 rounded-lg border ${getNotificationColor(notification.type)} ${
                            !notification.read ? "border-l-4 border-l-blue-500" : ""
                          }`}
                        >
                          <div className="flex items-start justify-between">
                            <div className="flex items-start space-x-3 flex-1">
                              <IconComponent className="h-4 w-4 mt-0.5" />
                              <div className="flex-1 min-w-0">
                                <div className="flex items-center space-x-2 mb-1">
                                  <h4 className="font-medium text-sm">{notification.title}</h4>
                                  {notification.aiGenerated && (
                                    <Badge variant="outline" className="text-xs bg-purple-100 text-purple-800">
                                      AI
                                    </Badge>
                                  )}
                                  {notification.actionRequired && (
                                    <Badge variant="outline" className="text-xs bg-red-100 text-red-800">
                                      Action Required
                                    </Badge>
                                  )}
                                </div>
                                <p className="text-xs text-gray-600 mb-2">{notification.message}</p>
                                <div className="flex items-center justify-between">
                                  <span className="text-xs text-gray-500">
                                    {formatTimestamp(notification.timestamp)}
                                  </span>
                                  {notification.clientName && (
                                    <span className="text-xs text-gray-500">{notification.clientName}</span>
                                  )}
                                </div>
                              </div>
                            </div>
                            <div className="flex items-center space-x-1 ml-2">
                              {!notification.read && (
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={() => markAsRead(notification.id)}
                                  className="h-6 w-6 p-0"
                                >
                                  <CheckCircle2 className="h-3 w-3" />
                                </Button>
                              )}
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => dismissNotification(notification.id)}
                                className="h-6 w-6 p-0"
                              >
                                <X className="h-3 w-3" />
                              </Button>
                            </div>
                          </div>
                        </div>
                      )
                    })
                  )}
                </div>
              </ScrollArea>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  )
}
