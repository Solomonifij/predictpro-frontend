"use client"
import { useState, useEffect } from "react"
import { cn } from "@/lib/utils"
import { StandingsTable } from "@/components/standings/standings-table"

const tabs = ["Standings", "Stats", "Fixtures", "Results"] as const
type Tab = (typeof tabs)[number]

const scopes = ["All", "Home", "Away"] as const

const competitions = [
  { code: "PL", name: "Premier League", country: "England" },
  { code: "WC", name: "FIFA World Cup", country: "World" },
  { code: "CL", name: "Champions League", country: "Europe" },
  { code: "PD", name: "La Liga", country: "Spain" },
  { code: "BL1", name: "Bundesliga", country: "Germany" },
]

export function StandingsView() {
  const [tab, setTab] = useState<Tab>("Standings")
  const [scope, setScope] = useState<(typeof scopes)[number]>("All")
  const [selectedComp, setSelectedComp] = useState("PL")
  const [standings, setStandings] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [compInfo, setCompInfo] = useState<any>(null)

  useEffect(() => {
    async function load() {
      setLoading(true)
      try {
        const res = await fetch(`/api/standings?competition=${selectedComp}`)
        const data = await res.json()
        setStandings(data.standings ?? [])
        setCompInfo(data.competition ?? null)
      } catch (e) {
        console.error("Failed to load standings", e)
      } finally {
        setLoading(false)
      }
    }
    load()
  }, [selectedComp])

  const comp = competitions.find((c) => c.code === selectedComp)

  return (
    <div className="space-y-5">
      {/* Competition Selector */}
      <div className="flex flex-wrap gap-2">
        {competitions.map((c) => (
          <button
            key={c.code}
            onClick={() => setSelectedComp(c.code)}
            className={cn(
              "rounded-full px-3.5 py-1.5 text-sm font-medium transition-colors",
              selectedComp === c.code
                ? "bg-primary text-primary-foreground"
                : "bg-secondary text-foreground hover:bg-accent"
            )}
          >
            {c.name}
          </button>
        ))}
      </div>

      {/* Header */}
      <div className="overflow-hidden rounded-2xl bg-foreground p-6 text-background">
        <p className="text-xs font-medium uppercase tracking-wide text-background/60">
          {comp?.country} · 2025/26
        </p>
        <h1 className="mt-1 text-2xl font-bold tracking-tight sm:text-3xl">
          {comp?.name}
        </h1>
        <p className="mt-2 max-w-xl text-pretty text-sm text-background/80">
          Live table with AI-projected finishing points based on remaining fixtures and current form.
        </p>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 overflow-x-auto border-b border-border">
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
            {tab === t && <span className="absolute inset-x-3 bottom-0 h-0.5 rounded-full bg-primary" />}
          </button>
        ))}
      </div>

      {tab === "Standings" ? (
        <div className="space-y-4">
          <div className="flex items-center gap-1.5">
            {scopes.map((s) => (
              <button
                key={s}
                type="button"
                onClick={() => setScope(s)}
                className={cn(
                  "rounded-full px-3.5 py-1.5 text-sm font-medium transition-colors",
                  scope === s ? "bg-primary text-primary-foreground" : "bg-secondary text-foreground hover:bg-accent",
                )}
              >
                {s}
              </button>
            ))}
          </div>

          {loading ? (
            <p className="rounded-2xl border border-dashed border-border py-12 text-center text-sm text-muted-foreground">
              Loading standings...
            </p>
          ) : standings.length === 0 ? (
            <p className="rounded-2xl border border-dashed border-border py-12 text-center text-sm text-muted-foreground">
              No standings available for this competition.
            </p>
          ) : (
            <StandingsTable rows={standings} scope={scope} />
          )}

          <div className="flex flex-wrap items-center gap-4 px-1 text-xs text-muted-foreground">
            <span className="flex items-center gap-1.5">
              <span className="h-3 w-1 rounded-full bg-success" /> Champion
            </span>
            <span className="flex items-center gap-1.5">
              <span className="h-3 w-1 rounded-full bg-primary" /> Champions League
            </span>
            <span className="flex items-center gap-1.5">
              <span className="h-3 w-1 rounded-full bg-destructive" /> Relegation
            </span>
            <span className="flex items-center gap-1.5">
              <span className="inline-block rounded-full bg-accent px-1.5 py-0.5 font-bold text-accent-foreground">
                AI PROJ
              </span>
              Model-projected final points
            </span>
          </div>
        </div>
      ) : (
        <p className="rounded-2xl border border-dashed border-border py-12 text-center text-sm text-muted-foreground">
          {tab} coming soon.
        </p>
      )}
    </div>
  )
}
