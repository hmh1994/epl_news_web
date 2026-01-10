import { PlayerDatabaseEntry } from "@/entities/player/model/player-database-entry";
import { StatAccent, getStatStyles } from "@/entities/player/lib/stat-palette";
import { X } from "lucide-react";
import { TEAMS_BY_ID } from "@/shared/mocks/data/teams";

interface PlayerDetailProps {
  player: PlayerDatabaseEntry | null;
  onClose?: () => void;
  variant?: "modal" | "page";
}

export const PlayerDetail = ({
  player,
  onClose,
  variant = "modal",
}: PlayerDetailProps) => {
  if (!player) return null;

  const team = TEAMS_BY_ID[player.teamId];
  const showClose = variant === "modal" && Boolean(onClose);
  const overallRating = Math.round(
    (player.stats.pace +
      player.stats.shooting +
      player.stats.passing +
      player.stats.dribbling +
      player.stats.defending +
      player.stats.physical) /
      6
  );
  const goalInvolvements = player.goals + player.assists;
  const bmi =
    player.height > 0
      ? Math.round((player.weight / Math.pow(player.height / 100, 2)) * 10) / 10
      : 0;
  const average = (...values: number[]) =>
    Math.round(values.reduce((sum, value) => sum + value, 0) / values.length);
  const attackIndex = average(
    player.stats.pace,
    player.stats.shooting,
    player.stats.dribbling
  );
  const creativityIndex = average(
    player.stats.passing,
    player.stats.dribbling,
    player.stats.shooting
  );
  const defenseIndex = average(player.stats.defending, player.stats.physical);
  const athleticIndex = average(player.stats.pace, player.stats.physical);
  const technicalIndex = average(
    player.stats.passing,
    player.stats.dribbling,
    player.stats.shooting
  );

  const content = (
    <div className='bg-slate-900/95 backdrop-blur-3xl rounded-3xl border border-white/10 shadow-2xl w-full overflow-hidden'>
      <div className='flex items-center justify-between px-8 py-6 border-b border-white/10'>
        <div>
          <h3 className='text-2xl font-bold text-white'>{player.name}</h3>
          <p className='text-slate-400 text-sm'>
            {team?.name ?? player.teamId.toUpperCase()} • {player.position}
          </p>
        </div>
        {showClose && (
          <button
            type='button'
            onClick={onClose}
            className='w-10 h-10 rounded-2xl bg-slate-800/60 border border-white/10 flex items-center justify-center text-slate-300 hover:text-white'
          >
            <X className='w-5 h-5' />
          </button>
        )}
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
                  {goalInvolvements}
                </div>
                <div className='text-xs text-slate-400'>Goal Involvements</div>
              </div>
              <div>
                <div className='text-2xl font-black text-emerald-400'>
                  {player.stats.pace}
                </div>
                <div className='text-xs text-slate-400'>Pace</div>
              </div>
            </div>
          </div>

          <div className='bg-slate-800/40 rounded-3xl p-6 border border-white/10'>
            <h4 className='text-white font-bold mb-4'>Snapshot</h4>
            <div className='grid grid-cols-2 gap-4 text-center'>
              <div className='rounded-2xl border border-white/10 bg-slate-900/60 px-4 py-3'>
                <div className='text-xs text-slate-400'>Overall</div>
                <div className='text-2xl font-black text-emerald-300'>
                  {overallRating}
                </div>
              </div>
              <div className='rounded-2xl border border-white/10 bg-slate-900/60 px-4 py-3'>
                <div className='text-xs text-slate-400'>Pace</div>
                <div className='text-2xl font-black text-emerald-300'>
                  {player.stats.pace}
                </div>
              </div>
              <div className='rounded-2xl border border-white/10 bg-slate-900/60 px-4 py-3'>
                <div className='text-xs text-slate-400'>Shooting</div>
                <div className='text-2xl font-black text-emerald-300'>
                  {player.stats.shooting}
                </div>
              </div>
              <div className='rounded-2xl border border-white/10 bg-slate-900/60 px-4 py-3'>
                <div className='text-xs text-slate-400'>Passing</div>
                <div className='text-2xl font-black text-emerald-300'>
                  {player.stats.passing}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className='lg:col-span-2 space-y-8'>
          <div className='grid grid-cols-1 sm:grid-cols-3 gap-4'>
            <div className='rounded-2xl border border-white/10 bg-slate-800/40 px-4 py-5'>
              <div className='text-xs text-slate-400'>Team</div>
              <div className='mt-1 text-lg font-semibold text-white'>
                {team?.name ?? player.teamId.toUpperCase()}
              </div>
            </div>
            <div className='rounded-2xl border border-white/10 bg-slate-800/40 px-4 py-5'>
              <div className='text-xs text-slate-400'>Position</div>
              <div className='mt-1 text-lg font-semibold text-white'>
                {player.position}
              </div>
            </div>
            <div className='rounded-2xl border border-white/10 bg-slate-800/40 px-4 py-5'>
              <div className='text-xs text-slate-400'>Nationality</div>
              <div className='mt-1 text-lg font-semibold text-white'>
                {player.nationality}
              </div>
            </div>
          </div>

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
                    <div
                      className={`w-full h-2 rounded-full ${styles.bg} border ${styles.border}`}
                    >
                      <div
                        className={`h-2 rounded-full ${styles.text.replace(
                          "text-",
                          "bg-"
                        )}`}
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
                      <div className='text-slate-400 text-sm'>
                        {period.year}
                      </div>
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
  );

  if (variant === "page") {
    return (
      <section className='mx-auto max-w-7xl px-6 pb-16'>
        <div className='grid gap-8 lg:grid-cols-[280px,1fr]'>
          <aside className='space-y-6'>
            <div className='rounded-3xl border border-white/10 bg-slate-900/70 p-6 shadow-2xl'>
              <div className='space-y-3 text-sm text-slate-300'>
                <div className='flex items-center justify-between'>
                  <span className='text-slate-400'>Team</span>
                  <span className='text-white font-semibold'>
                    {team?.name ?? player.teamId.toUpperCase()}
                  </span>
                </div>
                <div className='flex items-center justify-between'>
                  <span className='text-slate-400'>Position</span>
                  <span className='text-white font-semibold'>
                    {player.position}
                  </span>
                </div>
                <div className='flex items-center justify-between'>
                  <span className='text-slate-400'>Nationality</span>
                  <span className='text-white font-semibold'>
                    {player.nationality}
                  </span>
                </div>
                <div className='flex items-center justify-between'>
                  <span className='text-slate-400'>Age</span>
                  <span className='text-white font-semibold'>{player.age}</span>
                </div>
                <div className='flex items-center justify-between'>
                  <span className='text-slate-400'>Height</span>
                  <span className='text-white font-semibold'>
                    {player.height} cm
                  </span>
                </div>
                <div className='flex items-center justify-between'>
                  <span className='text-slate-400'>Weight</span>
                  <span className='text-white font-semibold'>
                    {player.weight} kg
                  </span>
                </div>
                <div className='flex items-center justify-between'>
                  <span className='text-slate-400'>BMI</span>
                  <span className='text-white font-semibold'>{bmi}</span>
                </div>
              </div>
            </div>

            <div className='rounded-3xl border border-white/10 bg-slate-900/70 p-6'>
              <h4 className='text-sm font-semibold text-slate-300 uppercase tracking-wide'>
                Quick Metrics
              </h4>
              <div className='mt-4 grid grid-cols-2 gap-4 text-center'>
                <div className='rounded-2xl border border-white/10 bg-slate-800/40 px-3 py-4'>
                  <div className='text-xs text-slate-400'>Overall</div>
                  <div className='text-2xl font-black text-emerald-300'>
                    {overallRating}
                  </div>
                </div>
                <div className='rounded-2xl border border-white/10 bg-slate-800/40 px-3 py-4'>
                  <div className='text-xs text-slate-400'>Goals</div>
                  <div className='text-2xl font-black text-green-300'>
                    {player.goals}
                  </div>
                </div>
                <div className='rounded-2xl border border-white/10 bg-slate-800/40 px-3 py-4'>
                  <div className='text-xs text-slate-400'>Assists</div>
                  <div className='text-2xl font-black text-teal-300'>
                    {player.assists}
                  </div>
                </div>
                <div className='rounded-2xl border border-white/10 bg-slate-800/40 px-3 py-4'>
                  <div className='text-xs text-slate-400'>G+A</div>
                  <div className='text-2xl font-black text-yellow-300'>
                    {goalInvolvements}
                  </div>
                </div>
              </div>
            </div>
          </aside>

          <div className='space-y-8'>
            <div className='rounded-3xl border border-white/10 bg-slate-900/60 p-6 shadow-2xl'>
              <h4 className='text-lg font-bold text-white mb-5'>
                Performance Indices
              </h4>
              <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4'>
                {[
                  { label: "Attack Index", value: attackIndex },
                  { label: "Creativity Index", value: creativityIndex },
                  { label: "Defense Index", value: defenseIndex },
                  { label: "Athletic Index", value: athleticIndex },
                  { label: "Technical Index", value: technicalIndex },
                  { label: "Pace", value: player.stats.pace },
                ].map((item) => (
                  <div
                    key={item.label}
                    className='rounded-2xl border border-white/10 bg-slate-800/50 px-4 py-4'
                  >
                    <div className='flex items-center justify-between text-sm text-slate-300'>
                      <span>{item.label}</span>
                      <span className='font-semibold text-white'>
                        {item.value}
                      </span>
                    </div>
                    <div className='mt-3 h-2 w-full rounded-full bg-slate-700'>
                      <div
                        className='h-2 rounded-full bg-gradient-to-r from-emerald-400 to-teal-400'
                        style={{ width: `${item.value}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className='rounded-3xl border border-white/10 bg-slate-900/60 p-6 shadow-2xl'>
              <h4 className='text-lg font-bold text-white mb-6'>
                Player Attributes
              </h4>
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
                        <span className='font-semibold text-white'>
                          {value}
                        </span>
                      </div>
                      <div
                        className={`w-full h-2 rounded-full ${styles.bg} border ${styles.border}`}
                      >
                        <div
                          className={`h-2 rounded-full ${styles.text.replace(
                            "text-",
                            "bg-"
                          )}`}
                          style={{ width: `${value}%` }}
                        ></div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className='rounded-3xl border border-white/10 bg-slate-900/60 p-6 shadow-2xl'>
              <h4 className='text-lg font-bold text-white mb-6'>
                Career History
              </h4>
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
                        <div className='text-slate-400 text-sm'>
                          {period.year}
                        </div>
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
      </section>
    );
  }

  return (
    <div
      className='fixed inset-0 z-50 flex items-center justify-center p-6 bg-black/80 backdrop-blur-sm'
      onClick={onClose}
    >
      <div
        className='max-h-[90vh] w-full max-w-4xl overflow-y-auto'
        onClick={(event) => event.stopPropagation()}
      >
        {content}
      </div>
    </div>
  );
};
