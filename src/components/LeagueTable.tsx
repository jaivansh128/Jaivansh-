import React from 'react';
import { PlayerStats } from '../types';
import { Award, Zap, XCircle } from 'lucide-react';

interface LeagueTableProps {
  standings: PlayerStats[];
}

export const LeagueTable: React.FC<LeagueTableProps> = ({ standings }) => {
  return (
    <div className="bg-[#161b22] border border-[#30363d] rounded-xl overflow-hidden shadow-lg">
      <div className="px-5 py-4 border-b border-[#30363d] flex items-center justify-between">
        <div>
          <h2 className="font-heading text-lg font-bold text-[#00e5ff] tracking-wide uppercase flex items-center gap-2">
            League Table
            <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-[#00e5ff]/10 text-[#00e5ff] border border-[#00e5ff]/30 lowercase">
              stage 1
            </span>
          </h2>
          <p className="text-xs text-[#8b949e]">
            Top 3 advance to Stage 2 Stepladder Knockouts
          </p>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm border-collapse">
          <thead>
            <tr className="border-b border-[#30363d] bg-[#0d1117] text-[#8b949e] text-xs font-semibold uppercase tracking-wider">
              <th className="py-3 px-3 text-center w-12">#</th>
              <th className="py-3 px-4">Player</th>
              <th className="py-3 px-2 text-center" title="Played">P</th>
              <th className="py-3 px-2 text-center" title="Won">W</th>
              <th className="py-3 px-2 text-center" title="Drawn">D</th>
              <th className="py-3 px-2 text-center" title="Lost">L</th>
              <th className="py-3 px-2 text-center" title="Goal Difference">GD</th>
              <th className="py-3 px-3 text-center text-[#f0f6fc]" title="Points">Pts</th>
              <th className="py-3 px-3 text-center hidden sm:table-cell" title="Last Matches">Form</th>
            </tr>
          </thead>
          <tbody id="standings-body" className="divide-y divide-[#30363d]">
            {standings.map((player, index) => {
              const rank = index + 1;
              const isFirst = rank === 1;
              const isPlayoff = rank === 2 || rank === 3;
              const isEliminated = rank === 4;

              return (
                <tr
                  key={player.id}
                  className={`rank-${rank} transition-colors hover:bg-[#21262d]/50 ${
                    isFirst
                      ? 'bg-[#ffb700]/5 font-medium'
                      : isPlayoff
                      ? 'bg-[#00e5ff]/5'
                      : ''
                  }`}
                >
                  {/* Rank */}
                  <td className="py-3.5 px-3 text-center">
                    <span
                      className={`inline-flex items-center justify-center w-6 h-6 rounded-md text-xs font-black ${
                        isFirst
                          ? 'bg-[#ffb700] text-black shadow-[0_0_10px_rgba(255,183,0,0.4)]'
                          : isPlayoff
                          ? 'bg-[#00e5ff]/20 text-[#00e5ff] border border-[#00e5ff]/40'
                          : 'text-[#8b949e] border border-[#30363d]'
                      }`}
                    >
                      {rank}
                    </span>
                  </td>

                  {/* Player Name & Badge */}
                  <td className="py-3.5 px-4">
                    <div className="flex flex-col sm:flex-row sm:items-center gap-1.5 sm:gap-2">
                      <span
                        className={`font-semibold tracking-wide ${
                          isFirst
                            ? 'text-[#ffb700]'
                            : isEliminated
                            ? 'text-[#8b949e] line-through'
                            : 'text-[#f0f6fc]'
                        }`}
                      >
                        {player.name}
                      </span>

                      {/* Qualification Badge */}
                      {isFirst && (
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[11px] font-bold bg-[#ffb700] text-black w-fit">
                          <Award className="w-3 h-3" />
                          Final
                        </span>
                      )}
                      {isPlayoff && (
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[11px] font-bold bg-[#00e5ff]/20 text-[#00e5ff] border border-[#00e5ff]/40 w-fit">
                          <Zap className="w-3 h-3" />
                          Playoff
                        </span>
                      )}
                      {isEliminated && (
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[11px] font-semibold bg-[#ff4d4d]/15 text-[#ff6b6b] border border-[#ff4d4d]/30 w-fit">
                          <XCircle className="w-3 h-3" />
                          Eliminated
                        </span>
                      )}
                    </div>
                  </td>

                  {/* Stats */}
                  <td className="py-3.5 px-2 text-center text-[#8b949e]">
                    {player.played}
                  </td>
                  <td className="py-3.5 px-2 text-center text-[#8b949e]">
                    {player.won}
                  </td>
                  <td className="py-3.5 px-2 text-center text-[#8b949e]">
                    {player.drawn}
                  </td>
                  <td className="py-3.5 px-2 text-center text-[#8b949e]">
                    {player.lost}
                  </td>
                  <td
                    className={`py-3.5 px-2 text-center font-mono font-medium ${
                      player.gd > 0
                        ? 'text-[#00e676]'
                        : player.gd < 0
                        ? 'text-[#ff6b6b]'
                        : 'text-[#8b949e]'
                    }`}
                  >
                    {player.gd > 0 ? `+${player.gd}` : player.gd}
                  </td>
                  <td className="py-3.5 px-3 text-center font-bold text-base text-[#f0f6fc]">
                    {player.pts}
                  </td>

                  {/* Form */}
                  <td className="py-3.5 px-3 text-center hidden sm:table-cell">
                    <div className="flex items-center justify-center gap-1">
                      {player.form.length === 0 ? (
                        <span className="text-xs text-[#8b949e]">-</span>
                      ) : (
                        player.form.map((res, i) => (
                          <span
                            key={i}
                            className={`w-4 h-4 rounded text-[9px] font-black flex items-center justify-center uppercase ${
                              res === 'W'
                                ? 'bg-[#00e676] text-black'
                                : res === 'D'
                                ? 'bg-[#ffb700] text-black'
                                : 'bg-[#ff4d4d] text-white'
                            }`}
                          >
                            {res}
                          </span>
                        ))
                      )}
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Seeding Legend */}
      <div className="p-3 bg-[#0d1117] border-t border-[#30363d] text-[11px] text-[#8b949e] flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-sm bg-[#ffb700]" />
            <span>1st: Byes to Grand Final</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-sm bg-[#00e5ff]" />
            <span>2nd & 3rd: Semi-Final Playoff</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-sm bg-[#ff4d4d]" />
            <span>4th: Eliminated</span>
          </div>
        </div>
        <span>Win: 3pts • Draw: 1pt • Loss: 0pts</span>
      </div>
    </div>
  );
};
