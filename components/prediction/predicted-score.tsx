import { cn } from "@/lib/utils"
import type { Prediction } from "@/lib/types"

export function PredictedScore({
  prediction,
  className,
}: {
  prediction: Prediction
  className?: string
}) {
  const [h, a] = prediction.predictedScore
  return (
    <div className={cn("inline-flex items-center gap-2", className)}>
      <span className="text-xs font-medium uppercase tracking-wide text-muted-foreground">AI Predicted</span>
      <span className="rounded-md bg-foreground px-2.5 py-1 font-mono text-sm font-bold text-background tabular-nums">
        {h} - {a}
      </span>
    </div>
  )
}
