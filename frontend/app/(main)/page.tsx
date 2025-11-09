import { ActiveNow } from "./components/ActiveNow";
import { FriendsList } from "./components/FriendsList";

export default function MainPage() {
  return (
    <div className="flex flex-1">
      <div className="flex-1 bg-[#36393f] p-4 overflow-y-auto">
        <FriendsList />
      </div>
      <ActiveNow />
    </div>
  );
}
