"use client"

import { useState, useEffect } from "react"

interface OfflineData {
  cases: any[]
  appointments: any[]
  resources: any[]
  lastSync: string
}

export function useOfflineMode() {
  const [isOnline, setIsOnline] = useState(true)
  const [offlineData, setOfflineData] = useState<OfflineData | null>(null)
  const [pendingSync, setPendingSync] = useState<any[]>([])

  useEffect(() => {
    // Check if we're in a browser environment
    if (typeof window === "undefined") {
      return
    }

    const handleOnline = () => setIsOnline(true)
    const handleOffline = () => setIsOnline(false)

    // Set initial online status
    setIsOnline(navigator.onLine)

    window.addEventListener("online", handleOnline)
    window.addEventListener("offline", handleOffline)

    // Load offline data from localStorage with error handling
    try {
      const stored = localStorage.getItem("socialcare-offline-data")
      if (stored) {
        const parsedData = JSON.parse(stored)
        setOfflineData(parsedData)
      }
    } catch (error) {
      console.error("Failed to load offline data:", error)
      // Initialize with empty data if parsing fails
      setOfflineData({
        cases: [],
        appointments: [],
        resources: [],
        lastSync: new Date().toISOString(),
      })
    }

    return () => {
      window.removeEventListener("online", handleOnline)
      window.removeEventListener("offline", handleOffline)
    }
  }, [])

  const syncData = async () => {
    if (!isOnline) return

    try {
      // Simulate API sync
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Clear pending sync items
      setPendingSync([])

      // Update last sync time
      const updatedData = {
        cases: [],
        appointments: [],
        resources: [],
        lastSync: new Date().toISOString(),
        ...offlineData,
      }
      setOfflineData(updatedData)

      if (typeof window !== "undefined") {
        localStorage.setItem("socialcare-offline-data", JSON.stringify(updatedData))
      }
    } catch (error) {
      console.error("Sync failed:", error)
    }
  }

  const addPendingSync = (item: any) => {
    setPendingSync((prev) => [...prev, item])
  }

  return {
    isOnline,
    offlineData,
    pendingSync,
    syncData,
    addPendingSync,
  }
}
