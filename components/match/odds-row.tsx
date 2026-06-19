import { cn } from "@/lib/utils"
import type { Match } from "@/lib/types"

export function OddsRow({ match }: { match: Match }) {
  const { odds, prediction } = match
  const cols: { key: "home" | "draw" | "away"; label: string; value: number }[] = [
    { key: "home", label: "1", value: odds.home },
    { key: "draw", label: "X", value: odds.draw },
    { key: "away", label: "2", value: odds.away },
  ]
  return (
    <div className="rounded-2xl border border-border bg-card p-4">
      <div className="mb-3 flex items-center justify-between">
        <h2 className="text-sm font-bold">Match odds</h2>
        <span className="text-xs text-muted-foreground">Full-time result</span>
      </div>
      <div className="grid grid-cols-3 gap-2">
        {cols.map((c) => {
          const isPick = prediction.pick === c.key
          return (
            <div
              key={c.key}
              className={cn(
                "flex flex-col items-center rounded-lg border py-2.5 transition-colors",
                isPick ? "border-primary bg-accent" : "border-border bg-secondary",
              )}
            >
              <span className="text-xs font-medium text-muted-foreground">{c.label}</span>
              <span className="mt-0.5 text-base font-bold tabular-nums">{c.value.toFixed(2)}</span>
              {isPick && <span className="mt-0.5 text-[10px] font-bold uppercase text-primary">AI pick</span>}
            </div>
          )
        })}
      </div>
    </div>
  )
}
