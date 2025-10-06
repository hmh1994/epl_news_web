import { MatchDaySchedule } from "@/entities/match/model/match-schedule";

export const EPL_MATCH_SCHEDULE: MatchDaySchedule[] = [
  {
    date: "2024-12-14",
    fixtures: [
      {
        id: "m-241214-mci-ars",
        matchweek: 18,
        kickoff: "2024-12-14T12:30:00Z",
        venue: "Etihad Stadium",
        city: "Manchester",
        status: "upcoming",
        headline: "Top-of-the-table showdown",
        referee: "Michael Oliver",
        home: {
          name: "Manchester City",
          shortName: "MCI",
          badge: "🏆",
          leaguePosition: 1,
          recentForm: ["W", "W", "D", "W", "W"],
        },
        away: {
          name: "Arsenal",
          shortName: "ARS",
          badge: "🔴",
          leaguePosition: 2,
          recentForm: ["W", "W", "W", "D", "W"],
        },
        broadcast: {
          channel: "Sky Sports",
          platform: "NOW"
        },
      },
      {
        id: "m-241214-che-tot",
        matchweek: 18,
        kickoff: "2024-12-14T15:00:00Z",
        venue: "Stamford Bridge",
        city: "London",
        status: "upcoming",
        home: {
          name: "Chelsea",
          shortName: "CHE",
          badge: "🔵",
          leaguePosition: 6,
          recentForm: ["L", "W", "D", "D", "W"],
        },
        away: {
          name: "Tottenham",
          shortName: "TOT",
          badge: "🐓",
          leaguePosition: 5,
          recentForm: ["W", "L", "W", "W", "D"],
        },
        broadcast: {
          channel: "TNT Sports",
          platform: "Discovery+"
        },
      },
    ],
  },
  {
    date: "2024-12-15",
    fixtures: [
      {
        id: "m-241215-liv-mun",
        matchweek: 18,
        kickoff: "2024-12-15T16:30:00Z",
        venue: "Anfield",
        city: "Liverpool",
        status: "upcoming",
        headline: "North West derby returns",
        referee: "Anthony Taylor",
        home: {
          name: "Liverpool",
          shortName: "LIV",
          badge: "❤️",
          leaguePosition: 3,
          recentForm: ["W", "D", "W", "W", "L"],
        },
        away: {
          name: "Manchester United",
          shortName: "MUN",
          badge: "⚫️",
          leaguePosition: 7,
          recentForm: ["L", "W", "W", "L", "D"],
        },
        broadcast: {
          channel: "Sky Sports",
        },
      },
      {
        id: "m-241215-new-bha",
        matchweek: 18,
        kickoff: "2024-12-15T14:00:00Z",
        venue: "St James' Park",
        city: "Newcastle",
        status: "upcoming",
        home: {
          name: "Newcastle",
          shortName: "NEW",
          badge: "⚫️⚪️",
          leaguePosition: 8,
          recentForm: ["D", "W", "L", "D", "W"],
        },
        away: {
          name: "Brighton",
          shortName: "BHA",
          badge: "🟦",
          leaguePosition: 10,
          recentForm: ["L", "D", "L", "W", "D"],
        },
      },
    ],
  },
  {
    date: "2024-12-16",
    fixtures: [
      {
        id: "m-241216-ful-bre",
        matchweek: 18,
        kickoff: "2024-12-16T20:00:00Z",
        venue: "Craven Cottage",
        city: "London",
        status: "upcoming",
        home: {
          name: "Fulham",
          shortName: "FUL",
          badge: "⚪️",
          leaguePosition: 12,
          recentForm: ["W", "L", "D", "L", "W"],
        },
        away: {
          name: "Brentford",
          shortName: "BRE",
          badge: "🐝",
          leaguePosition: 13,
          recentForm: ["D", "L", "W", "L", "D"],
        },
        broadcast: {
          channel: "Sky Sports",
        },
      },
    ],
  },
];

export const MATCHWEEK_OPTIONS = [16, 17, 18, 19, 20];
