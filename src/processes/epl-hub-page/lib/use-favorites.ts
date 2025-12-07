import { useCallback, useEffect, useState } from "react";

const FAVORITE_TEAMS_STORAGE_KEY = "eplFavoriteTeams";
const FAVORITE_MATCHES_STORAGE_KEY = "eplFavoriteMatches";

export const useFavorites = () => {
  const [favoriteTeams, setFavoriteTeams] = useState<string[]>([]);
  const [favoriteMatches, setFavoriteMatches] = useState<string[]>([]);
  const [storageReady, setStorageReady] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    try {
      const storedTeams = window.localStorage.getItem(
        FAVORITE_TEAMS_STORAGE_KEY
      );
      const storedMatches = window.localStorage.getItem(
        FAVORITE_MATCHES_STORAGE_KEY
      );

      if (storedTeams) {
        const parsedTeams = JSON.parse(storedTeams) as string[];
        setFavoriteTeams(parsedTeams.filter(Boolean));
      }

      if (storedMatches) {
        const parsedMatches = JSON.parse(storedMatches) as string[];
        setFavoriteMatches(parsedMatches.filter(Boolean));
      }
    } catch (error) {
      console.error("Failed to load favorites from storage", error);
    } finally {
      setStorageReady(true);
    }
  }, []);

  useEffect(() => {
    if (!storageReady || typeof window === "undefined") {
      return;
    }

    window.localStorage.setItem(
      FAVORITE_TEAMS_STORAGE_KEY,
      JSON.stringify(favoriteTeams)
    );
  }, [favoriteTeams, storageReady]);

  useEffect(() => {
    if (!storageReady || typeof window === "undefined") {
      return;
    }

    window.localStorage.setItem(
      FAVORITE_MATCHES_STORAGE_KEY,
      JSON.stringify(favoriteMatches)
    );
  }, [favoriteMatches, storageReady]);

  const toggleFavoriteTeam = useCallback((teamId: string) => {
    setFavoriteTeams((previous) =>
      previous.includes(teamId)
        ? previous.filter((id) => id !== teamId)
        : [...previous, teamId]
    );
  }, []);

  const toggleFavoriteMatch = useCallback((matchId: string) => {
    setFavoriteMatches((previous) =>
      previous.includes(matchId)
        ? previous.filter((id) => id !== matchId)
        : [...previous, matchId]
    );
  }, []);

  const clearFavoriteTeams = useCallback(() => {
    setFavoriteTeams([]);
  }, []);

  const clearFavoriteMatches = useCallback(() => {
    setFavoriteMatches([]);
  }, []);

  return {
    favoriteTeams,
    favoriteMatches,
    toggleFavoriteTeam,
    toggleFavoriteMatch,
    clearFavoriteTeams,
    clearFavoriteMatches,
    storageReady,
  };
};
