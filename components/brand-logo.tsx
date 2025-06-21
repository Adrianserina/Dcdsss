"use client"

import { Heart, Sparkles } from "lucide-react"

interface BrandLogoProps {
  size?: "sm" | "md" | "lg"
  showText?: boolean
  variant?: "default" | "white" | "compact"
}

export function BrandLogo({ size = "md", showText = true, variant = "default" }: BrandLogoProps) {
  const sizeClasses = {
    sm: "h-6 w-6",
    md: "h-8 w-8",
    lg: "h-12 w-12",
  }

  const textSizeClasses = {
    sm: "text-lg",
    md: "text-xl",
    lg: "text-3xl",
  }

  const textColor = variant === "white" ? "text-white" : "text-gray-900"
  const iconColor = variant === "white" ? "text-white" : "text-blue-600"

  return (
    <div className="flex items-center space-x-3">
      <div className="relative">
        {/* Main logo container with gradient background */}
        <div
          className={`${sizeClasses[size]} relative rounded-xl bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 p-1.5 shadow-lg`}
        >
          {/* Inner container */}
          <div className="relative h-full w-full rounded-lg bg-white/90 backdrop-blur-sm flex items-center justify-center">
            <Heart className={`${size === "sm" ? "h-3 w-3" : size === "md" ? "h-4 w-4" : "h-6 w-6"} text-blue-600`} />
          </div>

          {/* Floating accent icons */}
          <div className="absolute -top-1 -right-1">
            <div className="h-3 w-3 rounded-full bg-gradient-to-r from-green-400 to-blue-500 flex items-center justify-center">
              <Sparkles className="h-1.5 w-1.5 text-white" />
            </div>
          </div>
        </div>
      </div>

      {showText && (
        <div className="flex flex-col">
          <h1 className={`${textSizeClasses[size]} font-bold ${textColor} leading-tight`}>SocialCareSync</h1>
          {size !== "sm" && (
            <p className={`text-xs ${variant === "white" ? "text-white/80" : "text-gray-500"} font-medium`}>
              AI-Powered Care Management
            </p>
          )}
        </div>
      )}
    </div>
  )
}
