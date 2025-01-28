import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    // Parse the webhook payload
    const data = await req.json();

    // Example: Log received data (match event)
    console.log("Webhook received:", data);

    // Process the data (e.g., update scores in the database)
    // For example:
    // const { match_id, home_score, away_score } = data;
    // Update your state or database here...

    return NextResponse.json({ message: "Webhook processed successfully" });
  } catch (error) {
    console.error("Webhook processing error:", error);
    return NextResponse.json(
      { message: "Error processing webhook" },
      { status: 500 }
    );
  }
}
