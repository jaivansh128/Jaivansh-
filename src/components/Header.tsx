import React from 'react';
import { Trophy, RotateCcw, Shuffle, Users, Info, Sparkles } from 'lucide-react';

interface HeaderProps {
  completedCount: number;
  totalMatches: number;
  onReset: () => void;
  onQuickFill: () => void;
  onOpenEditPlayers: () => void;
  onOpenRules: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  completedCount,
  totalMatches,
  onReset,
  onQuickFill,
  onOpenEditPlayers,
  onOpenRules,
}) => {
  const percent = Math.round((completedCount / totalMatches) * 100);

  return (
    <header className="mb-8 border-b border-[#30363d] pb-6">
      {/* Top Banner */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-[#00e5ff] to-[#00b4d8] flex items-center justify-center text-black font-heading font-black text-xl shadow-[0_0_20px_rgba(0,229,255,0.4)]">
              FC
            </div>
            <div>
              <h1 className="font-heading text-2xl sm:text-3xl font-extrabold tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-[#00e5ff] via-white to-[#ffb700] uppercase">
                FC Mobile Stepladder League
              </h1>
              <p className="text-xs sm:text-sm text-[#8b949e]">
                4 Players • 6 League Matches • Playoff Semi-Final • Grand Final
              </p>
            </div>
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex flex-wrap items-center gap-2 sm:gap-2.5">
          <button
            onClick={onQuickFill}
            className="flex items-center gap-1.5 px-3 py-2 text-xs font-semibold rounded-lg bg-[#161b22] border border-[#30363d] text-[#f0f6fc] hover:border-[#00e5ff] hover:text-[#00e5ff] transition-all cursor-pointer shadow-sm active:scale-95"
            title="Populate realistic demo scores"
          >
            <Shuffle className="w-3.5 h-3.5 text-[#00e5ff]" />
            <span>Sample Scores</span>
          </button>

          <button
            onClick={onOpenEditPlayers}
            className="flex items-center gap-1.5 px-3 py-2 text-xs font-semibold rounded-lg bg-[#161b22] border border-[#30363d] text-[#f0f6fc] hover:border-[#00e5ff] hover:text-[#00e5ff] transition-all cursor-pointer shadow-sm active:scale-95"
            title="Edit player names"
          >
            <Users className="w-3.5 h-3.5 text-[#8b949e]" />
            <span>Players</span>
          </button>

          <button
            onClick={onOpenRules}
            className="flex items-center gap-1.5 px-3 py-2 text-xs font-semibold rounded-lg bg-[#161b22] border border-[#30363d] text-[#f0f6fc] hover:border-[#8b949e] transition-all cursor-pointer shadow-sm active:scale-95"
            title="View stepladder format rules"
          >
            <Info className="w-3.5 h-3.5 text-[#8b949e]" />
            <span>Rules</span>
          </button>

          <button
            onClick={onReset}
            className="flex items-center gap-1.5 px-3 py-2 text-xs font-semibold rounded-lg bg-[#ff4d4d]/10 border border-[#ff4d4d]/30 text-[#ff6b6b] hover:bg-[#ff4d4d]/20 transition-all cursor-pointer shadow-sm active:scale-95"
            title="Reset all scores"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset</span>
          </button>
        </div>
      </div>

      {/* Progress Track */}
      <div className="mt-4 pt-3 flex items-center justify-between gap-4 text-xs text-[#8b949e]">
        <div className="flex items-center gap-2">
          <span className="inline-block w-2 h-2 rounded-full bg-[#00e5ff] animate-pulse"></span>
          <span>
            Tournament Progress:{' '}
            <strong className="text-[#f0f6fc]">
              {completedCount} of {totalMatches}
            </strong>{' '}
            matches played ({percent}%)
          </span>
        </div>
        <div className="w-32 sm:w-48 h-2 bg-[#161b22] border border-[#30363d] rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-[#00e5ff] to-[#ffb700] transition-all duration-500 rounded-full"
            style={{ width: `${percent}%` }}
          />
        </div>
      </div>
    </header>
  );
};
