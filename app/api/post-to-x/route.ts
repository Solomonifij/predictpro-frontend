import { NextRequest, NextResponse } from "next/server"
import crypto from "crypto"

function generateOAuthSignature(
  method: string,
  url: string,
  params: Record<string, string>,
  consumerSecret: string,
  tokenSecret: string
): string {
  const sortedParams = Object.keys(params)
    .sort()
    .map((key) => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`)
    .join("&")
  const signatureBase = `${method}&${encodeURIComponent(url)}&${encodeURIComponent(sortedParams)}`
  const signingKey = `${encodeURIComponent(consumerSecret)}&${encodeURIComponent(tokenSecret)}`
  return crypto.createHmac("sha1", signingKey).update(signatureBase).digest("base64")
}

function generateOAuthHeader(method: string, url: string): string {
  const oauthParams: Record<string, string> = {
    oauth_consumer_key: process.env.X_API_KEY!,
    oauth_nonce: crypto.randomBytes(16).toString("hex"),
    oauth_signature_method: "HMAC-SHA1",
    oauth_timestamp: Math.floor(Date.now() / 1000).toString(),
    oauth_token: process.env.X_ACCESS_TOKEN!,
    oauth_version: "1.0",
  }

  const signature = generateOAuthSignature(
    method,
    url,
    oauthParams,
    process.env.X_API_SECRET!,
    process.env.X_ACCESS_TOKEN_SECRET!
  )

  return (
    "OAuth " +
    Object.entries({ ...oauthParams, oauth_signature: signature })
      .map(([k, v]) => `${encodeURIComponent(k)}="${encodeURIComponent(v)}"`)
      .join(", ")
  )
}

export async function POST(req: NextRequest) {
  try {
    const { homeTeam, awayTeam, league, confidence, homeWin, draw, awayWin, predictedScore } =
      await req.json()

    const pick = homeWin > awayWin ? homeTeam : awayWin > homeWin ? awayTeam : "Draw"
    const score = predictedScore ? `${predictedScore[0]}-${predictedScore[1]}` : "1-1"

    const tweet = `AI Prediction

${homeTeam} vs ${awayTeam}
${league}

${homeWin > awayWin ? "✅" : "❌"} ${homeTeam} Win: ${homeWin}%
${draw >= homeWin && draw >= awayWin ? "✅" : "❌"} Draw: ${draw}%
${awayWin > homeWin ? "✅" : "❌"} ${awayTeam} Win: ${awayWin}%

Predicted Score: ${score}
Confidence: ${confidence}%

Full analysis at predictpro-frontend.vercel.app

#FootballPredictions #AI #Football`

    const url = "https://api.twitter.com/2/tweets"
    const method = "POST"
    const oauthHeader = generateOAuthHeader(method, url)

    const response = await fetch(url, {
      method,
      headers: {
        Authorization: oauthHeader,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ text: tweet }),
    })

    const responseText = await response.text()
    console.log("X API response:", response.status, responseText)

    if (!response.ok) {
      throw new Error(`X API error: ${response.status} - ${responseText}`)
    }

    const data = JSON.parse(responseText)
    return NextResponse.json({ success: true, tweetId: data.data?.id })
  } catch (error) {
    console.error("Post to X error:", error)
    return NextResponse.json({ success: false, error: String(error) }, { status: 500 })
  }
}
