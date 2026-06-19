import { cn } from "@/lib/utils"
import type { Prediction } from "@/lib/types"

export function WinProbabilityBar({
  prediction,
  homeName,
  awayName,
  showLabels = true,
  className,
}: {
  prediction: Prediction
  homeName: string
  awayName: string
  showLabels?: boolean
  className?: string
}) {
  const { homeWin, draw, awayWin, pick } = prediction

  return (
    <div className={cn("w-full", className)}>
      {showLabels && (
        <div className="mb-1.5 flex items-center justify-between text-xs font-medium text-muted-foreground">
          <span className={cn(pick === "home" && "text-primary font-semibold")}>{homeName}</span>
          <span className={cn(pick === "draw" && "text-foreground font-semibold")}>Draw</span>
          <span className={cn(pick === "away" && "text-foreground font-semibold")}>{awayName}</span>
        </div>
      )}
      <div className="flex h-2.5 w-full overflow-hidden rounded-full bg-muted" role="img" aria-label={`Win probability: ${homeName} ${homeWin}%, draw ${draw}%, ${awayName} ${awayWin}%`}>
        <div className="bg-primary" style={{ width: `${homeWin}%` }} />
        <div className="bg-muted-foreground/40" style={{ width: `${draw}%` }} />
        <div className="bg-success" style={{ width: `${awayWin}%` }} />
      </div>
      <div className="mt-1.5 flex items-center justify-between text-xs font-bold">
        <span className="text-primary">{homeWin}%</span>
        <span className="text-muted-foreground">{draw}%</span>
        <span className="text-success">{awayWin}%</span>
      </div>
    </div>
  )
}
