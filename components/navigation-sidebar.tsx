"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { BrandLogo } from "./brand-logo"
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import {
  LayoutDashboard,
  Users,
  Brain,
  Trophy,
  FileText,
  BarChart3,
  Mic,
  ChevronLeft,
  ChevronRight,
  Sparkles,
  Target,
  Calendar,
  Shield,
} from "lucide-react"

interface NavigationSidebarProps {
  currentView: string
  onViewChange: (view: string) => void
  notifications: number
}

const navigationItems = [
  {
    title: "Dashboard",
    icon: LayoutDashboard,
    value: "overview",
    description: "Overview & insights",
    color: "text-blue-600",
    bgColor: "bg-blue-50",
  },
  {
    title: "Clients",
    icon: Users,
    value: "clients",
    description: "Client management",
    color: "text-green-600",
    bgColor: "bg-green-50",
  },
  {
    title: "AI Analytics",
    icon: Brain,
    value: "analytics",
    description: "Smart insights",
    color: "text-purple-600",
    bgColor: "bg-purple-50",
    badge: "AI",
  },
  {
    title: "Achievements",
    icon: Trophy,
    value: "gamification",
    description: "Progress & rewards",
    color: "text-yellow-600",
    bgColor: "bg-yellow-50",
  },
  {
    title: "Care Plans",
    icon: FileText,
    value: "care-plans",
    description: "Plan management",
    color: "text-indigo-600",
    bgColor: "bg-indigo-50",
  },
  {
    title: "Reports",
    icon: BarChart3,
    value: "reports",
    description: "Analytics & reports",
    color: "text-pink-600",
    bgColor: "bg-pink-50",
  },
]

const quickActions = [
  {
    title: "Voice Updates",
    icon: Mic,
    value: "voice-care-plans",
    description: "Hands-free updates",
    color: "text-red-600",
    bgColor: "bg-red-50",
    badge: "New",
  },
  {
    title: "Quick Assessment",
    icon: Target,
    value: "assessment",
    description: "Rapid client check",
    color: "text-orange-600",
    bgColor: "bg-orange-50",
  },
  {
    title: "Schedule",
    icon: Calendar,
    value: "schedule",
    description: "Appointments",
    color: "text-cyan-600",
    bgColor: "bg-cyan-50",
  },
]

export function NavigationSidebar({ currentView, onViewChange, notifications }: NavigationSidebarProps) {
  const [isCollapsed, setIsCollapsed] = useState(false)

  return (
    <div className={`${isCollapsed ? "w-16" : "w-72"} transition-all duration-300 ease-in-out`}>
      <Sidebar className="h-screen bg-white border-r border-gray-200 shadow-sm">
        <SidebarHeader className="p-4 border-b border-gray-100">
          <div className="flex items-center justify-between">
            <BrandLogo size={isCollapsed ? "sm" : "md"} showText={!isCollapsed} />
            <Button variant="ghost" size="sm" onClick={() => setIsCollapsed(!isCollapsed)} className="h-8 w-8 p-0">
              {isCollapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
            </Button>
          </div>

          {!isCollapsed && (
            <div className="mt-4 p-3 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg">
              <div className="flex items-center space-x-2 mb-2">
                <Sparkles className="h-4 w-4 text-purple-600" />
                <span className="text-sm font-medium text-gray-900">AI Assistant Active</span>
              </div>
              <p className="text-xs text-gray-600">
                Your intelligent care companion is ready to help optimize patient outcomes.
              </p>
            </div>
          )}
        </SidebarHeader>

        <SidebarContent className="p-2">
          <SidebarGroup>
            <SidebarGroupLabel className={isCollapsed ? "sr-only" : ""}>Main Navigation</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {navigationItems.map((item) => (
                  <SidebarMenuItem key={item.value}>
                    <SidebarMenuButton
                      isActive={currentView === item.value}
                      onClick={() => onViewChange(item.value)}
                      className={`group relative overflow-hidden ${
                        currentView === item.value
                          ? `${item.bgColor} ${item.color} border border-current/20`
                          : "hover:bg-gray-50"
                      }`}
                    >
                      <div className={`p-2 rounded-lg ${currentView === item.value ? item.bgColor : "bg-gray-100"}`}>
                        <item.icon className={`h-4 w-4 ${currentView === item.value ? item.color : "text-gray-600"}`} />
                      </div>

                      {!isCollapsed && (
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between">
                            <span className="font-medium truncate">{item.title}</span>
                            {item.badge && (
                              <Badge variant="secondary" className="ml-2 text-xs bg-purple-100 text-purple-700">
                                {item.badge}
                              </Badge>
                            )}
                          </div>
                          <p className="text-xs text-gray-500 truncate">{item.description}</p>
                        </div>
                      )}

                      {/* Active indicator */}
                      {currentView === item.value && (
                        <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-blue-500 to-purple-500 rounded-r-full" />
                      )}
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>

          <SidebarGroup className="mt-6">
            <SidebarGroupLabel className={isCollapsed ? "sr-only" : ""}>Quick Actions</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {quickActions.map((action) => (
                  <SidebarMenuItem key={action.value}>
                    <SidebarMenuButton onClick={() => onViewChange(action.value)} className="group hover:bg-gray-50">
                      <div className={`p-2 rounded-lg ${action.bgColor}`}>
                        <action.icon className={`h-4 w-4 ${action.color}`} />
                      </div>

                      {!isCollapsed && (
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between">
                            <span className="font-medium truncate">{action.title}</span>
                            {action.badge && (
                              <Badge variant="secondary" className="ml-2 text-xs bg-green-100 text-green-700">
                                {action.badge}
                              </Badge>
                            )}
                          </div>
                          <p className="text-xs text-gray-500 truncate">{action.description}</p>
                        </div>
                      )}
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>

          {!isCollapsed && (
            <SidebarGroup className="mt-6">
              <div className="p-3 bg-gradient-to-br from-green-50 to-blue-50 rounded-lg border border-green-200">
                <div className="flex items-center space-x-2 mb-2">
                  <Shield className="h-4 w-4 text-green-600" />
                  <span className="text-sm font-medium text-green-900">System Status</span>
                </div>
                <div className="space-y-1">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-gray-600">AI Models</span>
                    <Badge variant="secondary" className="bg-green-100 text-green-700">
                      Online
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-gray-600">Data Sync</span>
                    <Badge variant="secondary" className="bg-green-100 text-green-700">
                      Active
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-gray-600">Security</span>
                    <Badge variant="secondary" className="bg-green-100 text-green-700">
                      Secure
                    </Badge>
                  </div>
                </div>
              </div>
            </SidebarGroup>
          )}
        </SidebarContent>
      </Sidebar>
    </div>
  )
}
