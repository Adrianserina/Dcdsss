"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { CheckCircle, Circle, Play, BookOpen, Users, Shield, Clock, Award } from "lucide-react"

interface OnboardingProps {
  userRole: string
  onComplete: () => void
}

export function Onboarding({ userRole, onComplete }: OnboardingProps) {
  const [currentModule, setCurrentModule] = useState(0)
  const [completedModules, setCompletedModules] = useState<number[]>([])

  const getModulesForRole = (role: string) => {
    const baseModules = [
      {
        id: 1,
        title: "System Overview",
        description: "Learn the basics of Social Care Sync",
        duration: "10 min",
        icon: BookOpen,
        content: [
          "Navigation and dashboard overview",
          "Understanding user roles and permissions",
          "Basic system features and tools",
          "Getting help and support",
        ],
      },
      {
        id: 2,
        title: "Safety & Privacy",
        description: "Data protection and confidentiality",
        duration: "15 min",
        icon: Shield,
        content: [
          "HIPAA compliance requirements",
          "Data security best practices",
          "Client confidentiality protocols",
          "Incident reporting procedures",
        ],
      },
    ]

    const professionalModules = [
      {
        id: 3,
        title: "Case Management",
        description: "Managing cases effectively",
        duration: "20 min",
        icon: Users,
        content: [
          "Creating and updating case records",
          "Risk assessment procedures",
          "Documentation requirements",
          "Case closure protocols",
        ],
      },
      {
        id: 4,
        title: "Emergency Procedures",
        description: "Handling crisis situations",
        duration: "25 min",
        icon: Shield,
        content: [
          "Crisis intervention protocols",
          "Emergency contact procedures",
          "Mandatory reporting requirements",
          "Safety planning strategies",
        ],
      },
    ]

    const familyModules = [
      {
        id: 3,
        title: "Accessing Your Information",
        description: "How to view and manage your care information",
        duration: "15 min",
        icon: Users,
        content: [
          "Viewing care plans and progress",
          "Scheduling appointments",
          "Communicating with your care team",
          "Accessing resources and support",
        ],
      },
      {
        id: 4,
        title: "Your Rights and Advocacy",
        description: "Understanding your rights in the care system",
        duration: "20 min",
        icon: Shield,
        content: [
          "Client rights and responsibilities",
          "How to voice concerns or complaints",
          "Advocacy resources and support",
          "Understanding the care process",
        ],
      },
    ]

    if (role === "parent" || role === "guardian") {
      return [...baseModules, ...familyModules]
    } else {
      return [...baseModules, ...professionalModules]
    }
  }

  const modules = getModulesForRole(userRole)
  const progress = (completedModules.length / modules.length) * 100

  const completeModule = (moduleId: number) => {
    if (!completedModules.includes(moduleId)) {
      setCompletedModules([...completedModules, moduleId])
    }
  }

  const isModuleCompleted = (moduleId: number) => completedModules.includes(moduleId)

  const canAccessModule = (moduleIndex: number) => {
    if (moduleIndex === 0) return true
    return completedModules.includes(modules[moduleIndex - 1].id)
  }

  const handleCompleteOnboarding = () => {
    if (completedModules.length === modules.length) {
      onComplete()
    }
  }

  return (
    <div className="min-h-screen bg-background p-4">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Header */}
        <div className="text-center space-y-4">
          <h1 className="text-2xl md:text-3xl font-bold">Welcome to Social Care Sync</h1>
          <p className="text-muted-foreground">Complete your training to get started with the system</p>
          <div className="max-w-md mx-auto">
            <div className="flex items-center justify-between text-sm mb-2">
              <span>Progress</span>
              <span>
                {completedModules.length}/{modules.length} modules
              </span>
            </div>
            <Progress value={progress} className="h-2" />
          </div>
        </div>

        {/* Training Modules */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {modules.map((module, index) => {
            const Icon = module.icon
            const isCompleted = isModuleCompleted(module.id)
            const canAccess = canAccessModule(index)
            const isCurrent = currentModule === index

            return (
              <Card
                key={module.id}
                className={`transition-all duration-200 ${
                  isCurrent ? "ring-2 ring-primary" : ""
                } ${!canAccess ? "opacity-50" : "hover:shadow-md cursor-pointer"}`}
                onClick={() => canAccess && setCurrentModule(index)}
              >
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className={`p-2 rounded-lg ${isCompleted ? "bg-green-100" : "bg-muted"}`}>
                        <Icon className={`h-5 w-5 ${isCompleted ? "text-green-600" : ""}`} />
                      </div>
                      <div>
                        <CardTitle className="text-base">{module.title}</CardTitle>
                        <div className="flex items-center gap-2 mt-1">
                          <Badge variant="outline" className="text-xs">
                            <Clock className="h-3 w-3 mr-1" />
                            {module.duration}
                          </Badge>
                        </div>
                      </div>
                    </div>
                    <div>
                      {isCompleted ? (
                        <CheckCircle className="h-5 w-5 text-green-500" />
                      ) : (
                        <Circle className="h-5 w-5 text-muted-foreground" />
                      )}
                    </div>
                  </div>
                  <CardDescription>{module.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2 mb-4">
                    {module.content.map((item, idx) => (
                      <div key={idx} className="flex items-center gap-2 text-sm">
                        <div className="w-1 h-1 bg-blue-500 rounded-full" />
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>

                  {canAccess && (
                    <Button
                      variant={isCompleted ? "outline" : "default"}
                      size="sm"
                      className="w-full"
                      onClick={(e) => {
                        e.stopPropagation()
                        if (!isCompleted) {
                          completeModule(module.id)
                        }
                      }}
                    >
                      {isCompleted ? (
                        <>
                          <CheckCircle className="h-4 w-4 mr-2" />
                          Completed
                        </>
                      ) : (
                        <>
                          <Play className="h-4 w-4 mr-2" />
                          Start Module
                        </>
                      )}
                    </Button>
                  )}
                </CardContent>
              </Card>
            )
          })}
        </div>

        {/* Completion */}
        {completedModules.length === modules.length && (
          <Card className="border-green-200 bg-green-50">
            <CardContent className="text-center py-8">
              <Award className="h-12 w-12 text-green-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-green-800 mb-2">Congratulations! Training Complete</h3>
              <p className="text-green-700 mb-4">You've successfully completed all required training modules.</p>
              <Button onClick={handleCompleteOnboarding} size="lg">
                Enter Dashboard
              </Button>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}
