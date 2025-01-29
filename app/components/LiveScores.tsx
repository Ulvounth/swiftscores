"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

interface Match {
  fixture: {
    id: number;
    date: string;
    status: {
      short: string;
    };
  };
  teams: {
    home: {
      name: string;
      logo: string;
    };
    away: {
      name: string;
      logo: string;
    };
  };
  goals: {
    home: number | null;
    away: number | null;
  };
}

const LiveScores = () => {
  const [matches, setMatches] = useState<Match[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchMatches = async () => {
      setLoading(true);
      try {
        const response = await fetch("/api/live-scores");
        const data = await response.json();

        if (data.error) {
          setError(data.error);
        } else {
          setMatches(data);
        }
      } catch (error) {
        console.error("Error fetching fixtures:", error);
        setError("Unable to fetch fixtures. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchMatches();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-32">
        <div className="loader border-t-4 border-blue-500 rounded-full w-8 h-8 animate-spin"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center">
        <p className="text-red-500">{error}</p>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto p-4">
      {/* ✅ Improved League Header - Black Background */}
      <h1 className="text-xl font-bold text-white bg-black p-4 rounded-md shadow-md mb-4 flex items-center justify-center">
        🏆 English League One - Fixtures
      </h1>

      {matches.length > 0 ? (
        <div className="space-y-2">
          {matches.map((match) => (
            <div
              key={match.fixture.id}
              className="bg-white shadow-md rounded-lg p-3 flex justify-between items-center"
            >
              {/* ✅ Home Team */}
              <div className="flex-1 flex items-center space-x-2">
                <Image
                  src={match.teams.home.logo}
                  alt={match.teams.home.name}
                  width={24}
                  height={24}
                  className="w-6 h-6 object-contain"
                />
                <span className="font-medium text-sm">
                  {match.teams.home.name}
                </span>
              </div>

              {/* ✅ Match Score (or Placeholder) */}
              <div className="text-xl font-bold">
                {match.goals.home !== null && match.goals.away !== null
                  ? `${match.goals.home} - ${match.goals.away}`
                  : "–"}
              </div>

              {/* ✅ Away Team */}
              <div className="flex-1 flex items-center justify-end space-x-2">
                <span className="font-medium text-sm">
                  {match.teams.away.name}
                </span>
                <Image
                  src={match.teams.away.logo}
                  alt={match.teams.away.name}
                  width={24}
                  height={24}
                  className="w-6 h-6 object-contain"
                />
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-500 text-sm">
          No matches scheduled.
        </p>
      )}
    </div>
  );
};

export default LiveScores;
