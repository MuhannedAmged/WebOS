"use client";

import { useEffect } from "react";

export default function Browser() {
  useEffect(() => {
    const script = document.createElement("script");
    script.src = `https://cse.google.com/cse.js?cx=${process.env.NEXT_PUBLIC_GOOGLE_CSE_API}`;
    script.async = true;
    document.body.appendChild(script);
  }, []);

  return (
    <div className="p-4 overflow-auto">
      <h1 className="text-xl font-bold mb-4">نتائج البحث من الإنترنت</h1>
      <div className="gcse-search"></div>
    </div>
  );
}
