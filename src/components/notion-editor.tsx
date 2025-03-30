"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Loader2, FileText, Send } from "lucide-react";
import { useState } from "react";
import { NotionPreview } from "@/components/notion-preview";
import { TagSelector } from "@/components/tag-selector";

interface NotionContent {
  title: string;
  content: any[];
}

export function NotionEditor() {
  const [notionUrl, setNotionUrl] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [notionContent, setNotionContent] = useState<NotionContent | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async () => {
    setIsLoading(true);
    setError(null);
    try {
      console.log("Sending request with URL:", notionUrl);
      const response = await fetch("/api/notion", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ url: notionUrl }),
      });

      const data = await response.json();
      console.log("Received response:", data);

      if (!response.ok) {
        throw new Error(data.details || data.error || "Failed to fetch Notion content");
      }

      setNotionContent(data);
    } catch (err) {
      console.error("Error:", err);
      setError(err instanceof Error ? err.message : "An error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Tabs defaultValue="edit" className="space-y-4">
      <TabsList>
        <TabsTrigger value="edit">Edit</TabsTrigger>
        <TabsTrigger value="preview">Preview</TabsTrigger>
      </TabsList>

      <TabsContent value="edit" className="space-y-4">
        <Card>
          <CardHeader>
            <CardTitle>Notion Page</CardTitle>
            <CardDescription>Paste your Notion page URL below</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex space-x-2">
              <Input
                placeholder="https://notion.so/..."
                value={notionUrl}
                onChange={(e) => setNotionUrl(e.target.value)}
              />
              <Button onClick={handleSubmit} disabled={isLoading}>
                {isLoading ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <FileText className="h-4 w-4" />
                )}
                <span className="ml-2">Load</span>
              </Button>
            </div>
            {error && (
              <p className="mt-2 text-sm text-red-500">{error}</p>
            )}
          </CardContent>
        </Card>

        <TagSelector selectedTags={selectedTags} onTagsChange={setSelectedTags} />
      </TabsContent>

      <TabsContent value="preview">
        <NotionPreview content={notionContent} />
      </TabsContent>

      <div className="flex justify-end pt-4">
        <Button size="lg" disabled={isLoading || !notionUrl || !notionContent}>
          <Send className="mr-2 h-4 w-4" />
          Post to Qiita
        </Button>
      </div>
    </Tabs>
  );
} 