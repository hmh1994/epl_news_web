"use client";

import { LeagueTableRow } from "@/entities/league/model/league-overview";
import { Star } from "lucide-react";
import { useTranslations } from "next-intl";
import Image from "next/image";

interface LeagueBriefRowProps {
  row: LeagueTableRow;
  isHovered: boolean;
  onHover: (pos: number) => void;
  onHoverEnd: () => void;
  teamName: string;
  teamLogo: string;
  onFavorite?: (teamId: string) => void;
  isFavorite?: boolean;
  onSelect?: (teamId: string) => void;
}

const getPositionStyle = (pos: number) => {
  if (pos <= 4) {
    return {
      badge: "bg-slate-400/10 border-slate-400/30 text-slate-300",
    };
  }
  if (pos <= 6) {
    return {
      badge: "bg-slate-400/10 border-slate-400/30 text-slate-300",
    };
  }
  if (pos >= 18) {
    return {
      badge: "bg-red-400/10 border-red-400/30 text-red-300",
    };
  }
  return {
    badge: "bg-slate-400/10 border-white/20 text-slate-300",
  };
};

export const LeagueBriefRow = ({
  row,
  isHovered,
  onHover,
  onHoverEnd,
  teamName,
  teamLogo,
  onFavorite,
  isFavorite,
  onSelect,
}: LeagueBriefRowProps) => {
  const positionStyle = getPositionStyle(row.pos);
  const t = useTranslations("league.row");
  const isClickable = Boolean(onSelect);
  const handleSelect = () => onSelect?.(row.teamId);

  return (
    <tr
      className={`border-b border-white/10 transition-colors duration-300 hover:bg-white/5 ${
        isClickable ? "cursor-pointer" : ""
      }`}
      onMouseEnter={() => onHover(row.pos)}
      onMouseLeave={onHoverEnd}
      onClick={isClickable ? handleSelect : undefined}
      onKeyDown={
        isClickable
          ? (event) => {
              if (event.key === "Enter" || event.key === " ") {
                event.preventDefault();
                handleSelect();
              }
            }
          : undefined
      }
      role={isClickable ? "button" : undefined}
      tabIndex={isClickable ? 0 : undefined}
    >
      {/* Position */}
      <td className='py-2 px-2 md:py-6 md:px-8'>
        <div
          className={`w-7 h-7 md:w-12 md:h-12 rounded-lg md:rounded-xl flex items-center justify-center text-xs md:text-base font-bold border transition-all duration-300 ${
            positionStyle.badge
          } ${isHovered ? "scale-105" : ""}`}
        >
          {row.pos}
        </div>
      </td>

      {/* Team */}
      <td className='py-2 px-2 md:py-6 md:px-8'>
        <div className='flex items-center gap-2 md:gap-4 min-w-0'>
          <div className='flex items-center gap-2 md:gap-4 min-w-0 flex-1'>
            <div
              className={`w-7 h-7 md:w-12 md:h-12 rounded-lg md:rounded-2xl flex items-center justify-center shrink-0 bg-slate-900/60 border border-white/10 shadow-md overflow-hidden ${
                isHovered ? "scale-105" : ""
              } transition-all`}
            >
              <Image
                src={teamLogo}
                alt={teamName}
                width={40}
                height={40}
                className='w-5 h-5 md:w-10 md:h-10 object-contain'
              />
            </div>
            <span
              className={`text-xs md:text-lg font-semibold transition-colors truncate ${
                isHovered ? "text-slate-200" : "text-white"
              }`}
            >
              {teamName}
            </span>
          </div>
          {onFavorite && (
            <button
              type='button'
              onClick={(event) => {
                event.preventDefault();
                event.stopPropagation();
                onFavorite(row.teamId);
              }}
              className={`shrink-0 inline-flex items-center gap-1 md:gap-2 rounded-full border px-1.5 py-1 md:px-3 md:py-1.5 text-xs font-semibold transition-all ${
                isFavorite
                  ? "border-slate-400/40 bg-slate-500/10 text-slate-200 hover:bg-slate-500/15"
                  : "border-white/10 bg-slate-900/50 text-slate-200 hover:border-slate-400/30 hover:text-slate-200"
              }`}
              aria-pressed={isFavorite}
            >
              <Star
                className='h-3.5 w-3.5 md:h-4 md:w-4'
                strokeWidth={isFavorite ? 2.5 : 2}
                fill={isFavorite ? "currentColor" : "none"}
              />
              <span className='hidden md:inline'>{t("favorite")}</span>
            </button>
          )}
        </div>
      </td>

      {/* P */}
      <td className='py-2 md:py-6 px-1 md:px-4 text-center text-xs md:text-base text-slate-300 font-medium'>
        {row.played}
      </td>
      {/* W */}
      <td className='py-2 md:py-6 px-1 md:px-4 text-center text-xs md:text-base text-green-400 font-bold'>
        {row.won}
      </td>
      {/* D - hidden on mobile */}
      <td className='hidden sm:table-cell py-2 md:py-6 px-1 md:px-4 text-center text-xs md:text-base text-yellow-400 font-bold'>
        {row.drawn}
      </td>
      {/* L - hidden on mobile */}
      <td className='hidden sm:table-cell py-2 md:py-6 px-1 md:px-4 text-center text-xs md:text-base text-red-400 font-bold'>
        {row.lost}
      </td>
      {/* GD - hidden on mobile */}
      <td className='hidden sm:table-cell py-2 md:py-6 px-1 md:px-4 text-center'>
        <span
          className={`text-xs md:text-base font-bold ${
            row.gd > 0
              ? "text-green-400"
              : row.gd < 0
              ? "text-red-400"
              : "text-slate-400"
          }`}
        >
          {row.gd > 0 ? "+" : ""}
          {row.gd}
        </span>
      </td>
      {/* PTS */}
      <td className='py-2 md:py-6 px-1 md:px-4 text-center'>
        <div className='w-9 h-7 md:w-16 md:h-10 bg-slate-900/60 border border-white/10 rounded-lg md:rounded-xl flex items-center justify-center mx-auto'>
          <span className='text-slate-200 font-semibold text-xs md:text-lg'>
            {row.pts}
          </span>
        </div>
      </td>
      {/* Form */}
      <td className='hidden md:table-cell py-2 md:py-6 px-1 md:px-4'>
        <div className='flex items-center justify-center gap-1'>
          {(row.form ?? []).slice(-5).map((result, idx) => (
            <span
              key={idx}
              className={`w-2 h-2 md:w-2.5 md:h-2.5 rounded-full ${
                result === "W"
                  ? "bg-emerald-400"
                  : result === "D"
                  ? "bg-amber-400"
                  : "bg-rose-400"
              }`}
              title={result}
            />
          ))}
        </div>
      </td>
    </tr>
  );
};
