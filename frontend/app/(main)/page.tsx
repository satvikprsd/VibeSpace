import { ActiveNow } from "./components/ActiveNow";
import DMList from "./components/DMList";
import { FriendsList } from "./components/FriendsList";
import TopBar from "./components/TopBar";

export default function MainPage() {
  return (
    <div className="flex flex-col flex-1 bg-layer-1 min-h-screen">
      <TopBar />
      <div className="flex flex-1 border-l-2 border-t-2 border-border rounded-lg">
        <DMList />
        <div className="flex-1 bg-background p-4 overflow-y-auto">
          <FriendsList />
        </div>
        <ActiveNow />
      </div>
    </div>
  );
}
