// Mock data for match details
export const matchesData = {
  "match-1": {
    id: "match-1",
    date: "2025-05-15T19:45:00",
    competition: "Premier League",
    matchday: "Matchday 36",
    status: "upcoming",
    homeTeam: {
      name: "Manchester City",
      logo: "https://resources.premierleague.com/premierleague/badges/50/t43.png",
      id: "manchester-city",
      shortName: "MCI",
      primaryColor: "#6CABDD",
      manager: "Pep Guardiola",
      formation: "4-3-3",
      recentForm: ["W", "W", "D", "W", "W"],
    },
    awayTeam: {
      name: "Liverpool",
      logo: "https://resources.premierleague.com/premierleague/badges/50/t14@x2.png",
      id: "liverpool",
      shortName: "LIV",
      primaryColor: "#C8102E",
      manager: "Jürgen Klopp",
      formation: "4-3-3",
      recentForm: ["W", "D", "L", "W", "W"],
    },
    venue: "Etihad Stadium",
    city: "Manchester",
    capacity: 55097,
    referee: "Michael Oliver",
    homeLineup: [
      { number: 31, name: "Ederson", position: "GK" },
      { number: 2, name: "Kyle Walker", position: "RB" },
      { number: 3, name: "Rúben Dias", position: "CB" },
      { number: 14, name: "Aymeric Laporte", position: "CB" },
      { number: 27, name: "João Cancelo", position: "LB" },
      { number: 16, name: "Rodri", position: "CDM" },
      { number: 17, name: "Kevin De Bruyne", position: "CM" },
      { number: 8, name: "İlkay Gündoğan", position: "CM" },
      { number: 26, name: "Riyad Mahrez", position: "RW" },
      { number: 9, name: "Erling Haaland", position: "ST" },
      { number: 10, name: "Jack Grealish", position: "LW" },
    ],
    homeSubs: [
      { number: 18, name: "Stefan Ortega", position: "GK" },
      { number: 25, name: "Manuel Akanji", position: "CB" },
      { number: 6, name: "Nathan Aké", position: "CB" },
      { number: 21, name: "Sergio Gómez", position: "LB" },
      { number: 20, name: "Bernardo Silva", position: "CM" },
      { number: 47, name: "Phil Foden", position: "AM" },
      { number: 19, name: "Julián Álvarez", position: "ST" },
    ],
    awayLineup: [
      { number: 1, name: "Alisson", position: "GK" },
      { number: 66, name: "Trent Alexander-Arnold", position: "RB" },
      { number: 4, name: "Virgil van Dijk", position: "CB" },
      { number: 5, name: "Ibrahima Konaté", position: "CB" },
      { number: 26, name: "Andrew Robertson", position: "LB" },
      { number: 3, name: "Fabinho", position: "CDM" },
      { number: 6, name: "Thiago Alcântara", position: "CM" },
      { number: 14, name: "Jordan Henderson", position: "CM" },
      { number: 11, name: "Mohamed Salah", position: "RW" },
      { number: 9, name: "Darwin Núñez", position: "ST" },
      { number: 20, name: "Diogo Jota", position: "LW" },
    ],
    awaySubs: [
      { number: 13, name: "Adrián", position: "GK" },
      { number: 2, name: "Joe Gomez", position: "CB" },
      { number: 21, name: "Kostas Tsimikas", position: "LB" },
      { number: 17, name: "Curtis Jones", position: "CM" },
      { number: 19, name: "Harvey Elliott", position: "AM" },
      { number: 7, name: "Luis Díaz", position: "LW" },
      { number: 27, name: "Darwin Núñez", position: "ST" },
    ],
    headToHead: {
      total: 220,
      homeWins: 90,
      draws: 60,
      awayWins: 70,
      recentMatches: [
        {
          date: "2024-12-03",
          competition: "Premier League",
          homeTeam: "Liverpool",
          awayTeam: "Manchester City",
          result: "2-1",
        },
        {
          date: "2024-08-20",
          competition: "Premier League",
          homeTeam: "Manchester City",
          awayTeam: "Liverpool",
          result: "3-1",
        },
        {
          date: "2024-04-10",
          competition: "FA Cup",
          homeTeam: "Manchester City",
          awayTeam: "Liverpool",
          result: "0-1",
        },
        {
          date: "2023-12-22",
          competition: "Premier League",
          homeTeam: "Liverpool",
          awayTeam: "Manchester City",
          result: "1-1",
        },
        {
          date: "2023-08-27",
          competition: "Premier League",
          homeTeam: "Manchester City",
          awayTeam: "Liverpool",
          result: "4-1",
        },
      ],
    },
    predictions: {
      homeWin: 45,
      draw: 30,
      awayWin: 25,
      predictedScore: "2-1",
      keyBattles: [
        {
          player1: "Erling Haaland",
          player2: "Virgil van Dijk",
          description:
            "The league's top scorer against one of the best defenders in the world.",
        },
        {
          player1: "Kevin De Bruyne",
          player2: "Fabinho",
          description:
            "De Bruyne's creativity against Fabinho's defensive prowess in midfield.",
        },
        {
          player1: "Rúben Dias",
          player2: "Mohamed Salah",
          description:
            "City's defensive leader against Liverpool's prolific winger.",
        },
      ],
    },
  },
  "match-2": {
    id: "match-2",
    date: "2025-05-08T19:45:00",
    competition: "Premier League",
    matchday: "Matchday 35",
    status: "completed",
    homeTeam: {
      name: "Manchester City",
      logo: "https://resources.premierleague.com/premierleague/badges/50/t43.png",
      id: "manchester-city",
      shortName: "MCI",
      primaryColor: "#6CABDD",
      manager: "Pep Guardiola",
      formation: "4-3-3",
      recentForm: ["W", "W", "D", "W", "W"],
    },
    awayTeam: {
      name: "Tottenham",
      logo: "https://resources.premierleague.com/premierleague/badges/50/t6.png",
      id: "tottenham",
      shortName: "TOT",
      primaryColor: "#132257",
      manager: "Ange Postecoglou",
      formation: "4-2-3-1",
      recentForm: ["L", "W", "W", "D", "W"],
    },
    score: {
      homeScore: 3,
      awayScore: 1,
      halfTimeScore: "1-0",
    },
    venue: "Etihad Stadium",
    city: "Manchester",
    capacity: 55097,
    attendance: 53470,
    referee: "Anthony Taylor",
    events: [
      {
        type: "goal",
        team: "home",
        player: "Erling Haaland",
        minute: 23,
        assistedBy: "Kevin De Bruyne",
      },
      {
        type: "yellowCard",
        team: "away",
        player: "Cristian Romero",
        minute: 37,
      },
      {
        type: "goal",
        team: "home",
        player: "Kevin De Bruyne",
        minute: 52,
        assistedBy: "Jack Grealish",
      },
      {
        type: "goal",
        team: "away",
        player: "Son Heung-min",
        minute: 68,
        assistedBy: "James Maddison",
      },
      {
        type: "substitution",
        team: "home",
        playerOut: "Jack Grealish",
        playerIn: "Phil Foden",
        minute: 72,
      },
      {
        type: "substitution",
        team: "away",
        playerOut: "James Maddison",
        playerIn: "Rodrigo Bentancur",
        minute: 76,
      },
      {
        type: "yellowCard",
        team: "home",
        player: "Rodri",
        minute: 81,
      },
      {
        type: "goal",
        team: "home",
        player: "Phil Foden",
        minute: 87,
        assistedBy: "Kevin De Bruyne",
      },
    ],
    stats: {
      possession: { home: 64, away: 36 },
      shots: { home: 18, away: 7 },
      shotsOnTarget: { home: 9, away: 3 },
      corners: { home: 8, away: 2 },
      fouls: { home: 9, away: 12 },
      yellowCards: { home: 1, away: 1 },
      redCards: { home: 0, away: 0 },
      offsides: { home: 2, away: 3 },
      passes: { home: 642, away: 361 },
      passAccuracy: { home: 92, away: 84 },
    },
    homeLineup: [
      { number: 31, name: "Ederson", position: "GK" },
      { number: 2, name: "Kyle Walker", position: "RB" },
      { number: 3, name: "Rúben Dias", position: "CB" },
      { number: 14, name: "Aymeric Laporte", position: "CB" },
      { number: 27, name: "João Cancelo", position: "LB" },
      { number: 16, name: "Rodri", position: "CDM" },
      { number: 17, name: "Kevin De Bruyne", position: "CM" },
      { number: 8, name: "İlkay Gündoğan", position: "CM" },
      { number: 26, name: "Riyad Mahrez", position: "RW" },
      { number: 9, name: "Erling Haaland", position: "ST" },
      { number: 10, name: "Jack Grealish", position: "LW" },
    ],
    homeSubs: [
      { number: 18, name: "Stefan Ortega", position: "GK" },
      { number: 25, name: "Manuel Akanji", position: "CB" },
      { number: 6, name: "Nathan Aké", position: "CB" },
      { number: 21, name: "Sergio Gómez", position: "LB" },
      { number: 20, name: "Bernardo Silva", position: "CM" },
      { number: 47, name: "Phil Foden", position: "AM" },
      { number: 19, name: "Julián Álvarez", position: "ST" },
    ],
    awayLineup: [
      { number: 1, name: "Guglielmo Vicario", position: "GK" },
      { number: 23, name: "Pedro Porro", position: "RB" },
      { number: 17, name: "Cristian Romero", position: "CB" },
      { number: 37, name: "Micky van de Ven", position: "CB" },
      { number: 33, name: "Ben Davies", position: "LB" },
      { number: 8, name: "Yves Bissouma", position: "CDM" },
      { number: 30, name: "Rodrigo Bentancur", position: "CM" },
      { number: 21, name: "Dejan Kulusevski", position: "RW" },
      { number: 10, name: "James Maddison", position: "AM" },
      { number: 7, name: "Son Heung-min", position: "LW" },
      { number: 9, name: "Richarlison", position: "ST" },
    ],
    awaySubs: [
      { number: 40, name: "Brandon Austin", position: "GK" },
      { number: 4, name: "Oliver Skipp", position: "CM" },
      { number: 38, name: "Emerson Royal", position: "RB" },
      { number: 12, name: "Djed Spence", position: "RB" },
      { number: 29, name: "Pape Matar Sarr", position: "CM" },
      { number: 11, name: "Bryan Gil", position: "LW" },
      { number: 14, name: "Ivan Perišić", position: "LW" },
    ],
    headToHead: {
      total: 168,
      homeWins: 65,
      draws: 38,
      awayWins: 65,
      recentMatches: [
        {
          date: "2024-12-03",
          competition: "Premier League",
          homeTeam: "Tottenham",
          awayTeam: "Manchester City",
          result: "0-2",
        },
        {
          date: "2024-08-20",
          competition: "Premier League",
          homeTeam: "Manchester City",
          awayTeam: "Tottenham",
          result: "3-1",
        },
        {
          date: "2024-01-26",
          competition: "FA Cup",
          homeTeam: "Tottenham",
          awayTeam: "Manchester City",
          result: "0-1",
        },
        {
          date: "2023-12-14",
          competition: "Premier League",
          homeTeam: "Tottenham",
          awayTeam: "Manchester City",
          result: "2-2",
        },
        {
          date: "2023-08-15",
          competition: "Premier League",
          homeTeam: "Manchester City",
          awayTeam: "Tottenham",
          result: "2-0",
        },
      ],
    },
  },
};
