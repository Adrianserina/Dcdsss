"use client"

import VoiceCarePlanUpdater from "@/components/voice-care-plan-updater"

export default function VoiceCarePlansPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <VoiceCarePlanUpdater />
      </div>
    </div>
  )
}
