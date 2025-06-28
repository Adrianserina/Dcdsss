"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { MapPin, AlertTriangle, Users, Clock } from "lucide-react"

export function RiskHeatmap() {
  const riskAreas = [
    {
      area: "North District",
      riskLevel: "high" as const,
      riskScore: 8.2,
      activeCases: 34,
      redFlags: 12,
      primaryConcerns: ["Mental Health Crisis", "Housing Instability", "Youth at Risk"],
      lastUpdated: "2 hours ago",
      coordinates: { x: 20, y: 15 },
    },
    {
      area: "Central District",
      riskLevel: "medium" as const,
      riskScore: 5.7,
      activeCases: 28,
      redFlags: 6,
      primaryConcerns: ["Elder Care", "Family Support", "Financial Hardship"],
      lastUpdated: "4 hours ago",
      coordinates: { x: 45, y: 40 },
    },
    {
      area: "South District",
      riskLevel: "low" as const,
      riskScore: 3.1,
      activeCases: 19,
      redFlags: 2,
      primaryConcerns: ["Routine Support", "Preventive Care"],
      lastUpdated: "1 hour ago",
      coordinates: { x: 30, y: 70 },
    },
    {
      area: "East District",
      riskLevel: "critical" as const,
      riskScore: 9.4,
      activeCases: 42,
      redFlags: 18,
      primaryConcerns: ["Child Protection", "Domestic Violence", "Substance Abuse"],
      lastUpdated: "30 minutes ago",
      coordinates: { x: 75, y: 35 },
    },
    {
      area: "West District",
      riskLevel: "medium" as const,
      riskScore: 6.3,
      activeCases: 31,
      redFlags: 8,
      primaryConcerns: ["Disability Support", "Mental Health", "Housing"],
      lastUpdated: "3 hours ago",
      coordinates: { x: 15, y: 50 },
    },
  ]

  const getRiskColor = (level: string) => {
    switch (level) {
      case "critical":
        return "bg-red-600"
      case "high":
        return "bg-red-400"
      case "medium":
        return "bg-yellow-400"
      case "low":
        return "bg-green-400"
      default:
        return "bg-gray-400"
    }
  }

  const getRiskBadgeVariant = (level: string) => {
    switch (level) {
      case "critical":
        return "destructive"
      case "high":
        return "destructive"
      case "medium":
        return "default"
      case "low":
        return "secondary"
      default:
        return "secondary"
    }
  }

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Interactive Map */}
        <Card>
          <CardHeader>
            <CardTitle>Risk Distribution Map</CardTitle>
            <CardDescription>Real-time risk assessment across service areas</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="relative w-full h-80 bg-gradient-to-br from-blue-100 to-blue-200 rounded-lg overflow-hidden">
              {riskAreas.map((area, index) => (
                <div
                  key={index}
                  className={`absolute w-6 h-6 rounded-full ${getRiskColor(area.riskLevel)} 
                    border-2 border-white shadow-lg cursor-pointer transform hover:scale-125 
                    transition-transform duration-200`}
                  style={{
                    left: `${area.coordinates.x}%`,
                    top: `${area.coordinates.y}%`,
                    transform: "translate(-50%, -50%)",
                  }}
                  title={`${area.area}: ${area.riskLevel} risk (${area.riskScore}/10)`}
                />
              ))}

              {/* Legend */}
              <div className="absolute bottom-4 left-4 bg-white p-3 rounded-lg shadow-md">
                <div className="text-xs font-semibold mb-2">Risk Levels</div>
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-red-600 rounded-full"></div>
                    <span className="text-xs">Critical</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-red-400 rounded-full"></div>
                    <span className="text-xs">High</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
                    <span className="text-xs">Medium</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-green-400 rounded-full"></div>
                    <span className="text-xs">Low</span>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Risk Summary */}
        <Card>
          <CardHeader>
            <CardTitle>Risk Analysis Summary</CardTitle>
            <CardDescription>AI-generated insights and recommendations</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="border rounded-lg p-4">
                <div className="flex items-center gap-2 mb-2">
                  <AlertTriangle className="w-5 h-5 text-red-600" />
                  <span className="font-semibold text-red-800">Immediate Attention Required</span>
                </div>
                <p className="text-sm">
                  East District showing critical risk levels with 18 active red flags. Child protection cases require
                  immediate intervention.
                </p>
              </div>

              <div className="border rounded-lg p-4">
                <div className="flex items-center gap-2 mb-2">
                  <Users className="w-5 h-5 text-yellow-600" />
                  <span className="font-semibold text-yellow-800">Resource Allocation</span>
                </div>
                <p className="text-sm">
                  North District mental health services are overwhelmed. Consider redistributing specialists from
                  lower-risk areas.
                </p>
              </div>

              <div className="border rounded-lg p-4">
                <div className="flex items-center gap-2 mb-2">
                  <MapPin className="w-5 h-5 text-green-600" />
                  <span className="font-semibold text-green-800">Success Story</span>
                </div>
                <p className="text-sm">
                  South District preventive care programs showing excellent results with lowest risk scores in the
                  region.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Detailed Risk Breakdown */}
      <Card>
        <CardHeader>
          <CardTitle>District Risk Breakdown</CardTitle>
          <CardDescription>Detailed analysis of each service area</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {riskAreas.map((area, index) => (
              <div key={index} className="border rounded-lg p-4">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <MapPin className="w-5 h-5 text-gray-600" />
                    <h3 className="font-semibold">{area.area}</h3>
                    <Badge variant={getRiskBadgeVariant(area.riskLevel)}>{area.riskLevel} risk</Badge>
                  </div>
                  <div className="flex items-center gap-4 text-sm text-gray-600">
                    <div className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      {area.lastUpdated}
                    </div>
                    <div className="font-semibold">Score: {area.riskScore}/10</div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-3">
                  <div className="text-center p-2 rounded">
                    <div className="text-2xl font-bold text-blue-600">{area.activeCases}</div>
                    <div className="text-xs text-blue-600">Active Cases</div>
                  </div>
                  <div className="text-center p-2 rounded">
                    <div className="text-2xl font-bold text-red-600">{area.redFlags}</div>
                    <div className="text-xs text-red-600">Red Flags</div>
                  </div>
                  <div className="text-center p-2 rounded">
                    <div className="text-2xl font-bold text-gray-600">{area.primaryConcerns.length}</div>
                    <div className="text-xs text-gray-600">Primary Concerns</div>
                  </div>
                </div>

                <div className="mb-3">
                  <div className="text-sm font-medium mb-1">Primary Concerns:</div>
                  <div className="flex flex-wrap gap-1">
                    {area.primaryConcerns.map((concern, idx) => (
                      <Badge key={idx} variant="outline" className="text-xs">
                        {concern}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div className="flex justify-end">
                  <Button variant="outline" size="sm">
                    View Details
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
