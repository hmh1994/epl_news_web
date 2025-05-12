import Image from "next/image";
import { MapPin, Calendar, Trophy, Users } from "lucide-react";

export function TeamDetailTitle({ team }: { team: any }) {
  return (
    <div className='flex flex-col md:flex-row items-center md:items-start gap-8'>
      <div className='relative w-32 h-32 md:w-40 md:h-40 flex-shrink-0'>
        <Image
          src={team.logo || "/placeholder.svg"}
          alt={team.name}
          fill
          className='object-contain'
        />
      </div>
      <div className='flex-1 text-center md:text-left'>
        <h1 className='text-4xl font-bold'>{team.name}</h1>
        <p className='text-muted-foreground mt-2 max-w-2xl'>
          {team.description}
        </p>

        <div className='flex flex-wrap justify-center md:justify-start gap-4 mt-6'>
          <div className='flex items-center gap-2'>
            <MapPin className='h-4 w-4 text-muted-foreground' />
            <span>{team.stadium}</span>
          </div>
          <div className='flex items-center gap-2'>
            <Calendar className='h-4 w-4 text-muted-foreground' />
            <span>Founded {team.founded}</span>
          </div>
          <div className='flex items-center gap-2'>
            <Trophy className='h-4 w-4 text-muted-foreground' />
            <span>Position: {team.position}</span>
          </div>
          <div className='flex items-center gap-2'>
            <Users className='h-4 w-4 text-muted-foreground' />
            <span>Manager: {team.manager}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
