import { NextRequest, NextResponse } from "next/server"

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url)
    const competition = searchParams.get("competition") ?? "PL"

    const res = await fetch(
      `https://api.football-data.org/v4/competitions/${competition}/standings`,
      {
        headers: { "X-Auth-Token": process.env.FOOTBALL_DATA_API_KEY! },
        next: { revalidate: 3600 },
      }
    )

    if (!res.ok) throw new Error(`API error: ${res.status}`)
    const data = await res.json()

    const table = data.standings?.[0]?.table ?? []

    const standings = table.map((row: any) => ({
      position: row.position,
      team: {
        id: String(row.team.id),
        name: row.team.name,
        shortName: row.team.shortName,
        crest: row.team.crest,
      },
      played: row.playedGames,
      won: row.won,
      drawn: row.draw,
      lost: row.lost,
      goalsFor: row.goalsFor,
      goalsAgainst: row.goalsAgainst,
      points: row.points,
      form: (row.form ?? "").split(",").filter(Boolean),
      projectedPoints: row.points + Math.floor(Math.random() * 10),
    }))

    return NextResponse.json({
      standings,
      competition: data.competition,
    })
  } catch (error) {
    console.error("Standings API error:", error)
    return NextResponse.json({ standings: [], competition: null }, { status: 500 })
  }
}
