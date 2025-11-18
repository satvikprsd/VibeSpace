import { useServerStore } from "@/store/useServerStore";
import UserRow from "../UserRow";

const MembersList = () => {
  const { server } = useServerStore();

  const onlineUsers = server?.members?.filter(member => member.status != 'Offline') || [];
  const offlineUsers = server?.members?.filter(member => member.status === 'Offline') || [];

  return (
    <div className="w-72 bg-background border-l border-border p-4">
      <h3 className="text-sm text-muted mb-3 uppercase">Online</h3>
      {onlineUsers.map((user) => (
        <div
          key={user.name}
          className="mb-3 p-3 rounded bg-card hover:bg-foreground/10 transition-colors"
        >
          <p className="font-medium text-foreground">{user.name}</p>
          <p className="text-xs text-muted-foreground">{user.activity}</p>
        </div>
      ))}
      <h3 className="text-sm text-muted mb-3 uppercase">Offline</h3>
      {offlineUsers.map((user) => (
        <UserRow key={user._id} user={user} />
      ))}
    </div>
  );
};

export default MembersList;