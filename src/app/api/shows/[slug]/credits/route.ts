import { NextResponse } from "next/server";
import { getShowCredits } from "@/lib/shows";

export const revalidate = 86400; // 24 hours

interface RouteParams {
  params: Promise<{ slug: string }>;
}

export async function GET(request: Request, { params }: RouteParams) {
  try {
    const { slug } = await params;
    const credits = await getShowCredits(slug);

    if (!credits) {
      return NextResponse.json(
        { error: "Credits not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ credits });
  } catch (error) {
    console.error("Failed to fetch credits:", error);
    return NextResponse.json(
      { error: "Failed to fetch credits" },
      { status: 500 }
    );
  }
}
