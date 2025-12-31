import { NextResponse } from "next/server";
import { getShowEpisodes } from "@/lib/shows";

export const revalidate = 21600; // 6 hours

interface RouteParams {
  params: Promise<{ slug: string }>;
}

export async function GET(request: Request, { params }: RouteParams) {
  try {
    const { slug } = await params;
    const seasons = await getShowEpisodes(slug);

    if (!seasons) {
      return NextResponse.json(
        { error: "Episodes not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ seasons });
  } catch (error) {
    console.error("Failed to fetch episodes:", error);
    return NextResponse.json(
      { error: "Failed to fetch episodes" },
      { status: 500 }
    );
  }
}
