"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Heart,
  Users,
  Home,
  DollarSign,
  FileText,
  Phone,
  Mail,
  MapPin,
  Clock,
  Search,
  Download,
  ExternalLink,
  AlertCircle,
  Info,
  CheckCircle,
  Calendar,
  Shield,
  GraduationCap,
  Stethoscope,
  Baby,
  Briefcase,
  Car,
  Zap,
} from "lucide-react"
import Link from "next/link"

export default function ResourcesPortal() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")

  const emergencyServices = [
    {
      title: "Crisis Hotline",
      description: "24/7 emergency support for families in crisis",
      phone: "1-800-CRISIS-1",
      available: "24/7",
      urgent: true,
    },
    {
      title: "Child Protective Services",
      description: "Report child abuse or neglect",
      phone: "1-800-PROTECT",
      available: "24/7",
      urgent: true,
    },
    {
      title: "Domestic Violence Hotline",
      description: "Confidential support for domestic violence victims",
      phone: "1-800-SAFE-NOW",
      available: "24/7",
      urgent: true,
    },
  ]

  const services = [
    {
      id: "foster-care",
      title: "Foster Care Application",
      description: "Become a licensed foster parent and provide temporary care for children in need",
      category: "Foster Care",
      icon: Heart,
      requirements: ["Background check", "Home study", "Training completion", "References"],
      timeline: "3-6 months",
      contact: "foster@socialcare.gov",
      forms: ["Foster Parent Application", "Background Check Authorization", "Home Study Checklist"],
    },
    {
      id: "adoption",
      title: "Adoption Services",
      description: "Permanent placement services for children who cannot return to their birth families",
      category: "Adoption",
      icon: Users,
      requirements: ["Home study", "Training", "Financial stability", "Medical clearance"],
      timeline: "6-12 months",
      contact: "adoption@socialcare.gov",
      forms: ["Adoption Application", "Financial Statement", "Medical Report"],
    },
    {
      id: "temp-guardianship",
      title: "Temporary Guardianship",
      description: "Emergency custody arrangements for children in immediate need of care",
      category: "Guardianship",
      icon: Shield,
      requirements: ["Emergency petition", "Court approval", "Background check"],
      timeline: "1-2 weeks",
      contact: "guardianship@socialcare.gov",
      forms: ["Emergency Guardianship Petition", "Affidavit of Care", "Court Order Request"],
    },
    {
      id: "snap",
      title: "SNAP Benefits (Food Stamps)",
      description: "Monthly food assistance for eligible low-income families",
      category: "Financial Aid",
      icon: DollarSign,
      requirements: ["Income verification", "Identity proof", "Residency proof"],
      timeline: "30 days",
      contact: "snap@socialcare.gov",
      forms: ["SNAP Application", "Income Verification", "Household Composition Form"],
    },
    {
      id: "tanf",
      title: "TANF (Cash Assistance)",
      description: "Temporary financial assistance for families with dependent children",
      category: "Financial Aid",
      icon: Briefcase,
      requirements: ["Income limits", "Work requirements", "Time limits apply"],
      timeline: "45 days",
      contact: "tanf@socialcare.gov",
      forms: ["TANF Application", "Work Plan Agreement", "Child Care Plan"],
    },
    {
      id: "medicaid",
      title: "Medicaid Application",
      description: "Healthcare coverage for eligible individuals and families",
      category: "Healthcare",
      icon: Stethoscope,
      requirements: ["Income verification", "Citizenship proof", "Medical needs assessment"],
      timeline: "45 days",
      contact: "medicaid@socialcare.gov",
      forms: ["Medicaid Application", "Income Documentation", "Medical History Form"],
    },
    {
      id: "childcare",
      title: "Child Care Assistance",
      description: "Financial help with child care costs for working families",
      category: "Child Care",
      icon: Baby,
      requirements: ["Employment verification", "Income limits", "Child care provider licensing"],
      timeline: "30 days",
      contact: "childcare@socialcare.gov",
      forms: ["Child Care Application", "Provider Information", "Work Schedule Verification"],
    },
    {
      id: "housing",
      title: "Housing Assistance",
      description: "Help finding affordable housing and rental assistance programs",
      category: "Housing",
      icon: Home,
      requirements: ["Income limits", "Housing need verification", "Background check"],
      timeline: "Varies",
      contact: "housing@socialcare.gov",
      forms: ["Housing Application", "Income Certification", "Rental History"],
    },
  ]

  const supportPrograms = [
    {
      title: "Parenting Classes",
      description: "Free parenting education and support groups",
      schedule: "Weekly sessions",
      location: "Multiple locations",
      icon: GraduationCap,
    },
    {
      title: "Job Training Programs",
      description: "Skills training and employment assistance",
      schedule: "Flexible scheduling",
      location: "Career centers",
      icon: Briefcase,
    },
    {
      title: "Transportation Assistance",
      description: "Help with transportation to appointments and services",
      schedule: "By appointment",
      location: "Service area wide",
      icon: Car,
    },
    {
      title: "Emergency Financial Aid",
      description: "One-time assistance for utilities, rent, or other emergencies",
      schedule: "As needed",
      location: "Apply online or in-person",
      icon: Zap,
    },
  ]

  const categories = [
    { id: "all", label: "All Services" },
    { id: "Foster Care", label: "Foster Care" },
    { id: "Adoption", label: "Adoption" },
    { id: "Financial Aid", label: "Financial Aid" },
    { id: "Healthcare", label: "Healthcare" },
    { id: "Child Care", label: "Child Care" },
    { id: "Housing", label: "Housing" },
    { id: "Guardianship", label: "Guardianship" },
  ]

  const filteredServices = services.filter((service) => {
    const matchesSearch =
      service.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      service.description.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory === "all" || service.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Public Resources</h1>
              <p className="text-lg text-gray-600 mt-2">Department of Social Services - Community Support</p>
            </div>
            <Link href="/">
              <Button variant="outline">Back to Home</Button>
            </Link>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        {/* Emergency Services Banner */}
        <Card className="border-red-200 bg-red-50">
          <CardHeader>
            <CardTitle className="text-xl text-red-800 flex items-center space-x-2">
              <AlertCircle className="h-6 w-6" />
              <span>Emergency Services - Available 24/7</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-3 gap-4">
              {emergencyServices.map((service, index) => (
                <div key={index} className="bg-white p-4 rounded-lg border border-red-200">
                  <h3 className="font-semibold text-red-800 mb-2">{service.title}</h3>
                  <p className="text-sm text-gray-600 mb-3">{service.description}</p>
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <Phone className="h-4 w-4 text-red-600" />
                      <span className="font-medium text-red-700">{service.phone}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Clock className="h-4 w-4 text-red-600" />
                      <span className="text-sm text-red-600">{service.available}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Search and Filter */}
        <Card>
          <CardContent className="p-6">
            <div className="flex flex-col lg:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search services, programs, or assistance..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              <div className="flex flex-wrap gap-2">
                {categories.map((category) => (
                  <Button
                    key={category.id}
                    variant={selectedCategory === category.id ? "default" : "outline"}
                    size="sm"
                    onClick={() => setSelectedCategory(category.id)}
                  >
                    {category.label}
                  </Button>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        <Tabs defaultValue="services" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="services">Services & Applications</TabsTrigger>
            <TabsTrigger value="support">Support Programs</TabsTrigger>
            <TabsTrigger value="contact">Contact Information</TabsTrigger>
          </TabsList>

          <TabsContent value="services" className="space-y-6">
            <div className="grid lg:grid-cols-2 gap-6">
              {filteredServices.map((service) => (
                <Card key={service.id} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="flex items-center space-x-3">
                        <div className="bg-blue-100 p-2 rounded-lg">
                          <service.icon className="h-6 w-6 text-blue-600" />
                        </div>
                        <div>
                          <CardTitle className="text-lg">{service.title}</CardTitle>
                          <Badge variant="outline" className="mt-1">
                            {service.category}
                          </Badge>
                        </div>
                      </div>
                    </div>
                    <CardDescription className="mt-2">{service.description}</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <h4 className="font-medium mb-2 flex items-center space-x-2">
                        <CheckCircle className="h-4 w-4 text-green-600" />
                        <span>Requirements</span>
                      </h4>
                      <ul className="text-sm text-gray-600 space-y-1">
                        {service.requirements.map((req, index) => (
                          <li key={index} className="flex items-center space-x-2">
                            <span className="w-1 h-1 bg-gray-400 rounded-full"></span>
                            <span>{req}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <p className="font-medium text-gray-700">Processing Time</p>
                        <p className="text-gray-600">{service.timeline}</p>
                      </div>
                      <div>
                        <p className="font-medium text-gray-700">Contact</p>
                        <p className="text-gray-600">{service.contact}</p>
                      </div>
                    </div>

                    <div>
                      <h4 className="font-medium mb-2 flex items-center space-x-2">
                        <FileText className="h-4 w-4 text-blue-600" />
                        <span>Required Forms</span>
                      </h4>
                      <div className="space-y-2">
                        {service.forms.map((form, index) => (
                          <div key={index} className="flex items-center justify-between text-sm">
                            <span className="text-gray-600">{form}</span>
                            <Button variant="outline" size="sm">
                              <Download className="h-3 w-3 mr-1" />
                              Download
                            </Button>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="flex space-x-2 pt-2">
                      <Button className="flex-1">
                        Apply Online
                        <ExternalLink className="h-4 w-4 ml-2" />
                      </Button>
                      <Button variant="outline">
                        <Info className="h-4 w-4 mr-2" />
                        Learn More
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="support" className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              {supportPrograms.map((program, index) => (
                <Card key={index} className="hover:shadow-md transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-start space-x-4">
                      <div className="bg-green-100 p-3 rounded-lg">
                        <program.icon className="h-6 w-6 text-green-600" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-lg mb-2">{program.title}</h3>
                        <p className="text-gray-600 mb-4">{program.description}</p>
                        <div className="space-y-2 text-sm">
                          <div className="flex items-center space-x-2">
                            <Calendar className="h-4 w-4 text-gray-500" />
                            <span className="text-gray-600">{program.schedule}</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <MapPin className="h-4 w-4 text-gray-500" />
                            <span className="text-gray-600">{program.location}</span>
                          </div>
                        </div>
                        <Button className="mt-4 w-full" variant="outline">
                          Register Now
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="contact" className="space-y-6">
            <div className="grid lg:grid-cols-2 gap-6">
              {/* Main Office */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <MapPin className="h-5 w-5 text-blue-600" />
                    <span>Main Office</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <div className="flex items-center space-x-3">
                      <Phone className="h-4 w-4 text-gray-500" />
                      <div>
                        <p className="font-medium">Main Line</p>
                        <p className="text-gray-600">(555) 123-4567</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Mail className="h-4 w-4 text-gray-500" />
                      <div>
                        <p className="font-medium">Email</p>
                        <p className="text-gray-600">info@socialcare.gov</p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3">
                      <MapPin className="h-4 w-4 text-gray-500 mt-1" />
                      <div>
                        <p className="font-medium">Address</p>
                        <p className="text-gray-600">
                          123 Government Plaza
                          <br />
                          Suite 100
                          <br />
                          City, State 12345
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3">
                      <Clock className="h-4 w-4 text-gray-500 mt-1" />
                      <div>
                        <p className="font-medium">Office Hours</p>
                        <p className="text-gray-600">
                          Monday - Friday: 8:00 AM - 5:00 PM
                          <br />
                          Saturday: 9:00 AM - 1:00 PM
                          <br />
                          Sunday: Closed
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Regional Offices */}
              <Card>
                <CardHeader>
                  <CardTitle>Regional Offices</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="border-b pb-3">
                      <h4 className="font-medium">North District Office</h4>
                      <p className="text-sm text-gray-600">456 North Street, City, State 12346</p>
                      <p className="text-sm text-gray-600">(555) 123-4568</p>
                    </div>
                    <div className="border-b pb-3">
                      <h4 className="font-medium">South District Office</h4>
                      <p className="text-sm text-gray-600">789 South Avenue, City, State 12347</p>
                      <p className="text-sm text-gray-600">(555) 123-4569</p>
                    </div>
                    <div className="border-b pb-3">
                      <h4 className="font-medium">East District Office</h4>
                      <p className="text-sm text-gray-600">321 East Boulevard, City, State 12348</p>
                      <p className="text-sm text-gray-600">(555) 123-4570</p>
                    </div>
                    <div>
                      <h4 className="font-medium">West District Office</h4>
                      <p className="text-sm text-gray-600">654 West Road, City, State 12349</p>
                      <p className="text-sm text-gray-600">(555) 123-4571</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Additional Resources */}
            <Card>
              <CardHeader>
                <CardTitle>Additional Resources</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-3 gap-6">
                  <div className="text-center">
                    <div className="bg-blue-100 p-3 rounded-full w-16 h-16 mx-auto mb-3 flex items-center justify-center">
                      <FileText className="h-8 w-8 text-blue-600" />
                    </div>
                    <h4 className="font-medium mb-2">Forms Library</h4>
                    <p className="text-sm text-gray-600 mb-3">Download all required forms and applications</p>
                    <Button variant="outline" size="sm">
                      Browse Forms
                    </Button>
                  </div>
                  <div className="text-center">
                    <div className="bg-green-100 p-3 rounded-full w-16 h-16 mx-auto mb-3 flex items-center justify-center">
                      <Info className="h-8 w-8 text-green-600" />
                    </div>
                    <h4 className="font-medium mb-2">FAQ</h4>
                    <p className="text-sm text-gray-600 mb-3">Find answers to commonly asked questions</p>
                    <Button variant="outline" size="sm">
                      View FAQ
                    </Button>
                  </div>
                  <div className="text-center">
                    <div className="bg-purple-100 p-3 rounded-full w-16 h-16 mx-auto mb-3 flex items-center justify-center">
                      <Users className="h-8 w-8 text-purple-600" />
                    </div>
                    <h4 className="font-medium mb-2">Community Resources</h4>
                    <p className="text-sm text-gray-600 mb-3">Local organizations and support groups</p>
                    <Button variant="outline" size="sm">
                      Find Resources
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
