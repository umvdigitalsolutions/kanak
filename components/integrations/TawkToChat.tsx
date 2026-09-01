"use client";

import { useEffect } from "react";
import Script from "next/script";
import { usePathname } from "next/navigation";

type TawkApi = {
  hideWidget?: () => void;
  showWidget?: () => void;
};

declare global {
  interface Window {
    Tawk_API?: TawkApi;
    Tawk_LoadStart?: Date;
  }
}

type TawkToChatProps = {
  propertyId?: string;
  widgetId?: string;
};

const validId = /^[a-zA-Z0-9_-]+$/;
const defaultPropertyId = "6a9696d6ae99ab3446f88a5e";
const defaultWidgetId = "1k1e3qe8u";

export function TawkToChat({
  propertyId = defaultPropertyId,
  widgetId = defaultWidgetId,
}: TawkToChatProps) {
  const pathname = usePathname();
  const isAdminRoute = pathname.startsWith("/admin");
  const isConfigured = Boolean(propertyId && widgetId && validId.test(propertyId) && validId.test(widgetId));

  useEffect(() => {
    if (isAdminRoute) {
      window.Tawk_API?.hideWidget?.();
    } else if (!document.documentElement.classList.contains("site-is-loading")) {
      window.Tawk_API?.showWidget?.();
    }
  }, [isAdminRoute]);

  if (!isConfigured || isAdminRoute) {
    return null;
  }

  const widgetSource = `https://embed.tawk.to/${propertyId}/${widgetId}`;

  return (
    <Script id="tawk-to-widget" strategy="lazyOnload">
      {`
        window.Tawk_API = window.Tawk_API || {};
        window.Tawk_LoadStart = new Date();
        window.Tawk_API.onBeforeLoad = function () {
          window.Tawk_API.hideWidget();
        };
        window.Tawk_API.onLoad = function () {
          if (!document.documentElement.classList.contains("site-is-loading")) {
            window.Tawk_API.showWidget();
          }
        };
        window.addEventListener("kanak:preloader-complete", function () {
          if (typeof window.Tawk_API.showWidget === "function") {
            window.Tawk_API.showWidget();
          }
        }, { once: true });
        (function () {
          var script = document.createElement("script");
          var firstScript = document.getElementsByTagName("script")[0];
          script.async = true;
          script.src = ${JSON.stringify(widgetSource)};
          script.charset = "UTF-8";
          script.setAttribute("crossorigin", "*");
          firstScript.parentNode.insertBefore(script, firstScript);
        })();
      `}
    </Script>
  );
}
