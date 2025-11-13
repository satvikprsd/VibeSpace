import { MessageCircle } from "lucide-react";

export const FriendsList = () => {
  const friends = [
    { name: "a", status: "d" },
    { name: "b", status: "d" },
    { name: "c", status: "d" },
  ];

  return (
    <div>
      <h2 className="text-lg font-semibold mb-3">Online — {friends.length}</h2>
      <div className="space-y-2">
        {friends.map((f) => (
          <div
            key={f.name}
            className="flex justify-between items-center p-3 rounded hover:bg-foreground/10 transition-colors"
          >
            <div>
              <p className="font-medium text-foreground">{f.name}</p>
              <p className="text-xs text-muted-foreground">{f.status}</p>
            </div>
            <button className="text-xs px-3 py-3 rounded-full hover:bg-foreground/10">
              <MessageCircle className="w-5 h-5 text-foreground" fill="white"/>
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};
