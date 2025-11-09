"use client";

import { TeamProfile } from "@/entities/team/model/team-profile";
import { PlayerProfile } from "@/entities/player/model/player-profile";
import { TeamInfoWidget } from "@/widgets/team-info/ui/team-info-widget";

interface TeamInfoPageProps {
  teams: TeamProfile[];
  players: PlayerProfile[];
}

export const TeamInfoPage = ({ teams, players }: TeamInfoPageProps) => {
  return <TeamInfoWidget teams={teams} players={players} />;
};
