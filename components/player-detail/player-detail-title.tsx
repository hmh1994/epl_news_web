import Image from "next/image";
import Link from "next/link";
import { Flag, Calendar, User, Ruler, Weight, MapPin } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export function PlayerDetailTitle({ player }: { player: any }) {
  return (
    <div className='container'>
      <div className='flex flex-col md:flex-row items-center md:items-start gap-8'>
        <div className='relative w-48 h-48 md:w-64 md:h-64 flex-shrink-0 rounded-lg overflow-hidden'>
          <Image
            src={player.image || "/placeholder.svg"}
            alt={player.name}
            fill
            className='object-cover'
          />
        </div>
        <div className='flex-1 text-center md:text-left'>
          <div className='flex flex-col md:flex-row md:items-center gap-3 mb-4'>
            <h1 className='text-4xl font-bold'>{player.name}</h1>
            <Badge className='self-center md:self-auto' variant='outline'>
              #{player.number} • {player.position}
            </Badge>
          </div>

          <div className='flex flex-col md:flex-row items-center gap-4 mb-6'>
            <Link
              href={`/teams/${player.teamId}`}
              className='flex items-center gap-2 hover:text-green-600 transition-colors'
            >
              <Image
                src={player.teamLogo || "/placeholder.svg"}
                alt={player.team}
                width={24}
                height={24}
                className='rounded-full'
              />
              <span className='font-medium'>{player.team}</span>
            </Link>
            <div className='flex items-center gap-2'>
              <Flag className='h-4 w-4 text-muted-foreground' />
              <span>{player.nationality}</span>
            </div>
          </div>

          <p className='text-muted-foreground mt-2 max-w-2xl'>{player.bio}</p>

          <div className='flex flex-wrap justify-center md:justify-start gap-4 mt-6'>
            <div className='flex items-center gap-2'>
              <Calendar className='h-4 w-4 text-muted-foreground' />
              <span>Born: {player.dateOfBirth}</span>
            </div>
            <div className='flex items-center gap-2'>
              <MapPin className='h-4 w-4 text-muted-foreground' />
              <span>{player.placeOfBirth}</span>
            </div>
            <div className='flex items-center gap-2'>
              <Ruler className='h-4 w-4 text-muted-foreground' />
              <span>Height: {player.height}</span>
            </div>
            <div className='flex items-center gap-2'>
              <Weight className='h-4 w-4 text-muted-foreground' />
              <span>Weight: {player.weight}</span>
            </div>
            <div className='flex items-center gap-2'>
              <User className='h-4 w-4 text-muted-foreground' />
              <span>Age: {player.age}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
