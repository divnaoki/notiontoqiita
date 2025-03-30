"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

interface NotionRichText {
  plain_text: string;
}

interface NotionBlockContent {
  rich_text: NotionRichText[];
}

interface NotionBlock {
  type: string;
  paragraph?: NotionBlockContent;
  heading_1?: NotionBlockContent;
  heading_2?: NotionBlockContent;
  heading_3?: NotionBlockContent;
}

interface NotionPage {
  title: string;
  content: NotionBlock[];
}

interface NotionPreviewProps {
  content: NotionPage | null;
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

  const renderBlock = (block: NotionBlock) => {
    switch (block.type) {
      case "paragraph":
        return (
          <p className="mb-4">
            {block.paragraph?.rich_text
              .map((text) => text.plain_text)
              .join("")}
          </p>
        );
      case "heading_1":
        return (
          <h1 className="text-3xl font-bold mb-4">
            {block.heading_1?.rich_text
              .map((text) => text.plain_text)
              .join("")}
          </h1>
        );
      case "heading_2":
        return (
          <h2 className="text-2xl font-bold mb-4">
            {block.heading_2?.rich_text
              .map((text) => text.plain_text)
              .join("")}
          </h2>
        );
      case "heading_3":
        return (
          <h3 className="text-xl font-bold mb-4">
            {block.heading_3?.rich_text
              .map((text) => text.plain_text)
              .join("")}
          </h3>
        );
      default:
        return null;
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>{content.title}</CardTitle>
        <CardDescription>Preview your article before posting</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="prose dark:prose-invert max-w-none">
          {content.content.map((block, index) => (
            <div key={index}>{renderBlock(block)}</div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
} 