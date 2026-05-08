"use client";

import { useEffect, useState } from 'react';

interface CoupangAdProps {
  className?: string;
}

export default function CoupangAd({ className = '' }: CoupangAdProps) {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;

  // 쿠팡 파트너스에서 발급받은 iframe 코드로 아래 src, width, height를 교체하세요.
  // 예시: <iframe src="https://ads-partners.coupang.com/widgets.html?id=XXXXXX&template=carousel&trackingCode=YYYY" ... />
  const adSrc = process.env.NEXT_PUBLIC_COUPANG_AD_SRC || "";

  if (!adSrc) {
    return (
      <div className={`w-full bg-gray-50 border border-dashed border-gray-300 rounded-xl p-4 flex flex-col items-center justify-center text-center ${className}`}>
        <p className="text-xs text-gray-400 font-medium mb-1">광고 영역 (쿠팡 파트너스)</p>
        <p className="text-[10px] text-gray-400">환경변수(NEXT_PUBLIC_COUPANG_AD_SRC)에 iframe URL을 입력하거나,<br/>CoupangAd.tsx 파일에 직접 iframe 코드를 삽입하세요.</p>
      </div>
    );
  }

  return (
    <div className={`w-full overflow-hidden flex justify-center ${className}`}>
      <iframe 
        src={adSrc} 
        width="100%" 
        height="120" 
        frameBorder="0" 
        scrolling="no" 
        referrerPolicy="unsafe-url"
        title="Coupang Partners Ad"
      ></iframe>
    </div>
  );
}
