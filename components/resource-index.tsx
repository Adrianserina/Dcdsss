"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Search,
  BookOpen,
  FileText,
  Video,
  ExternalLink,
  Download,
  Heart,
  Home,
  Baby,
  Users,
  Phone,
  DollarSign,
} from "lucide-react"

interface ResourceIndexProps {
  userRole: string
}

export function ResourceIndex({ userRole }: ResourceIndexProps) {
  const [searchTerm, setSearchTerm] = useState("")
  const [activeCategory, setActiveCategory] = useState("all")

  const resources = [
    {
      id: 1,
      title: "Mental Health Crisis Intervention Guide",
      description: "Step-by-step guide for handling mental health emergencies",
      category: "mental-health",
      type: "guide",
      icon: Heart,
      tags: ["Crisis", "Mental Health", "Emergency"],
      lastUpdated: "2024-01-20",
      downloadUrl: "#",
      viewCount: 1247,
      userRoles: ["social-worker", "supervisor", "specialist", "coordinator"],
    },
    {
      id: 2,
      title: "Child Safety Assessment Checklist",
      description: "Comprehensive checklist for child protection assessments",
      category: "child-protection",
      type: "checklist",
      icon: Baby,
      tags: ["Child Protection", "Assessment", "Safety"],
      lastUpdated: "2024-01-18",
      downloadUrl: "#",
      viewCount: 892,
      userRoles: ["social-worker", "supervisor", "specialist"],
    },
    {
      id: 3,
      title: "Housing Assistance Programs Directory",
      description: "Complete directory of local housing assistance programs",
      category: "housing",
      type: "directory",
      icon: Home,
      tags: ["Housing", "Assistance", "Programs"],
      lastUpdated: "2024-01-15",
      downloadUrl: "#",
      viewCount: 634,
      userRoles: ["social-worker", "coordinator", "parent", "guardian"],
    },
    {
      id: 4,
      title: "Family Communication Strategies",
      description: "Effective communication techniques for family interventions",
      category: "family-support",
      type: "training",
      icon: Users,
      tags: ["Family", "Communication", "Intervention"],
      lastUpdated: "2024-01-12",
      downloadUrl: "#",
      viewCount: 1156,
      userRoles: ["social-worker", "specialist", "parent", "guardian"],
    },
    {
      id: 5,
      title: "Emergency Contact Templates",
      description: "Standardized templates for emergency contact information",
      category: "emergency",
      type: "template",
      icon: Phone,
      tags: ["Emergency", "Contacts", "Templates"],
      lastUpdated: "2024-01-10",
      downloadUrl: "#",
      viewCount: 445,
      userRoles: ["social-worker", "coordinator", "parent", "guardian"],
    },
    {
      id: 6,
      title: "Financial Assistance Application Guide",
      description: "How to apply for various financial assistance programs",
      category: "financial",
      type: "guide",
      icon: DollarSign,
      tags: ["Financial", "Assistance", "Applications"],
      lastUpdated: "2024-01-08",
      downloadUrl: "#",
      viewCount: 723,
      userRoles: ["social-worker", "coordinator", "parent", "guardian"],
    },
  ]

  const categories = [
    { id: "all", label: "All Resources", count: resources.length },
    {
      id: "mental-health",
      label: "Mental Health",
      count: resources.filter((r) => r.category === "mental-health").length,
    },
    {
      id: "child-protection",
      label: "Child Protection",
      count: resources.filter((r) => r.category === "child-protection").length,
    },
    { id: "housing", label: "Housing", count: resources.filter((r) => r.category === "housing").length },
    {
      id: "family-support",
      label: "Family Support",
      count: resources.filter((r) => r.category === "family-support").length,
    },
    { id: "emergency", label: "Emergency", count: resources.filter((r) => r.category === "emergency").length },
    { id: "financial", label: "Financial", count: resources.filter((r) => r.category === "financial").length },
  ]

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "guide":
        return <BookOpen className="h-4 w-4" />
      case "checklist":
        return <FileText className="h-4 w-4" />
      case "training":
        return <Video className="h-4 w-4" />
      default:
        return <FileText className="h-4 w-4" />
    }
  }

  const getTypeColor = (type: string) => {
    switch (type) {
      case "guide":
        return "bg-blue-100 text-blue-800"
      case "checklist":
        return "bg-green-100 text-green-800"
      case "training":
        return "bg-purple-100 text-purple-800"
      case "template":
        return "bg-orange-100 text-orange-800"
      case "directory":
        return "bg-gray-100 text-gray-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const filteredResources = resources.filter((resource) => {
    const matchesSearch =
      resource.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      resource.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      resource.tags.some((tag) => tag.toLowerCase().includes(searchTerm.toLowerCase()))
    const matchesCategory = activeCategory === "all" || resource.category === activeCategory
    const matchesRole = resource.userRoles.includes(userRole)

    return matchesSearch && matchesCategory && matchesRole
  })

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Resource Index</CardTitle>
          <CardDescription>Access guides, templates, and training materials</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search resources..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
          </div>

          <Tabs value={activeCategory} onValueChange={setActiveCategory} className="space-y-4">
            <TabsList className="grid grid-cols-3 md:grid-cols-7 w-full">
              {categories.map((category) => (
                <TabsTrigger key={category.id} value={category.id} className="text-xs">
                  {category.label}
                  <Badge variant="secondary" className="ml-1 text-xs">
                    {category.count}
                  </Badge>
                </TabsTrigger>
              ))}
            </TabsList>

            <TabsContent value={activeCategory} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {filteredResources.map((resource) => {
                  const Icon = resource.icon
                  return (
                    <Card key={resource.id} className="hover:shadow-md transition-shadow">
                      <CardHeader className="pb-3">
                        <div className="flex items-start justify-between">
                          <div className="flex items-center gap-3">
                            <div className="p-2 bg-muted rounded-lg">
                              <Icon className="h-5 w-5" />
                            </div>
                            <div className="flex-1">
                              <CardTitle className="text-sm">{resource.title}</CardTitle>
                              <div className="flex items-center gap-2 mt-1">
                                <div className={`px-2 py-1 rounded-full text-xs ${getTypeColor(resource.type)}`}>
                                  {getTypeIcon(resource.type)}
                                  <span className="ml-1">{resource.type}</span>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent className="pt-0">
                        <p className="text-sm text-muted-foreground mb-3">{resource.description}</p>

                        <div className="flex flex-wrap gap-1 mb-3">
                          {resource.tags.map((tag, index) => (
                            <Badge key={index} variant="outline" className="text-xs">
                              {tag}
                            </Badge>
                          ))}
                        </div>

                        <div className="flex items-center justify-between text-xs text-muted-foreground mb-3">
                          <span>Updated: {resource.lastUpdated}</span>
                          <span>{resource.viewCount} views</span>
                        </div>

                        <div className="flex gap-2">
                          <Button variant="outline" size="sm" className="flex-1">
                            <ExternalLink className="h-3 w-3 mr-1" />
                            View
                          </Button>
                          <Button variant="outline" size="sm" className="flex-1">
                            <Download className="h-3 w-3 mr-1" />
                            Download
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  )
                })}
              </div>

              {filteredResources.length === 0 && (
                <div className="text-center py-8 text-muted-foreground">No resources found matching your criteria</div>
              )}
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  )
}
