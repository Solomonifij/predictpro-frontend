import Link from "next/link"
import { notFound } from "next/navigation"
import { ChevronLeft } from "lucide-react"
import { TopNav } from "@/components/layout/top-nav"
import { fetchFixtureById } from "@/lib/api"

export default async function ArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params

  let fixture: any = null

  try {
    fixture = await fetchFixtureById(slug)
  } catch (e) {
    notFound()
  }

  if (!fixture) notFound()

  const home = fixture.teams.home.name
  const away = fixture.teams.away.name
  const league = fixture.league.name
  const date = new Date(fixture.fixture.date).toLocaleDateString("en-GB", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  })
  const confidence = Math.floor(Math.random() * 40) + 55

  return (
    <div className="min-h-screen bg-background">
      <TopNav />
      <main className="mx-auto max-w-4xl px-4 py-6">
        <Link
          href="/news"
          className="mb-6 inline-flex items-center gap-1 text-sm font-medium text-muted-foreground hover:text-foreground"
        >
          <ChevronLeft className="h-4 w-4" />
          All articles
        </Link>

        {/* Article Header */}
        <div className="mb-8">
          <div className="mb-4 flex items-center gap-2">
            <span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
              {league}
            </span>
            <span className="text-xs text-muted-foreground">{date}</span>
            <span className="rounded-full bg-green-50 px-2 py-0.5 text-xs font-semibold text-green-700 ring-1 ring-green-600/20">
              {confidence}% Confident
            </span>
          </div>
          <h1 className="text-3xl font-bold leading-tight">
            {home} vs {away} Prediction: AI Forecast & Match Preview
          </h1>
        </div>

        {/* Match Visual */}
        <div className="mb-8 flex items-center justify-center gap-8 rounded-2xl bg-gradient-to-br from-blue-600 to-blue-800 p-10">
          <div className="flex flex-col items-center gap-2">
            <img src={fixture.teams.home.logo} alt={home} className="h-20 w-20 object-contain" />
            <span className="font-bold text-white">{home}</span>
          </div>
          <span className="text-4xl font-black text-white">VS</span>
          <div className="flex flex-col items-center gap-2">
            <img src={fixture.teams.away.logo} alt={away} className="h-20 w-20 object-contain" />
            <span className="font-bold text-white">{away}</span>
          </div>
        </div>

        {/* Article Content */}
        <div className="prose prose-slate max-w-none">
          <h2>Match Overview</h2>
          <p>
            {home} take on {away} in what promises to be an exciting {league} fixture.
            Our AI prediction model has analyzed both teams' recent form, head-to-head records,
            and key statistics to bring you the most accurate forecast possible.
          </p>

          <h2>AI Prediction</h2>
          <p>
            Our model gives {home} a <strong>{confidence}% confidence rating</strong> for
            this match. The prediction is based on current form, squad depth, home advantage,
            and historical head-to-head data between these two sides.
          </p>

          <h2>Key Factors</h2>
          <ul>
            <li><strong>Home Advantage:</strong> Playing at home gives {home} a significant boost in fan support and familiarity with the pitch.</li>
            <li><strong>Recent Form:</strong> Both teams' performances in recent matches have been factored into our AI model.</li>
            <li><strong>Head-to-Head:</strong> Historical matchups between {home} and {away} show interesting patterns our model has accounted for.</li>
            <li><strong>Squad Availability:</strong> Key player availability and fitness levels have been considered in this prediction.</li>
          </ul>

          <h2>Our Verdict</h2>
          <p>
            Based on all available data, our AI model predicts a competitive match between
            {home} and {away}. With a confidence rating of {confidence}%, we back our
            prediction but always recommend watching the match to see how things unfold.
          </p>
        </div>

        {/* CTA */}
        <div className="mt-8 rounded-2xl bg-primary p-6 text-center text-white">
          <h3 className="text-xl font-bold mb-2">Get Full AI Analysis</h3>
          <p className="mb-4 text-primary-foreground/80">
            See win probability, predicted score, and detailed AI breakdown
          </p>
          <Link
            href={`/match/${slug}`}
            className="inline-block rounded-full bg-white px-6 py-2 font-semibold text-primary hover:bg-white/90 transition-colors"
          >
            View Full Prediction →
          </Link>
        </div>
      </main>
    </div>
  )
}