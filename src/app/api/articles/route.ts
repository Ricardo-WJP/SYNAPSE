import { NextRequest, NextResponse } from "next/server";
import { getArticles, getArticlesCount } from "@/lib/supabase";
import type { ApiResponse } from "@/lib/types";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const category = searchParams.get("category") as "design" | "ai" | null;
  const page = parseInt(searchParams.get("page") || "1", 10);
  const limit = parseInt(searchParams.get("limit") || "10", 10);

  const offset = (page - 1) * limit;

  const { data: articles, error } = await getArticles({
    category: category || undefined,
    limit,
    offset,
  });

  if (error) {
    const response: ApiResponse<null> = {
      success: false,
      error: error.message,
    };
    return NextResponse.json(response, { status: 500 });
  }

  const { count } = await getArticlesCount(category || undefined);

  const response: ApiResponse<typeof articles> = {
    success: true,
    data: articles,
    meta: {
      total: count || 0,
      page,
      limit,
    },
  };

  return NextResponse.json(response);
}
