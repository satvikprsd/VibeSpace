"use client";

import useGetMe from "@/hooks/useGetMe";

export default function ProtectdLayout({ children }: { children: React.ReactNode }) {
  useGetMe();
  return <>{children}</>;
}
