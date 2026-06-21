import Link from "next/link"
import { notFound } from "next/navigation"
import { ChevronLeft } from "lucide-react"
import { TopNav } from "@/components/layout/top-nav"
import { SidebarMatchList } from "@/components/layout/sidebar-match-list"
import { MatchDetails } from "@/components/match/match-details"
import { fetchFixtureById } from "@/lib/api"

export default async function MatchPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params

  let fixture: any = null

  try {
    fixture = await fetchFixtureById(id)
  } catch (e) {
    notFound()
  }

  if (!fixture) notFound()

  let prediction = {
    homeWin: 45,
    draw: 25,
    awayWin: 30,
    confidence: 60,
    predictedScore: [1, 1],
    pick: "home" as const,
    analysis: `AI analysis for ${fixture.homeTeam?.name} vs ${fixture.awayTeam?.name}. Our model is processing current form, head-to-head records, and key player availability to generate a full prediction. Check back soon for the complete breakdown.`,
    factors: [
      { label: "Home advantage", value: "Moderate boost", favors: "home" as const },
      { label: "Recent form", value: "Being analyzed", favors: "neutral" as const },
      { label: "Head-to-head", value: "Being analyzed", favors: "neutral" as const },
    ],
  }

  try {
    const predictionRes = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL ?? "http://localhost:3000"}/api/predict`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          homeTeam: fixture.homeTeam?.name,
          awayTeam: fixture.awayTeam?.name,
          league: fixture.competition?.name,
          round: fixture.season?.currentMatchday ?? "",
        }),
      }
    )
    if (predictionRes.ok) {
      prediction = await predictionRes.json()
    }
  } catch (e) {
    console.error("Failed to fetch AI prediction:", e)
  }

  const status = (() => {
    const s = fixture.status
    if (s === "IN_PLAY" || s === "PAUSED") return "live"
    if (s === "FINISHED") return "finished"
    return "upcoming"
  })()

  const match = {
    id: String(fixture.id),
    league: fixture.competition?.name ?? "",
    leagueId: String(fixture.competition?.id ?? ""),
    round: `Round ${fixture.season?.currentMatchday ?? ""}`,
    kickoff: fixture.utcDate,
    status,
    home: {
      id: String(fixture.homeTeam?.id ?? ""),
      name: fixture.homeTeam?.name ?? "",
      shortName: fixture.homeTeam?.shortName ?? fixture.homeTeam?.name?.slice(0, 3).toUpperCase() ?? "",
      logo: fixture.homeTeam?.crest ?? "",
      code: "XX",
      color: "bg-blue-600 text-white",
    },
    away: {
      id: String(fixture.awayTeam?.id ?? ""),
      name: fixture.awayTeam?.name ?? "",
      shortName: fixture.awayTeam?.shortName ?? fixture.awayTeam?.name?.slice(0, 3).toUpperCase() ?? "",
      logo: fixture.awayTeam?.crest ?? "",
      code: "XX",
      color: "bg-gray-600 text-white",
    },
    goals: {
      home: fixture.score?.fullTime?.home,
      away: fixture.score?.fullTime?.away,
    },
    odds: {
      home: 2.0,
      draw: 3.5,
      away: 3.5,
    },
    prediction: {
      homeWin: prediction.homeWin,
      draw: prediction.draw,
      awayWin: prediction.awayWin,
      confidence: prediction.confidence,
      predictedScore: prediction.predictedScore,
      pick: prediction.pick as "home" | "draw" | "away",
      analysis: prediction.analysis,
      factors: prediction.factors,
    },
  }

  return (
    <div className="min-h-screen bg-background">
      <TopNav />
      <main className="mx-auto max-w-7xl px-4 py-6">
        <Link
          href="/"
          className="mb-4 inline-flex items-center gap-1 text-sm font-medium text-muted-foreground hover:text-foreground"
        >
          <ChevronLeft className="h-4 w-4" />
          All predictions
        </Link>
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-[320px_1fr]">
          <SidebarMatchList className="hidden self-start lg:block" />
          <MatchDetails match={match} />
        </div>
      </main>
    </div>
  )
}
