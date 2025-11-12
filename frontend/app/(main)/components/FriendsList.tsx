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
            className="flex justify-between items-center bg-[#2f3136] p-3 rounded hover:bg-[#40444b]"
          >
            <div>
              <p className="font-medium">{f.name}</p>
              <p className="text-xs text-gray-400">{f.status}</p>
            </div>
            <button className="text-xs px-3 py-3 rounded-full text-white hover:bg-[#2f3136]">
              <MessageCircle className="w-5 h-5" fill="white"/>
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};
