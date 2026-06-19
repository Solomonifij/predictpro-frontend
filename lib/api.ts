const API_KEY = process.env.API_FOOTBALL_KEY!
const BASE_URL = "https://v3.football.api-sports.io"

const headers = {
  "x-apisports-key": API_KEY,
}

function getTodayDate(): string {
  return new Date().toISOString().split("T")[0]
}

export async function fetchTodayFixtures() {
  const date = getTodayDate()
  const res = await fetch(`${BASE_URL}/fixtures?date=${date}`, {
    headers,
    next: { revalidate: 60 },
  })
  if (!res.ok) throw new Error(`API error: ${res.status}`)
  const data = await res.json()
  return data.response
}

export async function fetchLiveFixtures() {
  const res = await fetch(`${BASE_URL}/fixtures?live=all`, {
    headers,
    next: { revalidate: 30 },
  })
  if (!res.ok) throw new Error(`API error: ${res.status}`)
  const data = await res.json()
  return data.response
}

export async function fetchFixtureById(id: string) {
  const res = await fetch(`${BASE_URL}/fixtures?id=${id}`, {
    headers,
    next: { revalidate: 60 },
  })
  if (!res.ok) throw new Error(`API error: ${res.status}`)
  const data = await res.json()
  return data.response[0]
}

export async function fetchStandings(leagueId: number = 39, season: number = 2025) {
  const res = await fetch(
    `${BASE_URL}/standings?league=${leagueId}&season=${season}`,
    {
      headers,
      next: { revalidate: 3600 },
    }
  )
  if (!res.ok) throw new Error(`API error: ${res.status}`)
  const data = await res.json()
  return data.response[0]?.league?.standings[0] ?? []
}

export function groupFixturesByLeague(fixtures: any[]) {
  const grouped: Record<string, any[]> = {}
  for (const fixture of fixtures) {
    const leagueName = fixture.league.name
    if (!grouped[leagueName]) grouped[leagueName] = []
    grouped[leagueName].push(fixture)
  }
  return grouped
}

export function formatKickoffTime(dateStr: string): string {
  const date = new Date(dateStr)
  return date.toLocaleTimeString("en-GB", {
    hour: "2-digit",
    minute: "2-digit",
    timeZone: "Africa/Lagos",
  })
}

export function getFixtureStatus(fixture: any): string {
  const status = fixture.fixture.status.short
  const elapsed = fixture.fixture.status.elapsed
  if (status === "1H" || status === "2H" || status === "ET") return `LIVE ${elapsed}'`
  if (status === "HT") return "HT"
  if (status === "FT") return "FT"
  if (status === "NS") return formatKickoffTime(fixture.fixture.date)
  return status
}