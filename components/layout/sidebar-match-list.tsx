"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { ChevronDown, Trophy } from "lucide-react"
import { cn } from "@/lib/utils"
import { groupFixturesByLeague, getFixtureStatus } from "@/lib/api"

function SidebarRow({ fixture }: { fixture: any }) {
  const status = getFixtureStatus(fixture)
  const isLive = fixture.status === "IN_PLAY" || fixture.status === "PAUSED"
  const isFinished = fixture.status === "FINISHED"

  return (
    <Link
      href={`/match/${fixture.id}`}
      className="flex items-center gap-3 rounded-lg px-2 py-2 transition-colors hover:bg-secondary"
    >
      <div className="flex w-10 shrink-0 flex-col items-center">
        <span className={cn("text-[11px] font-semibold", isLive ? "text-destructive" : "text-muted-foreground")}>
          {isLive ? "LIVE" : isFinished ? "FT" : status}
        </span>
        {isLive && (
          <span className="text-[11px] text-muted-foreground">{fixture.minute}'</span>
        )}
      </div>

      <div className="min-w-0 flex-1 space-y-1">
        <div className="flex items-center justify-between gap-2">
          <span className="flex min-w-0 items-center gap-2">
            {fixture.homeTeam?.crest ? (
              <img src={fixture.homeTeam.crest} alt={fixture.homeTeam.name} className="h-4 w-4 object-contain" />
            ) : (
              <div className="h-4 w-4 rounded-full bg-primary/20" />
            )}
            <span className="truncate text-sm">{fixture.homeTeam?.name}</span>
          </span>
          <span className="text-sm font-semibold tabular-nums text-muted-foreground">
            {isFinished || isLive ? fixture.score?.fullTime?.home ?? 0 : ""}
          </span>
        </div>
        <div className="flex items-center justify-between gap-2">
          <span className="flex min-w-0 items-center gap-2">
            {fixture.awayTeam?.crest ? (
              <img src={fixture.awayTeam.crest} alt={fixture.awayTeam.name} className="h-4 w-4 object-contain" />
            ) : (
              <div className="h-4 w-4 rounded-full bg-secondary" />
            )}
            <span className="truncate text-sm">{fixture.awayTeam?.name}</span>
          </span>
          <span className="text-sm font-semibold tabular-nums text-muted-foreground">
            {isFinished || isLive ? fixture.score?.fullTime?.away ?? 0 : ""}
          </span>
        </div>
      </div>

      <span className="hidden shrink-0 rounded-full bg-success/15 px-1.5 py-0.5 text-[10px] font-bold text-success sm:inline">
        {Math.floor(Math.random() * 40) + 55}%
      </span>
    </Link>
  )
}

export function SidebarMatchList({ className }: { className?: string }) {
  const [groupedFixtures, setGroupedFixtures] = useState<Record<string, any[]>>({})
  const [open, setOpen] = useState<Record<string, boolean>>({})
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function load() {
      try {
        const date = new Date().toISOString().split("T")[0]
        const res = await fetch(
          `https://api.football-data.org/v4/matches?date=${date}`,
          { headers: { "X-Auth-Token": process.env.NEXT_PUBLIC_FOOTBALL_DATA_API_KEY! } }
        )
        const data = await res.json()
        const grouped = groupFixturesByLeague(data.matches ?? [])
        setGroupedFixtures(grouped)
        setOpen(Object.fromEntries(Object.keys(grouped).map((k) => [k, true])))
      } catch (e) {
        console.error("Failed to load sidebar fixtures", e)
      } finally {
        setLoading(false)
      }
    }
    load()
  }, [])

  const today = new Date().toLocaleDateString("en-GB", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  })

  return (
    <aside className={cn("rounded-xl border border-border bg-card", className)}>
      <div className="border-b border-border px-4 py-3">
        <h2 className="text-sm font-semibold">Today's matches</h2>
        <p className="text-xs text-muted-foreground">{today}</p>
      </div>
      <div className="p-2">
        {loading && (
          <p className="py-6 text-center text-xs text-muted-foreground">Loading matches...</p>
        )}
        {!loading && Object.keys(groupedFixtures).length === 0 && (
          <p className="py-6 text-center text-xs text-muted-foreground">No matches today.</p>
        )}
        {Object.entries(groupedFixtures).map(([leagueName, fixtures]) => (
          <div key={leagueName} className="mb-1">
            <button
              type="button"
              onClick={() => setOpen((o) => ({ ...o, [leagueName]: !o[leagueName] }))}
              className="flex w-full items-center gap-2 rounded-lg px-2 py-2 text-left hover:bg-secondary"
            >
              <Trophy className="h-4 w-4 text-primary" aria-hidden="true" />
              <span className="flex-1">
                <span className="block text-sm font-semibold leading-tight">{leagueName}</span>
                <span className="block text-xs text-muted-foreground">
                  {fixtures[0]?.competition?.area?.name ?? ""}
                </span>
              </span>
              <ChevronDown
                className={cn(
                  "h-4 w-4 text-muted-foreground transition-transform",
                  !open[leagueName] && "-rotate-90"
                )}
              />
            </button>
            {open[leagueName] && (
              <div className="space-y-0.5 pb-1">
                {fixtures.map((fixture: any) => (
                  <SidebarRow key={fixture.id} fixture={fixture} />
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </aside>
  )
}
