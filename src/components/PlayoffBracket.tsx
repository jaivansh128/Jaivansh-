import React from 'react';
import { PlayerStats } from '../types';
import { Trophy, Zap, ShieldAlert, CheckCircle2, ChevronRight, Minus, Plus } from 'lucide-react';

interface PlayoffBracketProps {
  standings: PlayerStats[];
  m7Score1: number | null;
  m7Score2: number | null;
  m7Pk1: number | null;
  m7Pk2: number | null;
  m8Score1: number | null;
  m8Score2: number | null;
  m8Pk1: number | null;
  m8Pk2: number | null;
  onM7Change: (s1: number | null, s2: number | null, pk1: number | null, pk2: number | null) => void;
  onM8Change: (s1: number | null, s2: number | null, pk1: number | null, pk2: number | null) => void;
  m7Winner: string | null;
  champion: string | null;
}

export const PlayoffBracket: React.FC<PlayoffBracketProps> = ({
  standings,
  m7Score1,
  m7Score2,
  m7Pk1,
  m7Pk2,
  m8Score1,
  m8Score2,
  m8Pk1,
  m8Pk2,
  onM7Change,
  onM8Change,
  m7Winner,
  champion,
}) => {
  const p1 = standings[0]?.name || '1st Place';
  const p2 = standings[1]?.name || '2nd Place';
  const p3 = standings[2]?.name || '3rd Place';

  const m7IsPlayed = m7Score1 !== null && m7Score2 !== null && !isNaN(m7Score1) && !isNaN(m7Score2);
  const m7IsTied = m7IsPlayed && m7Score1 === m7Score2;

  const m8IsPlayed = m8Score1 !== null && m8Score2 !== null && !isNaN(m8Score1) && !isNaN(m8Score2);
  const m8IsTied = m8IsPlayed && m8Score1 === m8Score2;

  // Helper score modifiers
  const handleScore = (
    match: 7 | 8,
    team: 1 | 2,
    val: string
  ) => {
    const num = val === '' ? null : Math.max(0, parseInt(val, 10));
    if (match === 7) {
      if (team === 1) onM7Change(isNaN(num as number) ? null : num, m7Score2, m7Pk1, m7Pk2);
      else onM7Change(m7Score1, isNaN(num as number) ? null : num, m7Pk1, m7Pk2);
    } else {
      if (team === 1) onM8Change(isNaN(num as number) ? null : num, m8Score2, m8Pk1, m8Pk2);
      else onM8Change(m8Score1, isNaN(num as number) ? null : num, m8Pk1, m8Pk2);
    }
  };

  const adjustScore = (match: 7 | 8, team: 1 | 2, delta: number) => {
    if (match === 7) {
      const s1 = m7Score1 === null ? 0 : m7Score1;
      const s2 = m7Score2 === null ? 0 : m7Score2;
      if (team === 1) onM7Change(Math.max(0, s1 + delta), s2, m7Pk1, m7Pk2);
      else onM7Change(s1, Math.max(0, s2 + delta), m7Pk1, m7Pk2);
    } else {
      const s1 = m8Score1 === null ? 0 : m8Score1;
      const s2 = m8Score2 === null ? 0 : m8Score2;
      if (team === 1) onM8Change(Math.max(0, s1 + delta), s2, m8Pk1, m8Pk2);
      else onM8Change(s1, Math.max(0, s2 + delta), m8Pk1, m8Pk2);
    }
  };

  const adjustPk = (match: 7 | 8, team: 1 | 2, delta: number) => {
    if (match === 7) {
      const pk1 = m7Pk1 === null ? 0 : m7Pk1;
      const pk2 = m7Pk2 === null ? 0 : m7Pk2;
      if (team === 1) onM7Change(m7Score1, m7Score2, Math.max(0, pk1 + delta), pk2);
      else onM7Change(m7Score1, m7Score2, pk1, Math.max(0, pk2 + delta));
    } else {
      const pk1 = m8Pk1 === null ? 0 : m8Pk1;
      const pk2 = m8Pk2 === null ? 0 : m8Pk2;
      if (team === 1) onM8Change(m8Score1, m8Score2, Math.max(0, pk1 + delta), pk2);
      else onM8Change(m8Score1, m8Score2, pk1, Math.max(0, pk2 + delta));
    }
  };

  return (
    <div className="bg-[#161b22] border border-[#30363d] rounded-xl p-5 shadow-lg space-y-6">
      <div className="flex items-center justify-between border-b border-[#30363d] pb-3">
        <div>
          <h2 className="font-heading text-lg font-bold text-[#ffb700] tracking-wide uppercase flex items-center gap-2">
            Stepladder Playoffs & Final
            <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-[#ffb700]/10 text-[#ffb700] border border-[#ffb700]/30 lowercase">
              stage 2
            </span>
          </h2>
          <p className="text-xs text-[#8b949e]">
            Single-elimination stepladder climb to the championship
          </p>
        </div>
      </div>

      {/* Stepladder Visual Map */}
      <div className="bg-[#0b0e14]/80 border border-[#30363d] rounded-lg p-3 sm:p-4 text-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-center sm:text-left">
          {/* Step 1 */}
          <div className="flex items-center gap-2 sm:flex-1">
            <span className="w-5 h-5 rounded-full bg-[#00e5ff]/20 text-[#00e5ff] font-bold text-[10px] flex items-center justify-center">
              1
            </span>
            <div>
              <p className="text-[10px] text-[#8b949e] uppercase tracking-wider font-semibold">
                Semi-Final Playoff
              </p>
              <p className="font-semibold text-[#f0f6fc] truncate">
                {p2} vs {p3}
              </p>
            </div>
          </div>

          <ChevronRight className="w-4 h-4 text-[#8b949e] hidden sm:block self-center shrink-0" />

          {/* Step 2 */}
          <div className="flex items-center gap-2 sm:flex-1">
            <span className="w-5 h-5 rounded-full bg-[#ffb700]/20 text-[#ffb700] font-bold text-[10px] flex items-center justify-center">
              2
            </span>
            <div>
              <p className="text-[10px] text-[#8b949e] uppercase tracking-wider font-semibold">
                Grand Final
              </p>
              <p className="font-semibold text-[#f0f6fc] truncate">
                {p1} vs {m7Winner || 'Winner M7'}
              </p>
            </div>
          </div>

          <ChevronRight className="w-4 h-4 text-[#8b949e] hidden sm:block self-center shrink-0" />

          {/* Crown */}
          <div className="flex items-center gap-2 sm:flex-1">
            <span className="w-5 h-5 rounded-full bg-[#ffb700] text-black font-bold text-[10px] flex items-center justify-center">
              🏆
            </span>
            <div>
              <p className="text-[10px] text-[#8b949e] uppercase tracking-wider font-semibold">
                Champion
              </p>
              <p className="font-bold text-[#ffb700] truncate">
                {champion || 'To Be Decided'}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* MATCH 7: SEMI-FINAL PLAYOFF */}
      <div className="bg-[#12161f] border border-[#30363d] rounded-xl p-4 relative">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <Zap className="w-4 h-4 text-[#00e5ff]" />
            <span className="text-xs font-bold uppercase tracking-wider text-[#00e5ff]">
              Match 7 • Semi-Final Playoff
            </span>
          </div>
          {m7Winner && (
            <span className="inline-flex items-center gap-1 text-[11px] font-bold text-[#00e676] bg-[#00e676]/10 px-2 py-0.5 rounded border border-[#00e676]/30">
              <CheckCircle2 className="w-3 h-3" />
              {m7Winner} Advances
            </span>
          )}
        </div>

        <div className="flex items-center justify-between gap-3">
          {/* 2nd Place */}
          <div className="flex-1 text-right">
            <div className="text-[10px] uppercase font-bold text-[#8b949e] tracking-wider">
              2nd Place
            </div>
            <div
              id="p7-t1"
              className={`text-sm sm:text-base font-bold truncate ${
                m7Winner === p2
                  ? 'text-[#00e5ff]'
                  : m7Winner && m7Winner !== p2
                  ? 'text-[#8b949e]'
                  : 'text-[#f0f6fc]'
              }`}
            >
              {p2}
            </div>
          </div>

          {/* Match 7 Score Inputs */}
          <div className="flex items-center gap-1.5 sm:gap-2">
            <div className="flex items-center gap-1">
              <button
                type="button"
                onClick={() => adjustScore(7, 1, -1)}
                className="w-6 h-6 rounded bg-[#0b0e14] hover:bg-[#21262d] text-[#8b949e] hover:text-[#f0f6fc] border border-[#30363d] flex items-center justify-center transition-colors text-xs active:scale-90"
              >
                <Minus className="w-3 h-3" />
              </button>
              <input
                id="m7-s1"
                type="number"
                min="0"
                placeholder="-"
                value={m7Score1 === null ? '' : m7Score1}
                onChange={(e) => handleScore(7, 1, e.target.value)}
                className="w-10 h-9 text-center text-base font-bold bg-[#0b0e14] border border-[#30363d] focus:border-[#00e5ff] focus:outline-none rounded-md text-[#f0f6fc]"
              />
              <button
                type="button"
                onClick={() => adjustScore(7, 1, 1)}
                className="w-6 h-6 rounded bg-[#0b0e14] hover:bg-[#21262d] text-[#8b949e] hover:text-[#00e5ff] border border-[#30363d] flex items-center justify-center transition-colors text-xs active:scale-90"
              >
                <Plus className="w-3 h-3" />
              </button>
            </div>

            <span className="text-[#8b949e] font-bold text-sm px-1">-</span>

            <div className="flex items-center gap-1">
              <input
                id="m7-s2"
                type="number"
                min="0"
                placeholder="-"
                value={m7Score2 === null ? '' : m7Score2}
                onChange={(e) => handleScore(7, 2, e.target.value)}
                className="w-10 h-9 text-center text-base font-bold bg-[#0b0e14] border border-[#30363d] focus:border-[#00e5ff] focus:outline-none rounded-md text-[#f0f6fc]"
              />
              <button
                type="button"
                onClick={() => adjustScore(7, 2, -1)}
                className="w-6 h-6 rounded bg-[#0b0e14] hover:bg-[#21262d] text-[#8b949e] hover:text-[#f0f6fc] border border-[#30363d] flex items-center justify-center transition-colors text-xs active:scale-90"
              >
                <Minus className="w-3 h-3" />
              </button>
              <button
                type="button"
                onClick={() => adjustScore(7, 2, 1)}
                className="w-6 h-6 rounded bg-[#0b0e14] hover:bg-[#21262d] text-[#8b949e] hover:text-[#00e5ff] border border-[#30363d] flex items-center justify-center transition-colors text-xs active:scale-90"
              >
                <Plus className="w-3 h-3" />
              </button>
            </div>
          </div>

          {/* 3rd Place */}
          <div className="flex-1 text-left">
            <div className="text-[10px] uppercase font-bold text-[#8b949e] tracking-wider">
              3rd Place
            </div>
            <div
              id="p7-t2"
              className={`text-sm sm:text-base font-bold truncate ${
                m7Winner === p3
                  ? 'text-[#00e5ff]'
                  : m7Winner && m7Winner !== p3
                  ? 'text-[#8b949e]'
                  : 'text-[#f0f6fc]'
              }`}
            >
              {p3}
            </div>
          </div>
        </div>

        {/* Penalty Shootout section if tied */}
        {m7IsTied && (
          <div className="mt-3 pt-3 border-t border-[#30363d] bg-[#ffb700]/5 rounded-lg p-2.5">
            <div className="flex items-center justify-center gap-1.5 text-xs text-[#ffb700] font-semibold mb-2">
              <ShieldAlert className="w-3.5 h-3.5" />
              <span>Full-Time Draw! Enter Penalty Shootout (PK) score:</span>
            </div>
            <div className="flex items-center justify-center gap-4">
              <span className="text-xs text-[#8b949e]">{p2} PK</span>
              <div className="flex items-center gap-1">
                <button
                  type="button"
                  onClick={() => adjustPk(7, 1, -1)}
                  className="w-5 h-5 rounded bg-[#0b0e14] border border-[#30363d] text-xs flex items-center justify-center"
                >
                  <Minus className="w-2.5 h-2.5" />
                </button>
                <input
                  type="number"
                  min="0"
                  value={m7Pk1 === null ? '' : m7Pk1}
                  onChange={(e) => {
                    const v = e.target.value === '' ? null : parseInt(e.target.value, 10);
                    onM7Change(m7Score1, m7Score2, isNaN(v as number) ? null : v, m7Pk2);
                  }}
                  className="w-8 h-7 text-center font-bold text-xs bg-[#0b0e14] border border-[#ffb700]/50 rounded text-[#ffb700]"
                />
                <button
                  type="button"
                  onClick={() => adjustPk(7, 1, 1)}
                  className="w-5 h-5 rounded bg-[#0b0e14] border border-[#30363d] text-xs flex items-center justify-center"
                >
                  <Plus className="w-2.5 h-2.5" />
                </button>
              </div>

              <span className="text-xs font-bold text-[#8b949e]">-</span>

              <div className="flex items-center gap-1">
                <input
                  type="number"
                  min="0"
                  value={m7Pk2 === null ? '' : m7Pk2}
                  onChange={(e) => {
                    const v = e.target.value === '' ? null : parseInt(e.target.value, 10);
                    onM7Change(m7Score1, m7Score2, m7Pk1, isNaN(v as number) ? null : v);
                  }}
                  className="w-8 h-7 text-center font-bold text-xs bg-[#0b0e14] border border-[#ffb700]/50 rounded text-[#ffb700]"
                />
                <button
                  type="button"
                  onClick={() => adjustPk(7, 2, -1)}
                  className="w-5 h-5 rounded bg-[#0b0e14] border border-[#30363d] text-xs flex items-center justify-center"
                >
                  <Minus className="w-2.5 h-2.5" />
                </button>
                <button
                  type="button"
                  onClick={() => adjustPk(7, 2, 1)}
                  className="w-5 h-5 rounded bg-[#0b0e14] border border-[#30363d] text-xs flex items-center justify-center"
                >
                  <Plus className="w-2.5 h-2.5" />
                </button>
              </div>
              <span className="text-xs text-[#8b949e]">{p3} PK</span>
            </div>
          </div>
        )}
      </div>

      {/* MATCH 8: GRAND FINAL */}
      <div
        className={`border rounded-xl p-4 relative transition-all ${
          champion
            ? 'bg-gradient-to-b from-[#ffb700]/10 to-[#12161f] border-[#ffb700]/60 shadow-[0_0_25px_rgba(255,183,0,0.15)]'
            : 'bg-[#12161f] border-[#30363d]'
        }`}
      >
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <Trophy className="w-4 h-4 text-[#ffb700]" />
            <span className="text-xs font-bold uppercase tracking-wider text-[#ffb700]">
              Match 8 • Grand Final
            </span>
          </div>
          {champion ? (
            <span className="inline-flex items-center gap-1 text-[11px] font-black text-black bg-[#ffb700] px-2.5 py-0.5 rounded shadow-[0_0_10px_rgba(255,183,0,0.5)]">
              🏆 {champion} Champions!
            </span>
          ) : (
            <span className="text-[11px] font-medium text-[#8b949e]">
              Championship Decider
            </span>
          )}
        </div>

        <div className="flex items-center justify-between gap-3">
          {/* 1st Place (Ladder Seed) */}
          <div className="flex-1 text-right">
            <div className="text-[10px] uppercase font-bold text-[#ffb700] tracking-wider">
              1st Place (Top Seed)
            </div>
            <div
              id="p8-t1"
              className={`text-sm sm:text-base font-bold truncate ${
                champion === p1
                  ? 'text-[#ffb700]'
                  : champion && champion !== p1
                  ? 'text-[#8b949e]'
                  : 'text-[#f0f6fc]'
              }`}
            >
              {p1}
            </div>
          </div>

          {/* Match 8 Score Inputs */}
          <div className="flex items-center gap-1.5 sm:gap-2">
            <div className="flex items-center gap-1">
              <button
                type="button"
                onClick={() => adjustScore(8, 1, -1)}
                className="w-6 h-6 rounded bg-[#0b0e14] hover:bg-[#21262d] text-[#8b949e] hover:text-[#f0f6fc] border border-[#30363d] flex items-center justify-center transition-colors text-xs active:scale-90"
              >
                <Minus className="w-3 h-3" />
              </button>
              <input
                id="m8-s1"
                type="number"
                min="0"
                placeholder="-"
                value={m8Score1 === null ? '' : m8Score1}
                onChange={(e) => handleScore(8, 1, e.target.value)}
                className="w-10 h-9 text-center text-base font-bold bg-[#0b0e14] border border-[#30363d] focus:border-[#ffb700] focus:outline-none rounded-md text-[#f0f6fc]"
              />
              <button
                type="button"
                onClick={() => adjustScore(8, 1, 1)}
                className="w-6 h-6 rounded bg-[#0b0e14] hover:bg-[#21262d] text-[#8b949e] hover:text-[#ffb700] border border-[#30363d] flex items-center justify-center transition-colors text-xs active:scale-90"
              >
                <Plus className="w-3 h-3" />
              </button>
            </div>

            <span className="text-[#8b949e] font-bold text-sm px-1">-</span>

            <div className="flex items-center gap-1">
              <input
                id="m8-s2"
                type="number"
                min="0"
                placeholder="-"
                value={m8Score2 === null ? '' : m8Score2}
                onChange={(e) => handleScore(8, 2, e.target.value)}
                className="w-10 h-9 text-center text-base font-bold bg-[#0b0e14] border border-[#30363d] focus:border-[#ffb700] focus:outline-none rounded-md text-[#f0f6fc]"
              />
              <button
                type="button"
                onClick={() => adjustScore(8, 2, -1)}
                className="w-6 h-6 rounded bg-[#0b0e14] hover:bg-[#21262d] text-[#8b949e] hover:text-[#f0f6fc] border border-[#30363d] flex items-center justify-center transition-colors text-xs active:scale-90"
              >
                <Minus className="w-3 h-3" />
              </button>
              <button
                type="button"
                onClick={() => adjustScore(8, 2, 1)}
                className="w-6 h-6 rounded bg-[#0b0e14] hover:bg-[#21262d] text-[#8b949e] hover:text-[#ffb700] border border-[#30363d] flex items-center justify-center transition-colors text-xs active:scale-90"
              >
                <Plus className="w-3 h-3" />
              </button>
            </div>
          </div>

          {/* Winner Match 7 */}
          <div className="flex-1 text-left">
            <div className="text-[10px] uppercase font-bold text-[#00e5ff] tracking-wider">
              Playoff Winner
            </div>
            <div
              id="p8-t2"
              className={`text-sm sm:text-base font-bold truncate ${
                m7Winner
                  ? champion === m7Winner
                    ? 'text-[#ffb700]'
                    : champion
                    ? 'text-[#8b949e]'
                    : 'text-[#f0f6fc]'
                  : 'text-[#8b949e] italic'
              }`}
            >
              {m7Winner || 'Winner M7'}
            </div>
          </div>
        </div>

        {/* Penalty Shootout section for Final if tied */}
        {m8IsTied && (
          <div className="mt-3 pt-3 border-t border-[#30363d] bg-[#ffb700]/5 rounded-lg p-2.5">
            <div className="flex items-center justify-center gap-1.5 text-xs text-[#ffb700] font-semibold mb-2">
              <ShieldAlert className="w-3.5 h-3.5" />
              <span>Grand Final Tied! Enter Penalty Shootout (PK) score:</span>
            </div>
            <div className="flex items-center justify-center gap-4">
              <span className="text-xs text-[#8b949e]">{p1} PK</span>
              <div className="flex items-center gap-1">
                <button
                  type="button"
                  onClick={() => adjustPk(8, 1, -1)}
                  className="w-5 h-5 rounded bg-[#0b0e14] border border-[#30363d] text-xs flex items-center justify-center"
                >
                  <Minus className="w-2.5 h-2.5" />
                </button>
                <input
                  type="number"
                  min="0"
                  value={m8Pk1 === null ? '' : m8Pk1}
                  onChange={(e) => {
                    const v = e.target.value === '' ? null : parseInt(e.target.value, 10);
                    onM8Change(m8Score1, m8Score2, isNaN(v as number) ? null : v, m8Pk2);
                  }}
                  className="w-8 h-7 text-center font-bold text-xs bg-[#0b0e14] border border-[#ffb700]/50 rounded text-[#ffb700]"
                />
                <button
                  type="button"
                  onClick={() => adjustPk(8, 1, 1)}
                  className="w-5 h-5 rounded bg-[#0b0e14] border border-[#30363d] text-xs flex items-center justify-center"
                >
                  <Plus className="w-2.5 h-2.5" />
                </button>
              </div>

              <span className="text-xs font-bold text-[#8b949e]">-</span>

              <div className="flex items-center gap-1">
                <input
                  type="number"
                  min="0"
                  value={m8Pk2 === null ? '' : m8Pk2}
                  onChange={(e) => {
                    const v = e.target.value === '' ? null : parseInt(e.target.value, 10);
                    onM8Change(m8Score1, m8Score2, m8Pk1, isNaN(v as number) ? null : v);
                  }}
                  className="w-8 h-7 text-center font-bold text-xs bg-[#0b0e14] border border-[#ffb700]/50 rounded text-[#ffb700]"
                />
                <button
                  type="button"
                  onClick={() => adjustPk(8, 2, -1)}
                  className="w-5 h-5 rounded bg-[#0b0e14] border border-[#30363d] text-xs flex items-center justify-center"
                >
                  <Minus className="w-2.5 h-2.5" />
                </button>
                <button
                  type="button"
                  onClick={() => adjustPk(8, 2, 1)}
                  className="w-5 h-5 rounded bg-[#0b0e14] border border-[#30363d] text-xs flex items-center justify-center"
                >
                  <Plus className="w-2.5 h-2.5" />
                </button>
              </div>
              <span className="text-xs text-[#8b949e]">{m7Winner} PK</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
