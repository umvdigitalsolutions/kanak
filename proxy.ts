import { NextResponse, type NextRequest } from "next/server";

const blockedExtensions =
  /\.(?:bak|backup|conf|config|crt|csr|db|der|dump|env|gz|ini|key|lock|log|map|old|orig|p12|pem|pfx|rar|sql|sqlite|sqlite3|swp|tar|tgz|tmp|yaml|yml|zip)$/i;

const blockedFileNames =
  /(?:^|\/)(?:CLAUDE\.md|README(?:\.[^/]*)?|AGENTS\.md|package(?:-lock)?\.json|pnpm-lock\.yaml|yarn\.lock|next\.config\.(?:js|mjs|ts)|postcss\.config\.(?:js|mjs|ts)|tailwind\.config\.(?:js|mjs|ts)|tsconfig(?:\.[^/]*)?\.json|jsconfig\.json|eslint\.config\.(?:js|mjs|ts)|\.npmrc|\.yarnrc|\.pnp(?:\.[^/]*)?)$/i;

function decodePathname(pathname: string) {
  try {
    return decodeURIComponent(pathname);
  } catch {
    return pathname;
  }
}

function hasBlockedDotSegment(pathname: string) {
  return pathname
    .split("/")
    .filter(Boolean)
    .some((segment) => segment.startsWith(".") && segment !== ".well-known");
}

export function proxy(request: NextRequest) {
  const pathname = decodePathname(request.nextUrl.pathname);

  if (hasBlockedDotSegment(pathname) || blockedExtensions.test(pathname) || blockedFileNames.test(pathname)) {
    return new NextResponse(null, { status: 404 });
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|robots.txt|sitemap.xml).*)"],
};
