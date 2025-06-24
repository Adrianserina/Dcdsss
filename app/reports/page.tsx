"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { ScrollArea } from "@/components/ui/scroll-area"
import {
  Brain,
  Download,
  Filter,
  TrendingUp,
  TrendingDown,
  AlertTriangle,
  CheckCircle2,
  Target,
  Activity,
  Eye,
  Share,
  Settings,
} from "lucide-react"

interface ReportData {
  id: string
  title: string
  type: "performance" | "compliance" | "outcomes" | "risk-analysis" | "predictive"
  generatedAt: Date
  period: string
  aiGenerated: boolean
  summary: string
  keyMetrics: Array<{
    label: string
    value: string
    change: string
    trend: "up" | "down" | "stable"
  }>
  insights: Array<{
    type: "success" | "concern" | "recommendation"
    description: string
    impact: "high" | "medium" | "low"
  }>
  recommendations: string[]
}

export default function ReportsPage() {
  const [reports, setReports] = useState<ReportData[]>([])
  const [selectedReport, setSelectedReport] = useState<ReportData | null>(null)
  const [isGenerating, setIsGenerating] = useState(false)
  const [reportType, setReportType] = useState<string>("performance")
  const [timePeriod, setTimePeriod] = useState<string>("month")

  useEffect(() => {
    // Initialize with mock reports
    const mockReports: ReportData[] = [
      {
        id: "1",
        title: "Monthly Performance Analysis",
        type: "performance",
        generatedAt: new Date(),
        period: "December 2024",
        aiGenerated: true,
        summary:
          "Overall department performance shows positive trends with 87% case completion rate and improved client satisfaction scores.",
        keyMetrics: [
          { label: "Cases Completed", value: "156", change: "+12%", trend: "up" },
          { label: "Avg Response Time", value: "2.3h", change: "-0.5h", trend: "down" },
          { label: "Client Satisfaction", value: "94%", change: "+3%", trend: "up" },
          { label: "Compliance Rate", value: "96%", change: "+1%", trend: "up" },
        ],
        insights: [
          {
            type: "success",
            description: "Response times have improved significantly due to optimized scheduling",
            impact: "high",
          },
          {
            type: "concern",
            description: "Elder care cases showing higher complexity requiring additional resources",
            impact: "medium",
          },
          {
            type: "recommendation",
            description: "Implement AI-assisted triage for urgent cases to maintain response time improvements",
            impact: "high",
          },
        ],
        recommendations: [
          "Increase staffing for elder care division by 15%",
          "Implement predictive analytics for case prioritization",
          "Expand training program for complex case management",
        ],
      },
      {
        id: "2",
        title: "Risk Assessment & Predictive Analysis",
        type: "risk-analysis",
        generatedAt: new Date(Date.now() - 24 * 60 * 60 * 1000),
        period: "December 2024",
        aiGenerated: true,
        summary:
          "AI analysis identifies 23 high-risk cases requiring immediate attention and predicts 89% success rate for current interventions.",
        keyMetrics: [
          { label: "High-Risk Cases", value: "23", change: "+5", trend: "up" },
          { label: "Predicted Success Rate", value: "89%", change: "+2%", trend: "up" },
          { label: "Early Intervention Rate", value: "78%", change: "+8%", trend: "up" },
          { label: "Crisis Prevention", value: "92%", change: "+4%", trend: "up" },
        ],
        insights: [
          {
            type: "concern",
            description: "Increase in social isolation cases among elderly clients during winter months",
            impact: "high",
          },
          {
            type: "success",
            description: "AI early warning system prevented 12 potential crisis situations",
            impact: "high",
          },
          {
            type: "recommendation",
            description: "Deploy additional wellness checks for isolated elderly clients",
            impact: "medium",
          },
        ],
        recommendations: [
          "Increase frequency of wellness checks for high-risk elderly clients",
          "Implement community outreach programs for social isolation",
          "Deploy AI monitoring for behavioral pattern changes",
        ],
      },
    ]

    setReports(mockReports)
    setSelectedReport(mockReports[0])
  }, [])

  const generateAIReport = async () => {
    setIsGenerating(true)

    // Simulate AI report generation
    await new Promise((resolve) => setTimeout(resolve, 3000))

    const newReport: ReportData = {
      id: Date.now().toString(),
      title: `AI-Generated ${reportType.charAt(0).toUpperCase() + reportType.slice(1)} Report`,
      type: reportType as any,
      generatedAt: new Date(),
      period: timePeriod === "month" ? "December 2024" : timePeriod === "quarter" ? "Q4 2024" : "2024",
      aiGenerated: true,
      summary:
        "AI analysis complete. This report provides comprehensive insights based on current data patterns and predictive modeling.",
      keyMetrics: [
        { label: "Key Metric 1", value: "85%", change: "+5%", trend: "up" },
        { label: "Key Metric 2", value: "142", change: "+12", trend: "up" },
        { label: "Key Metric 3", value: "2.1h", change: "-0.3h", trend: "down" },
        { label: "Key Metric 4", value: "97%", change: "+2%", trend: "up" },
      ],
      insights: [
        {
          type: "success",
          description: "AI-driven optimizations have improved overall efficiency",
          impact: "high",
        },
        {
          type: "recommendation",
          description: "Consider expanding successful intervention models to other regions",
          impact: "medium",
        },
      ],
      recommendations: [
        "Implement AI recommendations across all departments",
        "Expand successful pilot programs",
        "Increase training on new AI tools",
      ],
    }

    setReports((prev) => [newReport, ...prev])
    setSelectedReport(newReport)
    setIsGenerating(false)
  }

  const getInsightIcon = (type: string) => {
    switch (type) {
      case "success":
        return CheckCircle2
      case "concern":
        return AlertTriangle
      case "recommendation":
        return Target
      default:
        return Brain
    }
  }

  const getInsightColor = (type: string) => {
    switch (type) {
      case "success":
        return "border-green-200 bg-green-50"
      case "concern":
        return "border-red-200 bg-red-50"
      case "recommendation":
        return "border-blue-200 bg-blue-50"
      default:
        return "border-gray-200 bg-gray-50"
    }
  }

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case "up":
        return TrendingUp
      case "down":
        return TrendingDown
      default:
        return Activity
    }
  }

  const getTrendColor = (trend: string) => {
    switch (trend) {
      case "up":
        return "text-green-600"
      case "down":
        return "text-red-600"
      default:
        return "text-gray-600"
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">AI-Powered Reports & Analytics</h1>
            <p className="text-sm text-gray-600">Comprehensive insights and predictive analytics for social services</p>
          </div>
          <div className="flex items-center space-x-3">
            <Button variant="outline" size="sm">
              <Settings className="h-4 w-4 mr-2" />
              Configure
            </Button>
            <Button variant="outline" size="sm">
              <Download className="h-4 w-4 mr-2" />
              Export All
            </Button>
          </div>
        </div>
      </div>

      <div className="p-6 space-y-6">
        {/* Report Generation */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg flex items-center space-x-2">
              <Brain className="h-5 w-5 text-purple-600" />
              <span>Generate AI Report</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-4 gap-4 items-end">
              <div className="space-y-2">
                <Label>Report Type</Label>
                <Select value={reportType} onValueChange={setReportType}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="performance">Performance Analysis</SelectItem>
                    <SelectItem value="compliance">Compliance Report</SelectItem>
                    <SelectItem value="outcomes">Outcome Analysis</SelectItem>
                    <SelectItem value="risk-analysis">Risk Assessment</SelectItem>
                    <SelectItem value="predictive">Predictive Analytics</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Time Period</Label>
                <Select value={timePeriod} onValueChange={setTimePeriod}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="week">This Week</SelectItem>
                    <SelectItem value="month">This Month</SelectItem>
                    <SelectItem value="quarter">This Quarter</SelectItem>
                    <SelectItem value="year">This Year</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Additional Filters</Label>
                <Button variant="outline" className="w-full">
                  <Filter className="h-4 w-4 mr-2" />
                  Advanced Filters
                </Button>
              </div>
              <Button onClick={generateAIReport} disabled={isGenerating} className="bg-purple-600 hover:bg-purple-700">
                {isGenerating ? (
                  <>
                    <div className="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full mr-2" />
                    Generating...
                  </>
                ) : (
                  <>
                    <Brain className="h-4 w-4 mr-2" />
                    Generate Report
                  </>
                )}
              </Button>
            </div>
          </CardContent>
        </Card>

        <div className="grid lg:grid-cols-4 gap-6">
          {/* Reports List */}
          <Card className="lg:col-span-1">
            <CardHeader>
              <CardTitle className="text-lg">Recent Reports</CardTitle>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-96">
                <div className="space-y-3">
                  {reports.map((report) => (
                    <div
                      key={report.id}
                      onClick={() => setSelectedReport(report)}
                      className={`p-3 rounded-lg border cursor-pointer transition-colors ${
                        selectedReport?.id === report.id
                          ? "border-blue-500 bg-blue-50"
                          : "border-gray-200 hover:bg-gray-50"
                      }`}
                    >
                      <div className="flex items-start justify-between mb-2">
                        <h4 className="font-medium text-sm">{report.title}</h4>
                        {report.aiGenerated && (
                          <Badge variant="outline" className="text-xs bg-purple-100 text-purple-800">
                            AI
                          </Badge>
                        )}
                      </div>
                      <p className="text-xs text-gray-600 mb-2">{report.period}</p>
                      <p className="text-xs text-gray-500">{report.generatedAt.toLocaleDateString()}</p>
                    </div>
                  ))}
                </div>
              </ScrollArea>
            </CardContent>
          </Card>

          {/* Report Details */}
          <div className="lg:col-span-3 space-y-6">
            {selectedReport && (
              <>
                {/* Report Header */}
                <Card>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="flex items-center space-x-2 mb-2">
                          <CardTitle className="text-xl">{selectedReport.title}</CardTitle>
                          {selectedReport.aiGenerated && (
                            <Badge className="bg-purple-100 text-purple-800">
                              <Brain className="h-3 w-3 mr-1" />
                              AI Generated
                            </Badge>
                          )}
                        </div>
                        <p className="text-sm text-gray-600">
                          {selectedReport.period} • Generated {selectedReport.generatedAt.toLocaleDateString()}
                        </p>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Button variant="outline" size="sm">
                          <Eye className="h-4 w-4 mr-2" />
                          View Full
                        </Button>
                        <Button variant="outline" size="sm">
                          <Share className="h-4 w-4 mr-2" />
                          Share
                        </Button>
                        <Button variant="outline" size="sm">
                          <Download className="h-4 w-4 mr-2" />
                          Export
                        </Button>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-700">{selectedReport.summary}</p>
                  </CardContent>
                </Card>

                {/* Key Metrics */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Key Metrics</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid md:grid-cols-4 gap-4">
                      {selectedReport.keyMetrics.map((metric, index) => {
                        const TrendIcon = getTrendIcon(metric.trend)
                        return (
                          <div key={index} className="p-4 border rounded-lg">
                            <div className="flex items-center justify-between mb-2">
                              <h4 className="font-medium text-sm text-gray-700">{metric.label}</h4>
                              <div className={`flex items-center text-xs ${getTrendColor(metric.trend)}`}>
                                <TrendIcon className="h-3 w-3 mr-1" />
                                {metric.change}
                              </div>
                            </div>
                            <p className="text-2xl font-bold text-gray-900">{metric.value}</p>
                          </div>
                        )
                      })}
                    </div>
                  </CardContent>
                </Card>

                {/* AI Insights */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg flex items-center space-x-2">
                      <Brain className="h-5 w-5 text-purple-600" />
                      <span>AI Insights</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {selectedReport.insights.map((insight, index) => {
                        const IconComponent = getInsightIcon(insight.type)
                        return (
                          <div key={index} className={`p-4 rounded-lg border ${getInsightColor(insight.type)}`}>
                            <div className="flex items-start space-x-3">
                              <IconComponent className="h-5 w-5 mt-0.5" />
                              <div className="flex-1">
                                <div className="flex items-center justify-between mb-2">
                                  <h4 className="font-medium capitalize">{insight.type}</h4>
                                  <Badge variant="outline" className="text-xs">
                                    {insight.impact} impact
                                  </Badge>
                                </div>
                                <p className="text-sm text-gray-700">{insight.description}</p>
                              </div>
                            </div>
                          </div>
                        )
                      })}
                    </div>
                  </CardContent>
                </Card>

                {/* Recommendations */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg flex items-center space-x-2">
                      <Target className="h-5 w-5 text-green-600" />
                      <span>AI Recommendations</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {selectedReport.recommendations.map((recommendation, index) => (
                        <div key={index} className="flex items-start space-x-3 p-3 bg-green-50 rounded-lg">
                          <CheckCircle2 className="h-4 w-4 text-green-600 mt-0.5" />
                          <p className="text-sm text-gray-700">{recommendation}</p>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
