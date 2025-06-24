import { generateText } from "ai"
import { openai } from "@ai-sdk/openai"

export interface CaseData {
  id: string
  clientName: string
  age: number
  caseType: string
  status: string
  priority: string
  interactions: Array<{
    date: string
    type: string
    notes: string
    outcome: string
  }>
  riskFactors: string[]
  demographics: {
    location: string
    familySize: number
    income?: string
    housing?: string
  }
}

export interface BehaviorInsight {
  type: "risk" | "improvement" | "concern" | "success"
  severity: "low" | "medium" | "high" | "critical"
  description: string
  recommendation: string
  confidence: number
  flags: string[]
}

export class AIService {
  static async analyzeCaseBehavior(caseData: CaseData): Promise<BehaviorInsight[]> {
    const prompt = `
    Analyze this social services case data and provide behavioral insights:
    
    Client: ${caseData.clientName}, Age: ${caseData.age}
    Case Type: ${caseData.caseType}
    Status: ${caseData.status}
    Priority: ${caseData.priority}
    
    Recent Interactions:
    ${caseData.interactions.map((i) => `- ${i.date}: ${i.type} - ${i.notes} (${i.outcome})`).join("\n")}
    
    Risk Factors: ${caseData.riskFactors.join(", ")}
    Location: ${caseData.demographics.location}
    Family Size: ${caseData.demographics.familySize}
    
    Provide 3-5 specific behavioral insights focusing on:
    1. Risk assessment and safety concerns
    2. Progress indicators and positive trends
    3. Areas needing immediate attention
    4. Recommended interventions
    5. Predictive outcomes based on patterns
    
    Format as JSON array with: type, severity, description, recommendation, confidence (0-100), flags
    `

    try {
      const { text } = await generateText({
        model: openai("gpt-4o"),
        prompt,
        system:
          "You are an expert social services AI analyst specializing in case management, risk assessment, and behavioral pattern recognition. Provide actionable insights for caseworkers.",
      })

      // Parse the AI response and return structured insights
      const insights = JSON.parse(text) as BehaviorInsight[]
      return insights
    } catch (error) {
      console.error("AI Analysis Error:", error)
      return [
        {
          type: "concern",
          severity: "medium",
          description: "Unable to complete AI analysis at this time",
          recommendation: "Manual review recommended",
          confidence: 0,
          flags: ["ai-error"],
        },
      ]
    }
  }

  static async generateCaseReport(caseData: CaseData): Promise<string> {
    const prompt = `
    Generate a comprehensive case report for:
    
    Client: ${caseData.clientName}
    Case ID: ${caseData.id}
    Case Type: ${caseData.caseType}
    Current Status: ${caseData.status}
    
    Include:
    1. Executive Summary
    2. Current Situation Assessment
    3. Progress Since Last Review
    4. Risk Factors and Concerns
    5. Recommendations and Next Steps
    6. Resource Needs
    7. Timeline for Follow-up
    
    Make it professional and suitable for court documentation or supervisor review.
    `

    const { text } = await generateText({
      model: openai("gpt-4o"),
      prompt,
      system:
        "You are a professional social services report writer. Create detailed, accurate, and legally appropriate case reports.",
    })

    return text
  }

  static async flagUrgentCases(
    cases: CaseData[],
  ): Promise<Array<{ caseId: string; flags: string[]; urgencyScore: number }>> {
    const prompt = `
    Review these social services cases and flag any that require urgent attention:
    
    ${cases
      .map(
        (c) => `
    Case ${c.id}: ${c.clientName} (${c.caseType})
    Status: ${c.status}, Priority: ${c.priority}
    Risk Factors: ${c.riskFactors.join(", ")}
    Recent Activity: ${c.interactions
      .slice(-2)
      .map((i) => `${i.type}: ${i.outcome}`)
      .join(", ")}
    `,
      )
      .join("\n")}
    
    For each case, provide urgency score (0-100) and specific flags if urgent attention needed.
    Focus on safety risks, missed appointments, deteriorating conditions, or compliance issues.
    
    Return JSON array with: caseId, flags (array), urgencyScore (number)
    `

    try {
      const { text } = await generateText({
        model: openai("gpt-4o"),
        prompt,
        system:
          "You are an AI triage system for social services. Identify cases requiring immediate attention based on risk factors and patterns.",
      })

      return JSON.parse(text)
    } catch (error) {
      console.error("Flagging Error:", error)
      return []
    }
  }

  static async predictCaseOutcome(caseData: CaseData): Promise<{
    outcome: string
    probability: number
    timeframe: string
    factors: string[]
  }> {
    const prompt = `
    Based on this case data, predict the most likely outcome:
    
    ${JSON.stringify(caseData, null, 2)}
    
    Consider historical patterns, current trajectory, risk factors, and intervention effectiveness.
    Provide prediction with probability percentage, expected timeframe, and key influencing factors.
    
    Return JSON with: outcome, probability (0-100), timeframe, factors (array)
    `

    try {
      const { text } = await generateText({
        model: openai("gpt-4o"),
        prompt,
        system:
          "You are a predictive analytics AI for social services, trained on case outcome patterns and intervention effectiveness.",
      })

      return JSON.parse(text)
    } catch (error) {
      return {
        outcome: "Unable to predict",
        probability: 0,
        timeframe: "Unknown",
        factors: ["Insufficient data"],
      }
    }
  }
}
