"use client"
import { useState } from "react"
import { cn } from "@/lib/utils"
import type { Match } from "@/lib/types"
import { MatchHeader } from "@/components/match/match-header"
import { OddsRow } from "@/components/match/odds-row"
import { AIAnalysisPanel } from "@/components/prediction/ai-analysis-panel"
import { WinProbabilityBar } from "@/components/prediction/win-probability-bar"
import { PredictedScore } from "@/components/prediction/predicted-score"

const tabs = ["Prediction", "Odds", "Lineups", "Standings", "H2H"] as const
type Tab = (typeof tabs)[number]

export function MatchDetails({ match }: { match: Match }) {
  const [tab, setTab] = useState<Tab>("Prediction")
  return (
    <div className="space-y-5">
      <MatchHeader match={match} />
      <div className="rounded-2xl border border-border bg-card">
        <div className="flex gap-1 overflow-x-auto border-b border-border px-2">
          {tabs.map((t) => (
            <button
              key={t}
              type="button"
              onClick={() => setTab(t)}
              className={cn(
                "relative whitespace-nowrap px-4 py-3 text-sm font-medium transition-colors",
                tab === t ? "text-primary" : "text-muted-foreground hover:text-foreground",
              )}
            >
              {t}
              {tab === t && (
                <span className="absolute inset-x-3 bottom-0 h-0.5 rounded-full bg-primary" />
              )}
            </button>
          ))}
        </div>
        <div className="p-5">
          {tab === "Prediction" && (
            <div className="space-y-5">
              <div>
                <div className="mb-3 flex items-center justify-between">
                  <h2 className="text-sm font-bold">Win probability</h2>
                  <PredictedScore prediction={match.prediction} />
                </div>
                <WinProbabilityBar
                  prediction={match.prediction}
                  homeName={match.home.name}
                  awayName={match.away.name}
                />
              </div>
              <div className="grid grid-cols-3 gap-3">
                {[
                  { label: `${match.home.shortName} win`, value: match.prediction.homeWin, accent: "text-primary" },
                  { label: "Draw", value: match.prediction.draw, accent: "text-muted-foreground" },
                  { label: `${match.away.shortName} win`, value: match.prediction.awayWin, accent: "text-success" },
                ].map((s, i) => (
                  <div key={`${s.label}-${i}`} className="rounded-xl border border-border bg-secondary p-3 text-center">
                    <p className={cn("text-2xl font-bold tabular-nums", s.accent)}>{s.value}%</p>
                    <p className="mt-1 text-xs text-muted-foreground">{s.label}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
          {tab === "Odds" && <OddsRow match={match} />}
          {tab !== "Prediction" && tab !== "Odds" && (
            <p className="py-10 text-center text-sm text-muted-foreground">
              {tab} data coming soon.
            </p>
          )}
        </div>
      </div>
      <AIAnalysisPanel match={match} />
    </div>
  )
}
