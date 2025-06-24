"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import {
  AlertTriangle,
  Brain,
  Calendar,
  CheckCircle2,
  FileText,
  Heart,
  Home,
  MessageSquare,
  Phone,
  Plus,
  Save,
  TrendingUp,
  User,
  Users,
  Video,
  Target,
  Bell,
  Flag,
  Shield,
  Download,
  Upload,
  Edit,
  Eye,
  BarChart3,
} from "lucide-react"
import { AIService, type CaseData, type BehaviorInsight } from "@/lib/ai-service"
import { useParams } from "next/navigation"

export default function CaseDetailsPage() {
  const params = useParams()
  const caseId = params.id as string

  const [caseData, setCaseData] = useState<CaseData | null>(null)
  const [aiInsights, setAiInsights] = useState<BehaviorInsight[]>([])
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [newNote, setNewNote] = useState("")
  const [activeTab, setActiveTab] = useState("overview")

  // Mock case data - in real app, this would come from API
  useEffect(() => {
    const mockCaseData: CaseData = {
      id: caseId,
      clientName: "Sarah Johnson",
      age: 78,
      caseType: "Elder Care",
      status: "active",
      priority: "high",
      interactions: [
        {
          date: "2024-12-10",
          type: "Home Visit",
          notes:
            "Client appears well-maintained, medication compliance good. Expressed concerns about winter heating costs.",
          outcome: "positive",
        },
        {
          date: "2024-12-08",
          type: "Phone Check-in",
          notes: "Missed scheduled call. Reached out via neighbor - client was at medical appointment.",
          outcome: "neutral",
        },
        {
          date: "2024-12-05",
          type: "Medical Transport",
          notes: "Provided transportation to cardiology appointment. Doctor reports stable condition.",
          outcome: "positive",
        },
      ],
      riskFactors: ["Social isolation", "Limited mobility", "Fixed income", "Chronic health conditions"],
      demographics: {
        location: "Downtown",
        familySize: 1,
        income: "Social Security",
        housing: "Senior apartment",
      },
    }

    setCaseData(mockCaseData)
    analyzeCase(mockCaseData)
  }, [caseId])

  const analyzeCase = async (data: CaseData) => {
    setIsAnalyzing(true)
    try {
      const insights = await AIService.analyzeCaseBehavior(data)
      setAiInsights(insights)
    } catch (error) {
      console.error("Analysis failed:", error)
    } finally {
      setIsAnalyzing(false)
    }
  }

  const addNote = () => {
    if (!newNote.trim() || !caseData) return

    const newInteraction = {
      date: new Date().toISOString().split("T")[0],
      type: "Case Note",
      notes: newNote,
      outcome: "documented",
    }

    const updatedCase = {
      ...caseData,
      interactions: [newInteraction, ...caseData.interactions],
    }

    setCaseData(updatedCase)
    setNewNote("")
    analyzeCase(updatedCase)
  }

  const getInsightColor = (type: string, severity: string) => {
    if (type === "risk" || severity === "critical") return "border-red-200 bg-red-50"
    if (type === "concern" || severity === "high") return "border-orange-200 bg-orange-50"
    if (type === "improvement" || type === "success") return "border-green-200 bg-green-50"
    return "border-blue-200 bg-blue-50"
  }

  const getInsightIcon = (type: string) => {
    switch (type) {
      case "risk":
        return AlertTriangle
      case "concern":
        return Flag
      case "improvement":
        return TrendingUp
      case "success":
        return CheckCircle2
      default:
        return Brain
    }
  }

  if (!caseData) {
    return <div className="p-8">Loading case details...</div>
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Avatar className="h-16 w-16">
              <AvatarImage
                src={`/placeholder.svg?height=64&width=64&text=${caseData.clientName.split(" ")[0][0]}${caseData.clientName.split(" ")[1][0]}`}
              />
              <AvatarFallback className="text-lg">
                {caseData.clientName.split(" ")[0][0]}
                {caseData.clientName.split(" ")[1][0]}
              </AvatarFallback>
            </Avatar>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">{caseData.clientName}</h1>
              <div className="flex items-center space-x-4 mt-1">
                <Badge variant="outline" className="text-sm">
                  Case #{caseData.id}
                </Badge>
                <Badge
                  className={`${caseData.priority === "high" ? "bg-red-100 text-red-800" : "bg-blue-100 text-blue-800"}`}
                >
                  {caseData.priority} priority
                </Badge>
                <Badge variant="outline">{caseData.caseType}</Badge>
              </div>
              <p className="text-sm text-gray-600 mt-1">
                Age {caseData.age} • {caseData.demographics.location}
              </p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <Button variant="outline" size="sm">
              <Phone className="h-4 w-4 mr-2" />
              Call
            </Button>
            <Button variant="outline" size="sm">
              <Video className="h-4 w-4 mr-2" />
              Video Call
            </Button>
            <Button variant="outline" size="sm">
              <Calendar className="h-4 w-4 mr-2" />
              Schedule
            </Button>
            <Button>
              <MessageSquare className="h-4 w-4 mr-2" />
              Message
            </Button>
          </div>
        </div>
      </div>

      <div className="p-6 space-y-6">
        {/* AI Insights Banner */}
        {aiInsights.length > 0 && (
          <Card className="border-blue-200 bg-blue-50">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg flex items-center space-x-2">
                <Brain className="h-5 w-5 text-blue-600" />
                <span>AI Behavioral Insights</span>
                {isAnalyzing && (
                  <div className="animate-spin h-4 w-4 border-2 border-blue-600 border-t-transparent rounded-full" />
                )}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-4">
                {aiInsights.slice(0, 4).map((insight, index) => {
                  const IconComponent = getInsightIcon(insight.type)
                  return (
                    <div
                      key={index}
                      className={`p-4 rounded-lg border ${getInsightColor(insight.type, insight.severity)}`}
                    >
                      <div className="flex items-start space-x-3">
                        <IconComponent className="h-5 w-5 mt-0.5" />
                        <div className="flex-1">
                          <div className="flex items-center justify-between mb-2">
                            <h4 className="font-medium capitalize">{insight.type}</h4>
                            <Badge variant="outline" className="text-xs">
                              {insight.confidence}% confidence
                            </Badge>
                          </div>
                          <p className="text-sm text-gray-700 mb-2">{insight.description}</p>
                          <p className="text-xs text-gray-600 font-medium">Recommendation: {insight.recommendation}</p>
                          {insight.flags.length > 0 && (
                            <div className="flex flex-wrap gap-1 mt-2">
                              {insight.flags.map((flag, idx) => (
                                <Badge key={idx} variant="outline" className="text-xs">
                                  {flag}
                                </Badge>
                              ))}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>
            </CardContent>
          </Card>
        )}

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
          <TabsList className="grid w-full grid-cols-6">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="history">History</TabsTrigger>
            <TabsTrigger value="documents">Documents</TabsTrigger>
            <TabsTrigger value="schedule">Schedule</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
            <TabsTrigger value="notes">Notes</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-4">
            <div className="grid lg:grid-cols-3 gap-6">
              {/* Client Information */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg flex items-center space-x-2">
                    <User className="h-5 w-5 text-blue-600" />
                    <span>Client Information</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <div>
                      <Label className="text-sm font-medium text-gray-700">Full Name</Label>
                      <p className="text-sm">{caseData.clientName}</p>
                    </div>
                    <div>
                      <Label className="text-sm font-medium text-gray-700">Age</Label>
                      <p className="text-sm">{caseData.age} years old</p>
                    </div>
                    <div>
                      <Label className="text-sm font-medium text-gray-700">Location</Label>
                      <p className="text-sm">{caseData.demographics.location}</p>
                    </div>
                    <div>
                      <Label className="text-sm font-medium text-gray-700">Housing</Label>
                      <p className="text-sm">{caseData.demographics.housing}</p>
                    </div>
                    <div>
                      <Label className="text-sm font-medium text-gray-700">Income Source</Label>
                      <p className="text-sm">{caseData.demographics.income}</p>
                    </div>
                    <div>
                      <Label className="text-sm font-medium text-gray-700">Family Size</Label>
                      <p className="text-sm">{caseData.demographics.familySize} person(s)</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Risk Assessment */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg flex items-center space-x-2">
                    <Shield className="h-5 w-5 text-orange-600" />
                    <span>Risk Assessment</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {caseData.riskFactors.map((factor, index) => (
                      <div key={index} className="flex items-center space-x-2 p-2 bg-orange-50 rounded-lg">
                        <AlertTriangle className="h-4 w-4 text-orange-600" />
                        <span className="text-sm">{factor}</span>
                      </div>
                    ))}
                  </div>
                  <div className="mt-4 p-3 bg-blue-50 rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium">Overall Risk Level</span>
                      <Badge className="bg-orange-100 text-orange-800">Medium-High</Badge>
                    </div>
                    <Progress value={75} className="h-2" />
                    <p className="text-xs text-gray-600 mt-2">Based on current risk factors and AI analysis</p>
                  </div>
                </CardContent>
              </Card>

              {/* Quick Actions */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Quick Actions</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Button className="w-full justify-start" variant="outline">
                    <Calendar className="h-4 w-4 mr-2" />
                    Schedule Home Visit
                  </Button>
                  <Button className="w-full justify-start" variant="outline">
                    <FileText className="h-4 w-4 mr-2" />
                    Generate Report
                  </Button>
                  <Button className="w-full justify-start" variant="outline">
                    <Users className="h-4 w-4 mr-2" />
                    Contact Emergency Contact
                  </Button>
                  <Button className="w-full justify-start" variant="outline">
                    <Heart className="h-4 w-4 mr-2" />
                    Request Medical Check
                  </Button>
                  <Button className="w-full justify-start" variant="outline">
                    <Home className="h-4 w-4 mr-2" />
                    Housing Assessment
                  </Button>
                  <Button className="w-full justify-start" variant="outline">
                    <Bell className="h-4 w-4 mr-2" />
                    Set Reminder
                  </Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="history" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Case History & Interactions</CardTitle>
              </CardHeader>
              <CardContent>
                <ScrollArea className="h-96">
                  <div className="space-y-4">
                    {caseData.interactions.map((interaction, index) => (
                      <div key={index} className="flex items-start space-x-4 p-4 border rounded-lg">
                        <div className="bg-blue-100 p-2 rounded-lg">
                          <Calendar className="h-4 w-4 text-blue-600" />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center justify-between mb-2">
                            <h4 className="font-medium">{interaction.type}</h4>
                            <div className="flex items-center space-x-2">
                              <Badge variant="outline" className="text-xs">
                                {interaction.outcome}
                              </Badge>
                              <span className="text-xs text-gray-500">{interaction.date}</span>
                            </div>
                          </div>
                          <p className="text-sm text-gray-600">{interaction.notes}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </ScrollArea>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="documents" className="space-y-4">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg">Case Documents</CardTitle>
                  <Button size="sm">
                    <Upload className="h-4 w-4 mr-2" />
                    Upload Document
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {[
                    { name: "Initial Assessment Report", date: "2024-11-15", type: "PDF", size: "2.3 MB" },
                    { name: "Medical Records", date: "2024-12-01", type: "PDF", size: "1.8 MB" },
                    { name: "Housing Inspection", date: "2024-11-28", type: "PDF", size: "3.1 MB" },
                    { name: "Care Plan", date: "2024-12-05", type: "PDF", size: "1.2 MB" },
                  ].map((doc, index) => (
                    <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                      <div className="flex items-center space-x-3">
                        <FileText className="h-5 w-5 text-blue-600" />
                        <div>
                          <p className="font-medium text-sm">{doc.name}</p>
                          <p className="text-xs text-gray-500">
                            {doc.date} • {doc.type} • {doc.size}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Button variant="outline" size="sm">
                          <Eye className="h-3 w-3 mr-1" />
                          View
                        </Button>
                        <Button variant="outline" size="sm">
                          <Download className="h-3 w-3 mr-1" />
                          Download
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="schedule" className="space-y-4">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg">Upcoming Schedule</CardTitle>
                  <Button size="sm">
                    <Plus className="h-4 w-4 mr-2" />
                    Add Appointment
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    { date: "Dec 15, 2024", time: "2:00 PM", type: "Home Visit", status: "confirmed" },
                    { date: "Dec 20, 2024", time: "10:30 AM", type: "Medical Transport", status: "pending" },
                    { date: "Dec 22, 2024", time: "3:00 PM", type: "Case Review", status: "scheduled" },
                  ].map((appointment, index) => (
                    <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center space-x-4">
                        <div className="bg-green-100 p-2 rounded-lg">
                          <Calendar className="h-4 w-4 text-green-600" />
                        </div>
                        <div>
                          <h4 className="font-medium">{appointment.type}</h4>
                          <p className="text-sm text-gray-600">
                            {appointment.date} at {appointment.time}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Badge variant="outline">{appointment.status}</Badge>
                        <Button variant="outline" size="sm">
                          <Edit className="h-3 w-3 mr-1" />
                          Edit
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="analytics" className="space-y-4">
            <div className="grid lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg flex items-center space-x-2">
                    <BarChart3 className="h-5 w-5 text-purple-600" />
                    <span>Case Progress Analytics</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>Goal Achievement</span>
                        <span className="font-medium">78%</span>
                      </div>
                      <Progress value={78} className="h-2" />
                    </div>
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>Compliance Rate</span>
                        <span className="font-medium">92%</span>
                      </div>
                      <Progress value={92} className="h-2" />
                    </div>
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>Engagement Level</span>
                        <span className="font-medium">85%</span>
                      </div>
                      <Progress value={85} className="h-2" />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg flex items-center space-x-2">
                    <Target className="h-5 w-5 text-green-600" />
                    <span>Outcome Prediction</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="p-3 bg-green-50 rounded-lg">
                      <h4 className="font-medium text-green-800 mb-1">Predicted Outcome</h4>
                      <p className="text-sm text-green-700">
                        Successful case closure with independent living maintained
                      </p>
                      <div className="flex items-center justify-between mt-2">
                        <span className="text-xs text-green-600">Confidence: 82%</span>
                        <span className="text-xs text-green-600">Timeline: 3-4 months</span>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <h5 className="font-medium text-sm">Key Success Factors:</h5>
                      <ul className="text-xs text-gray-600 space-y-1">
                        <li>• Strong medication compliance</li>
                        <li>• Positive response to interventions</li>
                        <li>• Stable housing situation</li>
                        <li>• Regular healthcare engagement</li>
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="notes" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Add Case Note</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="note">Case Note</Label>
                  <Textarea
                    id="note"
                    placeholder="Enter your case note here..."
                    value={newNote}
                    onChange={(e) => setNewNote(e.target.value)}
                    rows={4}
                  />
                </div>
                <Button onClick={addNote} disabled={!newNote.trim()}>
                  <Save className="h-4 w-4 mr-2" />
                  Add Note
                </Button>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
