"use client";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";

interface TagSelectorProps {
  selectedTags: string[];
  onTagsChange: (tags: string[]) => void;
}

const popularTags = [
  "React", "JavaScript", "TypeScript", "Next.js",
  "Programming", "Web Development", "Frontend"
];

export function TagSelector({ selectedTags, onTagsChange }: TagSelectorProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Tags</CardTitle>
        <CardDescription>Select relevant tags for your article</CardDescription>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-20">
          <div className="flex flex-wrap gap-2">
            {popularTags.map((tag) => (
              <Badge
                key={tag}
                variant={selectedTags.includes(tag) ? "default" : "outline"}
                className="cursor-pointer"
                onClick={() => {
                  onTagsChange(
                    selectedTags.includes(tag)
                      ? selectedTags.filter((t) => t !== tag)
                      : [...selectedTags, tag]
                  );
                }}
              >
                {tag}
              </Badge>
            ))}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
} 