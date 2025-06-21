"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Info } from "lucide-react"

export function ColorLegend() {
  const legends = [
    {
      category: "Risk Levels",
      items: [
        { label: "Critical", color: "bg-red-500", textColor: "text-red-700 dark:text-red-300" },
        { label: "High", color: "bg-orange-500", textColor: "text-orange-700 dark:text-orange-300" },
        { label: "Medium", color: "bg-yellow-500", textColor: "text-yellow-700 dark:text-yellow-300" },
        { label: "Low", color: "bg-green-500", textColor: "text-green-700 dark:text-green-300" },
      ],
    },
    {
      category: "Case Status",
      items: [
        { label: "Urgent", color: "bg-red-600", textColor: "text-red-700 dark:text-red-300" },
        { label: "Active", color: "bg-blue-600", textColor: "text-blue-700 dark:text-blue-300" },
        { label: "Completed", color: "bg-gray-600", textColor: "text-gray-700 dark:text-gray-300" },
      ],
    },
  ]

  return (
    <Card className="w-full max-w-sm">
      <CardHeader className="pb-3">
        <CardTitle className="text-sm flex items-center gap-2">
          <Info className="h-4 w-4" />
          Color Guide
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {legends.map((legend, index) => (
          <div key={index} className="space-y-2">
            <div className="text-xs font-medium text-muted-foreground">{legend.category}</div>
            <div className="grid grid-cols-2 gap-2">
              {legend.items.map((item, idx) => (
                <div key={idx} className="flex items-center gap-2">
                  <div className={`w-3 h-3 rounded-full ${item.color}`} />
                  <span className={`text-xs ${item.textColor}`}>{item.label}</span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  )
}
