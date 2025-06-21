"use client"

import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import {
  MessageSquare,
  Send,
  Users,
  Phone,
  Video,
  Paperclip,
  MoreVertical,
  Search,
  Plus,
  AlertCircle,
} from "lucide-react"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"

interface Message {
  id: string
  senderId: string
  senderName: string
  senderRole: string
  content: string
  timestamp: Date
  type: "text" | "file" | "system"
  urgent?: boolean
}

interface ChatRoom {
  id: string
  name: string
  type: "case" | "team" | "direct"
  participants: string[]
  lastMessage?: Message
  unreadCount: number
  caseId?: string
}

interface TeamChatProps {
  userRole: string
  userId: string
}

export function TeamChat({ userRole, userId }: TeamChatProps) {
  const [chatRooms, setChatRooms] = useState<ChatRoom[]>([])
  const [selectedRoom, setSelectedRoom] = useState<string | null>(null)
  const [messages, setMessages] = useState<{ [roomId: string]: Message[] }>({})
  const [newMessage, setNewMessage] = useState("")
  const [searchTerm, setSearchTerm] = useState("")
  const messagesEndRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Mock chat rooms
    const mockRooms: ChatRoom[] = [
      {
        id: "case-001",
        name: "Case SC-2024-001 - Sarah Johnson",
        type: "case",
        participants: ["social-worker", "supervisor", "specialist"],
        unreadCount: 2,
        caseId: "SC-2024-001",
      },
      {
        id: "team-mental-health",
        name: "Mental Health Team",
        type: "team",
        participants: ["social-worker", "specialist", "coordinator"],
        unreadCount: 0,
      },
      {
        id: "direct-supervisor",
        name: "Sarah Martinez",
        type: "direct",
        participants: ["social-worker", "supervisor"],
        unreadCount: 1,
      },
      {
        id: "case-002",
        name: "Case SC-2024-003 - Lisa Thompson",
        type: "case",
        participants: ["social-worker", "supervisor", "coordinator"],
        unreadCount: 5,
        caseId: "SC-2024-003",
      },
    ]

    setChatRooms(mockRooms)

    // Mock messages
    const mockMessages: { [roomId: string]: Message[] } = {
      "case-001": [
        {
          id: "1",
          senderId: "supervisor",
          senderName: "Sarah Martinez",
          senderRole: "Supervisor",
          content: "I've reviewed the latest assessment. We need to schedule a family meeting.",
          timestamp: new Date(Date.now() - 30 * 60 * 1000),
          type: "text",
        },
        {
          id: "2",
          senderId: "specialist",
          senderName: "Dr. Emily Chen",
          senderRole: "Specialist",
          content: "I can attend the meeting. What about Thursday afternoon?",
          timestamp: new Date(Date.now() - 15 * 60 * 1000),
          type: "text",
        },
        {
          id: "3",
          senderId: "social-worker",
          senderName: "You",
          senderRole: "Social Worker",
          content: "Thursday works for me. I'll coordinate with the family.",
          timestamp: new Date(Date.now() - 5 * 60 * 1000),
          type: "text",
        },
      ],
      "direct-supervisor": [
        {
          id: "1",
          senderId: "supervisor",
          senderName: "Sarah Martinez",
          senderRole: "Supervisor",
          content: "Can you provide an update on the Thompson case? It's marked as high priority.",
          timestamp: new Date(Date.now() - 10 * 60 * 1000),
          type: "text",
          urgent: true,
        },
      ],
    }

    setMessages(mockMessages)
    setSelectedRoom("case-001")
  }, [])

  useEffect(() => {
    scrollToBottom()
  }, [messages, selectedRoom])

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  const sendMessage = () => {
    if (!newMessage.trim() || !selectedRoom) return

    const message: Message = {
      id: Date.now().toString(),
      senderId: userId,
      senderName: "You",
      senderRole: userRole,
      content: newMessage.trim(),
      timestamp: new Date(),
      type: "text",
    }

    setMessages((prev) => ({
      ...prev,
      [selectedRoom]: [...(prev[selectedRoom] || []), message],
    }))

    setNewMessage("")

    // Mark room as read
    setChatRooms((prev) => prev.map((room) => (room.id === selectedRoom ? { ...room, unreadCount: 0 } : room)))
  }

  const getRoomIcon = (type: string) => {
    switch (type) {
      case "case":
        return <AlertCircle className="w-4 h-4" />
      case "team":
        return <Users className="w-4 h-4" />
      case "direct":
        return <MessageSquare className="w-4 h-4" />
      default:
        return <MessageSquare className="w-4 h-4" />
    }
  }

  const filteredRooms = chatRooms.filter((room) => room.name.toLowerCase().includes(searchTerm.toLowerCase()))

  const selectedRoomData = chatRooms.find((room) => room.id === selectedRoom)
  const roomMessages = selectedRoom ? messages[selectedRoom] || [] : []

  return (
    <div className="h-[600px] flex border rounded-lg overflow-hidden">
      {/* Chat Rooms Sidebar */}
      <div className="w-80 border-r bg-muted/20">
        <div className="p-4 border-b">
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-semibold">Team Chat</h3>
            <Button size="sm" variant="outline">
              <Plus className="w-4 h-4" />
            </Button>
          </div>
          <div className="relative">
            <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Search conversations..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>

        <div className="overflow-y-auto">
          {filteredRooms.map((room) => (
            <div
              key={room.id}
              className={`p-3 border-b cursor-pointer hover:bg-muted/50 ${selectedRoom === room.id ? "bg-muted" : ""}`}
              onClick={() => setSelectedRoom(room.id)}
            >
              <div className="flex items-center justify-between mb-1">
                <div className="flex items-center gap-2">
                  {getRoomIcon(room.type)}
                  <span className="font-medium text-sm truncate">{room.name}</span>
                </div>
                {room.unreadCount > 0 && (
                  <Badge className="h-5 w-5 flex items-center justify-center p-0 text-xs">{room.unreadCount}</Badge>
                )}
              </div>
              {room.lastMessage && <p className="text-xs text-muted-foreground truncate">{room.lastMessage.content}</p>}
              <div className="flex items-center gap-2 mt-1">
                <Badge variant="outline" className="text-xs">
                  {room.type}
                </Badge>
                {room.caseId && (
                  <Badge variant="secondary" className="text-xs">
                    {room.caseId}
                  </Badge>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Chat Area */}
      <div className="flex-1 flex flex-col">
        {selectedRoomData ? (
          <>
            {/* Chat Header */}
            <div className="p-4 border-b bg-card">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-semibold">{selectedRoomData.name}</h3>
                  <p className="text-sm text-muted-foreground">{selectedRoomData.participants.length} participants</p>
                </div>
                <div className="flex items-center gap-2">
                  <Button size="sm" variant="outline">
                    <Phone className="w-4 h-4" />
                  </Button>
                  <Button size="sm" variant="outline">
                    <Video className="w-4 h-4" />
                  </Button>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button size="sm" variant="outline">
                        <MoreVertical className="w-4 h-4" />
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-48">
                      <div className="space-y-2">
                        <Button variant="ghost" size="sm" className="w-full justify-start">
                          View Case Details
                        </Button>
                        <Button variant="ghost" size="sm" className="w-full justify-start">
                          Add Participants
                        </Button>
                        <Button variant="ghost" size="sm" className="w-full justify-start">
                          Chat Settings
                        </Button>
                      </div>
                    </PopoverContent>
                  </Popover>
                </div>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {roomMessages.map((message) => (
                <div key={message.id} className={`flex gap-3 ${message.senderId === userId ? "flex-row-reverse" : ""}`}>
                  <Avatar className="w-8 h-8">
                    <AvatarFallback className="text-xs">
                      {message.senderName
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div className={`flex-1 max-w-xs ${message.senderId === userId ? "text-right" : ""}`}>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-sm font-medium">{message.senderName}</span>
                      <Badge variant="outline" className="text-xs">
                        {message.senderRole}
                      </Badge>
                      {message.urgent && (
                        <Badge variant="destructive" className="text-xs">
                          Urgent
                        </Badge>
                      )}
                    </div>
                    <div
                      className={`p-3 rounded-lg text-sm ${
                        message.senderId === userId ? "bg-primary text-primary-foreground" : "bg-muted"
                      } ${message.urgent ? "border border-red-300" : ""}`}
                    >
                      {message.content}
                    </div>
                    <div className="text-xs text-muted-foreground mt-1">
                      {message.timestamp.toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </div>
                  </div>
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>

            {/* Message Input */}
            <div className="p-4 border-t">
              <div className="flex items-center gap-2">
                <Button size="sm" variant="outline">
                  <Paperclip className="w-4 h-4" />
                </Button>
                <Input
                  placeholder="Type a message..."
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  onKeyPress={(e) => e.key === "Enter" && sendMessage()}
                  className="flex-1"
                />
                <Button onClick={sendMessage} disabled={!newMessage.trim()}>
                  <Send className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </>
        ) : (
          <div className="flex-1 flex items-center justify-center text-muted-foreground">
            Select a conversation to start chatting
          </div>
        )}
      </div>
    </div>
  )
}
