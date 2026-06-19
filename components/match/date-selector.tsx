"use client"

import { useState } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { cn } from "@/lib/utils"

const days = [
  { key: "sun", label: "Sun", date: "15" },
  { key: "today", label: "Today", date: "16" },
  { key: "wed", label: "Wed", date: "17" },
  { key: "thu", label: "Thu", date: "18" },
  { key: "fri", label: "Fri", date: "19" },
  { key: "sat", label: "Sat", date: "20" },
]

export function DateSelector() {
  const [active, setActive] = useState("today")
  return (
    <div className="flex items-center gap-2">
      <button
        type="button"
        className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-border bg-card text-muted-foreground hover:bg-secondary"
        aria-label="Previous days"
      >
        <ChevronLeft className="h-4 w-4" />
      </button>
      <div className="flex flex-1 gap-2 overflow-x-auto pb-1">
        {days.map((d) => (
          <button
            key={d.key}
            type="button"
            onClick={() => setActive(d.key)}
            className={cn(
              "flex min-w-[64px] flex-col items-center rounded-lg border px-3 py-1.5 text-sm transition-colors",
              active === d.key
                ? "border-primary bg-primary text-primary-foreground"
                : "border-border bg-card text-foreground hover:bg-secondary",
            )}
          >
            <span className="font-semibold">{d.label}</span>
            <span className={cn("text-xs", active === d.key ? "text-primary-foreground/80" : "text-muted-foreground")}>
              {d.date} Jun
            </span>
          </button>
        ))}
      </div>
      <button
        type="button"
        className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-border bg-card text-muted-foreground hover:bg-secondary"
        aria-label="Next days"
      >
        <ChevronRight className="h-4 w-4" />
      </button>
    </div>
  )
}
