import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  goalScorers,
  assistProviders,
  youngPlayers,
} from "@/app/fixtures/players";

const HighlightCard = ({
  title,
  description,
  players,
}: {
  title: string;
  description: string;
  players: any[];
}) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className='space-y-4'>
          {players.slice(0, 5).map((player, index) => (
            <div key={index} className='flex items-center justify-between'>
              <div className='flex items-center gap-2'>
                <Avatar className='h-8 w-8'>
                  <AvatarImage
                    src={player.avatar || "/placeholder.svg"}
                    alt={player.player}
                  />
                  <AvatarFallback>
                    {player.player.substring(0, 2)}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <div className='font-medium'>{player.player}</div>
                  <div className='text-xs text-muted-foreground'>
                    {player.team}
                  </div>
                </div>
              </div>
              <Badge className='bg-green-600'>{player.goals}</Badge>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export function PlayerHighlights() {
  return (
    <div className='mt-8 space-y-6'>
      <h2 className='text-2xl font-bold'>Player Highlights</h2>
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
        <HighlightCard
          title={"Golden Boot Race"}
          description='Top goal scorers across all leagues'
          players={goalScorers}
        />

        <HighlightCard
          title={"Playmaker Award"}
          description='Top assist providers across all leagues'
          players={assistProviders}
        />

        <HighlightCard
          title={"Rising Stars"}
          description='Top young talents to watch'
          players={youngPlayers}
        />
      </div>
    </div>
  );
}
