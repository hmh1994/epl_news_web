"use client";

import type { PlayerDetailResponse } from "@/shared/api/epl/model/types";
import type { PlayerAward } from "@/entities/player/model/player-award";
import type { PlayerScore } from "@/entities/player/model/player-score";
import { StatAccent, getStatStyles } from "@/entities/player/lib/stat-palette";
import { X } from "lucide-react";
import { useTeams } from "@/shared/providers/teams-provider";
import { PlayerAwards } from "@/features/player-detail/ui/player-awards";
import { PlayerScoreRadar } from "@/features/player-detail/ui/player-score-radar";

interface PlayerDetailProps {
  player: PlayerDetailResponse["data"]["player"] | null;
  onClose?: () => void;
  variant?: "modal" | "page";
  awards?: PlayerAward[];
  score?: PlayerScore | null;
}

export const PlayerDetail = ({
  player,
  onClose,
  variant = "modal",
  awards,
  score,
}: PlayerDetailProps) => {
  const teamsById = useTeams();

  if (!player) return null;

  const summary = player.summary;
  const attributes = player.attributes ?? {};
  const performance = player.performance ?? {};
  const career = player.career ?? [];
  const teamId = String(summary.teamId);
  const team = teamsById[teamId];
  const teamName = team?.name ?? teamId;
  const isPhotoUrl = summary.photo.startsWith("http");
  const stats = {
    pace: Math.round(attributes.pace ?? 0),
    shooting: Math.round(attributes.shooting ?? 0),
    passing: Math.round(attributes.passing ?? 0),
    dribbling: Math.round(attributes.dribbling ?? 0),
    defending: Math.round(attributes.defending ?? 0),
    physical: Math.round(attributes.physical ?? 0),
  };
  const showClose = variant === "modal" && Boolean(onClose);
  const overallRating = Math.round(
    (stats.pace +
      stats.shooting +
      stats.passing +
      stats.dribbling +
      stats.defending +
      stats.physical) /
      6
  );
  const goals = performance.goals ?? 0;
  const assists = performance.assists ?? 0;
  const matches = performance.matches ?? 0;
  const goalInvolvements = goals + assists;
  const bmi =
    summary.height > 0
      ? Math.round((summary.weight / Math.pow(summary.height / 100, 2)) * 10) /
        10
      : 0;
  const average = (...values: number[]) =>
    Math.round(values.reduce((sum, value) => sum + value, 0) / values.length);
  const attackIndex = average(
    stats.pace,
    stats.shooting,
    stats.dribbling
  );
  const creativityIndex = average(
    stats.passing,
    stats.dribbling,
    stats.shooting
  );
  const defenseIndex = average(stats.defending, stats.physical);
  const athleticIndex = average(stats.pace, stats.physical);
  const technicalIndex = average(
    stats.passing,
    stats.dribbling,
    stats.shooting
  );

  const content = (
    <div className='bg-slate-950/70 rounded-3xl border border-white/10 shadow-[0_18px_40px_rgba(2,6,23,0.35)] w-full overflow-hidden'>
      <div className='flex items-center justify-between px-8 py-6 border-b border-white/5'>
        <div>
          <h3 className='text-2xl font-semibold text-white'>{summary.name}</h3>
          <p className='text-slate-400 text-sm'>
            {teamName} • {summary.position}
          </p>
        </div>
        {showClose && (
          <button
            type='button'
            onClick={onClose}
            aria-label='Close'
            className='w-10 h-10 rounded-2xl bg-slate-900/60 border border-white/10 flex items-center justify-center text-slate-300 hover:text-white'
          >
            <X className='w-5 h-5' />
          </button>
        )}
      </div>

      <div className='grid grid-cols-1 lg:grid-cols-3 gap-8 px-8 py-6'>
        <div className='lg:col-span-1 space-y-6'>
          <div className='bg-slate-950/60 rounded-3xl p-6 border border-white/10 text-center'>
            <div className='w-20 h-20 mx-auto mb-4 bg-slate-900/80 border border-white/10 rounded-3xl flex items-center justify-center text-4xl overflow-hidden'>
              {isPhotoUrl ? (
                <img
                  src={summary.photo}
                  alt={summary.name}
                  className='h-full w-full object-cover'
                />
              ) : (
                summary.photo
              )}
            </div>
            <div className='space-y-2 text-sm text-slate-300'>
              <div>
                <span className='text-slate-400'>Nationality:</span>
                <span className='ml-2 text-white'>{summary.nationality}</span>
              </div>
              <div>
                <span className='text-slate-400'>Age:</span>
                <span className='ml-2 text-white'>{summary.age}</span>
              </div>
              <div>
                <span className='text-slate-400'>Height:</span>
                <span className='ml-2 text-white'>{summary.height} cm</span>
              </div>
              <div>
                <span className='text-slate-400'>Weight:</span>
                <span className='ml-2 text-white'>{summary.weight} kg</span>
              </div>
            </div>
          </div>

          <div className='bg-slate-950/60 rounded-3xl p-6 border border-white/10'>
            <h4 className='text-white font-semibold mb-4'>Performance</h4>
            <div className='grid grid-cols-2 gap-3 text-center'>
              <div>
                <div className='text-2xl font-semibold text-slate-200'>
                  {goals}
                </div>
                <div className='text-xs text-slate-400'>Goals</div>
              </div>
              <div>
                <div className='text-2xl font-semibold text-slate-200'>
                  {assists}
                </div>
                <div className='text-xs text-slate-400'>Assists</div>
              </div>
              <div>
                <div className='text-2xl font-semibold text-amber-200'>
                  {goalInvolvements}
                </div>
                <div className='text-xs text-slate-400'>Goal Involvements</div>
              </div>
              <div>
                <div className='text-2xl font-semibold text-slate-200'>
                  {matches}
                </div>
                <div className='text-xs text-slate-400'>Matches</div>
              </div>
            </div>
          </div>

          <div className='bg-slate-950/60 rounded-3xl p-6 border border-white/10'>
            <h4 className='text-white font-semibold mb-4'>Snapshot</h4>
            <div className='grid grid-cols-2 gap-4 text-center'>
              <div className='rounded-2xl border border-white/10 bg-slate-900/50 px-4 py-3'>
                <div className='text-xs text-slate-400'>Overall</div>
                <div className='text-2xl font-semibold text-slate-200'>
                  {overallRating}
                </div>
              </div>
              <div className='rounded-2xl border border-white/10 bg-slate-900/50 px-4 py-3'>
                <div className='text-xs text-slate-400'>Pace</div>
                <div className='text-2xl font-semibold text-slate-200'>
                  {stats.pace}
                </div>
              </div>
              <div className='rounded-2xl border border-white/10 bg-slate-900/50 px-4 py-3'>
                <div className='text-xs text-slate-400'>Shooting</div>
                <div className='text-2xl font-semibold text-slate-200'>
                  {stats.shooting}
                </div>
              </div>
              <div className='rounded-2xl border border-white/10 bg-slate-900/50 px-4 py-3'>
                <div className='text-xs text-slate-400'>Passing</div>
                <div className='text-2xl font-semibold text-slate-200'>
                  {stats.passing}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className='lg:col-span-2 space-y-8'>
          <div className='grid grid-cols-1 sm:grid-cols-3 gap-4'>
            <div className='rounded-2xl border border-white/10 bg-slate-950/60 px-4 py-5'>
              <div className='text-xs text-slate-400'>Team</div>
              <div className='mt-1 text-lg font-semibold text-white'>
                {teamName}
              </div>
            </div>
            <div className='rounded-2xl border border-white/10 bg-slate-950/60 px-4 py-5'>
              <div className='text-xs text-slate-400'>Position</div>
              <div className='mt-1 text-lg font-semibold text-white'>
                {summary.position}
              </div>
            </div>
            <div className='rounded-2xl border border-white/10 bg-slate-950/60 px-4 py-5'>
              <div className='text-xs text-slate-400'>Nationality</div>
              <div className='mt-1 text-lg font-semibold text-white'>
                {summary.nationality}
              </div>
            </div>
          </div>

          <div className='bg-slate-950/60 rounded-3xl p-6 border border-white/10'>
            <h4 className='text-white font-semibold mb-6'>Player Attributes</h4>
            <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
              {Object.entries(stats).map(([key, value]) => {
                const styles = getStatStyles(
                  (key === "pace"
                    ? "green"
                    : key === "dribbling"
                    ? "slate"
                    : key === "passing"
                    ? "gray"
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

          <div className='bg-slate-950/60 rounded-3xl p-6 border border-white/10'>
            <h4 className='text-white font-semibold mb-6'>Career History</h4>
            <div className='space-y-4'>
              {career.length === 0 ? (
                <div className='rounded-2xl border border-white/10 bg-slate-900/50 px-4 py-6 text-center text-slate-400'>
                  No career history available.
                </div>
              ) : (
                career.map((period, idx) => {
                  const careerTeam = teamsById[period.teamId];
                  return (
                    <div
                      key={idx}
                      className='flex items-center space-x-4 p-4 bg-slate-900/40 rounded-2xl border border-white/10'
                    >
                      <div className='w-12 h-12 bg-slate-900/80 border border-white/10 rounded-xl flex items-center justify-center text-xl'>
                        {careerTeam?.crest ?? "⚽"}
                      </div>
                      <div className='flex-1'>
                        <div className='text-white font-semibold text-lg'>
                          {careerTeam?.name ?? period.teamId}
                        </div>
                        <div className='text-slate-400 text-sm'>
                          {period.year}
                        </div>
                      </div>
                      <div className='text-right'>
                        <div className='text-white font-semibold'>
                          {period.matches} matches
                        </div>
                        <div className='text-slate-200 font-semibold'>
                          {period.goals} goals
                        </div>
                      </div>
                    </div>
                  );
                })
              )}
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
            <div className='rounded-3xl border border-white/10 bg-slate-950/60 p-6 shadow-[0_18px_40px_rgba(2,6,23,0.35)]'>
              <div className='space-y-3 text-sm text-slate-300'>
                <div className='flex items-center justify-between'>
                  <span className='text-slate-400'>Team</span>
                  <span className='text-white font-semibold'>
                    {teamName}
                  </span>
                </div>
                <div className='flex items-center justify-between'>
                  <span className='text-slate-400'>Position</span>
                  <span className='text-white font-semibold'>
                    {summary.position}
                  </span>
                </div>
                <div className='flex items-center justify-between'>
                  <span className='text-slate-400'>Nationality</span>
                  <span className='text-white font-semibold'>
                    {summary.nationality}
                  </span>
                </div>
                <div className='flex items-center justify-between'>
                  <span className='text-slate-400'>Age</span>
                  <span className='text-white font-semibold'>{summary.age}</span>
                </div>
                <div className='flex items-center justify-between'>
                  <span className='text-slate-400'>Height</span>
                  <span className='text-white font-semibold'>
                    {summary.height} cm
                  </span>
                </div>
                <div className='flex items-center justify-between'>
                  <span className='text-slate-400'>Weight</span>
                  <span className='text-white font-semibold'>
                    {summary.weight} kg
                  </span>
                </div>
                <div className='flex items-center justify-between'>
                  <span className='text-slate-400'>BMI</span>
                  <span className='text-white font-semibold'>{bmi}</span>
                </div>
              </div>
            </div>

            <div className='rounded-3xl border border-white/10 bg-slate-950/60 p-6'>
              <h4 className='text-sm font-semibold text-slate-300 uppercase tracking-wide'>
                Quick Metrics
              </h4>
              <div className='mt-4 grid grid-cols-2 gap-4 text-center'>
                <div className='rounded-2xl border border-white/10 bg-slate-900/50 px-3 py-4'>
                  <div className='text-xs text-slate-400'>Overall</div>
                  <div className='text-2xl font-semibold text-slate-200'>
                    {overallRating}
                  </div>
                </div>
                <div className='rounded-2xl border border-white/10 bg-slate-900/50 px-3 py-4'>
                  <div className='text-xs text-slate-400'>Goals</div>
                  <div className='text-2xl font-semibold text-slate-200'>
                    {goals}
                  </div>
                </div>
                <div className='rounded-2xl border border-white/10 bg-slate-900/50 px-3 py-4'>
                  <div className='text-xs text-slate-400'>Assists</div>
                  <div className='text-2xl font-semibold text-slate-200'>
                    {assists}
                  </div>
                </div>
                <div className='rounded-2xl border border-white/10 bg-slate-900/50 px-3 py-4'>
                  <div className='text-xs text-slate-400'>G+A</div>
                  <div className='text-2xl font-semibold text-amber-200'>
                    {goalInvolvements}
                  </div>
                </div>
              </div>
            </div>
          </aside>

          <div className='space-y-8'>
            {score && (
              <PlayerScoreRadar
                score={score}
                indices={[
                  { label: "Attack Index", value: attackIndex },
                  { label: "Creativity Index", value: creativityIndex },
                  { label: "Defense Index", value: defenseIndex },
                  { label: "Athletic Index", value: athleticIndex },
                  { label: "Technical Index", value: technicalIndex },
                  { label: "Pace", value: stats.pace },
                ]}
              />
            )}

            {awards && awards.length > 0 && <PlayerAwards awards={awards} />}

            <div className='rounded-3xl border border-white/10 bg-slate-950/60 p-6 shadow-[0_18px_40px_rgba(2,6,23,0.35)]'>
              <h4 className='text-lg font-semibold text-white mb-6'>
                Player Attributes
              </h4>
              <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                {Object.entries(stats).map(([key, value]) => {
                  const styles = getStatStyles(
                    (key === "pace"
                      ? "green"
                      : key === "dribbling"
                      ? "slate"
                      : key === "passing"
                      ? "gray"
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

            <div className='rounded-3xl border border-white/10 bg-slate-950/60 p-6 shadow-[0_18px_40px_rgba(2,6,23,0.35)]'>
              <h4 className='text-lg font-semibold text-white mb-6'>
                Career History
              </h4>
              <div className='space-y-4'>
                {career.length === 0 ? (
                  <div className='rounded-2xl border border-white/10 bg-slate-900/50 px-4 py-6 text-center text-slate-400'>
                    No career history available.
                  </div>
                ) : (
                  career.map((period, idx) => {
                    const careerTeam = teamsById[period.teamId];
                    return (
                      <div
                        key={idx}
                        className='flex items-center space-x-4 p-4 bg-slate-900/40 rounded-2xl border border-white/10'
                      >
                        <div className='w-12 h-12 bg-slate-900/80 border border-white/10 rounded-xl flex items-center justify-center text-xl'>
                          {careerTeam?.crest ?? "⚽"}
                        </div>
                        <div className='flex-1'>
                          <div className='text-white font-semibold text-lg'>
                            {careerTeam?.name ?? period.teamId}
                          </div>
                          <div className='text-slate-400 text-sm'>
                            {period.year}
                          </div>
                        </div>
                        <div className='text-right'>
                          <div className='text-white font-semibold'>
                            {period.matches} matches
                          </div>
                          <div className='text-slate-200 font-semibold'>
                            {period.goals} goals
                          </div>
                        </div>
                      </div>
                    );
                  })
                )}
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
