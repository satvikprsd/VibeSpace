import { useServerStore } from "@/store/useServerStore";
import UserRow from "../UserRow";

const MembersList = () => {
  const { server } = useServerStore();

  const onlineUsers = server?.members?.filter(member => member.status != 'Offline') || [];
  const offlineUsers = server?.members?.filter(member => member.status === 'Offline') || [];

  return (
    <div className="w-72 bg-background border-l border-border p-4 space-y-4">
      {onlineUsers.length > 0 && <h3 className="text-sm text-muted mb-1">Online - {onlineUsers.length}</h3>}
      {onlineUsers.map((user) => (
        <UserRow key={user._id} user={user} />
      ))}
      {offlineUsers.length > 0 && <h3 className="text-sm text-muted mb-1">Offline - {offlineUsers.length}</h3>}
      {offlineUsers.map((user) => (
        <UserRow key={user._id} user={user} />
      ))}
    </div>
  );
};

export default MembersList;