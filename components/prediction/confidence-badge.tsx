import { Sparkles } from "lucide-react"
import { cn } from "@/lib/utils"

export function confidenceTone(confidence: number) {
  if (confidence > 70) return "bg-green-50 text-green-700 ring-green-600/20"
  if (confidence >= 40) return "bg-amber-50 text-amber-700 ring-amber-600/20"
  return "bg-red-50 text-red-700 ring-red-600/20"
}

export function ConfidenceBadge({
  confidence,
  size = "md",
  className,
}: {
  confidence: number
  size?: "sm" | "md"
  className?: string
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 rounded-full font-semibold ring-1",
        size === "sm" ? "px-2 py-0.5 text-[11px]" : "px-2.5 py-1 text-xs",
        confidenceTone(confidence),
        className,
      )}
    >
      <Sparkles className={size === "sm" ? "h-3 w-3" : "h-3.5 w-3.5"} aria-hidden="true" />
      {confidence}% Confident
    </span>
  )
}