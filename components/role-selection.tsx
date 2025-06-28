"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Users, Shield, UserCheck, Briefcase, Heart, Building, ArrowRight, CheckCircle, User, Baby } from "lucide-react"

interface RoleSelectionProps {
  onRoleSelect: (role: string) => void
}

export function RoleSelection({ onRoleSelect }: RoleSelectionProps) {
  const [selectedRole, setSelectedRole] = useState<string | null>(null)

  const roles = [
    {
      id: "social-worker",
      title: "Social Worker",
      description: "Direct client support and case management",
      icon: Users,
      permissions: ["Case Management", "Client Records", "Assessment Tools", "Reporting"],
      category: "professional",
    },
    {
      id: "supervisor",
      title: "Supervisor",
      description: "Team oversight and case review",
      icon: UserCheck,
      permissions: ["Team Management", "Case Review", "Resource Allocation", "Performance Analytics"],
      category: "professional",
    },
    {
      id: "manager",
      title: "Manager",
      description: "Department management and strategic planning",
      icon: Briefcase,
      permissions: ["Strategic Planning", "Budget Management", "Policy Development", "System Analytics"],
      category: "professional",
    },
    {
      id: "specialist",
      title: "Specialist",
      description: "Specialized support services",
      icon: Heart,
      permissions: ["Specialized Assessments", "Treatment Planning", "Consultation", "Training"],
      category: "professional",
    },
    {
      id: "admin",
      title: "Administrator",
      description: "System administration and configuration",
      icon: Shield,
      permissions: ["System Configuration", "User Management", "Data Management", "Security Settings"],
      category: "professional",
    },
    {
      id: "coordinator",
      title: "Care Coordinator",
      description: "Service coordination and resource management",
      icon: Building,
      permissions: ["Service Coordination", "Resource Management", "Multi-agency Liaison", "Care Planning"],
      category: "professional",
    },
    {
      id: "parent",
      title: "Parent/Caregiver",
      description: "Access child's care information and resources",
      icon: User,
      permissions: ["View Child Records", "Appointment Scheduling", "Resource Access", "Communication"],
      category: "family",
    },
    {
      id: "guardian",
      title: "Guardian",
      description: "Legal guardian access to care information",
      icon: Baby,
      permissions: ["View Care Records", "Legal Documentation", "Service Coordination", "Emergency Contacts"],
      category: "family",
    },
  ]

  const professionalRoles = roles.filter((role) => role.category === "professional")
  const familyRoles = roles.filter((role) => role.category === "family")

  const handleContinue = () => {
    if (selectedRole) {
      onRoleSelect(selectedRole)
    }
  }

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="max-w-6xl w-full space-y-6">
        <div className="text-center space-y-4">
          <h1 className="text-2xl md:text-4xl font-bold tracking-tight">Welcome to Social Care Sync</h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
            Select your role to customize your dashboard and access the tools you need
          </p>
        </div>

        {/* Professional Roles */}
        <div className="space-y-4">
          <h2 className="text-xl font-semibold">Professional Access</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {professionalRoles.map((role) => {
              const Icon = role.icon
              const isSelected = selectedRole === role.id

              return (
                <Card
                  key={role.id}
                  className={`cursor-pointer transition-all duration-200 hover:shadow-md ${
                    isSelected ? "ring-2 ring-primary shadow-md" : "hover:shadow-sm"
                  }`}
                  onClick={() => setSelectedRole(role.id)}
                >
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className="p-2 bg-muted rounded-lg">
                          <Icon className="h-5 w-5" />
                        </div>
                        <div>
                          <CardTitle className="text-base">{role.title}</CardTitle>
                        </div>
                      </div>
                      {isSelected && <CheckCircle className="h-4 w-4 text-primary" />}
                    </div>
                    <CardDescription className="text-sm">{role.description}</CardDescription>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <div className="flex flex-wrap gap-1">
                      {role.permissions.slice(0, 2).map((permission, index) => (
                        <Badge key={index} variant="secondary" className="text-xs">
                          {permission}
                        </Badge>
                      ))}
                      {role.permissions.length > 2 && (
                        <Badge variant="outline" className="text-xs">
                          +{role.permissions.length - 2} more
                        </Badge>
                      )}
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </div>

        {/* Family Access */}
        <div className="space-y-4">
          <h2 className="text-xl font-semibold">Family Access</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {familyRoles.map((role) => {
              const Icon = role.icon
              const isSelected = selectedRole === role.id

              return (
                <Card
                  key={role.id}
                  className={`cursor-pointer transition-all duration-200 hover:shadow-md ${
                    isSelected ? "ring-2 ring-primary shadow-md" : "hover:shadow-sm"
                  }`}
                  onClick={() => setSelectedRole(role.id)}
                >
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className="p-2 bg-muted rounded-lg">
                          <Icon className="h-5 w-5" />
                        </div>
                        <div>
                          <CardTitle className="text-base">{role.title}</CardTitle>
                        </div>
                      </div>
                      {isSelected && <CheckCircle className="h-4 w-4 text-primary" />}
                    </div>
                    <CardDescription className="text-sm">{role.description}</CardDescription>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <div className="flex flex-wrap gap-1">
                      {role.permissions.map((permission, index) => (
                        <Badge key={index} variant="secondary" className="text-xs">
                          {permission}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </div>

        <div className="flex justify-center pt-4">
          <Button onClick={handleContinue} disabled={!selectedRole} size="lg" className="px-8">
            Continue to Dashboard
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  )
}
