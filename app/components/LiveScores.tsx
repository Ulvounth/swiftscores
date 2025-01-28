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
      <div className="flex justify-center items-center h-40">
        <div className="loader border-t-4 border-blue-500 rounded-full w-12 h-12 animate-spin"></div>
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
    <div className="max-w-4xl mx-auto p-4">
      {/* ✅ Show "League One" Title Only Once */}
      <h1 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
        🏆 English League One - Fixtures
      </h1>

      {matches.length > 0 ? (
        <div className="space-y-4">
          {matches.map((match) => (
            <div
              key={match.fixture.id}
              className="bg-white shadow-md rounded-lg p-4 flex justify-between items-center"
            >
              {/* ✅ Home Team */}
              <div className="flex-1 text-center">
                <span className="font-semibold">{match.teams.home.name}</span>
                <div className="text-3xl font-bold">
                  {match.goals.home ?? "-"}
                </div>
              </div>

              {/* ✅ Match Status (Live, Finished, Upcoming) */}
              <div className="text-center">
                {match.fixture.status.short === "NS" ? (
                  <span className="text-gray-500 text-sm">Not Started</span>
                ) : match.fixture.status.short === "LIVE" ? (
                  <span className="bg-red-500 text-white text-xs px-3 py-1 rounded-md">
                    LIVE
                  </span>
                ) : (
                  <span className="text-green-600 text-sm">Finished</span>
                )}
              </div>

              {/* ✅ Away Team */}
              <div className="flex-1 text-center">
                <span className="font-semibold">{match.teams.away.name}</span>
                <div className="text-3xl font-bold">
                  {match.goals.away ?? "-"}
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-500">No matches scheduled.</p>
      )}
    </div>
  );
};

export default LiveScores;
