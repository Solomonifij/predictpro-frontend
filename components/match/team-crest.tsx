"use client"

import { cn } from "@/lib/utils"
import { flagUrl } from "@/lib/data"
import type { Team } from "@/lib/types"

const sizeMap = {
  sm: "h-6 w-6 text-[10px]",
  md: "h-8 w-8 text-xs",
  lg: "h-12 w-12 text-sm",
}

export function TeamCrest({
  team,
  size = "md",
  className,
}: {
  team: Team
  size?: keyof typeof sizeMap
  className?: string
}) {
  return (
    <span
      className={cn(
        "relative inline-flex shrink-0 items-center justify-center overflow-hidden rounded-full font-semibold ring-1 ring-border",
        sizeMap[size],
        team.color,
        className,
      )}
    >
      <span aria-hidden="true" className="leading-none">
        {team.shortName}
      </span>
      <img
        src={flagUrl(team.code) || "/placeholder.svg"}
        alt=""
        className="absolute inset-0 h-full w-full object-cover"
        crossOrigin="anonymous"
        onError={(e) => {
          ;(e.currentTarget as HTMLImageElement).style.display = "none"
        }}
      />
      <span className="sr-only">{team.name}</span>
    </span>
  )
}
