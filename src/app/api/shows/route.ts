import { NextResponse } from "next/server";
import { getAllShows } from "@/lib/shows";

export const revalidate = 86400; // 24 hours

export async function GET() {
  try {
    const shows = await getAllShows();
    return NextResponse.json({ shows });
  } catch (error) {
    console.error("Failed to fetch shows:", error);
    return NextResponse.json(
      { error: "Failed to fetch shows" },
      { status: 500 }
    );
  }
}
