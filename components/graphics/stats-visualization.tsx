"use client"

import type React from "react"

interface StatsVisualizationProps {
  title: string
  value: string | number
  change: string
  icon: React.ReactNode
  color: "blue" | "green" | "purple" | "yellow" | "pink" | "indigo"
  className?: string
}

const colorVariants = {
  blue: {
    bg: "bg-blue-50",
    border: "border-blue-200",
    text: "text-blue-900",
    accent: "text-blue-600",
    gradient: "from-blue-400 to-blue-600",
  },
  green: {
    bg: "bg-green-50",
    border: "border-green-200",
    text: "text-green-900",
    accent: "text-green-600",
    gradient: "from-green-400 to-green-600",
  },
  purple: {
    bg: "bg-purple-50",
    border: "border-purple-200",
    text: "text-purple-900",
    accent: "text-purple-600",
    gradient: "from-purple-400 to-purple-600",
  },
  yellow: {
    bg: "bg-yellow-50",
    border: "border-yellow-200",
    text: "text-yellow-900",
    accent: "text-yellow-600",
    gradient: "from-yellow-400 to-yellow-600",
  },
  pink: {
    bg: "bg-pink-50",
    border: "border-pink-200",
    text: "text-pink-900",
    accent: "text-pink-600",
    gradient: "from-pink-400 to-pink-600",
  },
  indigo: {
    bg: "bg-indigo-50",
    border: "border-indigo-200",
    text: "text-indigo-900",
    accent: "text-indigo-600",
    gradient: "from-indigo-400 to-indigo-600",
  },
}

export function StatsVisualization({ title, value, change, icon, color, className = "" }: StatsVisualizationProps) {
  const colors = colorVariants[color]

  return (
    <div className={`relative overflow-hidden rounded-xl border ${colors.border} ${colors.bg} p-6 ${className}`}>
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-5">
        <svg className="h-full w-full" viewBox="0 0 100 100">
          <defs>
            <pattern id={`pattern-${color}`} x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
              <circle cx="10" cy="10" r="1" fill="currentColor" />
            </pattern>
          </defs>
          <rect width="100" height="100" fill={`url(#pattern-${color})`} />
        </svg>
      </div>

      {/* Content */}
      <div className="relative">
        <div className="flex items-center justify-between mb-4">
          <div className={`p-3 rounded-xl bg-gradient-to-br ${colors.gradient} shadow-lg`}>
            <div className="text-white">{icon}</div>
          </div>

          <div className="text-right">
            <div className={`text-3xl font-bold ${colors.text}`}>{value}</div>
            <div className={`text-sm font-medium ${colors.accent}`}>{change}</div>
          </div>
        </div>

        <h3 className={`text-sm font-medium ${colors.text} opacity-80`}>{title}</h3>

        {/* Animated progress bar */}
        <div className="mt-3 h-1 bg-white/50 rounded-full overflow-hidden">
          <div
            className={`h-full bg-gradient-to-r ${colors.gradient} rounded-full animate-pulse`}
            style={{ width: "75%" }}
          />
        </div>
      </div>

      {/* Decorative elements */}
      <div className="absolute top-2 right-2 opacity-10">
        <div className={`w-16 h-16 rounded-full bg-gradient-to-br ${colors.gradient}`} />
      </div>
      <div className="absolute bottom-2 left-2 opacity-5">
        <div className={`w-8 h-8 rounded-full bg-gradient-to-br ${colors.gradient}`} />
      </div>
    </div>
  )
}
