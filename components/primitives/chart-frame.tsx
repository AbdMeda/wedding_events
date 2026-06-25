"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

export function ChartFrame({
  children,
  fallbackClassName,
}: {
  children: React.ReactNode;
  fallbackClassName?: string;
}) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const frame = window.requestAnimationFrame(() => setMounted(true));
    return () => window.cancelAnimationFrame(frame);
  }, []);

  if (!mounted) {
    return <div className={cn("h-full rounded-2xl bg-ivory-100", fallbackClassName)} />;
  }

  return children;
}
