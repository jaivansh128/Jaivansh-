import React from 'react';
import { X, Trophy, Zap, Award, CheckCircle2 } from 'lucide-react';

interface RulesModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const RulesModal: React.FC<RulesModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-[#161b22] border border-[#30363d] rounded-2xl w-full max-w-lg p-6 shadow-2xl relative text-left">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-[#8b949e] hover:text-[#f0f6fc] p-1 rounded-lg"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-3 mb-5">
          <div className="w-10 h-10 rounded-xl bg-[#ffb700]/10 text-[#ffb700] border border-[#ffb700]/30 flex items-center justify-center">
            <Trophy className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-heading text-lg font-bold text-[#f0f6fc]">
              Stepladder Tournament Format
            </h3>
            <p className="text-xs text-[#8b949e]">
              How the league and stepladder playoff ladder works
            </p>
          </div>
        </div>

        <div className="space-y-4 text-xs sm:text-sm text-[#8b949e] leading-relaxed">
          {/* Stage 1 */}
          <div className="p-3 rounded-xl bg-[#0b0e14] border border-[#30363d]">
            <h4 className="font-bold text-[#00e5ff] text-sm mb-1 flex items-center gap-1.5">
              <span className="w-5 h-5 rounded bg-[#00e5ff]/20 text-[#00e5ff] inline-flex items-center justify-center text-xs">
                1
              </span>
              Stage 1: Round-Robin League (6 Games)
            </h4>
            <p className="mt-1 text-xs">
              Every player faces each other once (3 games per player). Points are awarded:
            </p>
            <div className="grid grid-cols-3 gap-2 mt-2 text-center text-[11px] font-semibold">
              <div className="p-1.5 rounded bg-[#161b22] border border-[#30363d] text-[#00e676]">
                Win: 3 Pts
              </div>
              <div className="p-1.5 rounded bg-[#161b22] border border-[#30363d] text-[#ffb700]">
                Draw: 1 Pt
              </div>
              <div className="p-1.5 rounded bg-[#161b22] border border-[#30363d] text-[#ff4d4d]">
                Loss: 0 Pts
              </div>
            </div>
            <p className="mt-2 text-[11px] text-[#8b949e]">
              Tiebreakers: Points &gt; Goal Difference (GD) &gt; Goals Scored (GF)
            </p>
          </div>

          {/* Stage 2 */}
          <div className="p-3 rounded-xl bg-[#0b0e14] border border-[#30363d]">
            <h4 className="font-bold text-[#ffb700] text-sm mb-1 flex items-center gap-1.5">
              <span className="w-5 h-5 rounded bg-[#ffb700]/20 text-[#ffb700] inline-flex items-center justify-center text-xs">
                2
              </span>
              Stage 2: Stepladder Playoff & Grand Final
            </h4>
            <ul className="space-y-2 mt-2 text-xs">
              <li className="flex items-start gap-2">
                <Zap className="w-4 h-4 text-[#00e5ff] shrink-0 mt-0.5" />
                <div>
                  <strong className="text-[#f0f6fc]">Match 7 (Semi-Final Playoff):</strong>{' '}
                  Rank 2 plays against Rank 3. The loser is eliminated in 3rd place.
                </div>
              </li>
              <li className="flex items-start gap-2">
                <Award className="w-4 h-4 text-[#ffb700] shrink-0 mt-0.5" />
                <div>
                  <strong className="text-[#f0f6fc]">Match 8 (Grand Final):</strong>{' '}
                  Rank 1 receives the top stepladder seed and waits in the Grand Final for the Winner of Match 7.
                </div>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#00e676] shrink-0 mt-0.5" />
                <div>
                  <strong className="text-[#f0f6fc]">Penalty Shootouts:</strong>{' '}
                  If Match 7 or Match 8 ends in a draw at full time, penalty shootouts decide the winner!
                </div>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-5 pt-3 border-t border-[#30363d] flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 text-xs font-bold bg-[#161b22] border border-[#30363d] hover:border-[#00e5ff] text-[#f0f6fc] rounded-lg transition-all"
          >
            Got it
          </button>
        </div>
      </div>
    </div>
  );
};
