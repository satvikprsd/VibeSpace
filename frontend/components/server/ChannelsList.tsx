import { Hash } from "lucide-react"

const ChannelsList = () => {
  return (
    <div className="w-70 bg-layer-1 flex flex-col rounded-lg">

      <div className="flex-1 overflow-y-auto">
        <h3 className="text-xs text-muted-foreground px-3 mt-3 uppercase tracking-wide">Direct Messages</h3>
        <div className="mt-2">
          {["a","b","c","d"].map((name) => (
            <div
              key={name}
              className="flex px-3 py-2 text-foreground/90 hover:bg-layer-2 transition-colors duration-150 rounded cursor-pointer"
            >
              <Hash />
              <div className="ml-2">{name}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default ChannelsList