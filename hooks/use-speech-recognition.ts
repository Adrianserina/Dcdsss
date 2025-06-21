"use client"

import { useState, useEffect, useCallback, useRef } from "react"

interface SpeechRecognitionEvent {
  results: SpeechRecognitionResultList
  resultIndex: number
}

interface SpeechRecognitionError {
  error: string
  message: string
}

export interface UseSpeechRecognitionReturn {
  transcript: string
  isListening: boolean
  hasRecognitionSupport: boolean
  startListening: () => void
  stopListening: () => void
  resetTranscript: () => void
  confidence: number
}

export function useSpeechRecognition(): UseSpeechRecognitionReturn {
  const [transcript, setTranscript] = useState("")
  const [isListening, setIsListening] = useState(false)
  const [confidence, setConfidence] = useState(0)
  const recognitionRef = useRef<SpeechRecognition | null>(null)

  const hasRecognitionSupport =
    typeof window !== "undefined" && ("SpeechRecognition" in window || "webkitSpeechRecognition" in window)

  useEffect(() => {
    if (!hasRecognitionSupport) return

    const SpeechRecognition = window.SpeechRecognition || (window as any).webkitSpeechRecognition
    recognitionRef.current = new SpeechRecognition()

    const recognition = recognitionRef.current
    recognition.continuous = true
    recognition.interimResults = true
    recognition.lang = "en-US"

    recognition.onresult = (event: SpeechRecognitionEvent) => {
      let finalTranscript = ""
      let interimTranscript = ""

      for (let i = event.resultIndex; i < event.results.length; i++) {
        const result = event.results[i]
        if (result.isFinal) {
          finalTranscript += result[0].transcript
          setConfidence(result[0].confidence)
        } else {
          interimTranscript += result[0].transcript
        }
      }

      setTranscript(finalTranscript + interimTranscript)
    }

    recognition.onerror = (event: SpeechRecognitionError) => {
      console.error("Speech recognition error:", event.error)
      setIsListening(false)
    }

    recognition.onend = () => {
      setIsListening(false)
    }

    return () => {
      if (recognition) {
        recognition.stop()
      }
    }
  }, [hasRecognitionSupport])

  const startListening = useCallback(() => {
    if (recognitionRef.current && hasRecognitionSupport) {
      setTranscript("")
      setIsListening(true)
      recognitionRef.current.start()
    }
  }, [hasRecognitionSupport])

  const stopListening = useCallback(() => {
    if (recognitionRef.current && hasRecognitionSupport) {
      recognitionRef.current.stop()
      setIsListening(false)
    }
  }, [hasRecognitionSupport])

  const resetTranscript = useCallback(() => {
    setTranscript("")
    setConfidence(0)
  }, [])

  return {
    transcript,
    isListening,
    hasRecognitionSupport,
    startListening,
    stopListening,
    resetTranscript,
    confidence,
  }
}
