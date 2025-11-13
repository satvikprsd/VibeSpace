export const ActiveNow = () => {
  const activeUsers = [
    { name: "a", activity: "c" },
    { name: "b", activity: "c" },
  ];

  return (
    <div className="w-72 bg-background border-l border-border p-4">
      <h3 className="text-sm text-muted mb-3 uppercase">Active Now</h3>
      {activeUsers.map((user) => (
        <div
          key={user.name}
          className="mb-3 p-3 rounded bg-card hover:bg-foreground/10 transition-colors"
        >
          <p className="font-medium text-foreground">{user.name}</p>
          <p className="text-xs text-muted-foreground">{user.activity}</p>
        </div>
      ))}
    </div>
  );
};
