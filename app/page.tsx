"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Heart,
  Users,
  Shield,
  FileText,
  Phone,
  Mail,
  MapPin,
  Clock,
  ArrowRight,
  CheckCircle,
  AlertCircle,
} from "lucide-react"
import Link from "next/link"

export default function HomePage() {
  const portals = [
    {
      title: "Caseworker Portal",
      description: "Manage cases, track client progress, and coordinate care services",
      href: "/caseworker",
      icon: Users,
      color: "bg-blue-600 hover:bg-blue-700",
      features: ["Case Management", "Client Tracking", "Visit Scheduling", "Report Generation"],
    },
    {
      title: "Management Portal",
      description: "Oversee operations, analyze performance, and manage teams",
      href: "/management",
      icon: Shield,
      color: "bg-purple-600 hover:bg-purple-700",
      features: ["Team Analytics", "Performance Metrics", "Resource Allocation", "Compliance Tracking"],
    },
    {
      title: "Guardian/Parent Portal",
      description: "Access your case information, communicate with caseworkers, and find resources",
      href: "/guardian",
      icon: Heart,
      color: "bg-green-600 hover:bg-green-700",
      features: ["Case Updates", "Document Access", "Appointment Scheduling", "Resource Library"],
    },
  ]

  const quickServices = [
    { title: "Emergency Services", description: "24/7 crisis intervention", icon: AlertCircle, urgent: true },
    { title: "Foster Care Application", description: "Become a foster parent", icon: Heart, urgent: false },
    { title: "Food Assistance (SNAP)", description: "Apply for food benefits", icon: FileText, urgent: false },
    { title: "Temporary Guardianship", description: "Emergency custody forms", icon: Shield, urgent: false },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-3">
              <div className="bg-blue-600 p-2 rounded-lg">
                <Heart className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">SocialCareSync</h1>
                <p className="text-sm text-gray-600">Department of Social Services</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Link href="/resources">
                <Button variant="outline">Public Resources</Button>
              </Link>
              <Link href="/signin">
                <Button>Staff Sign In</Button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Connecting Care, Empowering Communities</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Comprehensive social services platform designed to support families, streamline casework, and ensure every
            individual receives the care they deserve.
          </p>
        </div>

        {/* Emergency Banner */}
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <AlertCircle className="h-5 w-5 text-red-600" />
              <div>
                <p className="font-medium text-red-800">Emergency Services Available 24/7</p>
                <p className="text-sm text-red-600">If you or someone you know is in immediate danger, call 911</p>
              </div>
            </div>
            <Button variant="outline" className="border-red-300 text-red-700 hover:bg-red-100">
              <Phone className="h-4 w-4 mr-2" />
              Crisis Hotline
            </Button>
          </div>
        </div>

        {/* Portal Selection */}
        <div className="mb-12">
          <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">Access Your Portal</h3>
          <div className="grid md:grid-cols-3 gap-6">
            {portals.map((portal, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow border-0 shadow-md">
                <CardHeader className="pb-4">
                  <div className="flex items-center space-x-3 mb-2">
                    <div className={`p-2 rounded-lg ${portal.color}`}>
                      <portal.icon className="h-6 w-6 text-white" />
                    </div>
                    <CardTitle className="text-lg">{portal.title}</CardTitle>
                  </div>
                  <CardDescription className="text-sm">{portal.description}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    {portal.features.map((feature, idx) => (
                      <div key={idx} className="flex items-center space-x-2 text-sm text-gray-600">
                        <CheckCircle className="h-4 w-4 text-green-500" />
                        <span>{feature}</span>
                      </div>
                    ))}
                  </div>
                  <Link href={portal.href}>
                    <Button className={`w-full ${portal.color}`}>
                      Access Portal
                      <ArrowRight className="h-4 w-4 ml-2" />
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Quick Services */}
        <div className="mb-12">
          <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">Quick Services</h3>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {quickServices.map((service, index) => (
              <Card
                key={index}
                className={`hover:shadow-md transition-shadow cursor-pointer ${service.urgent ? "border-red-200 bg-red-50" : ""}`}
              >
                <CardContent className="p-4">
                  <div className="flex items-start space-x-3">
                    <service.icon className={`h-5 w-5 mt-1 ${service.urgent ? "text-red-600" : "text-blue-600"}`} />
                    <div className="flex-1">
                      <h4 className="font-medium text-sm mb-1">{service.title}</h4>
                      <p className="text-xs text-gray-600">{service.description}</p>
                      {service.urgent && (
                        <Badge variant="destructive" className="mt-2 text-xs">
                          Urgent
                        </Badge>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Contact Information */}
        <div className="bg-white rounded-lg shadow-sm border p-6">
          <h3 className="text-xl font-bold text-gray-900 mb-4">Contact Information</h3>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="flex items-center space-x-3">
              <Phone className="h-5 w-5 text-blue-600" />
              <div>
                <p className="font-medium">Main Office</p>
                <p className="text-sm text-gray-600">(555) 123-4567</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <Mail className="h-5 w-5 text-blue-600" />
              <div>
                <p className="font-medium">Email Support</p>
                <p className="text-sm text-gray-600">support@socialcaresync.gov</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <MapPin className="h-5 w-5 text-blue-600" />
              <div>
                <p className="font-medium">Main Location</p>
                <p className="text-sm text-gray-600">123 Government Plaza</p>
              </div>
            </div>
          </div>
          <div className="mt-4 flex items-center space-x-2 text-sm text-gray-600">
            <Clock className="h-4 w-4" />
            <span>Office Hours: Monday - Friday, 8:00 AM - 5:00 PM</span>
          </div>
        </div>
      </main>
    </div>
  )
}
