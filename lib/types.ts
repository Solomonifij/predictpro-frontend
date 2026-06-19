export type FormResult = "W" | "D" | "L"

export interface Team {
  id: string
  name: string
  shortName: string
  /** ISO country code used to render a flag emoji-free badge */
  code: string
  /** tailwind classes for the crest circle fallback */
  color: string
}

export interface Prediction {
  /** percentage chance of home win */
  homeWin: number
  /** percentage chance of a draw */
  draw: number
  /** percentage chance of away win */
  awayWin: number
  /** overall model confidence 0-100 */
  confidence: number
  /** predicted final scoreline */
  predictedScore: [number, number]
  /** the AI's recommended pick */
  pick: "home" | "draw" | "away"
  /** short natural-language analysis */
  analysis: string
  /** key contributing factors */
  factors: { label: string; value: string; favors: "home" | "away" | "neutral" }[]
}

export interface Odds {
  home: number
  draw: number
  away: number
}

export type MatchStatus = "upcoming" | "live" | "finished"

export interface Match {
  id: string
  league: string
  leagueId: string
  round: string
  kickoff: string
  status: MatchStatus
  /** minute when live */
  minute?: number
  home: Team
  away: Team
  homeScore?: number
  awayScore?: number
  prediction: Prediction
  odds: Odds
}

export interface League {
  id: string
  name: string
  country: string
  matches: Match[]
}

export interface StandingRow {
  position: number
  team: Team
  played: number
  won: number
  drawn: number
  lost: number
  goalsFor: number
  goalsAgainst: number
  points: number
  form: FormResult[]
  /** AI projected finishing points */
  projectedPoints: number
}
