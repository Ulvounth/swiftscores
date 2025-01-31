import Image from "next/image";

// ✅ Define TypeScript interface for match data
interface Match {
  fixture: { id: number };
  teams: {
    home: { name: string; logo: string };
    away: { name: string; logo: string };
  };
  goals: { home: number | null; away: number | null };
}

const LiveScores = async () => {
  // ✅ Fetch matches from API route (better for SSR)
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/live-scores`,
    { cache: "no-store" }
  );
  const matches: Match[] = await res.json();

  return (
    <div className="w-full sm:max-w-3xl mx-auto p-4">
      <h1 className="text-lg sm:text-xl font-bold text-white bg-black p-4 rounded-md shadow-md mb-4 flex items-center justify-center">
        🏆 English League One - Fixtures
      </h1>

      <div className="space-y-2">
        {matches.map((match) => (
          <div
            key={match.fixture.id}
            className="bg-white shadow-md rounded-lg p-2 sm:p-3 grid grid-cols-3 items-center"
          >
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
