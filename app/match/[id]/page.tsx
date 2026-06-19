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

  // Fetch AI prediction from OpenAI
  let prediction = {
    homeWin: 45,
    draw: 25,
    awayWin: 30,
    confidence: 60,
    predictedScore: [1, 1],
    pick: "home" as const,
    analysis: "Our AI model is currently processing this match. Please check back shortly for a full prediction breakdown.",
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
          homeTeam: fixture.teams.home.name,
          awayTeam: fixture.teams.away.name,
          league: fixture.league.name,
          round: fixture.league.round ?? "",
        }),
      }
    )
    if (predictionRes.ok) {
      prediction = await predictionRes.json()
    }
  } catch (e) {
    console.error("Failed to fetch AI prediction:", e)
  }

  const match = {
    id: String(fixture.fixture.id),
    league: fixture.league.name,
    leagueId: String(fixture.league.id),
    round: fixture.league.round ?? "",
    kickoff: fixture.fixture.date,
    status: (() => {
      const s = fixture.fixture.status.short
      if (["1H", "2H", "ET", "HT", "P"].includes(s)) return "live"
      if (["FT", "AET", "PEN"].includes(s)) return "finished"
      return "upcoming"
    })(),
    home: {
      id: String(fixture.teams.home.id),
      name: fixture.teams.home.name,
      shortName: fixture.teams.home.name.slice(0, 3).toUpperCase(),
      logo: fixture.teams.home.logo,
      code: "XX",
      color: "bg-blue-600 text-white",
    },
    away: {
      id: String(fixture.teams.away.id),
      name: fixture.teams.away.name,
      shortName: fixture.teams.away.name.slice(0, 3).toUpperCase(),
      logo: fixture.teams.away.logo,
      code: "XX",
      color: "bg-gray-600 text-white",
    },
    goals: {
      home: fixture.goals.home,
      away: fixture.goals.away,
    },
    odds: {
      home: fixture.odds?.[0]?.bookmakers?.[0]?.bets?.[0]?.values?.[0]?.odd ?? 2.0,
      draw: fixture.odds?.[0]?.bookmakers?.[0]?.bets?.[0]?.values?.[1]?.odd ?? 3.5,
      away: fixture.odds?.[0]?.bookmakers?.[0]?.bets?.[0]?.values?.[2]?.odd ?? 3.5,
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
