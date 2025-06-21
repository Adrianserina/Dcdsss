"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Label } from "@/components/ui/label"
import { Mic, MicOff, Volume2, VolumeX, CheckCircle, AlertCircle, Brain, Zap, Save, RefreshCw } from "lucide-react"
import { useSpeechRecognition } from "../hooks/use-speech-recognition"
import { useVoiceCommandProcessor, type VoiceCommand } from "./voice-command-processor"

interface CarePlanUpdate {
  id: string
  clientName: string
  updateType: string
  content: string
  timestamp: Date
  confidence: number
  status: "pending" | "confirmed" | "saved"
}

export default function VoiceCarePlanUpdater() {
  const { transcript, isListening, hasRecognitionSupport, startListening, stopListening, resetTranscript, confidence } =
    useSpeechRecognition()

  const { processVoiceCommand } = useVoiceCommandProcessor()
  const [voiceEnabled, setVoiceEnabled] = useState(true)
  const [currentCommand, setCurrentCommand] = useState<VoiceCommand | null>(null)
  const [pendingUpdates, setPendingUpdates] = useState<CarePlanUpdate[]>([])
  const [selectedClient, setSelectedClient] = useState("Sarah Johnson")
  const [isProcessing, setIsProcessing] = useState(false)
  const [lastSaved, setLastSaved] = useState<Date | null>(null)

  // Mock client data
  const clients = ["Sarah Johnson", "Michael Brown", "Emma Davis", "Robert Wilson", "Linda Garcia"]

  // Process voice commands when transcript changes
  useEffect(() => {
    if (transcript && confidence > 0.7) {
      setIsProcessing(true)
      const command = processVoiceCommand(transcript, confidence)
      setCurrentCommand(command)

      if (command.type !== "unknown") {
        const update: CarePlanUpdate = {
          id: Date.now().toString(),
          clientName: selectedClient,
          updateType: command.type,
          content: formatCommandContent(command),
          timestamp: new Date(),
          confidence: command.confidence,
          status: "pending",
        }
        setPendingUpdates((prev) => [update, ...prev])

        // Voice feedback
        if (voiceEnabled) {
          speakFeedback(`Recorded ${command.type.replace("_", " ")} for ${selectedClient}`)
        }
      }

      setTimeout(() => setIsProcessing(false), 1000)
    }
  }, [transcript, confidence, selectedClient, voiceEnabled])

  const formatCommandContent = (command: VoiceCommand): string => {
    switch (command.type) {
      case "update_medication":
        return `Medication ${command.parameters.medication} ${command.parameters.action} at ${command.parameters.time}`
      case "add_note":
        return `Note (${command.parameters.category}): ${command.parameters.note}`
      case "update_status":
        return `Status updated to ${command.parameters.status} (${command.parameters.severity})`
      case "schedule_visit":
        return `${command.parameters.type} visit scheduled for ${command.parameters.date} at ${command.parameters.time}`
      case "record_vital":
        return `${command.parameters.type}: ${command.parameters.value} ${command.parameters.unit}`
      default:
        return command.originalText
    }
  }

  const speakFeedback = (text: string) => {
    if ("speechSynthesis" in window && voiceEnabled) {
      const utterance = new SpeechSynthesisUtterance(text)
      utterance.rate = 0.9
      utterance.pitch = 1
      utterance.volume = 0.8
      speechSynthesis.speak(utterance)
    }
  }

  const confirmUpdate = (updateId: string) => {
    setPendingUpdates((prev) =>
      prev.map((update) => (update.id === updateId ? { ...update, status: "confirmed" } : update)),
    )
    if (voiceEnabled) {
      speakFeedback("Update confirmed")
    }
  }

  const saveUpdate = (updateId: string) => {
    setPendingUpdates((prev) =>
      prev.map((update) => (update.id === updateId ? { ...update, status: "saved" } : update)),
    )
    setLastSaved(new Date())
    if (voiceEnabled) {
      speakFeedback("Update saved to care plan")
    }
  }

  const saveAllUpdates = () => {
    setPendingUpdates((prev) => prev.map((update) => ({ ...update, status: "saved" })))
    setLastSaved(new Date())
    if (voiceEnabled) {
      speakFeedback("All updates saved")
    }
  }

  const clearUpdates = () => {
    setPendingUpdates([])
    resetTranscript()
    setCurrentCommand(null)
  }

  const handleVoiceToggle = () => {
    if (isListening) {
      stopListening()
    } else {
      startListening()
    }
  }

  if (!hasRecognitionSupport) {
    return (
      <Alert>
        <AlertCircle className="h-4 w-4" />
        <AlertDescription>
          Voice recognition is not supported in your browser. Please use Chrome, Edge, or Safari for voice features.
        </AlertDescription>
      </Alert>
    )
  }

  return (
    <div className="space-y-6">
      {/* Voice Control Header */}
      <Card className="bg-gradient-to-r from-purple-500 to-blue-600 text-white">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold mb-2">Voice-Controlled Care Plan Updates</h2>
              <p className="text-purple-100">Hands-free care plan management with AI-powered voice recognition</p>
            </div>
            <div className="flex items-center space-x-4">
              <Button
                variant="secondary"
                size="sm"
                onClick={() => setVoiceEnabled(!voiceEnabled)}
                className="bg-white/20 hover:bg-white/30 text-white border-white/30"
              >
                {voiceEnabled ? <Volume2 className="h-4 w-4" /> : <VolumeX className="h-4 w-4" />}
              </Button>
              <Badge variant="secondary" className="bg-white/20 text-white">
                AI-Powered
              </Badge>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Voice Control Panel */}
        <div className="lg:col-span-1 space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Mic className="h-5 w-5" />
                <span>Voice Control</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Client Selection */}
              <div>
                <Label htmlFor="client-select">Active Client</Label>
                <select
                  id="client-select"
                  value={selectedClient}
                  onChange={(e) => setSelectedClient(e.target.value)}
                  className="w-full mt-1 p-2 border rounded-md"
                >
                  {clients.map((client) => (
                    <option key={client} value={client}>
                      {client}
                    </option>
                  ))}
                </select>
              </div>

              {/* Voice Control Button */}
              <Button
                onClick={handleVoiceToggle}
                className={`w-full h-16 text-lg ${
                  isListening ? "bg-red-500 hover:bg-red-600 animate-pulse" : "bg-blue-500 hover:bg-blue-600"
                }`}
              >
                {isListening ? (
                  <>
                    <MicOff className="h-6 w-6 mr-2" />
                    Stop Listening
                  </>
                ) : (
                  <>
                    <Mic className="h-6 w-6 mr-2" />
                    Start Voice Input
                  </>
                )}
              </Button>

              {/* Voice Status */}
              {isListening && (
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Listening...</span>
                    <Badge variant="secondary" className="bg-green-100 text-green-800">
                      Active
                    </Badge>
                  </div>
                  <Progress value={confidence * 100} className="h-2" />
                  <p className="text-xs text-gray-500">Confidence: {Math.round(confidence * 100)}%</p>
                </div>
              )}

              {/* Current Transcript */}
              {transcript && (
                <div className="p-3 bg-gray-50 rounded-lg">
                  <Label className="text-sm font-medium">Current Input:</Label>
                  <p className="text-sm mt-1">{transcript}</p>
                </div>
              )}

              {/* Processing Indicator */}
              {isProcessing && (
                <div className="flex items-center space-x-2 text-blue-600">
                  <RefreshCw className="h-4 w-4 animate-spin" />
                  <span className="text-sm">Processing command...</span>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Voice Commands Help */}
          <Card>
            <CardHeader>
              <CardTitle className="text-sm">Voice Commands</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2 text-xs">
                <div>
                  <strong>Medication:</strong>
                  <p className="text-gray-600">"Gave aspirin at 2 PM"</p>
                </div>
                <div>
                  <strong>Notes:</strong>
                  <p className="text-gray-600">"Add note patient seems tired"</p>
                </div>
                <div>
                  <strong>Status:</strong>
                  <p className="text-gray-600">"Status improved, condition stable"</p>
                </div>
                <div>
                  <strong>Vitals:</strong>
                  <p className="text-gray-600">"Blood pressure 120 over 80"</p>
                </div>
                <div>
                  <strong>Schedule:</strong>
                  <p className="text-gray-600">"Schedule visit tomorrow at 10 AM"</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Updates Panel */}
        <div className="lg:col-span-2 space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span>Pending Updates</span>
                <div className="flex space-x-2">
                  <Button variant="outline" size="sm" onClick={clearUpdates} disabled={pendingUpdates.length === 0}>
                    Clear All
                  </Button>
                  <Button
                    size="sm"
                    onClick={saveAllUpdates}
                    disabled={pendingUpdates.length === 0}
                    className="bg-green-600 hover:bg-green-700"
                  >
                    <Save className="h-4 w-4 mr-2" />
                    Save All
                  </Button>
                </div>
              </CardTitle>
              <CardDescription>Review and confirm voice-generated care plan updates</CardDescription>
            </CardHeader>
            <CardContent>
              {pendingUpdates.length === 0 ? (
                <div className="text-center py-8 text-gray-500">
                  <Mic className="h-12 w-12 mx-auto mb-4 opacity-50" />
                  <p>No pending updates. Start speaking to add care plan updates.</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {pendingUpdates.map((update) => (
                    <div
                      key={update.id}
                      className={`p-4 border rounded-lg ${
                        update.status === "saved"
                          ? "bg-green-50 border-green-200"
                          : update.status === "confirmed"
                            ? "bg-blue-50 border-blue-200"
                            : "bg-yellow-50 border-yellow-200"
                      }`}
                    >
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <h4 className="font-semibold">{update.clientName}</h4>
                          <Badge
                            variant="outline"
                            className={`text-xs ${
                              update.updateType === "update_medication"
                                ? "bg-blue-100 text-blue-800"
                                : update.updateType === "add_note"
                                  ? "bg-green-100 text-green-800"
                                  : update.updateType === "update_status"
                                    ? "bg-yellow-100 text-yellow-800"
                                    : update.updateType === "record_vital"
                                      ? "bg-purple-100 text-purple-800"
                                      : "bg-gray-100 text-gray-800"
                            }`}
                          >
                            {update.updateType.replace("_", " ")}
                          </Badge>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Badge variant="secondary" className="text-xs">
                            {Math.round(update.confidence * 100)}% confidence
                          </Badge>
                          {update.status === "saved" && <CheckCircle className="h-4 w-4 text-green-600" />}
                        </div>
                      </div>

                      <p className="text-sm text-gray-700 mb-3">{update.content}</p>

                      <div className="flex items-center justify-between">
                        <span className="text-xs text-gray-500">{update.timestamp.toLocaleTimeString()}</span>

                        {update.status === "pending" && (
                          <div className="flex space-x-2">
                            <Button variant="outline" size="sm" onClick={() => confirmUpdate(update.id)}>
                              Confirm
                            </Button>
                            <Button
                              size="sm"
                              onClick={() => saveUpdate(update.id)}
                              className="bg-green-600 hover:bg-green-700"
                            >
                              Save
                            </Button>
                          </div>
                        )}

                        {update.status === "confirmed" && (
                          <Button
                            size="sm"
                            onClick={() => saveUpdate(update.id)}
                            className="bg-green-600 hover:bg-green-700"
                          >
                            <Save className="h-4 w-4 mr-2" />
                            Save to Plan
                          </Button>
                        )}

                        {update.status === "saved" && (
                          <Badge variant="secondary" className="bg-green-100 text-green-800">
                            Saved
                          </Badge>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>

          {/* AI Insights */}
          {currentCommand && currentCommand.type !== "unknown" && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Brain className="h-5 w-5 text-purple-600" />
                  <span>AI Analysis</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center space-x-2">
                    <Zap className="h-4 w-4 text-blue-600" />
                    <span className="text-sm font-medium">Command Recognition:</span>
                    <Badge variant="secondary">{currentCommand.type.replace("_", " ")}</Badge>
                  </div>

                  <div className="p-3 bg-purple-50 rounded-lg">
                    <p className="text-sm">
                      <strong>AI Interpretation:</strong> {formatCommandContent(currentCommand)}
                    </p>
                    <p className="text-xs text-gray-600 mt-1">
                      Confidence: {Math.round(currentCommand.confidence * 100)}%
                    </p>
                  </div>

                  {currentCommand.confidence < 0.8 && (
                    <Alert>
                      <AlertCircle className="h-4 w-4" />
                      <AlertDescription className="text-sm">
                        Low confidence detected. Please review the interpretation before saving.
                      </AlertDescription>
                    </Alert>
                  )}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Last Saved Indicator */}
          {lastSaved && (
            <div className="flex items-center justify-center space-x-2 text-sm text-green-600">
              <CheckCircle className="h-4 w-4" />
              <span>Last saved: {lastSaved.toLocaleTimeString()}</span>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
