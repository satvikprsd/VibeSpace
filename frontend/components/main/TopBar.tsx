"use client";
import { useUIStore } from "@/store/useUIStore";
import { Users } from "lucide-react"

const TopBar = () => {
  const {topBarText} = useUIStore();
  return (
    <div className="flex bg-layer-1 justify-center items-center w-full h-8 text-sm font-bold gap-2">
        <Users className="w-5 h-5" />
        <div>{topBarText}</div>
    </div>
  )
}

export default TopBar