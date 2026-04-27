import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email, categories } = body;

    if (!email || !email.includes("@")) {
      return NextResponse.json(
        { error: "请提供有效的邮箱地址" },
        { status: 400 }
      );
    }

    if (!supabase) {
      return NextResponse.json(
        { error: "服务暂不可用，请稍后重试" },
        { status: 503 }
      );
    }

    const validCategories = ["design", "ai"];
    const selectedCategories = Array.isArray(categories)
      ? categories.filter((c) => validCategories.includes(c))
      : ["design", "ai"];

    const { error } = await supabase.from("subscriptions").upsert(
      {
        email: email.toLowerCase().trim(),
        categories: selectedCategories,
        subscribed: true,
        updated_at: new Date().toISOString(),
      },
      {
        onConflict: "email",
        ignoreDuplicates: false,
      }
    );

    if (error) {
      console.error("Subscription error:", error);
      return NextResponse.json(
        { error: "订阅失败，请稍后重试" },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "订阅成功！",
      email,
      categories: selectedCategories,
    });
  } catch (error) {
    console.error("Subscribe error:", error);
    return NextResponse.json(
      { error: "请求处理失败" },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const email = searchParams.get("email");

    if (!email) {
      return NextResponse.json(
        { error: "缺少邮箱参数" },
        { status: 400 }
      );
    }

    if (!supabase) {
      return NextResponse.json(
        { error: "服务暂不可用，请稍后重试" },
        { status: 503 }
      );
    }

    const { error } = await supabase
      .from("subscriptions")
      .update({ subscribed: false, updated_at: new Date().toISOString() })
      .eq("email", email.toLowerCase().trim());

    if (error) {
      console.error("Unsubscribe error:", error);
      return NextResponse.json(
        { error: "退订失败，请稍后重试" },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "已退订",
    });
  } catch (error) {
    console.error("Unsubscribe error:", error);
    return NextResponse.json(
      { error: "请求处理失败" },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const email = searchParams.get("email");

    if (!email) {
      return NextResponse.json(
        { error: "缺少邮箱参数" },
        { status: 400 }
      );
    }

    if (!supabase) {
      return NextResponse.json(
        { error: "服务暂不可用" },
        { status: 503 }
      );
    }

    const { data, error } = await supabase
      .from("subscriptions")
      .select("email, categories, subscribed")
      .eq("email", email.toLowerCase().trim())
      .single();

    if (error || !data) {
      return NextResponse.json(
        { subscribed: false },
        { status: 200 }
      );
    }

    return NextResponse.json({
      subscribed: data.subscribed,
      categories: data.categories,
    });
  } catch (error) {
    console.error("Check subscription error:", error);
    return NextResponse.json(
      { error: "请求处理失败" },
      { status: 500 }
    );
  }
}
