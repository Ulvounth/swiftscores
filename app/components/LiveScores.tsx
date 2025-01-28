"use client";

import { useEffect, useState } from "react";

interface Match {
  fixture: {
    id: number;
    date: string;
    status: {
      short: string;
    };
  };
  league: {
    name: string; // ✅ Now includes league name
  };
  teams: {
    home: {
      name: string;
    };
    away: {
      name: string;
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
    <div className="max-w-2xl mx-auto p-2">
      {/* ✅ Improved League Header */}
      <h1 className="text-xl font-bold text-white bg-gray-800 p-3 rounded-md shadow-sm mb-3 flex items-center">
        🏆 English League One - Fixtures
      </h1>

      {matches.length > 0 ? (
        <div className="space-y-2">
          {matches.map((match) => (
            <div
              key={match.fixture.id}
              className="bg-white shadow-sm rounded-md p-2 flex justify-between items-center"
            >
              {/* ✅ Home Team */}
              <div className="flex-1 text-center">
                <span className="font-medium text-sm">
                  {match.teams.home.name}
                </span>
                <div className="text-xl font-bold">
                  {match.goals.home ?? "-"}
                </div>
              </div>

              {/* ✅ Match Status (Live, Finished, Upcoming) */}
              <div className="text-center">
                {match.fixture.status.short === "NS" ? (
                  <span className="text-gray-500 text-xs">Not Started</span>
                ) : match.fixture.status.short === "LIVE" ? (
                  <span className="bg-red-500 text-white text-xs px-2 py-0.5 rounded-md">
                    LIVE
                  </span>
                ) : (
                  <span className="text-green-600 text-xs">Finished</span>
                )}
              </div>

              {/* ✅ Away Team */}
              <div className="flex-1 text-center">
                <span className="font-medium text-sm">
                  {match.teams.away.name}
                </span>
                <div className="text-xl font-bold">
                  {match.goals.away ?? "-"}
                </div>
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
