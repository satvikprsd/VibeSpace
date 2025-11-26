import { DM, useDMStore } from "@/store/useDMStore";
import { useUserStore } from "@/store/useUserStore";
import UserRow from "../common/UserRow";
import { useRouter } from "next/navigation";

const DMList = () => {
  const { dms } = useDMStore();
  const { user } = useUserStore();
  const router = useRouter();
  return (
    <div className="w-70 bg-layer-1 flex flex-col rounded-lg">
      <div className="p-2 border-b border-border max-h-12">
        <input
          placeholder="Find or start a conversation"
          className="w-full h-8 bg-layer-2 text-sm text-muted-foreground rounded p-2 outline-none"
        />
      </div>

      <div className="flex-1 overflow-y-auto">
        <h3 className="text-xs text-muted-foreground px-3 mt-3 uppercase tracking-wide">Direct Messages</h3>
        <div className="mt-2">
          {Object.values(dms).map((dm: DM) => (
            <div
              key={dm._id}
              onClick={() => router.push(`/channels/@me/${dm._id}`)}
              className="px-2 py-1 m-2 text-foreground/90 hover:bg-layer-2 transition-colors duration-150 rounded-xl cursor-pointer"
            >
              <UserRow
                key={dm._id}
                user={dm.participants.find((p) => p._id !== user?._id)!}
                className="hover:bg-layer-2!"
            />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default DMList