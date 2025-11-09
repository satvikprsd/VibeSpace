export const ActiveNow = () => {
  const activeUsers = [
    { name: "a", activity: "c" },
    { name: "b", activity: "c" },
  ];

  return (
    <div className="w-72 bg-[#2f3136] border-l border-[#202225] p-4">
      <h3 className="text-sm text-gray-400 mb-3 uppercase">Active Now</h3>
      {activeUsers.map((user) => (
        <div
          key={user.name}
          className="mb-3 p-3 rounded bg-[#3a3c43] hover:bg-[#40444b]"
        >
          <p className="font-medium">{user.name}</p>
          <p className="text-xs text-gray-400">{user.activity}</p>
        </div>
      ))}
    </div>
  );
};
