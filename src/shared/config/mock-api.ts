export const USE_MOCK_API =
  process.env.NEXT_PUBLIC_USE_MOCK_API !== "false";

export const MOCK_LEAGUE_ID =
  process.env.NEXT_PUBLIC_EPL_LEAGUE_ID ?? "epl";

export const MOCK_SEASON =
  process.env.NEXT_PUBLIC_EPL_SEASON ?? "2024-25";

export const MOCK_LOCALE =
  process.env.NEXT_PUBLIC_DEFAULT_LOCALE ?? "ko-KR";

export const now = () => Date.now();
