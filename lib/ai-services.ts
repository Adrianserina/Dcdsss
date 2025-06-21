import { generateObject, streamText } from "ai"
import { xai } from "@ai-sdk/xai"
import { z } from "zod"

const TrendAnalysisSchema = z.object({
  trends: z.array(
    z.object({
      category: z.string(),
      trend: z.string(),
      severity: z.enum(["low", "medium", "high", "critical"]),
      confidence: z.number(),
      recommendation: z.string(),
      timeframe: z.string(),
    }),
  ),
  summary: z.string(),
  riskScore: z.number(),
})

const RedFlagSchema = z.object({
  flags: z.array(
    z.object({
      type: z.string(),
      description: z.string(),
      severity: z.enum(["low", "medium", "high", "critical"]),
      urgency: z.enum(["routine", "priority", "urgent", "immediate"]),
      recommendations: z.array(z.string()),
      relatedCases: z.array(z.string()),
    }),
  ),
  overallRisk: z.string(),
  immediateActions: z.array(z.string()),
})

export async function analyzeTrends(caseData: any[]) {
  try {
    const { object } = await generateObject({
      model: xai("grok-3"),
      schema: TrendAnalysisSchema,
      prompt: `Analyze the following social care case data for trends, patterns, and potential issues:
      
      ${JSON.stringify(caseData, null, 2)}
      
      Focus on:
      - Recurring patterns in case types
      - Geographic clustering of issues
      - Demographic trends
      - Service delivery patterns
      - Resource allocation efficiency
      - Outcome trends
      
      Provide actionable insights and recommendations.`,
    })

    return object
  } catch (error) {
    console.error("Trend analysis failed:", error)
    return null
  }
}

export async function detectRedFlags(caseData: any) {
  try {
    const { object } = await generateObject({
      model: xai("grok-3"),
      schema: RedFlagSchema,
      prompt: `Analyze this social care case for red flags and risk indicators:
      
      ${JSON.stringify(caseData, null, 2)}
      
      Look for:
      - Safety concerns
      - Escalating risk factors
      - Missed appointments or non-compliance
      - Family dynamics issues
      - Environmental hazards
      - Health deterioration
      - Financial exploitation signs
      - Isolation indicators
      
      Prioritize by urgency and provide specific action recommendations.`,
    })

    return object
  } catch (error) {
    console.error("Red flag detection failed:", error)
    return null
  }
}

export async function generateCaseInsights(caseId: string, caseData: any) {
  try {
    const result = streamText({
      model: xai("grok-3"),
      prompt: `Provide comprehensive insights for social care case ${caseId}:
      
      ${JSON.stringify(caseData, null, 2)}
      
      Generate:
      1. Case summary and key points
      2. Risk assessment
      3. Progress evaluation
      4. Next steps recommendations
      5. Resource needs
      6. Collaboration opportunities
      
      Be specific and actionable.`,
    })

    return result
  } catch (error) {
    console.error("Case insights generation failed:", error)
    return null
  }
}
