"use client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { PlayerType } from "@/src/entities/teams/apis/get-team";
import { Link } from "@/src/i18n/routing";

export function PlayerCard({ player }: { player: PlayerType }) {
  return (
    <Card key={player.playerId} className='overflow-hidden'>
      <Link href={`/players/${player.playerId}`}>
        <div className='flex items-start p-4'>
          <Avatar className='h-16 w-16 rounded-md mr-4'>
            <AvatarImage
              src={player.photoUrl || "/placeholder.svg"}
              alt={player.displayNameEn}
            />
            <AvatarFallback>
              {player.displayNameEn.substring(0, 2)}
            </AvatarFallback>
          </Avatar>
          <div>
            <h3 className='font-bold'>{player.displayNameEn}</h3>
            <div className='flex items-center gap-2 mt-1'>
              <Badge variant='outline' className='text-xs'>
                {player.position}
              </Badge>
              <span className='text-sm text-muted-foreground'>
                #{player.number}
              </span>
            </div>
            <div className='mt-2 text-sm text-muted-foreground'>
              <div>{player.birthCountryEn}</div>
              <div>Age: {player.age}</div>
            </div>
          </div>
        </div>
      </Link>
    </Card>
  );
}
