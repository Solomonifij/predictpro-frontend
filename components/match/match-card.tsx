import Link from "next/link"
import { cn } from "@/lib/utils"
import type { Match } from "@/lib/types"
import { TeamCrest } from "@/components/match/team-crest"
import { ConfidenceBadge } from "@/components/prediction/confidence-badge"
import { WinProbabilityBar } from "@/components/prediction/win-probability-bar"

function CenterStatus({ match }: { match: Match }) {
  if (match.status === "live") {
    return (
      <div className="flex flex-col items-center">
        <span className="text-xl font-bold tabular-nums">
          {match.homeScore} - {match.awayScore}
        </span>
        <span className="mt-0.5 inline-flex items-center gap-1 text-xs font-semibold text-destructive">
          <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-destructive" />
          {match.minute}&apos;
        </span>
      </div>
    )
  }
  if (match.status === "finished") {
    return (
      <div className="flex flex-col items-center">
        <span className="text-xl font-bold tabular-nums">
          {match.homeScore} - {match.awayScore}
        </span>
        <span className="mt-0.5 text-xs font-medium text-muted-foreground">Full time</span>
      </div>
    )
  }
  const d = new Date(match.kickoff)
  return (
    <div className="flex flex-col items-center">
      <span className="text-lg font-bold tabular-nums">
        {d.toLocaleTimeString("en-GB", { hour: "2-digit", minute: "2-digit" })}
      </span>
      <span className="mt-0.5 text-xs font-medium text-muted-foreground">Today</span>
    </div>
  )
}

export function MatchCard({ match, className }: { match: Match; className?: string }) {
  return (
    <Link
      href={`/match/${match.id}`}
      className={cn(
        "group flex flex-col gap-3 rounded-xl border border-border bg-card p-4 shadow-sm transition-all hover:-translate-y-0.5 hover:border-primary/40 hover:shadow-md",
        className,
      )}
    >
      <div className="flex items-center justify-between gap-2">
        <span className="truncate text-xs font-medium text-muted-foreground">{match.round}</span>
        <ConfidenceBadge confidence={match.prediction.confidence} size="sm" />
      </div>

      <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-2">
        <div className="flex items-center gap-2 justify-self-start">
          <TeamCrest team={match.home} size="md" />
          <span className="text-sm font-semibold">{match.home.shortName}</span>
        </div>
        <CenterStatus match={match} />
        <div className="flex items-center gap-2 justify-self-end">
          <span className="text-sm font-semibold">{match.away.shortName}</span>
          <TeamCrest team={match.away} size="md" />
        </div>
      </div>

      <WinProbabilityBar
        prediction={match.prediction}
        homeName={match.home.shortName}
        awayName={match.away.shortName}
        showLabels={false}
      />

      <div className="flex items-center justify-between border-t border-border pt-2.5">
        <span className="text-xs text-muted-foreground">
          AI pick:{" "}
          <span className="font-semibold text-foreground">
            {match.prediction.pick === "home"
              ? match.home.shortName
              : match.prediction.pick === "away"
                ? match.away.shortName
                : "Draw"}
          </span>
        </span>
        <span className="font-mono text-xs font-bold tabular-nums text-foreground">
          {match.prediction.predictedScore[0]}-{match.prediction.predictedScore[1]}
        </span>
      </div>
    </Link>
  )
}
