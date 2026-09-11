import React, { useState } from 'react';
import { X, Check, RotateCcw, Users } from 'lucide-react';
import { Player } from '../types';
import { DEFAULT_PLAYERS } from '../data/initialData';

interface EditPlayersModalProps {
  isOpen: boolean;
  onClose: () => void;
  players: Player[];
  onSavePlayers: (updated: Player[]) => void;
}

export const EditPlayersModal: React.FC<EditPlayersModalProps> = ({
  isOpen,
  onClose,
  players,
  onSavePlayers,
}) => {
  const [names, setNames] = useState<string[]>(players.map((p) => p.name));

  if (!isOpen) return null;

  const handleChange = (index: number, val: string) => {
    const next = [...names];
    next[index] = val;
    setNames(next);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    const updated = players.map((p, idx) => ({
      ...p,
      name: names[idx]?.trim() || `Player ${idx + 1}`,
    }));
    onSavePlayers(updated);
    onClose();
  };

  const handleResetDefaults = () => {
    setNames(DEFAULT_PLAYERS.map((p) => p.name));
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-[#161b22] border border-[#30363d] rounded-2xl w-full max-w-md p-6 shadow-2xl relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-[#8b949e] hover:text-[#f0f6fc] p-1 rounded-lg"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-3 mb-5">
          <div className="w-10 h-10 rounded-xl bg-[#00e5ff]/10 text-[#00e5ff] border border-[#00e5ff]/30 flex items-center justify-center">
            <Users className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-heading text-lg font-bold text-[#f0f6fc]">
              Edit Tournament Players
            </h3>
            <p className="text-xs text-[#8b949e]">
              Customise names for the 4 participants
            </p>
          </div>
        </div>

        <form onSubmit={handleSave} className="space-y-4">
          {names.map((name, idx) => (
            <div key={idx} className="space-y-1">
              <label className="text-xs font-semibold text-[#8b949e] flex items-center justify-between">
                <span>Player {idx + 1}</span>
                <span className="text-[10px] text-[#8b949e]/80">
                  Initial Seed #{idx + 1}
                </span>
              </label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => handleChange(idx, e.target.value)}
                placeholder={`Player ${idx + 1}`}
                className="w-full px-3 py-2 text-sm bg-[#0b0e14] border border-[#30363d] focus:border-[#00e5ff] focus:outline-none rounded-lg text-[#f0f6fc]"
              />
            </div>
          ))}

          <div className="flex items-center justify-between pt-4 border-t border-[#30363d] gap-3">
            <button
              type="button"
              onClick={handleResetDefaults}
              className="flex items-center gap-1.5 px-3 py-2 text-xs font-semibold text-[#8b949e] hover:text-[#f0f6fc] rounded-lg border border-[#30363d] hover:bg-[#21262d] transition-all"
            >
              <RotateCcw className="w-3 h-3" />
              <span>Defaults</span>
            </button>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={onClose}
                className="px-3 py-2 text-xs font-semibold text-[#8b949e] hover:text-[#f0f6fc]"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="flex items-center gap-1.5 px-4 py-2 text-xs font-bold bg-[#00e5ff] text-black hover:bg-[#00c9e0] rounded-lg transition-all"
              >
                <Check className="w-3.5 h-3.5" />
                <span>Save Players</span>
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
