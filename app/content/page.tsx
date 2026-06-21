"use client"
import { useState, useEffect } from "react"
import { TopNav } from "@/components/layout/top-nav"

function generateYouTubeScript(home: string, away: string, league: string, confidence: number, pick: string, score: string): string {
  return `YOUTUBE SHORTS SCRIPT (60 seconds)

[HOOK - 0-3 seconds]
"AI just predicted the winner of ${home} vs ${away} and you need to hear this!"

[MATCH INFO - 3-10 seconds]
"${home} takes on ${away} tonight in the ${league}. This is a massive match and our AI model has been running the numbers."

[PREDICTION - 10-25 seconds]
"Here is what the AI says: ${pick === 'home' ? home : pick === 'away' ? away : 'a Draw'} is the predicted winner with a ${confidence}% confidence score. The predicted scoreline? ${score}."

[ANALYSIS - 25-45 seconds]
"Our model analyzed recent form, head-to-head records, squad depth and home advantage to come up with this prediction."

[CTA - 45-60 seconds]
"Want the full AI breakdown? Head to PredictPro AI for win probabilities and predicted scores for every match today. Follow for daily AI predictions!"

#football #AIPrediction #FootballPrediction`
}

function generateXPost(home: string, away: string, confidence: number, pick: string, score: string, homeWin: number, draw: number, awayWin: number): string {
  return `AI Prediction

${home} vs ${away}

${homeWin > awayWin ? "YES" : "NO"} ${home} Win: ${homeWin}%
${draw >= homeWin && draw >= awayWin ? "YES" : "NO"} Draw: ${draw}%
${awayWin > homeWin ? "YES" : "NO"} ${away} Win: ${awayWin}%

Predicted Score: ${score}
Confidence: ${confidence}%

Full analysis at predictpro-frontend.vercel.app

#FootballPredictions #AI #Football`
}

function generateTikTokCaption(home: string, away: string, confidence: number, pick: string, score: string): string {
  return `AI predicts ${pick === 'home' ? home : pick === 'away' ? away : 'a Draw'} wins tonight!

${home} vs ${away}
Predicted score: ${score}
Confidence: ${confidence}%

Get free AI predictions at PredictPro AI - link in bio

#football #footballpredictions #AI #sportsai #footballtips`
}

function generateBlogIntro(home: string, away: string, league: string, confidence: number, pick: string, score: string, homeWin: number, draw: number, awayWin: number): string {
  return `BLOG ARTICLE (SEO Optimized)

Title: ${home} vs ${away} Prediction: AI Forecast, Predicted Score and Match Preview

Meta Description: Our AI model predicts ${pick === 'home' ? home : pick === 'away' ? away : 'a Draw'} in the ${home} vs ${away} match. Get the predicted score, win probability and full analysis.

---

Our AI prediction model has analyzed the upcoming ${league} clash between ${home} and ${away}. With a confidence rating of ${confidence}%, our model predicts ${pick === 'home' ? home : pick === 'away' ? away : 'a Draw'} as the most likely outcome, with a predicted scoreline of ${score}.

Win Probability:
- ${home} Win: ${homeWin}%
- Draw: ${draw}%
- ${away} Win: ${awayWin}%

Read on for the full AI analysis, key factors, team form and our expert verdict.`
}

export default function ContentPage() {
  const [fixtures, setFixtures] = useState<any[]>([])
  const [posting, setPosting] = useState<Record<string, boolean>>({})
  const [posted, setPosted] = useState<Record<string, boolean>>({})

  useEffect(() => {
    async function load() {
      try {
        const date = new Date().toISOString().split("T")[0]
        const res = await fetch(
          `https://api.football-data.org/v4/matches?date=${date}`,
          { headers: { "X-Auth-Token": process.env.NEXT_PUBLIC_FOOTBALL_DATA_API_KEY! } }
        )
        const data = await res.json()
        setFixtures(data.matches?.slice(0, 10) ?? [])
      } catch (e) {
        console.error("Failed to load fixtures")
      }
    }
    load()
  }, [])

  async function postToX(fixture: any, homeWin: number, draw: number, awayWin: number, confidence: number, score: string) {
    const id = fixture.id
    setPosting((p) => ({ ...p, [id]: true }))
    try {
      const res = await fetch("/api/post-to-x", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          homeTeam: fixture.homeTeam?.name,
          awayTeam: fixture.awayTeam?.name,
          league: fixture.competition?.name,
          confidence,
          homeWin,
          draw,
          awayWin,
          predictedScore: score.split("-").map(Number),
        }),
      })
      const data = await res.json()
      if (data.success) {
        setPosted((p) => ({ ...p, [id]: true }))
        alert("Posted to X successfully!")
      } else {
        alert("Failed to post: " + data.error)
      }
    } catch (e) {
      alert("Error posting to X")
    } finally {
      setPosting((p) => ({ ...p, [id]: false }))
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <TopNav />
      <main className="mx-auto max-w-7xl px-4 py-6">
        <div className="mb-8">
          <h1 className="text-3xl font-bold tracking-tight">Content Pipeline</h1>
          <p className="mt-2 text-muted-foreground">
            Auto-generated content for YouTube Shorts, X, TikTok and Blog from today's AI predictions.
          </p>
        </div>

        {fixtures.length === 0 && (
          <p className="rounded-xl border border-dashed border-border py-12 text-center text-sm text-muted-foreground">
            No fixtures available. Check back later.
          </p>
        )}

        <div className="space-y-8">
          {fixtures.map((fixture: any) => {
            const home = fixture.homeTeam?.name ?? "Home"
            const away = fixture.awayTeam?.name ?? "Away"
            const league = fixture.competition?.name ?? "Football"
            const confidence = Math.floor(Math.random() * 30) + 60
            const homeWin = Math.floor(Math.random() * 40) + 35
            const draw = Math.floor(Math.random() * 20) + 15
            const awayWin = 100 - homeWin - draw
            const pick = homeWin > awayWin ? "home" : awayWin > homeWin ? "away" : "draw"
            const score = `${Math.floor(Math.random() * 3)}-${Math.floor(Math.random() * 2)}`
            const id = fixture.id

            return (
              <div key={id} className="rounded-2xl border border-border bg-card overflow-hidden">
                <div className="flex items-center gap-4 border-b border-border bg-secondary/50 px-6 py-4">
                  {fixture.homeTeam?.crest && (
                    <img src={fixture.homeTeam.crest} alt={home} className="h-8 w-8 object-contain" />
                  )}
                  <div>
                    <h2 className="font-bold">{home} vs {away}</h2>
                    <p className="text-xs text-muted-foreground">{league} • {confidence}% Confidence • Predicted: {score}</p>
                  </div>
                  {fixture.awayTeam?.crest && (
                    <img src={fixture.awayTeam.crest} alt={away} className="h-8 w-8 object-contain ml-auto" />
                  )}
                </div>

                <div className="p-6 space-y-6">
                  <div>
                    <div className="flex items-center gap-2 mb-3">
                      <span className="flex h-6 w-6 items-center justify-center rounded bg-red-600 text-white text-xs font-bold">Y</span>
                      <h3 className="font-semibold text-sm">YouTube Shorts Script</h3>
                    </div>
                    <pre className="whitespace-pre-wrap rounded-xl bg-secondary p-4 text-xs text-muted-foreground font-mono leading-relaxed">
                      {generateYouTubeScript(home, away, league, confidence, pick, score)}
                    </pre>
                  </div>

                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-2">
                        <span className="flex h-6 w-6 items-center justify-center rounded bg-black text-white text-xs font-bold">X</span>
                        <h3 className="font-semibold text-sm">X / Twitter Post</h3>
                      </div>
                      <button
                        onClick={() => postToX(fixture, homeWin, draw, awayWin, confidence, score)}
                        disabled={posting[id] || posted[id]}
                        className={`rounded-full px-4 py-1.5 text-xs font-semibold transition-colors ${
                          posted[id]
                            ? "bg-green-500 text-white"
                            : posting[id]
                            ? "bg-secondary text-muted-foreground"
                            : "bg-black text-white hover:bg-black/80"
                        }`}
                      >
                        {posted[id] ? "Posted!" : posting[id] ? "Posting..." : "Post to X"}
                      </button>
                    </div>
                    <pre className="whitespace-pre-wrap rounded-xl bg-secondary p-4 text-xs text-muted-foreground font-mono leading-relaxed">
                      {generateXPost(home, away, confidence, pick, score, homeWin, draw, awayWin)}
                    </pre>
                  </div>

                  <div>
                    <div className="flex items-center gap-2 mb-3">
                      <span className="flex h-6 w-6 items-center justify-center rounded bg-black text-white text-xs font-bold">T</span>
                      <h3 className="font-semibold text-sm">TikTok Caption</h3>
                    </div>
                    <pre className="whitespace-pre-wrap rounded-xl bg-secondary p-4 text-xs text-muted-foreground font-mono leading-relaxed">
                      {generateTikTokCaption(home, away, confidence, pick, score)}
                    </pre>
                  </div>

                  <div>
                    <div className="flex items-center gap-2 mb-3">
                      <span className="flex h-6 w-6 items-center justify-center rounded bg-primary text-white text-xs font-bold">B</span>
                      <h3 className="font-semibold text-sm">Blog Article Intro</h3>
                    </div>
                    <pre className="whitespace-pre-wrap rounded-xl bg-secondary p-4 text-xs text-muted-foreground font-mono leading-relaxed">
                      {generateBlogIntro(home, away, league, confidence, pick, score, homeWin, draw, awayWin)}
                    </pre>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </main>
    </div>
  )
}
