"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

interface NotionContent {
  title: string;
  content: any[];
}

interface NotionPreviewProps {
  content: NotionContent | null;
}

export function NotionPreview({ content }: NotionPreviewProps) {
  if (!content) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Preview</CardTitle>
          <CardDescription>Load a Notion page to preview</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">No content to preview</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>{content.title}</CardTitle>
        <CardDescription>Preview your article before posting</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="prose dark:prose-invert max-w-none">
          {content.content.map((block, index) => {
            if (block.type === "paragraph") {
              return (
                <p key={index} className="mb-4">
                  {block.paragraph.rich_text.map((text: any, i: number) => (
                    <span key={i}>{text.plain_text}</span>
                  ))}
                </p>
              );
            }
            if (block.type === "heading_1") {
              return (
                <h1 key={index} className="text-3xl font-bold mb-4">
                  {block.heading_1.rich_text[0]?.plain_text}
                </h1>
              );
            }
            if (block.type === "heading_2") {
              return (
                <h2 key={index} className="text-2xl font-bold mb-3">
                  {block.heading_2.rich_text[0]?.plain_text}
                </h2>
              );
            }
            if (block.type === "heading_3") {
              return (
                <h3 key={index} className="text-xl font-bold mb-2">
                  {block.heading_3.rich_text[0]?.plain_text}
                </h3>
              );
            }
            return null;
          })}
        </div>
      </CardContent>
    </Card>
  );
} 