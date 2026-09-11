import React, { useEffect, useState } from 'react';
import { Trophy, Sparkles, Copy, Check, Share2 } from 'lucide-react';
import confetti from 'canvas-confetti';

interface ChampionCardProps {
  championName: string;
  runnerUpName?: string;
  onShareText: () => string;
}

export const ChampionCard: React.FC<ChampionCardProps> = ({
  championName,
  runnerUpName,
  onShareText,
}) => {
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    fireConfetti();
  }, [championName]);

  const fireConfetti = () => {
    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#00e5ff', '#ffb700', '#ffffff', '#00e676'],
      });
    } catch {
      // ignore
    }
  };

  const handleCopy = () => {
    const text = onShareText();
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div
      id="champion-container"
      className="winner-box relative overflow-hidden text-center p-6 sm:p-8 bg-gradient-to-b from-[#ffb700]/20 via-[#161b22] to-[#0b0e14] border-2 border-[#ffb700] rounded-2xl shadow-[0_0_40px_rgba(255,183,0,0.25)] animate-in fade-in duration-500"
    >
      {/* Decorative Glow Background */}
      <div className="absolute -top-16 left-1/2 -translate-x-1/2 w-72 h-72 bg-[#ffb700]/20 blur-3xl rounded-full pointer-events-none" />

      {/* Trophy Badge */}
      <div className="relative z-10 flex flex-col items-center">
        <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-gradient-to-tr from-[#ffb700] to-[#ffd166] flex items-center justify-center text-black mb-3 shadow-[0_0_25px_rgba(255,183,0,0.6)]">
          <Trophy className="w-9 h-9 sm:w-11 sm:h-11 text-black" />
        </div>

        <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-black uppercase tracking-widest bg-[#ffb700] text-black mb-2 shadow-sm">
          <Sparkles className="w-3.5 h-3.5" />
          Tournament Champion
        </span>

        <h3
          id="champion-name"
          className="font-heading text-3xl sm:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-[#ffb700] via-white to-[#00e5ff] uppercase tracking-wide drop-shadow-md my-1"
        >
          {championName}
        </h3>

        {runnerUpName && (
          <p className="text-xs sm:text-sm text-[#8b949e] mt-1 font-medium">
            Runner-Up:{' '}
            <span className="text-[#f0f6fc] font-semibold">{runnerUpName}</span>
          </p>
        )}

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-3 mt-5">
          <button
            onClick={fireConfetti}
            className="flex items-center gap-1.5 px-4 py-2 text-xs font-bold rounded-lg bg-[#ffb700] text-black hover:bg-[#ffc933] transition-all shadow-md active:scale-95 cursor-pointer"
          >
            <Sparkles className="w-3.5 h-3.5" />
            Celebrate!
          </button>

          <button
            onClick={handleCopy}
            className="flex items-center gap-1.5 px-4 py-2 text-xs font-bold rounded-lg bg-[#161b22] border border-[#ffb700]/50 text-[#ffb700] hover:bg-[#ffb700]/10 transition-all shadow-sm active:scale-95 cursor-pointer"
          >
            {copied ? (
              <>
                <Check className="w-3.5 h-3.5 text-[#00e676]" />
                <span>Copied Summary!</span>
              </>
            ) : (
              <>
                <Share2 className="w-3.5 h-3.5" />
                <span>Copy Results</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
