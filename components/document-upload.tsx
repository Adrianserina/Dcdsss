"use client"

import type React from "react"

import { useState, useCallback } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Upload,
  File,
  FileText,
  X,
  Download,
  Eye,
  Calendar,
  User,
  CheckCircle,
  AlertCircle,
  ImageIcon,
} from "lucide-react"

interface UploadedDocument {
  id: string
  name: string
  type: string
  size: number
  category: string
  uploadDate: Date
  uploadedBy: string
  status: "uploading" | "completed" | "failed"
  progress?: number
  url?: string
}

interface DocumentUploadProps {
  userRole: string
  caseId?: string
}

export function DocumentUpload({ userRole, caseId }: DocumentUploadProps) {
  const [documents, setDocuments] = useState<UploadedDocument[]>([])
  const [selectedCategory, setSelectedCategory] = useState("")
  const [isUploading, setIsUploading] = useState(false)
  const [isDragActive, setIsDragActive] = useState(false)

  const documentCategories =
    userRole === "parent" || userRole === "guardian"
      ? ["Medical Records", "School Reports", "Legal Documents", "Insurance Information", "Photos", "Other"]
      : [
          "Assessment Reports",
          "Care Plans",
          "Medical Records",
          "Legal Documents",
          "Court Orders",
          "Photos/Evidence",
          "Correspondence",
          "Forms",
          "Other",
        ]

  const handleFileSelect = useCallback(
    (files: FileList | null) => {
      if (!files || !selectedCategory) {
        if (!selectedCategory) {
          alert("Please select a document category first")
        }
        return
      }

      Array.from(files).forEach((file) => {
        const newDoc: UploadedDocument = {
          id: Date.now().toString() + Math.random(),
          name: file.name,
          type: file.type,
          size: file.size,
          category: selectedCategory,
          uploadDate: new Date(),
          uploadedBy: userRole,
          status: "uploading",
          progress: 0,
        }

        setDocuments((prev) => [...prev, newDoc])
        simulateUpload(newDoc.id)
      })
    },
    [selectedCategory, userRole],
  )

  const handleDrop = useCallback(
    (e: React.DragEvent<HTMLDivElement>) => {
      e.preventDefault()
      setIsDragActive(false)
      handleFileSelect(e.dataTransfer.files)
    },
    [handleFileSelect],
  )

  const handleDragOver = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    setIsDragActive(true)
  }, [])

  const handleDragLeave = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    setIsDragActive(false)
  }, [])

  const handleFileInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      handleFileSelect(e.target.files)
    },
    [handleFileSelect],
  )

  const simulateUpload = (docId: string) => {
    setIsUploading(true)
    let progress = 0

    const interval = setInterval(() => {
      progress += Math.random() * 30
      if (progress >= 100) {
        progress = 100
        clearInterval(interval)
        setDocuments((prev) =>
          prev.map((doc) =>
            doc.id === docId
              ? {
                  ...doc,
                  status: "completed",
                  progress: 100,
                  url: `/documents/${doc.name}`,
                }
              : doc,
          ),
        )
        setIsUploading(false)
      } else {
        setDocuments((prev) => prev.map((doc) => (doc.id === docId ? { ...doc, progress } : doc)))
      }
    }, 500)
  }

  const removeDocument = (docId: string) => {
    setDocuments((prev) => prev.filter((doc) => doc.id !== docId))
  }

  const getFileIcon = (type: string) => {
    if (type.startsWith("image/")) return <ImageIcon className="w-4 h-4" />
    if (type === "application/pdf") return <FileText className="w-4 h-4" />
    return <File className="w-4 h-4" />
  }

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return "0 Bytes"
    const k = 1024
    const sizes = ["Bytes", "KB", "MB", "GB"]
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return Number.parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i]
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "completed":
        return <CheckCircle className="w-4 h-4 text-green-500" />
      case "failed":
        return <AlertCircle className="w-4 h-4 text-red-500" />
      default:
        return null
    }
  }

  return (
    <div className="space-y-6">
      {/* Upload Area */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Upload className="w-5 h-5" />
            Upload Documents
          </CardTitle>
          <CardDescription>Upload important documents, photos, and files related to this case</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Category Selection */}
          <div className="space-y-2">
            <Label>Document Category</Label>
            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger>
                <SelectValue placeholder="Select document category" />
              </SelectTrigger>
              <SelectContent>
                {documentCategories.map((category) => (
                  <SelectItem key={category} value={category}>
                    {category}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Drop Zone */}
          <div
            onDrop={handleDrop}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors ${
              isDragActive
                ? "border-primary bg-primary/5"
                : selectedCategory
                  ? "border-muted-foreground/25 hover:border-primary"
                  : "border-muted-foreground/25 opacity-50 cursor-not-allowed"
            }`}
          >
            <input
              type="file"
              multiple
              onChange={handleFileInputChange}
              disabled={!selectedCategory}
              className="hidden"
              id="file-upload"
              accept="image/*,.pdf,.doc,.docx,.txt"
            />
            <label htmlFor="file-upload" className="cursor-pointer">
              <Upload className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
              {isDragActive ? (
                <p>Drop the files here...</p>
              ) : (
                <div>
                  <p className="text-lg font-medium mb-2">
                    {selectedCategory ? "Drag & drop files here" : "Select a category first"}
                  </p>
                  <p className="text-sm text-muted-foreground mb-4">or click to browse files</p>
                  <p className="text-xs text-muted-foreground">
                    Supports: Images, PDF, Word documents, Text files (Max 10MB)
                  </p>
                </div>
              )}
            </label>
          </div>
        </CardContent>
      </Card>

      {/* Uploaded Documents */}
      {documents.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Uploaded Documents</CardTitle>
            <CardDescription>{documents.length} document(s) uploaded</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {documents.map((doc) => (
                <div key={doc.id} className="border rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-3">
                      {getFileIcon(doc.type)}
                      <div>
                        <div className="font-medium text-sm">{doc.name}</div>
                        <div className="text-xs text-muted-foreground">
                          {formatFileSize(doc.size)} • {doc.category}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      {getStatusIcon(doc.status)}
                      <Badge variant="outline" className="text-xs">
                        {doc.status}
                      </Badge>
                    </div>
                  </div>

                  {doc.status === "uploading" && doc.progress !== undefined && (
                    <div className="mb-2">
                      <Progress value={doc.progress} className="h-2" />
                      <div className="text-xs text-muted-foreground mt-1">Uploading... {Math.round(doc.progress)}%</div>
                    </div>
                  )}

                  <div className="flex items-center justify-between text-xs text-muted-foreground">
                    <div className="flex items-center gap-4">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        {doc.uploadDate.toLocaleDateString()}
                      </span>
                      <span className="flex items-center gap-1">
                        <User className="w-3 h-3" />
                        {doc.uploadedBy}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      {doc.status === "completed" && (
                        <>
                          <Button variant="ghost" size="sm" className="h-6 px-2">
                            <Eye className="w-3 h-3 mr-1" />
                            View
                          </Button>
                          <Button variant="ghost" size="sm" className="h-6 px-2">
                            <Download className="w-3 h-3 mr-1" />
                            Download
                          </Button>
                        </>
                      )}
                      <Button variant="ghost" size="sm" className="h-6 px-2" onClick={() => removeDocument(doc.id)}>
                        <X className="w-3 h-3" />
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
