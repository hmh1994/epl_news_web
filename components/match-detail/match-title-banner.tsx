import Link from "next/link";
import Image from "next/image";
import { Clock, MapPin, Calendar, Users } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { formatMatchDate, formatMatchTime } from "@/lib/date-utils";
export function MatchTitleBanner({ match }: { match: any }) {
  const isCompleted = match.status === "completed";
  return (
    <div
      className='bg-gradient-to-b pt-8 pb-16'
      style={{
        backgroundImage: `linear-gradient(to bottom, rgba(0,0,0,0.8), rgba(0,0,0,0.6)), linear-gradient(to right, ${match.homeTeam.primaryColor}50, ${match.awayTeam.primaryColor}50)`,
      }}
    >
      <div className='container'>
        <div className='flex flex-col items-center text-center text-white'>
          <div className='flex items-center gap-2 mb-4'>
            <Badge className='bg-white/20 text-white border-none'>
              {match.competition}
            </Badge>
            <Badge className='bg-white/20 text-white border-none'>
              {match.matchday}
            </Badge>
          </div>

          <div className='flex flex-col md:flex-row items-center justify-center gap-6 md:gap-12 mb-6'>
            <div className='flex flex-col items-center'>
              <div className='relative w-24 h-24 md:w-32 md:h-32 mb-4'>
                <Image
                  src={match.homeTeam.logo || "/placeholder.svg"}
                  alt={match.homeTeam.name}
                  fill
                  className='object-contain'
                />
              </div>
              <Link
                href={`/teams/${match.homeTeam.id}`}
                className='text-xl md:text-2xl font-bold hover:underline'
              >
                {match.homeTeam.name}
              </Link>
            </div>

            {isCompleted ? (
              <div className='flex flex-col items-center'>
                <div className='text-3xl md:text-5xl font-bold mb-2'>
                  {match.score.homeScore} - {match.score.awayScore}
                </div>
                <div className='text-sm text-white/80'>Full Time</div>
              </div>
            ) : (
              <div className='flex flex-col items-center'>
                <div className='text-3xl md:text-5xl font-bold mb-2'>VS</div>
                <div className='text-sm text-white/80'>
                  {formatMatchDate(match.date)} • {formatMatchTime(match.date)}
                </div>
              </div>
            )}

            <div className='flex flex-col items-center'>
              <div className='relative w-24 h-24 md:w-32 md:h-32 mb-4'>
                <Image
                  src={match.awayTeam.logo || "/placeholder.svg"}
                  alt={match.awayTeam.name}
                  fill
                  className='object-contain'
                />
              </div>
              <Link
                href={`/teams/${match.awayTeam.id}`}
                className='text-xl md:text-2xl font-bold hover:underline'
              >
                {match.awayTeam.name}
              </Link>
            </div>
          </div>

          <div className='flex flex-wrap justify-center gap-6 text-sm'>
            <div className='flex items-center gap-2'>
              <Clock className='h-4 w-4 text-white/80' />
              <span>{formatMatchTime(match.date)}</span>
            </div>
            <div className='flex items-center gap-2'>
              <Calendar className='h-4 w-4 text-white/80' />
              <span>{formatMatchDate(match.date)}</span>
            </div>
            <div className='flex items-center gap-2'>
              <MapPin className='h-4 w-4 text-white/80' />
              <span>
                {match.venue}, {match.city}
              </span>
            </div>
            <div className='flex items-center gap-2'>
              <Users className='h-4 w-4 text-white/80' />
              <span>
                {isCompleted
                  ? `Attendance: ${match.attendance.toLocaleString()}`
                  : `Capacity: ${match.capacity.toLocaleString()}`}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
