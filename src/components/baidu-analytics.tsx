'use client';

import Script from 'next/script';
import { useEffect } from 'react';

declare global {
  interface Window {
    _hmt: Array<[string, ...unknown[]]>;
  }
}

export default function BaiduAnalytics() {
  const trackingId = process.env.NEXT_PUBLIC_BAIDU_ANALYTICS_ID;

  useEffect(() => {
    if (!trackingId) return;
    window._hmt = window._hmt || [];
  }, [trackingId]);

  if (!trackingId) return null;

  return (
    <Script
      id="baidu-analytics"
      strategy="afterInteractive"
      src={`https://hm.baidu.com/hm.js?${trackingId}`}
    />
  );
}
