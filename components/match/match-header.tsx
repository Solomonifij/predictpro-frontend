import { Trophy } from "lucide-react"
import type { Match } from "@/lib/types"
import { TeamCrest } from "@/components/match/team-crest"
import { ConfidenceBadge } from "@/components/prediction/confidence-badge"

function center(match: Match) {
  if (match.status === "live") {
    return (
      <div className="flex flex-col items-center">
        <span className="text-3xl font-bold tabular-nums">
          {match.homeScore} - {match.awayScore}
        </span>
        <span className="mt-1 inline-flex items-center gap-1 text-sm font-semibold text-destructive">
          <span className="h-2 w-2 animate-pulse rounded-full bg-destructive" />
          {match.minute}&apos;
        </span>
      </div>
    )
  }
  if (match.status === "finished") {
    return (
      <div className="flex flex-col items-center">
        <span className="text-3xl font-bold tabular-nums">
          {match.homeScore} - {match.awayScore}
        </span>
        <span className="mt-1 text-sm font-medium text-muted-foreground">Full time</span>
      </div>
    )
  }
  const d = new Date(match.kickoff)
  return (
    <div className="flex flex-col items-center">
      <span className="text-3xl font-bold tabular-nums">
        {d.toLocaleTimeString("en-GB", { hour: "2-digit", minute: "2-digit" })}
      </span>
      <span className="mt-1 text-sm font-medium text-muted-foreground">Today</span>
    </div>
  )
}

export function MatchHeader({ match }: { match: Match }) {
  return (
    <div className="rounded-2xl border border-border bg-card p-5 sm:p-6">
      <div className="mb-5 flex items-center justify-between gap-2">
        <span className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground">
          <Trophy className="h-4 w-4 text-primary" aria-hidden="true" />
          {match.league} · {match.round}
        </span>
        <ConfidenceBadge confidence={match.prediction.confidence} />
      </div>

      <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-4">
        <div className="flex flex-col items-center gap-2">
          <TeamCrest team={match.home} size="lg" />
          <span className="text-center text-base font-bold sm:text-lg">{match.home.name}</span>
        </div>
        {center(match)}
        <div className="flex flex-col items-center gap-2">
          <TeamCrest team={match.away} size="lg" />
          <span className="text-center text-base font-bold sm:text-lg">{match.away.name}</span>
        </div>
      </div>
    </div>
  )
}
