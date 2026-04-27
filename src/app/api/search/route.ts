import { NextRequest, NextResponse } from "next/server";
import { searchArticles } from "@/lib/supabase";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const query = searchParams.get("q");
  const limit = searchParams.get("limit");

  if (!query || query.trim().length === 0) {
    return NextResponse.json({
      success: true,
      data: [],
      meta: { total: 0, query: "" },
    });
  }

  const { data, error } = await searchArticles(query.trim(), {
    limit: limit ? parseInt(limit, 10) : 8,
  });

  if (error) {
    return NextResponse.json(
      { success: false, error: "Search failed", data: [] },
      { status: 500 }
    );
  }

  return NextResponse.json({
    success: true,
    data: data || [],
    meta: { total: data?.length || 0, query },
  });
}
