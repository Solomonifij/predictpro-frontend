import type { Metadata } from 'next'
import { TopNav } from "@/components/layout/top-nav"
import { SidebarMatchList } from "@/components/layout/sidebar-match-list"
import { StandingsView } from "@/components/standings/standings-view"

export const metadata: Metadata = {
  title: 'League Standings',
  description: 'Live Premier League, Champions League and World Cup standings with AI-projected final points.',
}

export default function StandingsPage() {
  return (
    <div className="min-h-screen bg-background">
      <TopNav />
      <main className="mx-auto max-w-7xl px-4 py-6">
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-[320px_1fr]">
          <SidebarMatchList className="hidden self-start lg:block" />
          <StandingsView />
        </div>
      </main>
    </div>
  )
}
