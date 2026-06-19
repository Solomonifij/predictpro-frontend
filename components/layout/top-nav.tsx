"use client"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Search, Sparkles, Settings, Bell, Menu } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

const navItems = [
  { label: "Predictions", href: "/" },
  { label: "Standings", href: "/standings" },
  { label: "Live", href: "/?filter=live" },
  { label: "News", href: "/news" },
  { label: "Content", href: "/content" },
  { label: "Premium", href: "/premium" },
]

export function TopNav() {
  const pathname = usePathname()
  return (
    <header className="sticky top-0 z-40 w-full border-b border-border bg-primary text-primary-foreground">
      <div className="mx-auto flex h-16 max-w-7xl items-center gap-4 px-4">
        <Link href="/" className="flex items-center gap-2 font-semibold">
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary-foreground/15">
            <Sparkles className="h-4 w-4" aria-hidden="true" />
          </span>
          <span className="text-lg tracking-tight">
            PredictPro<span className="text-primary-foreground/70"> AI</span>
          </span>
        </Link>
        <nav className="ml-4 hidden items-center gap-1 md:flex">
          {navItems.map((item) => {
            const active = item.href === "/" ? pathname === "/" : pathname.startsWith(item.href)
            return (
              <Link
                key={item.label}
                href={item.href}
                className={cn(
                  "rounded-md px-3 py-1.5 text-sm font-medium transition-colors hover:bg-primary-foreground/10",
                  active && "bg-primary-foreground/15",
                  item.label === "Premium" && "bg-amber-400 text-slate-900 hover:bg-amber-300 rounded-full px-4",
                )}
              >
                {item.label}
              </Link>
            )
          })}
        </nav>
        <div className="ml-auto hidden max-w-md flex-1 items-center md:flex">
          <div className="relative w-full">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-primary-foreground/60" />
            <input
              type="search"
              placeholder="Search matches, teams, leagues..."
              className="w-full rounded-full border-0 bg-primary-foreground/15 py-2 pl-9 pr-4 text-sm text-primary-foreground placeholder:text-primary-foreground/60 focus:outline-none focus:ring-2 focus:ring-primary-foreground/40"
            />
          </div>
        </div>
        <div className="ml-auto flex items-center gap-1 md:ml-2">
          <Button size="icon" variant="ghost" className="text-primary-foreground hover:bg-primary-foreground/10 hover:text-primary-foreground">
            <Bell className="h-5 w-5" />
          </Button>
          <Button size="icon" variant="ghost" className="hidden text-primary-foreground hover:bg-primary-foreground/10 hover:text-primary-foreground sm:inline-flex">
            <Settings className="h-5 w-5" />
          </Button>
          <Link href="/sign-up" className="ml-1 rounded-full bg-primary-foreground px-4 py-2 text-sm font-semibold text-primary hover:bg-primary-foreground/90 transition-colors">
            Sign up
          </Link>
          <Link href="/sign-in" className="ml-1 rounded-full border border-primary-foreground/30 px-4 py-2 text-sm font-semibold text-primary-foreground hover:bg-primary-foreground/10 transition-colors">
            Sign in
          </Link>
          <Button size="icon" variant="ghost" className="text-primary-foreground hover:bg-primary-foreground/10 hover:text-primary-foreground md:hidden">
            <Menu className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </header>
  )
}
