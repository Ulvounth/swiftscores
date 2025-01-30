"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

interface Match {
  fixture: { id: number };
  teams: {
    home: { name: string; logo: string };
    away: { name: string; logo: string };
  };
  goals: { home: number | null; away: number | null };
}

const LiveScores = () => {
  const [matches, setMatches] = useState<Match[]>([]);
  const [favorites, setFavorites] = useState<number[]>(() => {
    if (typeof window !== "undefined") {
      return JSON.parse(localStorage.getItem("favorites") || "[]");
    }
    return [];
  });

  useEffect(() => {
    const fetchMatches = async () => {
      try {
        const response = await fetch("/api/live-scores");
        const data = await response.json();
        setMatches(data);
      } catch (error) {
        console.error("Error fetching fixtures:", error);
      }
    };

    fetchMatches();
  }, []);

  useEffect(() => {
    localStorage.setItem("favorites", JSON.stringify(favorites));
  }, [favorites]);

  const toggleFavorite = (id: number) => {
    setFavorites((prev) =>
      prev.includes(id) ? prev.filter((fav) => fav !== id) : [...prev, id]
    );
  };

  return (
    <div className="w-full sm:max-w-3xl mx-auto p-4">
      <h1 className="text-lg sm:text-xl font-bold text-white bg-black p-4 rounded-md shadow-md mb-4 flex items-center justify-center">
        🏆 English League One - Fixtures
      </h1>

      <div className="space-y-2">
        {matches.map((match) => (
          <div
            key={match.fixture.id}
            className="bg-white shadow-md rounded-lg p-2 sm:p-3 grid grid-cols-4 items-center"
          >
            <input
              type="checkbox"
              checked={favorites.includes(match.fixture.id)}
              onChange={() => toggleFavorite(match.fixture.id)}
              className="w-5 h-5"
            />
            <div className="flex items-center justify-start space-x-2">
              <Image
                src={match.teams.home.logo}
                alt={match.teams.home.name}
                width={28}
                height={28}
                className="w-7 h-7 object-contain"
              />
              <span className="font-medium text-sm">
                {match.teams.home.name}
              </span>
            </div>

            <div className="text-lg sm:text-xl font-bold text-center">
              {match.goals.home ?? "-"} - {match.goals.away ?? "-"}
            </div>

            <div className="flex items-center justify-end space-x-2">
              <span className="font-medium text-sm">
                {match.teams.away.name}
              </span>
              <Image
                src={match.teams.away.logo}
                alt={match.teams.away.name}
                width={28}
                height={28}
                className="w-7 h-7 object-contain"
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LiveScores;
