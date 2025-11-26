"use client";
import { useUserStore } from "@/store/useUserStore";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Home() {
  const {isLoggedIn} = useUserStore();
  const router = useRouter();

  useEffect(() => {
    if (!isLoggedIn) {
      router.push("/login");
    }
    else {
      router.push("/channels/@me");
    }
  }, [isLoggedIn]);

  return (
      <div className="flex flex-1 border-l-2 border-t-2 border-border rounded-lg">
      </div>
  );
}
