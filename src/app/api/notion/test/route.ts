import { NextResponse } from "next/server";
import { notion } from "@/lib/notion";

export async function GET() {
  try {
    // インテグレーションの情報を取得
    const response = await notion.users.me();
    
    return NextResponse.json({
      success: true,
      message: "Notion integration is working",
      user: {
        id: response.id,
        name: response.name,
        email: response.email,
        avatar_url: response.avatar_url,
      }
    });
  } catch (error) {
    console.error("Error testing Notion integration:", error);
    return NextResponse.json(
      { 
        success: false,
        error: "Failed to connect to Notion",
        details: error instanceof Error ? error.message : "Unknown error"
      },
      { status: 500 }
    );
  }
} 