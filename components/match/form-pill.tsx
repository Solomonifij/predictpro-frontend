import { cn } from "@/lib/utils"
import type { FormResult } from "@/lib/types"

const styles: Record<FormResult, string> = {
  W: "bg-success text-success-foreground",
  D: "bg-muted-foreground/40 text-foreground",
  L: "bg-destructive text-white",
}

export function FormPill({ result, className }: { result: FormResult; className?: string }) {
  const label = result === "W" ? "Win" : result === "D" ? "Draw" : "Loss"
  return (
    <span
      title={label}
      className={cn(
        "inline-flex h-5 w-5 items-center justify-center rounded text-[11px] font-bold",
        styles[result],
        className,
      )}
    >
      {result}
      <span className="sr-only">{label}</span>
    </span>
  )
}

export function FormRow({ form }: { form: FormResult[] }) {
  return (
    <div className="flex items-center gap-1">
      {form.map((r, i) => (
        <FormPill key={i} result={r} />
      ))}
    </div>
  )
}
