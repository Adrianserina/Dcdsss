"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"
import { Brain, TrendingUp, AlertTriangle, Lightbulb, Target, MessageSquare, Sparkles, BarChart3 } from "lucide-react"

interface AIInsightsPanelProps {
  insights: any
}

export function AIInsightsPanel({ insights }: AIInsightsPanelProps) {
  const [question, setQuestion] = useState("")
  const [isAsking, setIsAsking] = useState(false)
  const [chatHistory, setChatHistory] = useState<Array<{ role: string; content: string }>>([])

  const mockInsights = {
    riskScore: 7.2,
    keyInsights: [
      "Mental health cases increased 23% in North District over past month",
      "Resource allocation efficiency decreased by 12% due to staff shortages",
      "Family support services showing 89% success rate in case resolution",
      "Child protection cases require average 15% more intervention time",
      "Housing assistance demand correlates with seasonal employment patterns",
    ],
    recommendations: [
      "Deploy 2 additional mental health specialists to North District",
      "Implement automated resource allocation system",
      "Expand family support program to Central District",
      "Increase child protection team capacity by 20%",
      "Develop predictive model for housing assistance demand",
    ],
    predictions: [
      {
        category: "Mental Health",
        prediction: "Expected 15% increase in next 30 days",
        confidence: 0.87,
        impact: "high",
      },
      {
        category: "Elder Care",
        prediction: "Stable demand with slight seasonal variation",
        confidence: 0.92,
        impact: "low",
      },
      {
        category: "Housing Support",
        prediction: "Peak demand expected in next 2 weeks",
        confidence: 0.78,
        impact: "medium",
      },
    ],
    patterns: [
      "Cases involving multiple family members have 34% higher success rates",
      "Early intervention reduces case duration by average of 28 days",
      "Cross-district collaboration improves outcomes by 19%",
      "Weekend emergency calls peak between 2-4 PM on Sundays",
    ],
  }

  const handleAskAI = async () => {
    if (!question.trim()) return

    setIsAsking(true)
    setChatHistory((prev) => [...prev, { role: "user", content: question }])

    // Simulate AI response
    await new Promise((resolve) => setTimeout(resolve, 1500))

    const responses = [
      "Based on current trends, I recommend prioritizing mental health resources in the North District. The 23% increase suggests a growing need that could escalate if not addressed promptly.",
      "The correlation between housing assistance and employment patterns suggests implementing a predictive model could help anticipate demand spikes and improve resource allocation.",
      "Family support services are showing excellent results. Consider expanding this successful model to other districts to improve overall case resolution rates.",
      "The data indicates that early intervention significantly reduces case complexity. Implementing automated risk scoring could help identify cases requiring immediate attention.",
    ]

    const randomResponse = responses[Math.floor(Math.random() * responses.length)]
    setChatHistory((prev) => [...prev, { role: "ai", content: randomResponse }])
    setQuestion("")
    setIsAsking(false)
  }

  const currentInsights = insights || mockInsights

  return (
    <div className="space-y-6">
      {/* AI Chat Interface */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MessageSquare className="w-5 h-5" />
            Ask AI Assistant
          </CardTitle>
          <CardDescription>Get intelligent insights and recommendations about your cases</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {chatHistory.length > 0 && (
              <div className="max-h-60 overflow-y-auto space-y-3 p-3 bg-gray-50 rounded-lg">
                {chatHistory.map((message, index) => (
                  <div key={index} className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}>
                    <div
                      className={`max-w-[80%] p-3 rounded-lg ${
                        message.role === "user" ? "bg-blue-600 text-white" : "bg-white border border-gray-200"
                      }`}
                    >
                      <div className="text-sm">{message.content}</div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            <div className="flex gap-2">
              <Textarea
                placeholder="Ask about trends, risks, recommendations, or specific cases..."
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
                className="min-h-[60px]"
              />
              <Button
                onClick={handleAskAI}
                disabled={isAsking || !question.trim()}
                className="bg-gradient-to-r from-purple-600 to-blue-600"
              >
                <Brain className="w-4 h-4 mr-2" />
                {isAsking ? "Thinking..." : "Ask AI"}
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Key Insights */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Sparkles className="w-5 h-5" />
            AI-Generated Insights
          </CardTitle>
          <CardDescription>Intelligent analysis of your social care data</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 border rounded-lg bg-muted/50">
              <div>
                <div className="text-sm font-medium text-gray-600">Overall Risk Score</div>
                <div className="text-2xl font-bold text-purple-600">{currentInsights.riskScore}/10</div>
              </div>
              <div className="text-right">
                <div className="text-sm text-gray-600">AI Confidence</div>
                <div className="text-lg font-semibold">94%</div>
              </div>
            </div>

            <div>
              <h4 className="font-semibold mb-3 flex items-center gap-2">
                <TrendingUp className="w-4 h-4" />
                Key Insights
              </h4>
              <div className="space-y-2">
                {currentInsights.keyInsights.map((insight: string, index: number) => (
                  <div key={index} className="flex items-start gap-3 p-3 border rounded-lg">
                    <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0" />
                    <div className="text-sm text-blue-800">{insight}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Recommendations */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Lightbulb className="w-5 h-5" />
            AI Recommendations
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {currentInsights.recommendations.map((rec: string, index: number) => (
              <div key={index} className="flex items-start gap-3 p-3 border rounded-lg border-green-200">
                <Target className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                <div className="flex-1">
                  <div className="text-sm text-green-800">{rec}</div>
                </div>
                <Button variant="outline" size="sm" className="text-green-600 border-green-300">
                  Implement
                </Button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Predictions */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BarChart3 className="w-5 h-5" />
            Predictive Analysis
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {currentInsights.predictions.map((pred: any, index: number) => (
              <div key={index} className="border rounded-lg p-4">
                <div className="flex items-center justify-between mb-2">
                  <h5 className="font-medium">{pred.category}</h5>
                  <Badge
                    variant={
                      pred.impact === "high" ? "destructive" : pred.impact === "medium" ? "default" : "secondary"
                    }
                  >
                    {pred.impact} impact
                  </Badge>
                </div>
                <div className="text-sm text-gray-600 mb-2">{pred.prediction}</div>
                <div className="flex items-center gap-2">
                  <div className="text-xs text-gray-500">Confidence:</div>
                  <div className="flex-1 bg-gray-200 rounded-full h-2">
                    <div className="bg-blue-500 h-2 rounded-full" style={{ width: `${pred.confidence * 100}%` }} />
                  </div>
                  <div className="text-xs font-medium">{Math.round(pred.confidence * 100)}%</div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Pattern Recognition */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <AlertTriangle className="w-5 h-5" />
            Pattern Recognition
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {currentInsights.patterns.map((pattern: string, index: number) => (
              <div key={index} className="flex items-start gap-3 p-3 border rounded-lg border-yellow-200">
                <div className="w-2 h-2 bg-yellow-500 rounded-full mt-2 flex-shrink-0" />
                <div className="text-sm text-yellow-800">{pattern}</div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
