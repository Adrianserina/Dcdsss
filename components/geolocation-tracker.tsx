"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { MapPin, Navigation, Clock, AlertTriangle } from "lucide-react"

interface LocationData {
  latitude: number
  longitude: number
  accuracy: number
  timestamp: Date
  address?: string
}

interface GeolocationTrackerProps {
  userRole: string
  onLocationUpdate: (location: LocationData) => void
}

export function GeolocationTracker({ userRole, onLocationUpdate }: GeolocationTrackerProps) {
  const [currentLocation, setCurrentLocation] = useState<LocationData | null>(null)
  const [isTracking, setIsTracking] = useState(false)
  const [isSupported, setIsSupported] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [visitHistory, setVisitHistory] = useState<LocationData[]>([])

  useEffect(() => {
    setIsSupported("geolocation" in navigator)
  }, [])

  const getCurrentLocation = () => {
    if (!navigator.geolocation) {
      setError("Geolocation is not supported")
      return
    }

    setError(null)
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const locationData: LocationData = {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          accuracy: position.coords.accuracy,
          timestamp: new Date(),
        }

        // Simulate reverse geocoding
        getAddressFromCoords(locationData.latitude, locationData.longitude).then((address) => {
          locationData.address = address
          setCurrentLocation(locationData)
          onLocationUpdate(locationData)

          // Add to visit history
          setVisitHistory((prev) => [locationData, ...prev.slice(0, 9)])
        })
      },
      (error) => {
        setError(`Location error: ${error.message}`)
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 60000,
      },
    )
  }

  const startTracking = () => {
    if (!navigator.geolocation) return

    setIsTracking(true)
    setError(null)

    const watchId = navigator.geolocation.watchPosition(
      (position) => {
        const locationData: LocationData = {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          accuracy: position.coords.accuracy,
          timestamp: new Date(),
        }

        getAddressFromCoords(locationData.latitude, locationData.longitude).then((address) => {
          locationData.address = address
          setCurrentLocation(locationData)
          onLocationUpdate(locationData)
        })
      },
      (error) => {
        setError(`Tracking error: ${error.message}`)
        setIsTracking(false)
      },
      {
        enableHighAccuracy: true,
        timeout: 5000,
        maximumAge: 30000,
      },
    )

    // Store watch ID for cleanup
    return () => {
      navigator.geolocation.clearWatch(watchId)
      setIsTracking(false)
    }
  }

  const stopTracking = () => {
    setIsTracking(false)
  }

  // Simulate reverse geocoding (in real app, use a geocoding service)
  const getAddressFromCoords = async (lat: number, lng: number): Promise<string> => {
    // Simulate API call delay
    await new Promise((resolve) => setTimeout(resolve, 500))

    // Mock addresses based on coordinates
    const mockAddresses = [
      "123 Main Street, Downtown",
      "456 Oak Avenue, Residential Area",
      "789 Community Center Drive",
      "321 School District Road",
      "654 Healthcare Plaza",
    ]

    return mockAddresses[Math.floor(Math.random() * mockAddresses.length)]
  }

  const formatCoordinates = (lat: number, lng: number) => {
    return `${lat.toFixed(6)}, ${lng.toFixed(6)}`
  }

  const getAccuracyColor = (accuracy: number) => {
    if (accuracy <= 10) return "text-green-600"
    if (accuracy <= 50) return "text-yellow-600"
    return "text-red-600"
  }

  if (!isSupported) {
    return (
      <Card className="border-orange-200">
        <CardContent className="p-4">
          <div className="flex items-center gap-2 text-orange-600">
            <AlertTriangle className="w-4 h-4" />
            <span className="text-sm">Geolocation not supported in this browser</span>
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
              <MapPin className="w-5 h-5" />
              Location Tracking
            </div>
            <Badge variant={isTracking ? "default" : "secondary"}>{isTracking ? "Active" : "Inactive"}</Badge>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center gap-2">
            <Button onClick={getCurrentLocation} variant="outline" size="sm">
              <Navigation className="w-4 h-4 mr-2" />
              Get Current Location
            </Button>
            <Button
              onClick={isTracking ? stopTracking : startTracking}
              variant={isTracking ? "destructive" : "default"}
              size="sm"
            >
              {isTracking ? "Stop Tracking" : "Start Tracking"}
            </Button>
          </div>

          {error && (
            <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
              <div className="flex items-center gap-2 text-red-600">
                <AlertTriangle className="w-4 h-4" />
                <span className="text-sm">{error}</span>
              </div>
            </div>
          )}

          {currentLocation && (
            <div className="space-y-3">
              <div className="p-3 bg-muted rounded-lg">
                <div className="text-sm font-medium mb-2">Current Location:</div>
                <div className="space-y-1 text-sm">
                  <div>📍 {currentLocation.address || "Address not available"}</div>
                  <div>🗺️ {formatCoordinates(currentLocation.latitude, currentLocation.longitude)}</div>
                  <div
                    className={`🎯 Accuracy: ±${currentLocation.accuracy.toFixed(0)}m ${getAccuracyColor(currentLocation.accuracy)}`}
                  ></div>
                  <div className="flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    {currentLocation.timestamp.toLocaleTimeString()}
                  </div>
                </div>
              </div>
            </div>
          )}

          {userRole !== "parent" && userRole !== "guardian" && visitHistory.length > 0 && (
            <div className="space-y-2">
              <div className="text-sm font-medium">Recent Visits:</div>
              <div className="space-y-2 max-h-40 overflow-y-auto">
                {visitHistory.map((visit, index) => (
                  <div key={index} className="p-2 border rounded text-xs">
                    <div className="font-medium">{visit.address}</div>
                    <div className="text-muted-foreground">{visit.timestamp.toLocaleString()}</div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
