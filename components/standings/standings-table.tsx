import { cn } from "@/lib/utils"

function positionAccent(pos: number) {
  if (pos <= 1) return "bg-success"
  if (pos <= 4) return "bg-primary"
  if (pos >= 18) return "bg-destructive"
  return "bg-muted-foreground/30"
}

function FormPill({ result }: { result: string }) {
  return (
    <span
      className={cn(
        "inline-flex h-5 w-5 items-center justify-center rounded-full text-[10px] font-bold text-white",
        result === "W" ? "bg-success" :
        result === "L" ? "bg-destructive" :
        "bg-muted-foreground"
      )}
    >
      {result}
    </span>
  )
}

interface StandingRow {
  position: number
  team: {
    id: string
    name: string
    shortName?: string
    crest?: string
  }
  played: number
  won: number
  drawn: number
  lost: number
  goalsFor: number
  goalsAgainst: number
  points: number
  form: string[]
  projectedPoints: number
}

interface StandingsTableProps {
  rows: StandingRow[]
  scope?: string
}

export function StandingsTable({ rows, scope = "All" }: StandingsTableProps) {
  return (
    <div className="overflow-hidden rounded-2xl border border-border bg-card">
      <div className="overflow-x-auto">
        <table className="w-full min-w-[640px] text-sm">
          <thead>
            <tr className="border-b border-border text-xs text-muted-foreground">
              <th className="py-3 pl-4 pr-2 text-left font-medium">#</th>
              <th className="px-2 py-3 text-left font-medium">Team</th>
              <th className="px-2 py-3 text-center font-medium">P</th>
              <th className="px-2 py-3 text-center font-medium">W</th>
              <th className="px-2 py-3 text-center font-medium">D</th>
              <th className="px-2 py-3 text-center font-medium">L</th>
              <th className="px-2 py-3 text-center font-medium">DIFF</th>
              <th className="px-2 py-3 text-center font-medium">GLS</th>
              <th className="px-2 py-3 text-left font-medium">Last 5</th>
              <th className="px-2 py-3 text-center font-medium">PTS</th>
              <th className="hidden px-2 py-3 text-center font-medium text-primary sm:table-cell">AI PROJ</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((r) => {
              const diff = r.goalsFor - r.goalsAgainst
              return (
                <tr key={r.team.id} className="border-b border-border last:border-0 hover:bg-secondary">
                  <td className="py-3 pl-4 pr-2">
                    <span className="flex items-center gap-2">
                      <span className={cn("h-5 w-1 rounded-full", positionAccent(r.position))} />
                      <span className="font-semibold tabular-nums">{r.position}</span>
                    </span>
                  </td>
                  <td className="px-2 py-3">
                    <span className="flex items-center gap-2">
                      {r.team.crest ? (
                        <img src={r.team.crest} alt={r.team.name} className="h-5 w-5 object-contain" />
                      ) : (
                        <div className="h-5 w-5 rounded-full bg-primary/20" />
                      )}
                      <span className="font-medium">{r.team.shortName ?? r.team.name}</span>
                    </span>
                  </td>
                  <td className="px-2 py-3 text-center tabular-nums text-muted-foreground">{r.played}</td>
                  <td className="px-2 py-3 text-center tabular-nums">{r.won}</td>
                  <td className="px-2 py-3 text-center tabular-nums">{r.drawn}</td>
                  <td className="px-2 py-3 text-center tabular-nums">{r.lost}</td>
                  <td className={cn(
                    "px-2 py-3 text-center tabular-nums",
                    diff > 0 ? "text-success" : diff < 0 ? "text-destructive" : "text-muted-foreground"
                  )}>
                    {diff > 0 ? `+${diff}` : diff}
                  </td>
                  <td className="px-2 py-3 text-center tabular-nums text-muted-foreground">
                    {r.goalsFor}:{r.goalsAgainst}
                  </td>
                  <td className="px-2 py-3">
                    <div className="flex gap-0.5">
                      {r.form.slice(-5).map((result, i) => (
                        <FormPill key={i} result={result} />
                      ))}
                    </div>
                  </td>
                  <td className="px-2 py-3 text-center font-bold tabular-nums">{r.points}</td>
                  <td className="hidden px-2 py-3 text-center sm:table-cell">
                    <span className="inline-flex items-center gap-1 rounded-full bg-accent px-2 py-0.5 text-xs font-bold text-accent-foreground tabular-nums">
                      {r.projectedPoints}
                    </span>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </div>
  )
}
