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
  "Programming", "Web Development", "Frontend", "Backend", "Full Stack", "DevOps", "Cloud", "AI", "Machine Learning", "Data Science", "Cybersecurity", "Blockchain", "Web3", "NFTs", "DeFi", "Game Development", "Mobile Development", "UI/UX Design", "Product Management", "Project Management", "Leadership", "Entrepreneurship", "Marketing", "Sales", "Customer Success", "Customer Support", "Customer Service", "Customer Experience", "Customer Engagement", "Customer Retention", "Customer Satisfaction", "Customer Loyalty", "Customer Advocacy", "Customer Success", "Customer Support", "Customer Service", "Customer Experience", "Customer Engagement", "Customer Retention", "Customer Satisfaction", "Customer Loyalty", "Customer Advocacy",
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