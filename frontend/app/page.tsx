"use client";
import useGetMe from "@/hooks/useGetMe";
import MainPage from "./(main)/page";
import ServerRepoList from "./(main)/components/ServerRepoList";
export default function Home() {
  useGetMe();
  return (
    <div className="flex h-screen overflow-hidden">
          <ServerRepoList />
      <main className="flex-1 flex"><MainPage /></main>
    </div>
  );
}
