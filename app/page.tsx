"use client"

import { useState } from "react"
import { RoleSelection } from "@/components/role-selection"
import { Onboarding } from "@/components/onboarding"
import { EnhancedDashboard } from "@/components/enhanced-dashboard"
import { FamilyDashboard } from "@/components/family-dashboard"

export default function Home() {
  const [selectedRole, setSelectedRole] = useState<string | null>(null)
  const [hasCompletedOnboarding, setHasCompletedOnboarding] = useState(false)
  const [userId] = useState("demo-user")

  const handleRoleSelect = (role: string) => {
    setSelectedRole(role)
    setHasCompletedOnboarding(false)
  }

  const handleOnboardingComplete = () => {
    setHasCompletedOnboarding(true)
  }

  const handleLogout = () => {
    setSelectedRole(null)
    setHasCompletedOnboarding(false)
  }

  // Role selection screen
  if (!selectedRole) {
    return <RoleSelection onRoleSelect={handleRoleSelect} />
  }

  // Onboarding screen
  if (!hasCompletedOnboarding) {
    return <Onboarding userRole={selectedRole} onComplete={handleOnboardingComplete} />
  }

  // Dashboard based on role
  if (selectedRole === "parent" || selectedRole === "guardian") {
    return (
      <main>
        <FamilyDashboard userId={userId} userRole={selectedRole} onLogout={handleLogout} />
      </main>
    )
  }

  return (
    <main>
      <EnhancedDashboard userId={userId} userRole={selectedRole} onLogout={handleLogout} />
    </main>
  )
}
