
const DMList = () => {
  return (
    <div className="w-70 bg-[#2f3136] flex flex-col">
      <div className="p-3 border-b border-[#202225]">
        <input
          placeholder="Find or start a conversation"
          className="w-full bg-[#202225] text-sm text-gray-300 rounded p-2 outline-none"
        />
      </div>

      <div className="flex-1 overflow-y-auto">
        <h3 className="text-xs text-gray-400 px-3 mt-3 uppercase">Direct Messages</h3>
        <div className="mt-2">
          {["a","b","c","d"].map((name) => (
            <div
              key={name}
              className="px-3 py-2 hover:bg-[#40444b] rounded cursor-pointer text-gray-200"
            >
              {name}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default DMList