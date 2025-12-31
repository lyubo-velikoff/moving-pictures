import { NextResponse } from "next/server";
import { getShow } from "@/lib/shows";

export const revalidate = 86400; // 24 hours

interface RouteParams {
  params: Promise<{ slug: string }>;
}

export async function GET(request: Request, { params }: RouteParams) {
  try {
    const { slug } = await params;
    const show = await getShow(slug);

    if (!show) {
      return NextResponse.json(
        { error: "Show not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ show });
  } catch (error) {
    console.error("Failed to fetch show:", error);
    return NextResponse.json(
      { error: "Failed to fetch show" },
      { status: 500 }
    );
  }
}
