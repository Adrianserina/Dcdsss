"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Fingerprint, Eye, Shield, Lock, AlertTriangle, CheckCircle } from "lucide-react"

interface BiometricSecurityProps {
  userRole: string
  onAuthSuccess: (method: string) => void
  onAuthFailure: (error: string) => void
}

export function BiometricSecurity({ userRole, onAuthSuccess, onAuthFailure }: BiometricSecurityProps) {
  const [isSupported, setIsSupported] = useState(false)
  const [availableMethods, setAvailableMethods] = useState<string[]>([])
  const [isAuthenticating, setIsAuthenticating] = useState(false)
  const [lastAuthMethod, setLastAuthMethod] = useState<string | null>(null)
  const [authHistory, setAuthHistory] = useState<Array<{ method: string; timestamp: Date; success: boolean }>>([])

  useEffect(() => {
    checkBiometricSupport()
  }, [])

  const checkBiometricSupport = async () => {
    if (typeof window === "undefined") return

    // Check for WebAuthn support
    if (window.PublicKeyCredential) {
      setIsSupported(true)

      try {
        // Check available authenticator methods
        const available = await PublicKeyCredential.isUserVerifyingPlatformAuthenticatorAvailable()
        if (available) {
          setAvailableMethods(["fingerprint", "face", "pin"])
        } else {
          setAvailableMethods(["pin"])
        }
      } catch (error) {
        console.error("Error checking biometric support:", error)
        setAvailableMethods(["pin"])
      }
    }
  }

  const authenticateWithBiometric = async (method: string) => {
    setIsAuthenticating(true)

    try {
      // Simulate biometric authentication
      await new Promise((resolve) => setTimeout(resolve, 2000))

      // Simulate success/failure (90% success rate)
      const success = Math.random() > 0.1

      if (success) {
        setLastAuthMethod(method)
        onAuthSuccess(method)
        addToAuthHistory(method, true)
      } else {
        throw new Error("Biometric authentication failed")
      }
    } catch (error) {
      onAuthFailure(error instanceof Error ? error.message : "Authentication failed")
      addToAuthHistory(method, false)
    } finally {
      setIsAuthenticating(false)
    }
  }

  const authenticateWithWebAuthn = async () => {
    if (!window.PublicKeyCredential) {
      onAuthFailure("WebAuthn not supported")
      return
    }

    setIsAuthenticating(true)

    try {
      // Create credential request
      const credential = await navigator.credentials.create({
        publicKey: {
          challenge: new Uint8Array(32),
          rp: {
            name: "Social Care Sync",
            id: "localhost",
          },
          user: {
            id: new Uint8Array(16),
            name: "user@example.com",
            displayName: "User",
          },
          pubKeyCredParams: [{ alg: -7, type: "public-key" }],
          authenticatorSelection: {
            authenticatorAttachment: "platform",
            userVerification: "required",
          },
          timeout: 60000,
          attestation: "direct",
        },
      })

      if (credential) {
        setLastAuthMethod("webauthn")
        onAuthSuccess("webauthn")
        addToAuthHistory("webauthn", true)
      }
    } catch (error) {
      onAuthFailure("WebAuthn authentication failed")
      addToAuthHistory("webauthn", false)
    } finally {
      setIsAuthenticating(false)
    }
  }

  const addToAuthHistory = (method: string, success: boolean) => {
    setAuthHistory((prev) => [{ method, timestamp: new Date(), success }, ...prev.slice(0, 9)])
  }

  const getMethodIcon = (method: string) => {
    switch (method) {
      case "fingerprint":
        return <Fingerprint className="w-4 h-4" />
      case "face":
        return <Eye className="w-4 h-4" />
      case "webauthn":
        return <Shield className="w-4 h-4" />
      default:
        return <Lock className="w-4 h-4" />
    }
  }

  const getMethodName = (method: string) => {
    switch (method) {
      case "fingerprint":
        return "Fingerprint"
      case "face":
        return "Face Recognition"
      case "webauthn":
        return "Security Key"
      case "pin":
        return "PIN"
      default:
        return method
    }
  }

  if (!isSupported) {
    return (
      <Card className="border-orange-200">
        <CardContent className="p-4">
          <div className="flex items-center gap-2 text-orange-600">
            <AlertTriangle className="w-4 h-4" />
            <span className="text-sm">Biometric authentication not supported</span>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Shield className="w-5 h-5" />
              Biometric Security
            </div>
            <Badge variant={lastAuthMethod ? "default" : "secondary"}>
              {lastAuthMethod ? "Authenticated" : "Not Authenticated"}
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {lastAuthMethod && (
            <div className="p-3 bg-green-50 border border-green-200 rounded-lg">
              <div className="flex items-center gap-2 text-green-600">
                <CheckCircle className="w-4 h-4" />
                <span className="text-sm">Authenticated with {getMethodName(lastAuthMethod)}</span>
              </div>
            </div>
          )}

          <div className="space-y-2">
            <div className="text-sm font-medium">Available Authentication Methods:</div>
            <div className="grid grid-cols-1 gap-2">
              {availableMethods.map((method) => (
                <Button
                  key={method}
                  onClick={() => authenticateWithBiometric(method)}
                  disabled={isAuthenticating}
                  variant="outline"
                  className="justify-start"
                >
                  {getMethodIcon(method)}
                  <span className="ml-2">{getMethodName(method)}</span>
                  {isAuthenticating && <span className="ml-auto">Authenticating...</span>}
                </Button>
              ))}

              <Button
                onClick={authenticateWithWebAuthn}
                disabled={isAuthenticating}
                variant="outline"
                className="justify-start bg-transparent"
              >
                <Shield className="w-4 h-4" />
                <span className="ml-2">Security Key (WebAuthn)</span>
                {isAuthenticating && <span className="ml-auto">Authenticating...</span>}
              </Button>
            </div>
          </div>

          {userRole !== "parent" && userRole !== "guardian" && authHistory.length > 0 && (
            <div className="space-y-2">
              <div className="text-sm font-medium">Authentication History:</div>
              <div className="space-y-1 max-h-32 overflow-y-auto">
                {authHistory.map((auth, index) => (
                  <div key={index} className="flex items-center justify-between p-2 border rounded text-xs">
                    <div className="flex items-center gap-2">
                      {getMethodIcon(auth.method)}
                      <span>{getMethodName(auth.method)}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      {auth.success ? (
                        <CheckCircle className="w-3 h-3 text-green-500" />
                      ) : (
                        <AlertTriangle className="w-3 h-3 text-red-500" />
                      )}
                      <span className="text-muted-foreground">{auth.timestamp.toLocaleTimeString()}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
            <div className="text-sm text-blue-800">
              <strong>Security Note:</strong> Biometric authentication adds an extra layer of security to protect
              sensitive case information and ensure only authorized access.
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
