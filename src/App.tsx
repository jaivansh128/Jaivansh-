import React, { useState, useEffect, useMemo } from 'react';
import { Player, LeagueMatch } from './types';
import { DEFAULT_PLAYERS, INITIAL_LEAGUE_MATCHES } from './data/initialData';
import { calculateStandings, determineKnockoutWinner } from './utils/tournament';
import { Header } from './components/Header';
import { LeagueTable } from './components/LeagueTable';
import { MatchCard } from './components/MatchCard';
import { PlayoffBracket } from './components/PlayoffBracket';
import { ChampionCard } from './components/ChampionCard';
import { EditPlayersModal } from './components/EditPlayersModal';
import { RulesModal } from './components/RulesModal';

const STORAGE_KEY = 'fc_mobile_stepladder_state_v1';

export default function App() {
  const [players, setPlayers] = useState<Player[]>(() => {
    try {
      const saved = localStorage.getItem(`${STORAGE_KEY}_players`);
      return saved ? JSON.parse(saved) : DEFAULT_PLAYERS;
    } catch {
      return DEFAULT_PLAYERS;
    }
  });

  const [leagueMatches, setLeagueMatches] = useState<LeagueMatch[]>(() => {
    try {
      const saved = localStorage.getItem(`${STORAGE_KEY}_matches`);
      return saved ? JSON.parse(saved) : INITIAL_LEAGUE_MATCHES;
    } catch {
      return INITIAL_LEAGUE_MATCHES;
    }
  });

  // Match 7 (Playoff Semi-Final)
  const [m7Score1, setM7Score1] = useState<number | null>(() => {
    const saved = localStorage.getItem(`${STORAGE_KEY}_m7s1`);
    return saved !== null && saved !== '' ? Number(saved) : null;
  });
  const [m7Score2, setM7Score2] = useState<number | null>(() => {
    const saved = localStorage.getItem(`${STORAGE_KEY}_m7s2`);
    return saved !== null && saved !== '' ? Number(saved) : null;
  });
  const [m7Pk1, setM7Pk1] = useState<number | null>(() => {
    const saved = localStorage.getItem(`${STORAGE_KEY}_m7pk1`);
    return saved !== null && saved !== '' ? Number(saved) : null;
  });
  const [m7Pk2, setM7Pk2] = useState<number | null>(() => {
    const saved = localStorage.getItem(`${STORAGE_KEY}_m7pk2`);
    return saved !== null && saved !== '' ? Number(saved) : null;
  });

  // Match 8 (Grand Final)
  const [m8Score1, setM8Score1] = useState<number | null>(() => {
    const saved = localStorage.getItem(`${STORAGE_KEY}_m8s1`);
    return saved !== null && saved !== '' ? Number(saved) : null;
  });
  const [m8Score2, setM8Score2] = useState<number | null>(() => {
    const saved = localStorage.getItem(`${STORAGE_KEY}_m8s2`);
    return saved !== null && saved !== '' ? Number(saved) : null;
  });
  const [m8Pk1, setM8Pk1] = useState<number | null>(() => {
    const saved = localStorage.getItem(`${STORAGE_KEY}_m8pk1`);
    return saved !== null && saved !== '' ? Number(saved) : null;
  });
  const [m8Pk2, setM8Pk2] = useState<number | null>(() => {
    const saved = localStorage.getItem(`${STORAGE_KEY}_m8pk2`);
    return saved !== null && saved !== '' ? Number(saved) : null;
  });

  // Modals
  const [isEditPlayersOpen, setIsEditPlayersOpen] = useState(false);
  const [isRulesOpen, setIsRulesOpen] = useState(false);

  // Sync with LocalStorage
  useEffect(() => {
    localStorage.setItem(`${STORAGE_KEY}_players`, JSON.stringify(players));
  }, [players]);

  useEffect(() => {
    localStorage.setItem(`${STORAGE_KEY}_matches`, JSON.stringify(leagueMatches));
  }, [leagueMatches]);

  useEffect(() => {
    localStorage.setItem(`${STORAGE_KEY}_m7s1`, m7Score1 === null ? '' : String(m7Score1));
    localStorage.setItem(`${STORAGE_KEY}_m7s2`, m7Score2 === null ? '' : String(m7Score2));
    localStorage.setItem(`${STORAGE_KEY}_m7pk1`, m7Pk1 === null ? '' : String(m7Pk1));
    localStorage.setItem(`${STORAGE_KEY}_m7pk2`, m7Pk2 === null ? '' : String(m7Pk2));
  }, [m7Score1, m7Score2, m7Pk1, m7Pk2]);

  useEffect(() => {
    localStorage.setItem(`${STORAGE_KEY}_m8s1`, m8Score1 === null ? '' : String(m8Score1));
    localStorage.setItem(`${STORAGE_KEY}_m8s2`, m8Score2 === null ? '' : String(m8Score2));
    localStorage.setItem(`${STORAGE_KEY}_m8pk1`, m8Pk1 === null ? '' : String(m8Pk1));
    localStorage.setItem(`${STORAGE_KEY}_m8pk2`, m8Pk2 === null ? '' : String(m8Pk2));
  }, [m8Score1, m8Score2, m8Pk1, m8Pk2]);

  // Derived Standings
  const standings = useMemo(() => {
    return calculateStandings(players, leagueMatches);
  }, [players, leagueMatches]);

  // Map player names by id for quick lookup
  const playerMap = useMemo(() => {
    const map: Record<string, string> = {};
    players.forEach((p) => {
      map[p.id] = p.name;
    });
    return map;
  }, [players]);

  // Playoff & Final participants
  const rank1Player = standings[0]?.name || '1st Place';
  const rank2Player = standings[1]?.name || '2nd Place';
  const rank3Player = standings[2]?.name || '3rd Place';

  // Determine Match 7 Winner
  const m7Winner = useMemo(() => {
    return determineKnockoutWinner(
      rank2Player,
      rank3Player,
      m7Score1,
      m7Score2,
      m7Pk1,
      m7Pk2
    );
  }, [rank2Player, rank3Player, m7Score1, m7Score2, m7Pk1, m7Pk2]);

  // Determine Champion (Match 8 Winner)
  const champion = useMemo(() => {
    if (!m7Winner) return null;
    return determineKnockoutWinner(
      rank1Player,
      m7Winner,
      m8Score1,
      m8Score2,
      m8Pk1,
      m8Pk2
    );
  }, [rank1Player, m7Winner, m8Score1, m8Score2, m8Pk1, m8Pk2]);

  const runnerUp = useMemo(() => {
    if (!champion || !m7Winner) return undefined;
    return champion === rank1Player ? m7Winner : rank1Player;
  }, [champion, rank1Player, m7Winner]);

  // Total completed matches
  const completedLeague = leagueMatches.filter(
    (m) => m.p1Score !== null && m.p2Score !== null
  ).length;
  const completedM7 = m7Winner !== null ? 1 : 0;
  const completedM8 = champion !== null ? 1 : 0;
  const totalCompleted = completedLeague + completedM7 + completedM8;

  // Handlers
  const handleScoreChange = (
    mId: number,
    s1: number | null,
    s2: number | null
  ) => {
    setLeagueMatches((prev) =>
      prev.map((m) =>
        m.id === mId ? { ...m, p1Score: s1, p2Score: s2 } : m
      )
    );
  };

  const handleM7Change = (
    s1: number | null,
    s2: number | null,
    pk1: number | null,
    pk2: number | null
  ) => {
    setM7Score1(s1);
    setM7Score2(s2);
    setM7Pk1(pk1);
    setM7Pk2(pk2);
  };

  const handleM8Change = (
    s1: number | null,
    s2: number | null,
    pk1: number | null,
    pk2: number | null
  ) => {
    setM8Score1(s1);
    setM8Score2(s2);
    setM8Pk1(pk1);
    setM8Pk2(pk2);
  };

  const handleResetScores = () => {
    setLeagueMatches((prev) =>
      prev.map((m) => ({ ...m, p1Score: null, p2Score: null }))
    );
    setM7Score1(null);
    setM7Score2(null);
    setM7Pk1(null);
    setM7Pk2(null);
    setM8Score1(null);
    setM8Score2(null);
    setM8Pk1(null);
    setM8Pk2(null);
  };

  const handleQuickFill = () => {
    // Realistic sample scores for demonstration
    const sampleScores = [
      { p1: 3, p2: 1 },
      { p1: 2, p2: 2 },
      { p1: 4, p2: 0 },
      { p1: 1, p2: 3 },
      { p1: 2, p2: 1 },
      { p1: 0, p2: 2 },
    ];

    setLeagueMatches((prev) =>
      prev.map((m, idx) => ({
        ...m,
        p1Score: sampleScores[idx]?.p1 ?? 1,
        p2Score: sampleScores[idx]?.p2 ?? 0,
      }))
    );

    // Also populate a sample semi-final and final
    setM7Score1(2);
    setM7Score2(1);
    setM7Pk1(null);
    setM7Pk2(null);

    setM8Score1(3);
    setM8Score2(2);
    setM8Pk1(null);
    setM8Pk2(null);
  };

  const handleShareSummary = () => {
    let summary = `🏆 *FC MOBILE STEPLADDER TOURNAMENT RESULTS*\n\n`;
    if (champion) {
      summary += `👑 CHAMPION: ${champion}\n`;
      if (runnerUp) summary += `🥈 RUNNER-UP: ${runnerUp}\n\n`;
    }

    summary += `📊 LEAGUE STANDINGS (Stage 1):\n`;
    standings.forEach((p, idx) => {
      summary += `${idx + 1}. ${p.name} - ${p.pts} pts (GD: ${p.gd > 0 ? '+' + p.gd : p.gd}, P: ${p.played})\n`;
    });

    summary += `\n⚡ PLAYOFFS & GRAND FINAL (Stage 2):\n`;
    summary += `Semi-Final: ${rank2Player} ${m7Score1 ?? '-'} - ${m7Score2 ?? '-'} ${rank3Player}`;
    if (m7Winner) summary += ` (Winner: ${m7Winner})`;
    summary += `\n`;

    summary += `Grand Final: ${rank1Player} ${m8Score1 ?? '-'} - ${m8Score2 ?? '-'} ${m7Winner || 'TBD'}`;
    if (champion) summary += ` (Champion: ${champion})`;

    return summary;
  };

  return (
    <div className="min-h-screen bg-[#0b0e14] text-[#f0f6fc] p-4 sm:p-6 lg:p-8 max-w-[1200px] mx-auto">
      {/* Header & Controls */}
      <Header
        completedCount={totalCompleted}
        totalMatches={8}
        onReset={handleResetScores}
        onQuickFill={handleQuickFill}
        onOpenEditPlayers={() => setIsEditPlayersOpen(true)}
        onOpenRules={() => setIsRulesOpen(true)}
      />

      {/* Main Grid: Left = Standings + Knockouts, Right = League Fixtures */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* LEFT COLUMN: STANDINGS & KNOCKOUT BRACKET (7 Cols on desktop) */}
        <div className="lg:col-span-7 space-y-6">
          {/* League Standings Card */}
          <LeagueTable standings={standings} />

          {/* Stepladder Stage 2 Card */}
          <PlayoffBracket
            standings={standings}
            m7Score1={m7Score1}
            m7Score2={m7Score2}
            m7Pk1={m7Pk1}
            m7Pk2={m7Pk2}
            m8Score1={m8Score1}
            m8Score2={m8Score2}
            m8Pk1={m8Pk1}
            m8Pk2={m8Pk2}
            onM7Change={handleM7Change}
            onM8Change={handleM8Change}
            m7Winner={m7Winner}
            champion={champion}
          />

          {/* Champion Box (Appears when Grand Final has a winner) */}
          {champion && (
            <ChampionCard
              championName={champion}
              runnerUpName={runnerUp}
              onShareText={handleShareSummary}
            />
          )}
        </div>

        {/* RIGHT COLUMN: LEAGUE MATCHES FIXTURES (5 Cols on desktop) */}
        <div className="lg:col-span-5 space-y-4">
          <div className="bg-[#161b22] border border-[#30363d] rounded-xl p-5 shadow-lg">
            <div className="flex items-center justify-between border-b border-[#30363d] pb-3 mb-4">
              <div>
                <h2 className="font-heading text-lg font-bold text-[#00e5ff] tracking-wide uppercase">
                  League Matches
                </h2>
                <p className="text-xs text-[#8b949e]">
                  Stage 1: Round-Robin (6 Matches)
                </p>
              </div>
              <button
                onClick={handleResetScores}
                className="text-xs font-semibold px-2.5 py-1 rounded bg-[#0b0e14] border border-[#30363d] text-[#8b949e] hover:text-[#ff4d4d] hover:border-[#ff4d4d]/40 transition-colors cursor-pointer"
              >
                Reset Scores
              </button>
            </div>

            {/* Dynamic Match Rows */}
            <div id="league-matches" className="space-y-3">
              {leagueMatches.map((m) => {
                const p1Name = playerMap[m.p1Id] || 'P1';
                const p2Name = playerMap[m.p2Id] || 'P2';

                return (
                  <MatchCard
                    key={m.id}
                    id={m.id}
                    matchNumber={m.matchNumber}
                    p1Name={p1Name}
                    p2Name={p2Name}
                    p1Score={m.p1Score}
                    p2Score={m.p2Score}
                    onScoreChange={handleScoreChange}
                  />
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Modals */}
      <EditPlayersModal
        isOpen={isEditPlayersOpen}
        onClose={() => setIsEditPlayersOpen(false)}
        players={players}
        onSavePlayers={setPlayers}
      />

      <RulesModal
        isOpen={isRulesOpen}
        onClose={() => setIsRulesOpen(false)}
      />
    </div>
  );
}
