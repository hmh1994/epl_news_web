import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export function PlayerCard({ player }: { player: any }) {
  return (
    <Card key={player.id} className='overflow-hidden'>
      <div className='flex items-start p-4'>
        <Avatar className='h-16 w-16 rounded-md mr-4'>
          <AvatarImage
            src={player.image || "/placeholder.svg"}
            alt={player.name}
          />
          <AvatarFallback>{player.name.substring(0, 2)}</AvatarFallback>
        </Avatar>
        <div>
          <h3 className='font-bold'>{player.name}</h3>
          <div className='flex items-center gap-2 mt-1'>
            <Badge variant='outline' className='text-xs'>
              {player.position}
            </Badge>
            <span className='text-sm text-muted-foreground'>
              #{player.number}
            </span>
          </div>
          <div className='mt-2 text-sm text-muted-foreground'>
            <div>{player.nationality}</div>
            <div>Age: {player.age}</div>
          </div>
        </div>
      </div>
    </Card>
  );
}
