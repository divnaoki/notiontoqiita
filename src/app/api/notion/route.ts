import { NextResponse } from "next/server";
import { extractPageId, getPageContent } from "@/lib/notion";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    console.log("Received request body:", body);

    if (!body || !body.url) {
      return NextResponse.json(
        { error: "URL is required", details: "Request body must contain a 'url' field" },
        { status: 400 }
      );
    }

    const pageId = extractPageId(body.url);
    console.log("Extracted page ID:", pageId);

    if (!pageId) {
      return NextResponse.json(
        { error: "Invalid Notion URL", details: "Could not extract a valid page ID from the URL" },
        { status: 400 }
      );
    }

    const content = await getPageContent(pageId);
    return NextResponse.json(content);
  } catch (error) {
    console.error("Error processing request:", error);
    return NextResponse.json(
      { 
        error: "Failed to fetch Notion content",
        details: error instanceof Error ? error.message : "Unknown error occurred"
      },
      { status: 500 }
    );
  }
} 