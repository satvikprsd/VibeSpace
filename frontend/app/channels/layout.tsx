import "../globals.css";
import { Logout } from "@/components/logout-button";
import ServerRepoList from "@/components/main/ServerRepoList";
import TopBar from "@/components/main/TopBar";

export default function MeLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex h-screen overflow-hidden">
      <div className="fixed bottom-4 left-4 z-50">
        <Logout />
      </div>
      <ServerRepoList />
      <main className="flex-1 flex">
        <div className="flex flex-col flex-1 bg-layer-1 min-h-screen">
          <TopBar />
          {children}
        </div>
      </main>
    </div>
  );
}
