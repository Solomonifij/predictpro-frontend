const FOOTBALL_API_KEY = process.env.FOOTBALL_DATA_API_KEY!
const BASE_URL = "https://api.football-data.org/v4"

const headers = {
  "X-Auth-Token": FOOTBALL_API_KEY,
}

// Get today's date in YYYY-MM-DD format
function getTodayDate(): string {
  return new Date().toISOString().split("T")[0]
}

// Fetch today's fixtures
export async function fetchTodayFixtures() {
  const date = getTodayDate()
  const res = await fetch(`${BASE_URL}/matches?date=${date}`, {
    headers,
    next: { revalidate: 60 },
  })
  if (!res.ok) throw new Error(`API error: ${res.status}`)
  const data = await res.json()
  return data.matches ?? []
}

// Fetch fixture by ID
export async function fetchFixtureById(id: string) {
  const res = await fetch(`${BASE_URL}/matches/${id}`, {
    headers,
    next: { revalidate: 60 },
  })
  if (!res.ok) throw new Error(`API error: ${res.status}`)
  const data = await res.json()
  return data
}

// Fetch standings for a competition
export async function fetchStandings(competitionCode: string = "PL") {
  const res = await fetch(`${BASE_URL}/competitions/${competitionCode}/standings`, {
    headers,
    next: { revalidate: 3600 },
  })
  if (!res.ok) throw new Error(`API error: ${res.status}`)
  const data = await res.json()
  return data.standings?.[0]?.table ?? []
}

// Group fixtures by competition
export function groupFixturesByLeague(fixtures: any[]) {
  const grouped: Record<string, any[]> = {}
  for (const fixture of fixtures) {
    const leagueName = fixture.competition?.name ?? "Unknown"
    if (!grouped[leagueName]) grouped[leagueName] = []
    grouped[leagueName].push(fixture)
  }
  return grouped
}

// Format kickoff time in Lagos timezone
export function formatKickoffTime(dateStr: string): string {
  const date = new Date(dateStr)
  return date.toLocaleTimeString("en-GB", {
    hour: "2-digit",
    minute: "2-digit",
    timeZone: "Africa/Lagos",
  })
}

// Get fixture status
export function getFixtureStatus(fixture: any): string {
  const status = fixture.status
  const elapsed = fixture.minute

  if (status === "IN_PLAY" || status === "PAUSED") return `${elapsed ?? 0}'`
  if (status === "FINISHED") return "FT"
  if (status === "TIMED" || status === "SCHEDULED") {
    return formatKickoffTime(fixture.utcDate)
  }
  return status
}
