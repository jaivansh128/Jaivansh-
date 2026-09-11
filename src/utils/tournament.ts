import { Player, LeagueMatch, PlayerStats } from '../types';

export function calculateStandings(
  players: Player[],
  matches: LeagueMatch[]
): PlayerStats[] {
  const statsMap: Record<string, PlayerStats> = {};

  players.forEach((p) => {
    statsMap[p.id] = {
      id: p.id,
      name: p.name,
      played: 0,
      won: 0,
      drawn: 0,
      lost: 0,
      gf: 0,
      ga: 0,
      gd: 0,
      pts: 0,
      form: [],
    };
  });

  // Process matches in chronological order for form tracking
  matches.forEach((m) => {
    const s1 = m.p1Score;
    const s2 = m.p2Score;

    if (s1 !== null && s2 !== null && !isNaN(s1) && !isNaN(s2)) {
      const p1 = statsMap[m.p1Id];
      const p2 = statsMap[m.p2Id];

      if (p1 && p2) {
        p1.played += 1;
        p2.played += 1;

        p1.gf += s1;
        p1.ga += s2;
        p1.gd = p1.gf - p1.ga;

        p2.gf += s2;
        p2.ga += s1;
        p2.gd = p2.gf - p2.ga;

        if (s1 > s2) {
          p1.won += 1;
          p1.pts += 3;
          p1.form.push('W');

          p2.lost += 1;
          p2.form.push('L');
        } else if (s2 > s1) {
          p2.won += 1;
          p2.pts += 3;
          p2.form.push('W');

          p1.lost += 1;
          p1.form.push('L');
        } else {
          p1.drawn += 1;
          p1.pts += 1;
          p1.form.push('D');

          p2.drawn += 1;
          p2.pts += 1;
          p2.form.push('D');
        }
      }
    }
  });

  // Sort by Points DESC -> Goal Difference DESC -> Goals For DESC -> Name ASC
  return Object.values(statsMap).sort((a, b) => {
    if (b.pts !== a.pts) return b.pts - a.pts;
    if (b.gd !== a.gd) return b.gd - a.gd;
    if (b.gf !== a.gf) return b.gf - a.gf;
    return a.name.localeCompare(b.name);
  });
}

export function determineKnockoutWinner(
  p1Name: string,
  p2Name: string,
  p1Score: number | null,
  p2Score: number | null,
  p1Penalties: number | null = null,
  p2Penalties: number | null = null
): string | null {
  if (p1Score === null || p2Score === null || isNaN(p1Score) || isNaN(p2Score)) {
    return null;
  }

  if (p1Score > p2Score) return p1Name;
  if (p2Score > p1Score) return p2Name;

  // Drawn in regular time - check penalties if provided
  if (
    p1Penalties !== null &&
    p2Penalties !== null &&
    !isNaN(p1Penalties) &&
    !isNaN(p2Penalties)
  ) {
    if (p1Penalties > p2Penalties) return p1Name;
    if (p2Penalties > p1Penalties) return p2Name;
  }

  return null; // Tied, waiting for penalty winner
}
