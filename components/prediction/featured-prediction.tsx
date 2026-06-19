import Link from "next/link"
import { ArrowRight, Sparkles } from "lucide-react"
import type { Match } from "@/lib/types"
import { TeamCrest } from "@/components/match/team-crest"

export function FeaturedPrediction({ match }: { match: Match }) {
  const { prediction } = match
  const pickName =
    prediction.pick === "home" ? match.home.name : prediction.pick === "away" ? match.away.name : "Draw"

  return (
    <section className="overflow-hidden rounded-2xl bg-foreground text-background">
      <div className="flex items-center justify-between gap-2 border-b border-white/10 px-5 py-3">
        <span className="inline-flex items-center gap-2 text-sm font-semibold">
          <Sparkles className="h-4 w-4 text-success" aria-hidden="true" />
          AI Featured Prediction
        </span>
        <span className="rounded-full bg-white/10 px-2.5 py-1 text-xs font-medium text-background/80">
          {match.round}
        </span>
      </div>

      <div className="p-5 sm:p-6">
        <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-3">
          <div className="flex flex-col items-center gap-2 sm:flex-row sm:gap-3">
            <TeamCrest team={match.home} size="lg" />
            <span className="text-center text-base font-bold sm:text-left">{match.home.name}</span>
          </div>
          <div className="flex flex-col items-center px-2">
            <span className="text-xs font-medium text-background/70">
              {new Date(match.kickoff).toLocaleTimeString("en-GB", { hour: "2-digit", minute: "2-digit" })}
            </span>
            <span className="my-1 rounded-md bg-success px-3 py-1 font-mono text-lg font-bold text-success-foreground tabular-nums">
              {prediction.predictedScore[0]} - {prediction.predictedScore[1]}
            </span>
            <span className="text-[11px] uppercase tracking-wide text-background/60">Predicted</span>
          </div>
          <div className="flex flex-col items-center gap-2 sm:flex-row-reverse sm:gap-3">
            <TeamCrest team={match.away} size="lg" />
            <span className="text-center text-base font-bold sm:text-right">{match.away.name}</span>
          </div>
        </div>

        <div className="mt-6">
          <div className="mb-2 flex items-center justify-between text-xs font-medium text-background/70">
            <span>{match.home.shortName} win</span>
            <span>Draw</span>
            <span>{match.away.shortName} win</span>
          </div>
          <div className="flex h-3 w-full overflow-hidden rounded-full bg-white/10">
            <div className="bg-background" style={{ width: `${prediction.homeWin}%` }} />
            <div className="bg-white/30" style={{ width: `${prediction.draw}%` }} />
            <div className="bg-success" style={{ width: `${prediction.awayWin}%` }} />
          </div>
          <div className="mt-2 flex items-center justify-between text-sm font-bold tabular-nums">
            <span>{prediction.homeWin}%</span>
            <span className="text-background/60">{prediction.draw}%</span>
            <span className="text-success">{prediction.awayWin}%</span>
          </div>
        </div>

        <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm text-background/80">
            Model backs <span className="font-bold text-background">{pickName}</span> with{" "}
            <span className="font-bold text-success">{prediction.confidence}% confidence</span>.
          </p>
          <Link
            href={`/match/${match.id}`}
            className="inline-flex items-center justify-center gap-1.5 rounded-full bg-background px-4 py-2 text-sm font-semibold text-foreground transition-colors hover:bg-background/90"
          >
            Full analysis
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  )
}
