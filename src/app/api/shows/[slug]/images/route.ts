import { NextResponse } from "next/server";
import { getShowImages } from "@/lib/shows";

export const revalidate = 604800; // 7 days

interface RouteParams {
  params: Promise<{ slug: string }>;
}

export async function GET(request: Request, { params }: RouteParams) {
  try {
    const { slug } = await params;
    const images = await getShowImages(slug);

    if (!images) {
      return NextResponse.json(
        { error: "Images not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ images });
  } catch (error) {
    console.error("Failed to fetch images:", error);
    return NextResponse.json(
      { error: "Failed to fetch images" },
      { status: 500 }
    );
  }
}
