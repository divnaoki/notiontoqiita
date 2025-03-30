"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Loader2, FileText, Send } from "lucide-react";
import { useState } from "react";
import { NotionPreview } from "@/components/notion-preview";
import { TagSelector } from "@/components/tag-selector";

export function NotionEditor() {
  const [notionUrl, setNotionUrl] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  const handleSubmit = async () => {
    setIsLoading(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    setIsLoading(false);
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
          </CardContent>
        </Card>

        <TagSelector selectedTags={selectedTags} onTagsChange={setSelectedTags} />
      </TabsContent>

      <TabsContent value="preview">
        <NotionPreview />
      </TabsContent>

      <div className="flex justify-end pt-4">
        <Button size="lg" disabled={isLoading || !notionUrl}>
          <Send className="mr-2 h-4 w-4" />
          Post to Qiita
        </Button>
      </div>
    </Tabs>
  );
} 