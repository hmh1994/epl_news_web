import { PlayerDatabaseEntry } from "@/entities/player/model/player-database-entry";
import { StatAccent, getStatStyles } from "@/entities/player/lib/stat-palette";
import { X } from "lucide-react";
import { TEAMS_BY_ID } from "@/shared/mocks/data/teams";

interface PlayerDetailProps {
  player: PlayerDatabaseEntry | null;
  onClose: () => void;
}

export const PlayerDetail = ({ player, onClose }: PlayerDetailProps) => {
  if (!player) return null;

  const team = TEAMS_BY_ID[player.teamId];

  return (
    <div
      className='fixed inset-0 z-50 flex items-center justify-center p-6 bg-black/80 backdrop-blur-sm'
      onClick={onClose}
    >
      <div
        className='bg-slate-900/95 backdrop-blur-3xl rounded-3xl border border-white/10 shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto'
        onClick={(event) => event.stopPropagation()}
      >
        <div className='flex items-center justify-between px-8 py-6 border-b border-white/10'>
          <div>
            <h3 className='text-2xl font-bold text-white'>{player.name}</h3>
            <p className='text-slate-400 text-sm'>
              {(team?.name ?? player.teamId.toUpperCase())} • {player.position}
            </p>
          </div>
          <button
            type='button'
            onClick={onClose}
            className='w-10 h-10 rounded-2xl bg-slate-800/60 border border-white/10 flex items-center justify-center text-slate-300 hover:text-white'
          >
            <X className='w-5 h-5' />
          </button>
        </div>

        <div className='grid grid-cols-1 lg:grid-cols-3 gap-8 px-8 py-6'>
          <div className='lg:col-span-1 space-y-6'>
            <div className='bg-slate-800/40 rounded-3xl p-6 border border-white/10 text-center'>
              <div className='w-20 h-20 mx-auto mb-4 bg-gradient-to-br from-[#169976] to-teal-500 rounded-3xl flex items-center justify-center text-4xl shadow-xl'>
                {player.photo}
              </div>
              <div className='space-y-2 text-sm text-slate-300'>
                <div>
                  <span className='text-slate-400'>Nationality:</span>
                  <span className='ml-2 text-white'>{player.nationality}</span>
                </div>
                <div>
                  <span className='text-slate-400'>Age:</span>
                  <span className='ml-2 text-white'>{player.age}</span>
                </div>
                <div>
                  <span className='text-slate-400'>Height:</span>
                  <span className='ml-2 text-white'>{player.height} cm</span>
                </div>
                <div>
                  <span className='text-slate-400'>Weight:</span>
                  <span className='ml-2 text-white'>{player.weight} kg</span>
                </div>
              </div>
            </div>

            <div className='bg-slate-800/40 rounded-3xl p-6 border border-white/10'>
              <h4 className='text-white font-bold mb-4'>Performance</h4>
              <div className='grid grid-cols-2 gap-3 text-center'>
                <div>
                  <div className='text-2xl font-black text-green-400'>
                    {player.goals}
                  </div>
                  <div className='text-xs text-slate-400'>Goals</div>
                </div>
                <div>
                  <div className='text-2xl font-black text-teal-400'>
                    {player.assists}
                  </div>
                  <div className='text-xs text-slate-400'>Assists</div>
                </div>
                <div>
                  <div className='text-2xl font-black text-yellow-400'>
                    {player.rating}
                  </div>
                  <div className='text-xs text-slate-400'>Rating</div>
                </div>
                <div>
                  <div className='text-2xl font-black text-emerald-400'>
                    {player.stats.pace}
                  </div>
                  <div className='text-xs text-slate-400'>Pace</div>
                </div>
              </div>
            </div>
          </div>

          <div className='lg:col-span-2 space-y-8'>
            <div className='bg-slate-800/40 rounded-3xl p-6 border border-white/10'>
              <h4 className='text-white font-bold mb-6'>Player Attributes</h4>
              <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                {Object.entries(player.stats).map(([key, value]) => {
                  const styles = getStatStyles(
                    (key === "pace"
                      ? "green"
                      : key === "dribbling"
                      ? "emerald"
                      : key === "passing"
                      ? "teal"
                      : "yellow") as StatAccent
                  );
                  return (
                    <div key={key} className='space-y-2'>
                      <div className='flex items-center justify-between text-sm text-slate-300'>
                        <span className='capitalize'>{key}</span>
                        <span className='font-semibold text-white'>{value}</span>
                      </div>
                      <div className={`w-full h-2 rounded-full ${styles.bg} border ${styles.border}`}>
                        <div
                          className={`h-2 rounded-full ${styles.text.replace("text-", "bg-")}`}
                          style={{ width: `${value}%` }}
                        ></div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className='bg-slate-800/40 rounded-3xl p-6 border border-white/10'>
              <h4 className='text-white font-bold mb-6'>Career History</h4>
              <div className='space-y-4'>
                {player.career.map((period, idx) => {
                  const careerTeam = TEAMS_BY_ID[period.teamId];
                  return (
                    <div
                      key={idx}
                      className='flex items-center space-x-4 p-4 bg-slate-800/30 rounded-2xl border border-white/10'
                    >
                      <div className='w-12 h-12 bg-gradient-to-br from-[#169976] to-teal-500 rounded-xl flex items-center justify-center text-xl shadow-lg'>
                      {careerTeam?.crest ?? "⚽"}
                      </div>
                      <div className='flex-1'>
                        <div className='text-white font-bold text-lg'>
                          {careerTeam?.name ?? period.teamId.toUpperCase()}
                        </div>
                        <div className='text-slate-400 text-sm'>{period.year}</div>
                      </div>
                      <div className='text-right'>
                        <div className='text-white font-bold'>
                          {period.matches} matches
                        </div>
                        <div className='text-green-400 font-semibold'>
                          {period.goals} goals
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
