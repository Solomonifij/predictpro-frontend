import type { League, Match, StandingRow, Team } from "./types"

const teams: Record<string, Team> = {
  france: { id: "france", name: "France", shortName: "FRA", code: "FR", color: "bg-blue-600 text-white" },
  senegal: { id: "senegal", name: "Senegal", shortName: "SEN", code: "SN", color: "bg-green-600 text-white" },
  iraq: { id: "iraq", name: "Iraq", shortName: "IRQ", code: "IQ", color: "bg-red-600 text-white" },
  norway: { id: "norway", name: "Norway", shortName: "NOR", code: "NO", color: "bg-red-500 text-white" },
  iran: { id: "iran", name: "Iran", shortName: "IRN", code: "IR", color: "bg-emerald-600 text-white" },
  newzealand: { id: "newzealand", name: "New Zealand", shortName: "NZL", code: "NZ", color: "bg-slate-800 text-white" },
  brazil: { id: "brazil", name: "Brazil", shortName: "BRA", code: "BR", color: "bg-yellow-400 text-slate-900" },
  argentina: { id: "argentina", name: "Argentina", shortName: "ARG", code: "AR", color: "bg-sky-400 text-slate-900" },
  spain: { id: "spain", name: "Spain", shortName: "ESP", code: "ES", color: "bg-red-700 text-white" },
  portugal: { id: "portugal", name: "Portugal", shortName: "POR", code: "PT", color: "bg-rose-700 text-white" },
  arsenal: { id: "arsenal", name: "Arsenal", shortName: "ARS", code: "EN", color: "bg-red-600 text-white" },
  mancity: { id: "mancity", name: "Man City", shortName: "MCI", code: "EN", color: "bg-sky-500 text-white" },
  manutd: { id: "manutd", name: "Man Utd", shortName: "MUN", code: "EN", color: "bg-red-700 text-white" },
  liverpool: { id: "liverpool", name: "Liverpool", shortName: "LIV", code: "EN", color: "bg-red-600 text-white" },
  astonvilla: { id: "astonvilla", name: "Aston Villa", shortName: "AVL", code: "EN", color: "bg-purple-900 text-white" },
  chelsea: { id: "chelsea", name: "Chelsea", shortName: "CHE", code: "EN", color: "bg-blue-700 text-white" },
}

export const matches: Match[] = [
  {
    id: "fra-sen",
    league: "FIFA World Cup",
    leagueId: "world-cup",
    round: "Group I · Round 1",
    kickoff: "2026-06-16T20:00:00Z",
    status: "upcoming",
    home: teams.france,
    away: teams.senegal,
    odds: { home: 1.45, draw: 4.5, away: 7.0 },
    prediction: {
      homeWin: 68,
      draw: 22,
      awayWin: 10,
      confidence: 87,
      predictedScore: [2, 0],
      pick: "home",
      analysis:
        "France enter as heavy favourites. Our model weights their superior squad depth, recent attacking output (2.4 goals per game), and a settled defensive line. Senegal are organised but have struggled to create high-quality chances away from home, and France's expected-goals differential over the qualifying cycle is the strongest in the group.",
      factors: [
        { label: "Squad value", value: "€1.1B vs €420M", favors: "home" },
        { label: "Recent form (xG)", value: "+1.8 vs +0.4", favors: "home" },
        { label: "Head-to-head", value: "France lead 4-1", favors: "home" },
        { label: "Key absences", value: "Senegal missing CB", favors: "home" },
      ],
    },
  },
  {
    id: "irq-nor",
    league: "FIFA World Cup",
    leagueId: "world-cup",
    round: "Group I · Round 1",
    kickoff: "2026-06-16T23:00:00Z",
    status: "upcoming",
    home: teams.iraq,
    away: teams.norway,
    odds: { home: 5.0, draw: 3.6, away: 1.7 },
    prediction: {
      homeWin: 21,
      draw: 27,
      awayWin: 52,
      confidence: 64,
      predictedScore: [1, 2],
      pick: "away",
      analysis:
        "Norway's elite front line gives them the edge, but Iraq's compact mid-block and home-continent support keep this from being a clear-cut call. The model flags a meaningful draw probability driven by Norway's inconsistency in tournament openers.",
      factors: [
        { label: "Attacking talent", value: "Norway elite striker", favors: "away" },
        { label: "Defensive solidity", value: "Iraq 0.9 xGA", favors: "home" },
        { label: "Tournament openers", value: "Norway mixed record", favors: "neutral" },
      ],
    },
  },
  {
    id: "irn-nzl",
    league: "FIFA World Cup",
    leagueId: "world-cup",
    round: "Group G · Round 1",
    kickoff: "2026-06-16T02:00:00Z",
    status: "finished",
    home: teams.iran,
    away: teams.newzealand,
    homeScore: 2,
    awayScore: 2,
    prediction: {
      homeWin: 55,
      draw: 28,
      awayWin: 17,
      confidence: 58,
      predictedScore: [2, 1],
      pick: "home",
      analysis:
        "The model favoured Iran but flagged elevated draw risk. New Zealand's set-piece threat proved decisive in a 2-2 result that landed within the predicted total-goals range.",
      factors: [
        { label: "Possession edge", value: "Iran 61%", favors: "home" },
        { label: "Set-piece threat", value: "NZ +0.6 xG", favors: "away" },
      ],
    },
  },
  {
    id: "bra-arg",
    league: "FIFA World Cup",
    leagueId: "world-cup",
    round: "Group A · Round 2",
    kickoff: "2026-06-17T22:00:00Z",
    status: "upcoming",
    home: teams.brazil,
    away: teams.argentina,
    odds: { home: 2.4, draw: 3.2, away: 2.9 },
    prediction: {
      homeWin: 41,
      draw: 30,
      awayWin: 29,
      confidence: 52,
      predictedScore: [1, 1],
      pick: "home",
      analysis:
        "A near coin-flip between two heavyweights. Brazil's home-continent advantage tips the model marginally in their favour, but the most likely single scoreline is a 1-1 draw.",
      factors: [
        { label: "Home advantage", value: "Brazil +0.3 xG", favors: "home" },
        { label: "Big-game pedigree", value: "Even", favors: "neutral" },
        { label: "Form", value: "Argentina W4", favors: "away" },
      ],
    },
  },
  {
    id: "esp-por",
    league: "FIFA World Cup",
    leagueId: "world-cup",
    round: "Group B · Round 2",
    kickoff: "2026-06-17T19:00:00Z",
    status: "live",
    minute: 67,
    home: teams.spain,
    away: teams.portugal,
    homeScore: 1,
    awayScore: 1,
    odds: { home: 2.1, draw: 3.3, away: 3.4 },
    prediction: {
      homeWin: 49,
      draw: 28,
      awayWin: 23,
      confidence: 71,
      predictedScore: [2, 1],
      pick: "home",
      analysis:
        "Spain's midfield control is driving the live model, which still projects a Spain win despite the level scoreline. Their in-game xG lead suggests a likely go-ahead goal in the final third of the match.",
      factors: [
        { label: "Live xG", value: "Spain 1.8 vs 0.9", favors: "home" },
        { label: "Territory", value: "Spain 64% final third", favors: "home" },
      ],
    },
  },
  {
    id: "mci-avl",
    league: "Premier League",
    leagueId: "premier-league",
    round: "Round 38",
    kickoff: "2026-05-24T16:00:00Z",
    status: "finished",
    home: teams.mancity,
    away: teams.astonvilla,
    homeScore: 1,
    awayScore: 2,
    odds: { home: 1.4, draw: 5.0, away: 7.0 },
    prediction: {
      homeWin: 72,
      draw: 18,
      awayWin: 10,
      confidence: 74,
      predictedScore: [2, 0],
      pick: "home",
      analysis:
        "A rare model miss — Aston Villa's clinical counter-attacking overturned heavy expected-goals dominance from City in a 2-1 away win.",
      factors: [
        { label: "Expected goals", value: "City 2.6 vs 0.8", favors: "home" },
        { label: "Conversion", value: "Villa 2 from 3 SOT", favors: "away" },
      ],
    },
  },
]

export const leagues: League[] = [
  {
    id: "world-cup",
    name: "FIFA World Cup",
    country: "World",
    matches: matches.filter((m) => m.leagueId === "world-cup"),
  },
  {
    id: "premier-league",
    name: "Premier League",
    country: "England",
    matches: matches.filter((m) => m.leagueId === "premier-league"),
  },
]

export function getMatch(id: string): Match | undefined {
  return matches.find((m) => m.id === id)
}

export const premierLeagueStandings: StandingRow[] = [
  { position: 1, team: teams.arsenal, played: 38, won: 26, drawn: 7, lost: 5, goalsFor: 71, goalsAgainst: 27, points: 85, form: ["W", "W", "W", "W", "W"], projectedPoints: 88 },
  { position: 2, team: teams.mancity, played: 38, won: 23, drawn: 9, lost: 6, goalsFor: 77, goalsAgainst: 35, points: 78, form: ["D", "W", "W", "D", "L"], projectedPoints: 81 },
  { position: 3, team: teams.manutd, played: 38, won: 20, drawn: 11, lost: 7, goalsFor: 69, goalsAgainst: 50, points: 71, form: ["W", "W", "D", "W", "W"], projectedPoints: 70 },
  { position: 4, team: teams.astonvilla, played: 38, won: 19, drawn: 8, lost: 11, goalsFor: 56, goalsAgainst: 49, points: 65, form: ["L", "L", "D", "W", "W"], projectedPoints: 64 },
  { position: 5, team: teams.liverpool, played: 38, won: 17, drawn: 9, lost: 12, goalsFor: 63, goalsAgainst: 53, points: 60, form: ["W", "L", "D", "L", "D"], projectedPoints: 62 },
  { position: 6, team: teams.chelsea, played: 38, won: 14, drawn: 10, lost: 14, goalsFor: 58, goalsAgainst: 52, points: 52, form: ["L", "L", "D", "W", "L"], projectedPoints: 54 },
]

export function flagUrl(code: string) {
  return `https://flagcdn.com/w80/${code.toLowerCase()}.png`
}
