const cdnBaseUrl = process.env.NEXT_PUBLIC_CDN_URL?.replace(/\/+$/, "");

export function assetPath(path: string) {
  if (
    !path ||
    path.startsWith("/api/") ||
    path.startsWith("http://") ||
    path.startsWith("https://") ||
    path.startsWith("data:")
  ) {
    return path;
  }

  if (!cdnBaseUrl) {
    return path;
  }

  return `${cdnBaseUrl}${path.startsWith("/") ? path : `/${path}`}`;
}
