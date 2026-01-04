"use client";

import { TeamProfile } from "@/entities/team/model/team-profile";
import { PlayerProfile } from "@/entities/player/model/player-profile";
import { TeamInfoWidget } from "@/widgets/team-info/ui/team-info-widget";

interface TeamInfoPageProps {
  teams: TeamProfile[];
  players: PlayerProfile[];
  initialTeamIndex?: number;
}

export const TeamInfoPage = ({
  teams,
  players,
  initialTeamIndex,
}: TeamInfoPageProps) => {
  return (
    <TeamInfoWidget
      teams={teams}
      players={players}
      initialTeamIndex={initialTeamIndex}
    />
  );
};
