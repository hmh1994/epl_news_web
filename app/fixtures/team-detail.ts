// Mock database of teams
export const teamsData = {
  liverpool: {
    id: "liverpool",
    name: "Liverpool",
    logo: "https://resources.premierleague.com/premierleague/badges/50/t14@x2.png",
    founded: 1892,
    stadium: "Anfield",
    capacity: 53394,
    manager: "Jürgen Klopp",
    website: "www.liverpoolfc.com",
    colors: "Red",
    nickname: "The Reds",
    position: 3,
    played: 38,
    won: 24,
    drawn: 10,
    lost: 4,
    gd: 46,
    points: 82,
    description:
      "Liverpool Football Club is a professional football club based in Liverpool, England. The club competes in the Premier League, the top tier of English football. Founded in 1892, the club joined the Football League the following year and has played its home games at Anfield since its formation.",
    trophies: [
      { name: "Premier League/First Division", count: 19 },
      { name: "FA Cup", count: 8 },
      { name: "UEFA Champions League", count: 6 },
      { name: "League Cup", count: 9 },
    ],
    players: [
      {
        id: 1,
        name: "Alisson",
        position: "Goalkeeper",
        number: 1,
        nationality: "Brazil",
        age: 31,
        image:
          "https://resources.premierleague.com/premierleague/photos/players/40x40/p609640.png",
      },
      {
        id: 2,
        name: "Trent Alexander-Arnold",
        position: "Defender",
        number: 66,
        nationality: "England",
        age: 25,
        image:
          "https://resources.premierleague.com/premierleague/photos/players/40x40/p609640.png",
      },
      {
        id: 3,
        name: "Virgil van Dijk",
        position: "Defender",
        number: 4,
        nationality: "Netherlands",
        age: 32,
        image:
          "https://resources.premierleague.com/premierleague/photos/players/40x40/p609640.png",
      },
      {
        id: 4,
        name: "Andrew Robertson",
        position: "Defender",
        number: 26,
        nationality: "Scotland",
        age: 29,
        image:
          "https://resources.premierleague.com/premierleague/photos/players/40x40/p609640.png",
      },
      {
        id: 5,
        name: "Fabinho",
        position: "Midfielder",
        number: 3,
        nationality: "Brazil",
        age: 30,
        image:
          "https://resources.premierleague.com/premierleague/photos/players/40x40/p609640.png",
      },
      {
        id: 6,
        name: "Dominik Szoboszlai",
        position: "Midfielder",
        number: 8,
        nationality: "Hungary",
        age: 23,
        image:
          "https://resources.premierleague.com/premierleague/photos/players/40x40/p609640.png",
      },
      {
        id: 7,
        name: "Alexis Mac Allister",
        position: "Midfielder",
        number: 10,
        nationality: "Argentina",
        age: 24,
        image:
          "https://resources.premierleague.com/premierleague/photos/players/40x40/p609640.png",
      },
      {
        id: 8,
        name: "Mohamed Salah",
        position: "Forward",
        number: 11,
        nationality: "Egypt",
        age: 31,
        image:
          "https://resources.premierleague.com/premierleague/photos/players/40x40/p609640.png",
      },
      {
        id: 9,
        name: "Darwin Núñez",
        position: "Forward",
        number: 9,
        nationality: "Uruguay",
        age: 24,
        image:
          "https://resources.premierleague.com/premierleague/photos/players/40x40/p609640.png",
      },
      {
        id: 10,
        name: "Luis Díaz",
        position: "Forward",
        number: 7,
        nationality: "Colombia",
        age: 26,
        image:
          "https://resources.premierleague.com/premierleague/photos/players/40x40/p609640.png",
      },
      {
        id: 11,
        name: "Diogo Jota",
        position: "Forward",
        number: 20,
        nationality: "Portugal",
        age: 26,
        image:
          "https://resources.premierleague.com/premierleague/photos/players/40x40/p609640.png",
      },
    ],
    recentMatches: [
      {
        opponent: "Manchester United",
        result: "W 3-0",
        date: "2023-04-26",
        home: true,
      },
      { opponent: "Everton", result: "W 2-0", date: "2023-04-20", home: false },
      {
        opponent: "Manchester City",
        result: "D 1-1",
        date: "2023-04-13",
        home: false,
      },
      { opponent: "Arsenal", result: "L 1-3", date: "2023-04-06", home: true },
      { opponent: "Brighton", result: "W 3-1", date: "2023-03-30", home: true },
    ],
    upcomingMatches: [
      { opponent: "Tottenham", date: "2023-05-03", time: "15:00", home: false },
      {
        opponent: "Aston Villa",
        date: "2023-05-10",
        time: "17:30",
        home: true,
      },
      { opponent: "Newcastle", date: "2023-05-17", time: "20:00", home: false },
    ],
  },
};
