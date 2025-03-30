import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function AccessDenied() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-2xl text-red-600">アクセス拒否</CardTitle>
          <CardDescription>
            このページへのアクセスは許可されていません
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-gray-600">
            このアプリケーションは特定のIPアドレスからのアクセスのみを許可しています。
            アクセスが拒否された場合、以下の理由が考えられます：
          </p>
          <ul className="list-disc list-inside space-y-2 text-gray-600">
            <li>許可されたIPアドレスからのアクセスではありません</li>
            <li>VPNを使用している場合、実際のIPアドレスが異なる可能性があります</li>
            <li>プロキシサーバーを使用している場合、IPアドレスが正しく取得できない可能性があります</li>
          </ul>
          <div className="mt-6">
            <p className="text-sm text-gray-500">
              管理者に連絡して、アクセス権限の付与を依頼してください。
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
} 