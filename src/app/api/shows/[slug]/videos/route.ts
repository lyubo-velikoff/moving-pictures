import { NextResponse } from "next/server";
import { getShowVideos, getShowTrailer } from "@/lib/shows";

export const revalidate = 86400; // 24 hours

interface RouteParams {
  params: Promise<{ slug: string }>;
}

export async function GET(request: Request, { params }: RouteParams) {
  try {
    const { slug } = await params;
    const url = new URL(request.url);
    const trailerOnly = url.searchParams.get("trailer") === "true";

    if (trailerOnly) {
      const trailer = await getShowTrailer(slug);
      return NextResponse.json({ trailer });
    }

    const videos = await getShowVideos(slug);

    if (!videos) {
      return NextResponse.json(
        { error: "Videos not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ videos });
  } catch (error) {
    console.error("Failed to fetch videos:", error);
    return NextResponse.json(
      { error: "Failed to fetch videos" },
      { status: 500 }
    );
  }
}
