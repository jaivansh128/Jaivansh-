import React from 'react';
import { Minus, Plus, X } from 'lucide-react';

interface MatchCardProps {
  id: number;
  matchNumber: number;
  p1Name: string;
  p2Name: string;
  p1Score: number | null;
  p2Score: number | null;
  onScoreChange: (mId: number, p1Score: number | null, p2Score: number | null) => void;
}

export const MatchCard: React.FC<MatchCardProps> = ({
  id,
  matchNumber,
  p1Name,
  p2Name,
  p1Score,
  p2Score,
  onScoreChange,
}) => {
  const isPlayed = p1Score !== null && p2Score !== null && !isNaN(p1Score) && !isNaN(p2Score);
  const p1Won = isPlayed && p1Score > p2Score;
  const p2Won = isPlayed && p2Score > p1Score;
  const isDraw = isPlayed && p1Score === p2Score;

  const handleP1Input = (val: string) => {
    if (val === '') {
      onScoreChange(id, null, p2Score);
    } else {
      const num = Math.max(0, parseInt(val, 10));
      onScoreChange(id, isNaN(num) ? null : num, p2Score);
    }
  };

  const handleP2Input = (val: string) => {
    if (val === '') {
      onScoreChange(id, p1Score, null);
    } else {
      const num = Math.max(0, parseInt(val, 10));
      onScoreChange(id, p1Score, isNaN(num) ? null : num);
    }
  };

  const adjustP1 = (delta: number) => {
    const current = p1Score === null ? 0 : p1Score;
    const next = Math.max(0, current + delta);
    onScoreChange(id, next, p2Score === null ? 0 : p2Score);
  };

  const adjustP2 = (delta: number) => {
    const current = p2Score === null ? 0 : p2Score;
    const next = Math.max(0, current + delta);
    onScoreChange(id, p1Score === null ? 0 : p1Score, next);
  };

  const clearMatch = () => {
    onScoreChange(id, null, null);
  };

  return (
    <div
      className={`group relative rounded-xl p-3 sm:p-3.5 transition-all border ${
        isPlayed
          ? 'bg-[#161b22] border-[#30363d] hover:border-[#00e5ff]/50 shadow-sm'
          : 'bg-[#12161f]/60 border-[#30363d]/60 hover:border-[#30363d]'
      }`}
    >
      <div className="flex items-center justify-between text-[11px] text-[#8b949e] mb-2 px-1">
        <span className="font-semibold text-xs text-[#00e5ff]">
          Match {matchNumber}
        </span>
        <div className="flex items-center gap-2">
          {isPlayed && (
            <span
              className={`px-1.5 py-0.5 rounded text-[10px] font-bold ${
                isDraw
                  ? 'bg-[#ffb700]/20 text-[#ffb700]'
                  : 'bg-[#00e676]/20 text-[#00e676]'
              }`}
            >
              {isDraw ? 'DRAW' : 'FT'}
            </span>
          )}
          {isPlayed && (
            <button
              onClick={clearMatch}
              className="opacity-0 group-hover:opacity-100 text-[#8b949e] hover:text-[#ff4d4d] transition-opacity p-0.5"
              title="Clear match score"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      </div>

      <div className="flex items-center justify-between gap-2 sm:gap-4">
        {/* Player 1 */}
        <div
          className={`flex-1 text-right truncate text-sm font-semibold transition-colors ${
            p1Won
              ? 'text-[#00e5ff] font-bold'
              : isPlayed && !isDraw
              ? 'text-[#8b949e]'
              : 'text-[#f0f6fc]'
          }`}
          title={p1Name}
        >
          {p1Name}
        </div>

        {/* Score Steppers */}
        <div className="flex items-center gap-1.5 sm:gap-2">
          {/* P1 Input & Stepper */}
          <div className="flex items-center gap-1">
            <button
              type="button"
              onClick={() => adjustP1(-1)}
              className="w-6 h-6 rounded bg-[#0b0e14] hover:bg-[#21262d] text-[#8b949e] hover:text-[#f0f6fc] border border-[#30363d] flex items-center justify-center transition-colors text-xs active:scale-90"
              title="Decrease goal"
            >
              <Minus className="w-3 h-3" />
            </button>
            <input
              id={`m${id}-s1`}
              type="number"
              min="0"
              placeholder="-"
              value={p1Score === null ? '' : p1Score}
              onChange={(e) => handleP1Input(e.target.value)}
              className="w-9 h-8 text-center text-sm font-bold bg-[#0b0e14] border border-[#30363d] focus:border-[#00e5ff] focus:outline-none rounded-md text-[#f0f6fc] transition-colors"
            />
            <button
              type="button"
              onClick={() => adjustP1(1)}
              className="w-6 h-6 rounded bg-[#0b0e14] hover:bg-[#21262d] text-[#8b949e] hover:text-[#00e5ff] border border-[#30363d] flex items-center justify-center transition-colors text-xs active:scale-90"
              title="Increase goal"
            >
              <Plus className="w-3 h-3" />
            </button>
          </div>

          <span className="text-[#8b949e] font-bold text-xs px-0.5">:</span>

          {/* P2 Input & Stepper */}
          <div className="flex items-center gap-1">
            <input
              id={`m${id}-s2`}
              type="number"
              min="0"
              placeholder="-"
              value={p2Score === null ? '' : p2Score}
              onChange={(e) => handleP2Input(e.target.value)}
              className="w-9 h-8 text-center text-sm font-bold bg-[#0b0e14] border border-[#30363d] focus:border-[#00e5ff] focus:outline-none rounded-md text-[#f0f6fc] transition-colors"
            />
            <button
              type="button"
              onClick={() => adjustP2(-1)}
              className="w-6 h-6 rounded bg-[#0b0e14] hover:bg-[#21262d] text-[#8b949e] hover:text-[#f0f6fc] border border-[#30363d] flex items-center justify-center transition-colors text-xs active:scale-90"
              title="Decrease goal"
            >
              <Minus className="w-3 h-3" />
            </button>
            <button
              type="button"
              onClick={() => adjustP2(1)}
              className="w-6 h-6 rounded bg-[#0b0e14] hover:bg-[#21262d] text-[#8b949e] hover:text-[#00e5ff] border border-[#30363d] flex items-center justify-center transition-colors text-xs active:scale-90"
              title="Increase goal"
            >
              <Plus className="w-3 h-3" />
            </button>
          </div>
        </div>

        {/* Player 2 */}
        <div
          className={`flex-1 text-left truncate text-sm font-semibold transition-colors ${
            p2Won
              ? 'text-[#00e5ff] font-bold'
              : isPlayed && !isDraw
              ? 'text-[#8b949e]'
              : 'text-[#f0f6fc]'
          }`}
          title={p2Name}
        >
          {p2Name}
        </div>
      </div>
    </div>
  );
};
