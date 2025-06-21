"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { TrendingUp, TrendingDown, Minus } from "lucide-react"

export function TrendChart() {
  const trendData = [
    {
      category: "Mental Health Support",
      current: 45,
      previous: 38,
      change: 18.4,
      trend: "up" as const,
      severity: "medium" as const,
      details: "Increased demand in urban areas, particularly among young adults",
    },
    {
      category: "Elder Care Services",
      current: 67,
      previous: 69,
      change: -2.9,
      trend: "down" as const,
      severity: "low" as const,
      details: "Slight decrease due to improved preventive care programs",
    },
    {
      category: "Child Protection",
      current: 23,
      previous: 31,
      change: -25.8,
      trend: "down" as const,
      severity: "high" as const,
      details: "Significant improvement following new intervention protocols",
    },
    {
      category: "Disability Support",
      current: 34,
      previous: 34,
      change: 0,
      trend: "stable" as const,
      severity: "low" as const,
      details: "Consistent service delivery with stable demand",
    },
    {
      category: "Housing Assistance",
      current: 89,
      previous: 76,
      change: 17.1,
      trend: "up" as const,
      severity: "high" as const,
      details: "Rising housing costs driving increased need for assistance",
    },
    {
      category: "Family Counseling",
      current: 56,
      previous: 52,
      change: 7.7,
      trend: "up" as const,
      severity: "medium" as const,
      details: "Growing awareness and reduced stigma increasing uptake",
    },
  ]

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case "up":
        return <TrendingUp className="w-4 h-4 text-red-500" />
      case "down":
        return <TrendingDown className="w-4 h-4 text-green-500" />
      default:
        return <Minus className="w-4 h-4 text-gray-500" />
    }
  }

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "high":
        return "destructive"
      case "medium":
        return "default"
      default:
        return "secondary"
    }
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Service Category Trends</CardTitle>
          <CardDescription>AI-powered analysis of service demand patterns over the last 6 months</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {trendData.map((item, index) => (
              <div key={index} className="border rounded-lg p-4 space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    {getTrendIcon(item.trend)}
                    <h3 className="font-semibold">{item.category}</h3>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant={getSeverityColor(item.severity)}>{item.severity} priority</Badge>
                    <div className="flex items-center gap-1">
                      <div
                        className={`w-3 h-3 rounded-full ${
                          item.change > 0 ? "bg-red-500" : item.change < 0 ? "bg-green-500" : "bg-gray-500"
                        }`}
                      />
                      <div className="text-sm font-medium">
                        {item.change > 0 ? "+" : ""}
                        {item.change.toFixed(1)}%
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="flex-1">
                    <div className="flex justify-between text-sm text-gray-600 mb-1">
                      <span>Current Cases: {item.current}</span>
                      <span>Previous: {item.previous}</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className={`h-2 rounded-full ${
                          item.trend === "up" ? "bg-red-500" : item.trend === "down" ? "bg-green-500" : "bg-gray-500"
                        }`}
                        style={{ width: `${Math.min((item.current / 100) * 100, 100)}%` }}
                      />
                    </div>
                  </div>
                </div>

                <p className="border p-2 rounded-lg bg-muted/50 text-sm text-gray-600">
                  <strong>AI Insight:</strong> {item.details}
                </p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
