import { NextResponse } from "next/server";

export async function GET() {
  const fixtures = [
    {
      fixture: {
        id: 1,
        date: new Date().toISOString(),
        status: { short: "NS" },
      },
      teams: { home: { name: "Team A" }, away: { name: "Team B" } },
      goals: { home: 0, away: 0 },
    },
    {
      fixture: {
        id: 2,
        date: new Date().toISOString(),
        status: { short: "FT" },
      },
      teams: { home: { name: "Team C" }, away: { name: "Team D" } },
      goals: { home: 1, away: 2 },
    },
  ];
  return NextResponse.json(fixtures);
}
