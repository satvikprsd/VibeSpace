"use client";
import useGetMe from "@/hooks/useGetMe";
export default function Home() {
  useGetMe();
  return (
      <div className="flex flex-1 border-l-2 border-t-2 border-border rounded-lg">
      </div>
  );
}
