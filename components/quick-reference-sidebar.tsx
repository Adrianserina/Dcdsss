"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import {
  ChevronDown,
  Phone,
  AlertTriangle,
  Clock,
  FileText,
  Users,
  Heart,
  Shield,
  BookOpen,
  HelpCircle,
  ExternalLink,
} from "lucide-react"

interface QuickReferenceSidebarProps {
  userRole: string
}

export function QuickReferenceSidebar({ userRole }: QuickReferenceSidebarProps) {
  const [openSections, setOpenSections] = useState<string[]>(["emergency"])

  const toggleSection = (section: string) => {
    setOpenSections((prev) => (prev.includes(section) ? prev.filter((s) => s !== section) : [...prev, section]))
  }

  const emergencyContacts = [
    { name: "Crisis Hotline", number: "988", available: "24/7" },
    { name: "Child Protection", number: "1-800-252-5400", available: "24/7" },
    { name: "Adult Protective Services", number: "1-800-458-9858", available: "Business Hours" },
    { name: "Emergency Services", number: "911", available: "24/7" },
  ]

  const quickActions =
    userRole === "parent" || userRole === "guardian"
      ? [
          { label: "Schedule Appointment", icon: Clock },
          { label: "View Care Plan", icon: FileText },
          { label: "Contact Case Worker", icon: Users },
          { label: "Access Resources", icon: BookOpen },
        ]
      : [
          { label: "New Case Assessment", icon: FileText },
          { label: "Risk Assessment", icon: AlertTriangle },
          { label: "Team Consultation", icon: Users },
          { label: "Resource Allocation", icon: Heart },
        ]

  const riskIndicators = [
    { level: "Critical", color: "bg-red-500", description: "Immediate intervention required" },
    { level: "High", color: "bg-orange-500", description: "Priority attention needed" },
    { level: "Medium", color: "bg-yellow-500", description: "Monitor closely" },
    { level: "Low", color: "bg-green-500", description: "Routine follow-up" },
  ]

  const protocols =
    userRole === "parent" || userRole === "guardian"
      ? [
          "Contact your case worker first for non-emergencies",
          "Keep all appointment confirmations",
          "Document any concerns or changes",
          "Know your rights and advocacy options",
        ]
      : [
          "Always prioritize safety in assessments",
          "Document all interactions thoroughly",
          "Consult supervisor for high-risk cases",
          "Follow mandatory reporting requirements",
        ]

  return (
    <div className="w-80 space-y-4 max-h-screen overflow-y-auto">
      {/* Emergency Contacts */}
      <Card>
        <Collapsible open={openSections.includes("emergency")} onOpenChange={() => toggleSection("emergency")}>
          <CollapsibleTrigger asChild>
            <CardHeader className="cursor-pointer hover:bg-muted/50 transition-colors">
              <CardTitle className="text-sm flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Phone className="h-4 w-4 text-red-500" />
                  Emergency Contacts
                </div>
                <ChevronDown
                  className={`h-4 w-4 transition-transform ${openSections.includes("emergency") ? "rotate-180" : ""}`}
                />
              </CardTitle>
            </CardHeader>
          </CollapsibleTrigger>
          <CollapsibleContent>
            <CardContent className="pt-0 space-y-3">
              {emergencyContacts.map((contact, index) => (
                <div key={index} className="flex items-center justify-between p-2 border rounded-lg">
                  <div>
                    <div className="font-medium text-sm">{contact.name}</div>
                    <div className="text-xs text-muted-foreground">{contact.available}</div>
                  </div>
                  <Button variant="outline" size="sm" className="text-xs">
                    <Phone className="h-3 w-3 mr-1" />
                    {contact.number}
                  </Button>
                </div>
              ))}
            </CardContent>
          </CollapsibleContent>
        </Collapsible>
      </Card>

      {/* Quick Actions */}
      <Card>
        <Collapsible open={openSections.includes("actions")} onOpenChange={() => toggleSection("actions")}>
          <CollapsibleTrigger asChild>
            <CardHeader className="cursor-pointer hover:bg-muted/50 transition-colors">
              <CardTitle className="text-sm flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Shield className="h-4 w-4" />
                  Quick Actions
                </div>
                <ChevronDown
                  className={`h-4 w-4 transition-transform ${openSections.includes("actions") ? "rotate-180" : ""}`}
                />
              </CardTitle>
            </CardHeader>
          </CollapsibleTrigger>
          <CollapsibleContent>
            <CardContent className="pt-0 space-y-2">
              {quickActions.map((action, index) => {
                const Icon = action.icon
                return (
                  <Button key={index} variant="outline" size="sm" className="w-full justify-start text-xs">
                    <Icon className="h-3 w-3 mr-2" />
                    {action.label}
                  </Button>
                )
              })}
            </CardContent>
          </CollapsibleContent>
        </Collapsible>
      </Card>

      {/* Risk Indicators */}
      <Card>
        <Collapsible open={openSections.includes("risk")} onOpenChange={() => toggleSection("risk")}>
          <CollapsibleTrigger asChild>
            <CardHeader className="cursor-pointer hover:bg-muted/50 transition-colors">
              <CardTitle className="text-sm flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <AlertTriangle className="h-4 w-4" />
                  Risk Levels
                </div>
                <ChevronDown
                  className={`h-4 w-4 transition-transform ${openSections.includes("risk") ? "rotate-180" : ""}`}
                />
              </CardTitle>
            </CardHeader>
          </CollapsibleTrigger>
          <CollapsibleContent>
            <CardContent className="pt-0 space-y-2">
              {riskIndicators.map((risk, index) => (
                <div key={index} className="flex items-center gap-3 p-2 border rounded-lg">
                  <div className={`w-3 h-3 rounded-full ${risk.color}`} />
                  <div>
                    <div className="font-medium text-xs">{risk.level}</div>
                    <div className="text-xs text-muted-foreground">{risk.description}</div>
                  </div>
                </div>
              ))}
            </CardContent>
          </CollapsibleContent>
        </Collapsible>
      </Card>

      {/* Key Protocols */}
      <Card>
        <Collapsible open={openSections.includes("protocols")} onOpenChange={() => toggleSection("protocols")}>
          <CollapsibleTrigger asChild>
            <CardHeader className="cursor-pointer hover:bg-muted/50 transition-colors">
              <CardTitle className="text-sm flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <FileText className="h-4 w-4" />
                  Key Protocols
                </div>
                <ChevronDown
                  className={`h-4 w-4 transition-transform ${openSections.includes("protocols") ? "rotate-180" : ""}`}
                />
              </CardTitle>
            </CardHeader>
          </CollapsibleTrigger>
          <CollapsibleContent>
            <CardContent className="pt-0 space-y-2">
              {protocols.map((protocol, index) => (
                <div key={index} className="flex items-start gap-2 p-2 border rounded-lg">
                  <div className="w-1 h-1 bg-blue-500 rounded-full mt-2 flex-shrink-0" />
                  <div className="text-xs">{protocol}</div>
                </div>
              ))}
            </CardContent>
          </CollapsibleContent>
        </Collapsible>
      </Card>

      {/* Help & Training */}
      <Card>
        <CardHeader>
          <CardTitle className="text-sm flex items-center gap-2">
            <HelpCircle className="h-4 w-4" />
            Need Help?
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-0 space-y-2">
          <Button variant="outline" size="sm" className="w-full justify-start text-xs">
            <BookOpen className="h-3 w-3 mr-2" />
            Training Modules
          </Button>
          <Button variant="outline" size="sm" className="w-full justify-start text-xs">
            <ExternalLink className="h-3 w-3 mr-2" />
            User Guide
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}
