import { NotionEditor } from "@/components/notion-editor";
import { NotionTest } from "@/components/notion-test";

export default function Home() {
  return (
    <main className="min-h-screen bg-background p-4 md:p-8">
      <div className="max-w-4xl mx-auto space-y-8">
        <div className="space-y-2">
          <h1 className="text-4xl font-bold tracking-tight">Notion to Qiita</h1>
          <p className="text-muted-foreground">Transform your Notion pages into Qiita articles seamlessly.</p>
        </div>
        <NotionEditor />
        <NotionTest />
      </div>
    </main>
  );
} 