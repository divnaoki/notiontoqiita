"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export function NotionPreview() {
  const dummyPreview = `
    # Understanding React Hooks
    
    React Hooks are a powerful feature that allows you to use state and other React features in functional components...
  `;

  return (
    <Card>
      <CardHeader>
        <CardTitle>Preview</CardTitle>
        <CardDescription>Preview your article before posting</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="prose dark:prose-invert max-w-none">
          <pre className="whitespace-pre-wrap font-mono text-sm">
            {dummyPreview}
          </pre>
        </div>
      </CardContent>
    </Card>
  );
} 