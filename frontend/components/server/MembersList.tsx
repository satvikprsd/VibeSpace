import { useServerStore } from "@/store/useServerStore";
import UserRow from "../UserRow";
import { useParams } from "next/navigation";

const MembersList = () => {
  const { servers } = useServerStore();
  const { serverId } = useParams() as { serverId: string };
  const server = servers[serverId];
  const onlineUsers = server?.members?.filter(member => member.status != 'Offline') || [];
  const offlineUsers = server?.members?.filter(member => member.status === 'Offline') || [];

  return (
    <div className="w-72 bg-background border-l border-border p-4 space-y-4 text-foreground overflow-y-auto">
      <div>
        {onlineUsers.length > 0 && <h3 className="text-sm mb-1">Online - {onlineUsers.length}</h3>}
        {onlineUsers.map((user) => (
          <UserRow key={user._id} user={user} className="hover:bg-layer-2!"/>
        ))}
      </div>
      <div>
        {offlineUsers.length > 0 && <h3 className="text-sm mb-1">Offline - {offlineUsers.length}</h3>}
        {offlineUsers.map((user) => (
          <UserRow key={user._id} user={user} className="opacity-40 hover:bg-layer-2!" />
        ))}
      </div>
    </div>
  );
};

export default MembersList;