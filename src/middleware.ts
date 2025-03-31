import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// 許可するIPアドレスのリスト（環境変数から取得）
const ALLOWED_IPS = [
  "127.0.0.1", // localhost
  "::1",       // localhost (IPv6)
  ...(process.env.ALLOWED_IPS?.split(",") || []),
  // ここに自宅のIPアドレスを追加してください
  // 例: "192.168.1.100"
];

export function middleware(request: NextRequest) {
  // クライアントのIPアドレスを取得（複数のヘッダーをチェック）
  const forwardedFor = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim();
  const realIp = request.headers.get("x-real-ip")?.trim();
  const cfConnectingIp = request.headers.get("cf-connecting-ip")?.trim();
  const xClientIp = request.headers.get("x-client-ip")?.trim();

  // 利用可能なIPアドレスを取得
  const clientIp = forwardedFor || realIp || cfConnectingIp || xClientIp || "unknown";

  // IPアドレスの形式を検証
  const isValidIp = /^(\d{1,3}\.){3}\d{1,3}$/.test(clientIp);
  
  // 許可されたIPアドレスからのアクセスかチェック
  if (!isValidIp || !ALLOWED_IPS.includes(clientIp)) {
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