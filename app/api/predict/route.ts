import { NextRequest, NextResponse } from "next/server"

export async function POST(req: NextRequest) {
  try {
    const { homeTeam, awayTeam, league, round } = await req.json()

    const prompt = `You are an expert football analyst and prediction model.

Analyze this match and provide a prediction:
- Home Team: ${homeTeam}
- Away Team: ${awayTeam}
- League: ${league}
- Round: ${round}

Respond ONLY with a valid JSON object in exactly this format, no extra text:
{
  "homeWin": <number 0-100>,
  "draw": <number 0-100>,
  "awayWin": <number 0-100>,
  "confidence": <number 0-100>,
  "predictedScore": [<home goals>, <away goals>],
  "pick": "<home|draw|away>",
  "analysis": "<2-3 sentence expert analysis>",
  "factors": [
    { "label": "<factor name>", "value": "<factor detail>", "favors": "<home|away|neutral>" },
    { "label": "<factor name>", "value": "<factor detail>", "favors": "<home|away|neutral>" },
    { "label": "<factor name>", "value": "<factor detail>", "favors": "<home|away|neutral>" }
  ]
}

Make sure homeWin + draw + awayWin = 100.`

    console.log("Calling Gemini for:", homeTeam, "vs", awayTeam)

    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1/models/gemini-pro:generateContent?key=${process.env.GEMINI_API_KEY}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          contents: [
            {
              parts: [{ text: prompt }],
            },
          ],
          generationConfig: {
            temperature: 0.7,
            maxOutputTokens: 500,
          },
        }),
      }
    )

    console.log("Gemini status:", response.status)

    if (!response.ok) {
      const errorText = await response.text()
      console.error("Gemini error response:", errorText)
      throw new Error(`Gemini error: ${response.status} - ${errorText}`)
    }

    const data = await response.json()
    console.log("Gemini response:", JSON.stringify(data))

    const text = data.candidates[0].content.parts[0].text.trim()
    const clean = text.replace(/```json|```/g, "").trim()
    const prediction = JSON.parse(clean)

    return NextResponse.json(prediction)
  } catch (error) {
    console.error("Full prediction error:", error)
    return NextResponse.json({
      homeWin: 45,
      draw: 25,
      awayWin: 30,
      confidence: 60,
      predictedScore: [1, 1],
      pick: "home",
      analysis: "Our AI model is currently processing this match. Please check back shortly for a full prediction breakdown.",
      factors: [
        { label: "Home advantage", value: "Moderate boost", favors: "home" },
        { label: "Recent form", value: "Being analyzed", favors: "neutral" },
        { label: "Head-to-head", value: "Being analyzed", favors: "neutral" },
      ],
    })
  }
}