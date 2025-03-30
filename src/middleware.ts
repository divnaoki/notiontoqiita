import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// 許可するIPアドレスのリスト
const ALLOWED_IPS = [
  "127.0.0.1", // localhost
  "::1",       // localhost (IPv6)
  "193.186.4.152",
  // ここに自宅のIPアドレスを追加してください
  // 例: "192.168.1.100"
];

export function middleware(request: NextRequest) {
  // クライアントのIPアドレスを取得
  const clientIp = request.headers.get("x-forwarded-for")?.split(",")[0] || 
                  request.headers.get("x-real-ip") || 
                  "unknown";

  // 許可されたIPアドレスからのアクセスかチェック
  if (!ALLOWED_IPS.includes(clientIp)) {
    // アクセスが拒否された場合、エラーページにリダイレクト
    return NextResponse.redirect(new URL("/access-denied", request.url));
  }

  return NextResponse.next();
}

// ミドルウェアを適用するパスを設定
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    "/((?!api|_next/static|_next/image|favicon.ico).*)",
  ],
}; 