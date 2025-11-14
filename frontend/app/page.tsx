"use client";
import { useUserStore } from "@/store/useUserStore";
import { useEffect } from "react";

export default function Home() {
  const {isLoggedIn} = useUserStore();

  useEffect(() => {
    if (!isLoggedIn) {
      window.location.href = "/login";
    }
    else {
      window.location.href = "/channels/@me";
    }
  }, [isLoggedIn]);

  return (
      <div className="flex flex-1 border-l-2 border-t-2 border-border rounded-lg">
      </div>
  );
}
