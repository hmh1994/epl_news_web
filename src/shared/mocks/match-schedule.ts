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
          teamId: "mci",
          leaguePosition: 1,
          recentForm: ["W", "W", "D", "W", "W"],
        },
        away: {
          teamId: "ars",
          leaguePosition: 2,
          recentForm: ["W", "W", "W", "D", "W"],
        },
      },
      {
        id: "m-241214-che-tot",
        matchweek: 18,
        kickoff: "2024-12-14T15:00:00Z",
        venue: "Stamford Bridge",
        city: "London",
        status: "finished",
        headline: "런던 더비, 팔머의 결승골",
        referee: "Craig Pawson",
        home: {
          teamId: "che",
          leaguePosition: 6,
          recentForm: ["L", "W", "D", "D", "W"],
          score: 2,
        },
        away: {
          teamId: "tot",
          leaguePosition: 5,
          recentForm: ["W", "L", "W", "W", "D"],
          score: 1,
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
          teamId: "liv",
          leaguePosition: 3,
          recentForm: ["W", "D", "W", "W", "L"],
        },
        away: {
          teamId: "mun",
          leaguePosition: 7,
          recentForm: ["L", "W", "W", "L", "D"],
        },
      },
      {
        id: "m-241215-new-bha",
        matchweek: 18,
        kickoff: "2024-12-15T14:00:00Z",
        venue: "St James' Park",
        city: "Newcastle",
        status: "finished",
        headline: "세인트 제임스의 팽팽한 승부",
        referee: "Paul Tierney",
        home: {
          teamId: "new",
          leaguePosition: 8,
          recentForm: ["D", "W", "L", "D", "W"],
          score: 1,
        },
        away: {
          teamId: "bha",
          leaguePosition: 10,
          recentForm: ["L", "D", "L", "W", "D"],
          score: 1,
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
          teamId: "ful",
          leaguePosition: 12,
          recentForm: ["W", "L", "D", "L", "W"],
        },
        away: {
          teamId: "bre",
          leaguePosition: 13,
          recentForm: ["D", "L", "W", "L", "D"],
        },
      },
    ],
  },
  {
    date: "2024-12-21",
    fixtures: [
      {
        id: "m-241221-ars-liv",
        matchweek: 19,
        kickoff: "2024-12-21T17:30:00Z",
        venue: "Emirates Stadium",
        city: "London",
        status: "upcoming",
        headline: "Title race clash in North London",
        referee: "Chris Kavanagh",
        home: {
          teamId: "ars",
          leaguePosition: 2,
          recentForm: ["W", "W", "D", "W", "W"],
        },
        away: {
          teamId: "liv",
          leaguePosition: 3,
          recentForm: ["W", "D", "W", "W", "L"],
        },
      },
      {
        id: "m-241221-mci-new",
        matchweek: 19,
        kickoff: "2024-12-21T12:30:00Z",
        venue: "Etihad Stadium",
        city: "Manchester",
        status: "upcoming",
        headline: "City look to extend unbeaten run",
        referee: "Simon Hooper",
        home: {
          teamId: "mci",
          leaguePosition: 1,
          recentForm: ["W", "W", "D", "W", "W"],
        },
        away: {
          teamId: "new",
          leaguePosition: 8,
          recentForm: ["D", "W", "L", "D", "W"],
        },
      },
    ],
  },
  {
    date: "2024-12-22",
    fixtures: [
      {
        id: "m-241222-che-bha",
        matchweek: 19,
        kickoff: "2024-12-22T14:00:00Z",
        venue: "Stamford Bridge",
        city: "London",
        status: "finished",
        headline: "Chelsea edge Brighton in tight affair",
        referee: "Craig Pawson",
        home: {
          teamId: "che",
          leaguePosition: 6,
          recentForm: ["L", "W", "D", "D", "W"],
          score: 2,
        },
        away: {
          teamId: "bha",
          leaguePosition: 10,
          recentForm: ["L", "D", "L", "W", "D"],
          score: 1,
        },
      },
    ],
  },
];

export const MATCHWEEK_OPTIONS = [16, 17, 18, 19, 20];
