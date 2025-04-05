export const getTeamRank = async () => {
  const res = await fetch("https://infootball.kr/api/v1/main/teamrank");

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  return res.json();
};
