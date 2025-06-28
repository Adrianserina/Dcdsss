"use client"

import { useState, useEffect, useRef } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Mic, MicOff, Volume2, VolumeX } from "lucide-react"

interface VoiceCommandsProps {
  userRole: string
  onCommand: (command: string, data?: any) => void
}

export function VoiceCommands({ userRole, onCommand }: VoiceCommandsProps) {
  const [isListening, setIsListening] = useState(false)
  const [isSupported, setIsSupported] = useState(false)
  const [transcript, setTranscript] = useState("")
  const [confidence, setConfidence] = useState(0)
  const recognitionRef = useRef<any>(null)

  useEffect(() => {
    // Check if speech recognition is supported
    if (typeof window !== "undefined") {
      const SpeechRecognition = window.SpeechRecognition || (window as any).webkitSpeechRecognition
      if (SpeechRecognition) {
        setIsSupported(true)
        recognitionRef.current = new SpeechRecognition()

        recognitionRef.current.continuous = true
        recognitionRef.current.interimResults = true
        recognitionRef.current.lang = "en-US"

        recognitionRef.current.onresult = (event: any) => {
          let finalTranscript = ""
          let interimTranscript = ""

          for (let i = event.resultIndex; i < event.results.length; i++) {
            const transcript = event.results[i][0].transcript
            const confidence = event.results[i][0].confidence

            if (event.results[i].isFinal) {
              finalTranscript += transcript
              setConfidence(confidence)
              processCommand(transcript)
            } else {
              interimTranscript += transcript
            }
          }

          setTranscript(finalTranscript || interimTranscript)
        }

        recognitionRef.current.onerror = (event: any) => {
          console.error("Speech recognition error:", event.error)
          setIsListening(false)
        }

        recognitionRef.current.onend = () => {
          setIsListening(false)
        }
      }
    }

    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.stop()
      }
    }
  }, [])

  const processCommand = (command: string) => {
    const lowerCommand = command.toLowerCase().trim()

    // Define voice commands based on user role
    const commands =
      userRole === "parent" || userRole === "guardian"
        ? {
            "show appointments": () => onCommand("navigate", { tab: "appointments" }),
            "book appointment": () => onCommand("navigate", { tab: "book-appointment" }),
            "view care plan": () => onCommand("navigate", { tab: "care-plan" }),
            "show documents": () => onCommand("navigate", { tab: "documents" }),
            "find resources": () => onCommand("navigate", { tab: "resources" }),
            "contact case worker": () => onCommand("contact", { type: "caseworker" }),
          }
        : {
            "show dashboard": () => onCommand("navigate", { tab: "overview" }),
            "view cases": () => onCommand("navigate", { tab: "cases" }),
            "show trends": () => onCommand("navigate", { tab: "trends" }),
            "risk analysis": () => onCommand("navigate", { tab: "risks" }),
            "ai insights": () => onCommand("navigate", { tab: "insights" }),
            "new case": () => onCommand("action", { type: "new-case" }),
            "emergency alert": () => onCommand("action", { type: "emergency" }),
            "run analysis": () => onCommand("action", { type: "ai-analysis" }),
          }

    // Find matching command
    for (const [commandText, action] of Object.entries(commands)) {
      if (lowerCommand.includes(commandText)) {
        action()
        speak(`Executing ${commandText}`)
        break
      }
    }
  }

  const speak = (text: string) => {
    if ("speechSynthesis" in window) {
      const utterance = new SpeechSynthesisUtterance(text)
      utterance.rate = 0.8
      utterance.pitch = 1
      speechSynthesis.speak(utterance)
    }
  }

  const startListening = () => {
    if (recognitionRef.current && !isListening) {
      setTranscript("")
      setConfidence(0)
      recognitionRef.current.start()
      setIsListening(true)
    }
  }

  const stopListening = () => {
    if (recognitionRef.current && isListening) {
      recognitionRef.current.stop()
      setIsListening(false)
    }
  }

  if (!isSupported) {
    return (
      <Card className="border-orange-200">
        <CardContent className="p-4">
          <div className="flex items-center gap-2 text-orange-600">
            <VolumeX className="w-4 h-4" />
            <span className="text-sm">Voice commands not supported in this browser</span>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className={`transition-colors ${isListening ? "border-green-500 bg-green-50 dark:bg-green-950/20" : ""}`}>
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Volume2 className="w-5 h-5" />
            Voice Commands
          </div>
          <Badge variant={isListening ? "default" : "secondary"}>{isListening ? "Listening..." : "Ready"}</Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center gap-2">
          <Button
            onClick={isListening ? stopListening : startListening}
            variant={isListening ? "destructive" : "default"}
            size="sm"
          >
            {isListening ? <MicOff className="w-4 h-4 mr-2" /> : <Mic className="w-4 h-4 mr-2" />}
            {isListening ? "Stop" : "Start"} Listening
          </Button>
          {confidence > 0 && (
            <Badge variant="outline" className="text-xs">
              {Math.round(confidence * 100)}% confidence
            </Badge>
          )}
        </div>

        {transcript && (
          <div className="p-3 bg-muted rounded-lg">
            <div className="text-sm font-medium mb-1">Heard:</div>
            <div className="text-sm">{transcript}</div>
          </div>
        )}

        <div className="space-y-2">
          <div className="text-sm font-medium">Available Commands:</div>
          <div className="grid grid-cols-1 gap-1 text-xs">
            {userRole === "parent" || userRole === "guardian" ? (
              <>
                <div>• "Show appointments"</div>
                <div>• "Book appointment"</div>
                <div>• "View care plan"</div>
                <div>• "Show documents"</div>
                <div>• "Find resources"</div>
                <div>• "Contact case worker"</div>
              </>
            ) : (
              <>
                <div>• "Show dashboard"</div>
                <div>• "View cases"</div>
                <div>• "Show trends"</div>
                <div>• "Risk analysis"</div>
                <div>• "AI insights"</div>
                <div>• "New case"</div>
                <div>• "Emergency alert"</div>
                <div>• "Run analysis"</div>
              </>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
