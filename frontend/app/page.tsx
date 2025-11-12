"use client";
import useGetMe from "@/hooks/useGetMe";
import SideBar from "./(main)/components/SideBar";
import MainPage from "./(main)/page";
export default function Home() {
  useGetMe();
  return (
    <div className="flex h-screen overflow-hidden">
          <SideBar />
      <main className="flex-1 flex"><MainPage /></main>
    </div>
  );
}
