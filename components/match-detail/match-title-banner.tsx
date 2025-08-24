import { Link } from "@/src/i18n/routing";
import Image from "next/image";
import { Clock, MapPin, Calendar, Users } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { formatMatchDate, formatMatchTime } from "@/lib/date-utils";
export function MatchTitleBanner({
  match,
  isCompleted,
}: {
  match: any;
  isCompleted: boolean;
}) {
  console.log(match);
  return (
    <div
      className='bg-gradient-to-b pt-8 pb-16'
      style={{
        backgroundImage: `linear-gradient(to bottom, rgba(0,0,0,0.8), rgba(0,0,0,0.6))`,
      }}
    >
      <div className='container'>
        <div className='flex flex-col items-center text-center text-white'>
          <div className='flex items-center gap-2 mb-4'>
            <Badge className='bg-white/20 text-white border-none'>
              PREMIER LEAGUE
            </Badge>
            {/* <Badge className='bg-white/20 text-white border-none'>
              {match.kickoffTime}
            </Badge> */}
          </div>

          <div className='flex flex-col md:flex-row items-center justify-center gap-6 md:gap-12 mb-6'>
            <div className='flex flex-col items-center'>
              <div className='relative w-24 h-24 md:w-32 md:h-32 mb-4'>
                <Image
                  src={match.homeTeamInfo.teamLogo || "/placeholder.svg"}
                  alt={match.homeTeamInfo.shortTeamNameKr}
                  fill
                  className='object-contain'
                />
              </div>
              <Link
                href={`/teams/${match.homeTeamInfo.teamId}`}
                className='text-xl md:text-2xl font-bold hover:underline'
              >
                {match.homeTeamInfo.teamNameKr}
              </Link>
            </div>

            {isCompleted ? (
              <div className='flex flex-col items-center'>
                <div className='text-3xl md:text-5xl font-bold mb-2'>
                  {match.homeTeamInfo.teamScore} -{" "}
                  {match.awayTeamInfo.teamScore}
                </div>
                <div className='text-sm text-white/80'>Full Time</div>
              </div>
            ) : (
              <div className='flex flex-col items-center'>
                <div className='text-3xl md:text-5xl font-bold mb-2'>VS</div>
                <div className='text-sm text-white/80'>
                  {formatMatchDate(match.kickoffTime)} •{" "}
                  {formatMatchTime(match.kickoffTime)}
                </div>
              </div>
            )}

            <div className='flex flex-col items-center'>
              <div className='relative w-24 h-24 md:w-32 md:h-32 mb-4'>
                <Image
                  src={match.awayTeamInfo.teamLogo || "/placeholder.svg"}
                  alt={match.awayTeamInfo.name}
                  fill
                  className='object-contain'
                />
              </div>
              <Link
                href={`/teams/${match.awayTeamInfo.teamId}`}
                className='text-xl md:text-2xl font-bold hover:underline'
              >
                {match.awayTeamInfo.teamNameKr}
              </Link>
            </div>
          </div>

          <div className='flex flex-wrap justify-center gap-6 text-sm'>
            <div className='flex items-center gap-2'>
              <Clock className='h-4 w-4 text-white/80' />
              <span>{formatMatchTime(match.kickoffTime)}</span>
            </div>
            <div className='flex items-center gap-2'>
              <Calendar className='h-4 w-4 text-white/80' />
              <span>{formatMatchDate(match.kickoffTime)}</span>
            </div>
            <div className='flex items-center gap-2'>
              <MapPin className='h-4 w-4 text-white/80' />
              <span>
                {match.groundNameKr}, {match.cityNameKr}
              </span>
            </div>
            <div className='flex items-center gap-2'>
              <Users className='h-4 w-4 text-white/80' />
              <span>
                {`Capacity: ${match.capacity.toLocaleString()}`}
                {/* {isCompleted
                  ? `Attendance: ${match.attendance.toLocaleString()}`
                  : `Capacity: ${match.capacity.toLocaleString()}`} */}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
