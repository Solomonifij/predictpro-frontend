"use client"

import { useState } from "react"
import { Trophy } from "lucide-react"
import { cn } from "@/lib/utils"
import { getFixtureStatus } from "@/lib/api"
import Link from "next/link"

type Filter = "all" | "live" | "upcoming" | "finished"

const filters: { key: Filter; label: string }[] = [
  { key: "all", label: "All" },
  { key: "live", label: "Live" },
  { key: "upcoming", label: "Upcoming" },
  { key: "finished", label: "Finished" },
]

function getFilterStatus(fixture: any): Filter {
  const status = fixture.fixture.status.short
  if (["1H", "2H", "ET", "HT", "P"].includes(status)) return "live"
  if (status === "FT" || status === "AET" || status === "PEN") return "finished"
  return "upcoming"
}

function mockConfidence(): number {
  return Math.floor(Math.random() * 40) + 55
}

interface MatchesFeedProps {
  groupedFixtures: Record<string, any[]>
}

export function MatchesFeed({ groupedFixtures }: MatchesFeedProps) {
  const [filter, setFilter] = useState<Filter>("all")

  const allFixtures = Object.values(groupedFixtures).flat()
  const liveCount = allFixtures.filter((f) => getFilterStatus(f) === "live").length

  const filteredGrouped = Object.entries(groupedFixtures).reduce(
    (acc, [league, fixtures]) => {
      const filtered =
        filter === "all" ? fixtures : fixtures.filter((f) => getFilterStatus(f) === filter)
      if (filtered.length > 0) acc[league] = filtered
      return acc
    },
    {} as Record<string, any[]>
  )

  return (
    <div className="space-y-5">
      <div className="flex flex-wrap items-center gap-2">
        {filters.map((f) => (
          <button
            key={f.key}
            type="button"
            onClick={() => setFilter(f.key)}
            className={cn(
              "inline-flex items-center gap-1.5 rounded-full border px-3.5 py-1.5 text-sm font-medium transition-colors",
              filter === f.key
                ? "border-primary bg-primary text-primary-foreground"
                : "border-border bg-card text-foreground hover:bg-secondary"
            )}
          >
            {f.key === "live" && (
              <span className={cn(
                "h-1.5 w-1.5 rounded-full",
                filter === "live" ? "bg-primary-foreground" : "bg-destructive"
              )} />
            )}
            {f.label}
            {f.key === "live" && liveCount > 0 && (
              <span className="text-xs opacity-80">({liveCount})</span>
            )}
          </button>
        ))}
      </div>

      {Object.entries(filteredGrouped).map(([leagueName, fixtures]) => (
        <section key={leagueName}>
          <div className="mb-3 flex items-center gap-2">
            {fixtures[0]?.league?.logo ? (
              <img
                src={fixtures[0].league.logo}
                alt={leagueName}
                className="h-7 w-7 rounded-md object-contain"
              />
            ) : (
              <span className="flex h-7 w-7 items-center justify-center rounded-md bg-accent text-accent-foreground">
                <Trophy className="h-4 w-4" aria-hidden="true" />
              </span>
            )}
            <div>
              <h2 className="text-sm font-bold leading-tight">{leagueName}</h2>
              <p className="text-xs text-muted-foreground">
                {fixtures[0]?.league?.country ?? ""}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-3">
            {fixtures.map((fixture: any) => {
              const status = getFixtureStatus(fixture)
              const isLive = getFilterStatus(fixture) === "live"
              const isFinished = getFilterStatus(fixture) === "finished"
              const confidence = mockConfidence()

              return (
                <Link
                  key={fixture.fixture.id}
                  href={`/match/${fixture.fixture.id}`}
                  className="block rounded-xl border border-border bg-card p-4 hover:shadow-md transition-shadow"
                >
                  <div className="mb-3 flex items-center justify-between">
                    <span className={cn(
                      "text-xs font-semibold",
                      isLive ? "text-destructive" : "text-muted-foreground"
                    )}>
                      {isLive && (
                        <span className="mr-1 inline-block h-1.5 w-1.5 rounded-full bg-destructive align-middle" />
                      )}
                      {status}
                    </span>
                    <span className={cn(
                      "rounded-full px-2 py-0.5 text-[11px] font-semibold ring-1",
                      confidence >= 70
                        ? "bg-green-50 text-green-700 ring-green-600/20"
                        : confidence >= 40
                        ? "bg-amber-50 text-amber-700 ring-amber-600/20"
                        : "bg-red-50 text-red-700 ring-red-600/20"
                    )}>
                      {confidence}% Confident
                    </span>
                  </div>

                  <div className="flex items-center justify-between gap-2">
                    <div className="flex flex-1 flex-col items-center gap-1">
                      <img
                        src={fixture.teams.home.logo}
                        alt={fixture.teams.home.name}
                        className="h-8 w-8 object-contain"
                      />
                      <span className="text-center text-xs font-medium leading-tight">
                        {fixture.teams.home.name}
                      </span>
                    </div>

                    <div className="flex flex-col items-center">
                      {isFinished || isLive ? (
                        <span className="text-lg font-bold">
                          {fixture.goals.home ?? 0} - {fixture.goals.away ?? 0}
                        </span>
                      ) : (
                        <span className="text-sm font-semibold text-muted-foreground">
                          {status}
                        </span>
                      )}
                    </div>

                    <div className="flex flex-1 flex-col items-center gap-1">
                      <img
                        src={fixture.teams.away.logo}
                        alt={fixture.teams.away.name}
                        className="h-8 w-8 object-contain"
                      />
                      <span className="text-center text-xs font-medium leading-tight">
                        {fixture.teams.away.name}
                      </span>
                    </div>
                  </div>
                </Link>
              )
            })}
          </div>
        </section>
      ))}

      {Object.keys(filteredGrouped).length === 0 && (
        <p className="rounded-xl border border-dashed border-border py-12 text-center text-sm text-muted-foreground">
          No matches for this filter.
        </p>
      )}
    </div>
  )
}