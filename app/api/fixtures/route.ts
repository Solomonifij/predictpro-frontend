import { NextRequest, NextResponse } from "next/server"

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url)
    const date = searchParams.get("date") ?? new Date().toISOString().split("T")[0]

    const res = await fetch(
      `https://api.football-data.org/v4/matches?date=${date}`,
      {
        headers: { "X-Auth-Token": process.env.FOOTBALL_DATA_API_KEY! },
        next: { revalidate: 60 },
      }
    )

    if (!res.ok) throw new Error(`API error: ${res.status}`)
    const data = await res.json()
    return NextResponse.json(data.matches ?? [])
  } catch (error) {
    console.error("Fixtures API error:", error)
    return NextResponse.json([], { status: 500 })
  }
}
