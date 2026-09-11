export interface Player {
  id: string;
  name: string;
}

export interface MatchScore {
  p1Score: number | null;
  p2Score: number | null;
  p1Penalties?: number | null;
  p2Penalties?: number | null;
}

export interface LeagueMatch {
  id: number;
  matchNumber: number;
  p1Id: string;
  p2Id: string;
  p1Score: number | null;
  p2Score: number | null;
}

export interface KnockoutMatch {
  id: number;
  title: string;
  stageName: string;
  p1Name: string;
  p2Name: string;
  p1Score: number | null;
  p2Score: number | null;
  p1Penalties: number | null;
  p2Penalties: number | null;
  winner: string | null;
}

export interface PlayerStats {
  id: string;
  name: string;
  played: number;
  won: number;
  drawn: number;
  lost: number;
  gf: number;
  ga: number;
  gd: number;
  pts: number;
  form: ('W' | 'D' | 'L')[];
}
