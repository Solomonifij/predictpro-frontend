import type { Metadata } from 'next'
import { TopNav } from "@/components/layout/top-nav"
import { SidebarMatchList } from "@/components/layout/sidebar-match-list"
import { MatchesFeed } from "@/components/match/matches-feed"
import { fetchTodayFixtures, groupFixturesByLeague } from "@/lib/api"

export const metadata: Metadata = {
  title: 'AI Football Predictions Today — Win Probabilities & Confidence Scores',
  description: 'Get AI-powered football predictions for every match today. Win probabilities, predicted scores and confidence ratings for Premier League, Champions League, World Cup and more.',
}

export default async function HomePage() {
  let groupedFixtures: Record<string, any[]> = {}
  let error = false

  try {
    const fixtures = await fetchTodayFixtures()
    groupedFixtures = groupFixturesByLeague(fixtures)
  } catch (e) {
    error = true
  }

  return (
    <div className="min-h-screen bg-background">
      <TopNav />
      <main className="mx-auto max-w-7xl px-4 py-6">
        <div className="mb-6">
          <h1 className="text-balance text-2xl font-bold tracking-tight sm:text-3xl">
            AI Football Predictions
          </h1>
          <p className="mt-1 text-pretty text-sm text-muted-foreground">
            Win probabilities, confidence ratings and predicted scorelines for every match today.
          </p>
        </div>
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-[320px_1fr]">
          <SidebarMatchList className="hidden self-start lg:block" />
          <div className="space-y-6">
            {error ? (
              <p className="rounded-xl border border-dashed border-border py-12 text-center text-sm text-muted-foreground">
                Could not load matches. Please try again later.
              </p>
            ) : (
              <MatchesFeed groupedFixtures={groupedFixtures} />
            )}
          </div>
        </div>
      </main>
    </div>
  )
}
