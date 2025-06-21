"use client"

export interface VoiceCommand {
  type: "update_medication" | "add_note" | "update_status" | "schedule_visit" | "record_vital" | "unknown"
  confidence: number
  parameters: Record<string, any>
  originalText: string
}

export function useVoiceCommandProcessor() {
  const processVoiceCommand = (transcript: string, confidence: number): VoiceCommand => {
    const text = transcript.toLowerCase().trim()

    // Medication commands
    if (text.includes("medication") || text.includes("medicine") || text.includes("pill")) {
      if (text.includes("given") || text.includes("administered") || text.includes("took")) {
        return {
          type: "update_medication",
          confidence,
          parameters: {
            action: "administered",
            medication: extractMedication(text),
            time: extractTime(text) || "now",
          },
          originalText: transcript,
        }
      }
    }

    // Note adding commands
    if (text.includes("add note") || text.includes("record note") || text.includes("note that")) {
      return {
        type: "add_note",
        confidence,
        parameters: {
          note: extractNote(text),
          category: extractCategory(text),
        },
        originalText: transcript,
      }
    }

    // Status updates
    if (text.includes("status") || text.includes("condition")) {
      return {
        type: "update_status",
        confidence,
        parameters: {
          status: extractStatus(text),
          severity: extractSeverity(text),
        },
        originalText: transcript,
      }
    }

    // Visit scheduling
    if (text.includes("schedule") || text.includes("appointment") || text.includes("visit")) {
      return {
        type: "schedule_visit",
        confidence,
        parameters: {
          date: extractDate(text),
          time: extractTime(text),
          type: extractVisitType(text),
        },
        originalText: transcript,
      }
    }

    // Vital signs
    if (
      text.includes("blood pressure") ||
      text.includes("temperature") ||
      text.includes("pulse") ||
      text.includes("vital")
    ) {
      return {
        type: "record_vital",
        confidence,
        parameters: {
          type: extractVitalType(text),
          value: extractVitalValue(text),
          unit: extractVitalUnit(text),
        },
        originalText: transcript,
      }
    }

    return {
      type: "unknown",
      confidence,
      parameters: {},
      originalText: transcript,
    }
  }

  return { processVoiceCommand }
}

// Helper functions for extracting information from voice commands
function extractMedication(text: string): string {
  const medicationPatterns = [
    /(?:gave|administered|took)\s+([a-zA-Z]+)/i,
    /medication\s+([a-zA-Z]+)/i,
    /pill\s+([a-zA-Z]+)/i,
  ]

  for (const pattern of medicationPatterns) {
    const match = text.match(pattern)
    if (match) return match[1]
  }
  return "unspecified medication"
}

function extractTime(text: string): string | null {
  const timePatterns = [/at\s+(\d{1,2}:\d{2})/i, /(\d{1,2})\s+(am|pm)/i, /(morning|afternoon|evening|night)/i]

  for (const pattern of timePatterns) {
    const match = text.match(pattern)
    if (match) return match[0]
  }
  return null
}

function extractNote(text: string): string {
  const notePatterns = [/(?:add note|record note|note that)\s+(.+)/i, /note:\s*(.+)/i]

  for (const pattern of notePatterns) {
    const match = text.match(pattern)
    if (match) return match[1]
  }
  return text
}

function extractCategory(text: string): string {
  if (text.includes("medical") || text.includes("health")) return "medical"
  if (text.includes("social") || text.includes("family")) return "social"
  if (text.includes("behavioral") || text.includes("mood")) return "behavioral"
  return "general"
}

function extractStatus(text: string): string {
  if (text.includes("stable")) return "stable"
  if (text.includes("improved") || text.includes("better")) return "improved"
  if (text.includes("declined") || text.includes("worse")) return "declined"
  if (text.includes("critical") || text.includes("urgent")) return "critical"
  return "unchanged"
}

function extractSeverity(text: string): string {
  if (text.includes("mild") || text.includes("slight")) return "mild"
  if (text.includes("moderate")) return "moderate"
  if (text.includes("severe") || text.includes("serious")) return "severe"
  return "normal"
}

function extractDate(text: string): string | null {
  const datePatterns = [
    /(tomorrow|today|yesterday)/i,
    /(monday|tuesday|wednesday|thursday|friday|saturday|sunday)/i,
    /(\d{1,2}\/\d{1,2})/i,
  ]

  for (const pattern of datePatterns) {
    const match = text.match(pattern)
    if (match) return match[1]
  }
  return null
}

function extractVisitType(text: string): string {
  if (text.includes("medical") || text.includes("doctor")) return "medical"
  if (text.includes("social") || text.includes("family")) return "social"
  if (text.includes("therapy") || text.includes("physical")) return "therapy"
  return "general"
}

function extractVitalType(text: string): string {
  if (text.includes("blood pressure") || text.includes("bp")) return "blood_pressure"
  if (text.includes("temperature") || text.includes("temp")) return "temperature"
  if (text.includes("pulse") || text.includes("heart rate")) return "pulse"
  if (text.includes("oxygen") || text.includes("o2")) return "oxygen_saturation"
  return "general"
}

function extractVitalValue(text: string): string | null {
  const valuePatterns = [
    /(\d+\/\d+)/i, // Blood pressure
    /(\d+\.?\d*)\s*degrees?/i, // Temperature
    /(\d+)\s*bpm/i, // Pulse
    /(\d+)\s*percent/i, // Oxygen saturation
  ]

  for (const pattern of valuePatterns) {
    const match = text.match(pattern)
    if (match) return match[1]
  }
  return null
}

function extractVitalUnit(text: string): string {
  if (text.includes("mmhg")) return "mmHg"
  if (text.includes("celsius") || text.includes("°c")) return "°C"
  if (text.includes("fahrenheit") || text.includes("°f")) return "°F"
  if (text.includes("bpm")) return "bpm"
  if (text.includes("percent") || text.includes("%")) return "%"
  return ""
}
