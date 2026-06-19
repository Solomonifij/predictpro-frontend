import type { Metadata } from 'next'
import { TopNav } from "@/components/layout/top-nav"

export const metadata: Metadata = {
  title: 'Football News & Match Previews',
  description: 'Latest football news, AI-generated match previews and predictions for Premier League, Champions League, World Cup and more.',
}

async function fetchFootballNews() {
  const queries = ["football predictions today", "Premier League", "Champions League", "World Cup 2026"]
  const query = queries[Math.floor(Math.random() * queries.length)]
  const res = await fetch(
    `https://gnews.io/api/v4/search?q=${encodeURIComponent(query)}&lang=en&country=us&max=10&apikey=${process.env.GNEWS_API_KEY}`,
    { next: { revalidate: 300 } }
  )
  if (!res.ok) throw new Error("Failed to fetch news")
  const data = await res.json()
  return data.articles ?? []
}

function timeAgo(dateStr: string): string {
  const now = new Date()
  const date = new Date(dateStr)
  const diff = Math.floor((now.getTime() - date.getTime()) / 1000)
  if (diff < 3600) return `${Math.floor(diff / 60)} minutes ago`
  if (diff < 86400) return `${Math.floor(diff / 3600)} hours ago`
  return `${Math.floor(diff / 86400)} days ago`
}

export default async function NewsPage() {
  let articles: any[] = []
  let error = false
  try {
    articles = await fetchFootballNews()
  } catch (e) {
    error = true
  }
  const featured = articles[0]
  const rest = articles.slice(1)

  return (
    <div className="min-h-screen bg-background">
      <TopNav />
      <main className="mx-auto max-w-7xl px-4 py-6">
        <div className="mb-8">
          <h1 className="text-3xl font-bold tracking-tight">Football News</h1>
          <p className="mt-2 text-muted-foreground">Latest football news, match previews and AI predictions.</p>
        </div>
        <div className="mb-6 flex flex-wrap gap-2">
          {["All", "World Cup", "Premier League", "Champions League", "AFCON", "La Liga"].map((cat) => (
            <button key={cat} className={`rounded-full border px-4 py-1.5 text-sm font-medium transition-colors ${cat === "All" ? "border-primary bg-primary text-primary-foreground" : "border-border bg-card text-foreground hover:bg-secondary"}`}>
              {cat}
            </button>
          ))}
        </div>
        {error && <p className="rounded-xl border border-dashed border-border py-12 text-center text-sm text-muted-foreground">Could not load news. Please try again later.</p>}
        {featured && (
          <a href={featured.url} target="_blank" rel="noopener noreferrer" className="group mb-8 block overflow-hidden rounded-2xl border border-border bg-card hover:shadow-lg transition-shadow">
            <div className="grid grid-cols-1 md:grid-cols-2">
              <div className="relative h-64 md:h-auto overflow-hidden">
                <img src={featured.image} alt={featured.title} className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-300" />
              </div>
              <div className="p-8 flex flex-col justify-center">
                <span className="inline-block rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary mb-3">TOP STORY</span>
                <h2 className="text-2xl font-bold leading-tight mb-3 group-hover:text-primary transition-colors">{featured.title}</h2>
                <p className="text-muted-foreground mb-4 line-clamp-3">{featured.description}</p>
                <div className="flex items-center gap-3">
                  <span className="text-sm font-semibold text-foreground">{featured.source.name}</span>
                  <span className="text-xs text-muted-foreground">{timeAgo(featured.publishedAt)}</span>
                </div>
              </div>
            </div>
          </a>
        )}
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {rest.map((article: any, i: number) => (
            <a key={i} href={article.url} target="_blank" rel="noopener noreferrer" className="group block overflow-hidden rounded-xl border border-border bg-card hover:shadow-md transition-shadow">
              <div className="relative h-44 overflow-hidden">
                <img src={article.image} alt={article.title} className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-300" />
              </div>
              <div className="p-4">
                <h3 className="font-bold leading-tight line-clamp-2 group-hover:text-primary transition-colors">{article.title}</h3>
                <div className="mt-3 flex items-center gap-2">
                  <div className="flex h-5 w-5 items-center justify-center rounded-full bg-primary text-[9px] font-bold text-white">{article.source.name.slice(0, 1)}</div>
                  <span className="text-xs font-medium text-muted-foreground truncate">{article.source.name}</span>
                  <span className="text-xs text-muted-foreground ml-auto shrink-0">{timeAgo(article.publishedAt)}</span>
                </div>
              </div>
            </a>
          ))}
        </div>
      </main>
    </div>
  )
}
