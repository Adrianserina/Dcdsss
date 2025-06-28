import { streamText } from "ai"
import { xai } from "@ai-sdk/xai"

export async function POST(req: Request) {
  try {
    const { messages } = await req.json()

    const result = streamText({
      model: xai("grok-3"),
      messages: [
        {
          role: "system",
          content: `You are an AI assistant specialized in social care case management. You help social workers and care coordinators by:
          
          1. Analyzing case data and trends
          2. Identifying risk factors and red flags
          3. Providing actionable recommendations
          4. Suggesting resource allocation strategies
          5. Predicting potential issues before they escalate
          
          Always provide specific, actionable advice based on social care best practices. Be empathetic but professional, and prioritize client safety and wellbeing.`,
        },
        ...messages,
      ],
      temperature: 0.7,
      maxTokens: 500,
    })

    return result.toDataStreamResponse()
  } catch (error) {
    console.error("AI chat error:", error)
    return new Response("Error processing request", { status: 500 })
  }
}
