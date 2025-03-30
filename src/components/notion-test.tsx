"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useState } from "react";

interface TestResult {
  success: boolean;
  message: string;
  user?: {
    name: string;
    email: string;
    id: string;
  };
}

export function NotionTest() {
  const [testResult, setTestResult] = useState<TestResult | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const runTest = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch("/api/notion/test");
      const data = await response.json();
      setTestResult(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Notion Integration Test</CardTitle>
        <CardDescription>Test the connection to your Notion integration</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <Button onClick={runTest} disabled={isLoading}>
          {isLoading ? "Testing..." : "Run Test"}
        </Button>

        {error && (
          <div className="text-red-500">
            <p>Error: {error}</p>
          </div>
        )}

        {testResult && (
          <div className="space-y-2">
            <p className="font-semibold">
              Status: {testResult.success ? "Success" : "Failed"}
            </p>
            <p>{testResult.message}</p>
            {testResult.user && (
              <div className="mt-4">
                <p>User Information:</p>
                <ul className="list-disc list-inside">
                  <li>Name: {testResult.user.name}</li>
                  <li>Email: {testResult.user.email}</li>
                  <li>ID: {testResult.user.id}</li>
                </ul>
              </div>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
} 