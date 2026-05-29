"use client";

import Loading from "@/app/[locale]/loading";
import { useUIStore } from "@/store/ui-store";
import { usePathname } from "next/navigation";
import { useEffect } from "react";

export function LoadingOverlay() {
  const isLangSwitching = useUIStore((s) => s.isLangSwitching);
  const setLangSwitching = useUIStore((s) => s.setLangSwitching);
  const pathname = usePathname();

  useEffect(() => {
    if (isLangSwitching) {
      setLangSwitching(false);
    }
  }, [pathname]); // eslint-disable-line react-hooks/exhaustive-deps

  if (!isLangSwitching) return null;

  return <Loading />;
}
