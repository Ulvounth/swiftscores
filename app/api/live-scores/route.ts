import { NextResponse } from "next/server";
import axios from "axios";

export async function GET() {
  const API_KEY = process.env.API_FOOTBALL_KEY;
  const LEAGUE_ID = 41; // League One ID
  const SEASON = 2023; // Using 2023 due to free plan limitations

  try {
    const fixturesResponse = await axios.get(
      "https://v3.football.api-sports.io/fixtures",
      {
        params: {
          league: LEAGUE_ID,
          season: SEASON,
        },
        headers: {
          "x-apisports-key": API_KEY,
        },
      }
    );

    const allFixtures = fixturesResponse.data.response;

    // ✅ Limit the array to a maximum of 20 matches
    const limitedFixtures = allFixtures.slice(0, 20);

    return NextResponse.json(limitedFixtures);
  } catch (error) {
    console.error("Error fetching fixtures:", error);
    return NextResponse.json(
      { error: "Unable to fetch fixtures" },
      { status: 500 }
    );
  }
}
