import { Client } from "@notionhq/client";

if (!process.env.NOTION_API_KEY) {
  throw new Error("Missing NOTION_API_KEY environment variable");
}

export const notion = new Client({
  auth: process.env.NOTION_API_KEY,
});

interface NotionPageProperties {
  title?: {
    title: Array<{ plain_text: string }>;
  };
  Name?: {
    title: Array<{ plain_text: string }>;
  };
  Tags?: {
    multi_select: Array<{ name: string }>;
  };
}

interface NotionPage {
  properties: NotionPageProperties;
  last_edited_time: string;
  created_time: string;
}

export async function getPageContent(pageId: string) {
  try {
    // ページの存在確認
    const page = await notion.pages.retrieve({ page_id: pageId }) as NotionPage;
    if (!page) {
      throw new Error("Page not found");
    }

    // ページの内容を取得
    const blocks = await notion.blocks.children.list({
      block_id: pageId,
      page_size: 100,
    });

    // タイトルの取得（ページのプロパティから）
    const title = page.properties?.title?.title?.[0]?.plain_text || 
                 page.properties?.Name?.title?.[0]?.plain_text || 
                 "Untitled";

    // タグの取得（ページのプロパティから）
    const tags = page.properties?.Tags?.multi_select || [];
    const tagNames = tags.map(tag => tag.name);

    return {
      title,
      tags: tagNames,
      content: blocks.results,
      lastEditedTime: page.last_edited_time,
      createdTime: page.created_time,
    };
  } catch (error) {
    if (error instanceof Error) {
      if (error.message.includes("Could not find page")) {
        throw new Error("ページが見つかりません。ページがインテグレーションと共有されているか確認してください。");
      }
      if (error.message.includes("unauthorized")) {
        throw new Error("Notionの認証に失敗しました。APIキーを確認してください。");
      }
    }
    throw error;
  }
}

export function extractPageId(url: string): string | null {
  try {
    const urlObj = new URL(url);
    // Handle both notion.so and www.notion.so domains
    const pathParts = urlObj.pathname.split("/");
    
    // Find the last part that contains a UUID
    const pageId = pathParts
      .filter(part => part.length > 0)
      .find(part => {
        // UUIDのパターンにマッチするかチェック
        const uuidPattern = /[0-9a-f]{32}/i;
        return uuidPattern.test(part);
      });

    if (!pageId) {
      throw new Error("No valid page ID found in URL");
    }

    // 32文字のUUIDを正しい形式に変換
    const cleanId = pageId.match(/[0-9a-f]{32}/i)?.[0];
    if (!cleanId) {
      throw new Error("Invalid UUID format");
    }

    return `${cleanId.slice(0, 8)}-${cleanId.slice(8, 12)}-${cleanId.slice(12, 16)}-${cleanId.slice(16, 20)}-${cleanId.slice(20, 32)}`;
  } catch (error) {
    console.error("Error extracting page ID:", error);
    return null;
  }
} 