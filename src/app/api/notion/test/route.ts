import { NextResponse } from "next/server";
import { notion } from "@/lib/notion";

export async function GET() {
  try {
    // インテグレーションの情報を取得
    const response = await notion.users.me({});

    return NextResponse.json({
      success: true,
      message: "Notion APIへの接続に成功しました",
      user: response,
    });
  } catch (error) {
    console.error("Notion API接続エラー:", error);
    return NextResponse.json(
      {
        success: false,
        message: "Notion APIへの接続に失敗しました",
      },
      { status: 500 }
    );
  }
} 