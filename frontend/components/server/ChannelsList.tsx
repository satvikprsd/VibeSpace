import { useServerStore } from "@/store/useServerStore";
import { ChevronDown, Hash, Plus } from "lucide-react"
import { Dialog } from "../ui/dialog";
import CreateTextChannelDialog from "../CreateTextChannelDialog";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { DropdownMenu, DropdownMenuTrigger } from "../ui/dropdown-menu";
import { ServerDropdown } from "../ServerDropdown";
import CreateServerInviteDialog from "../CreateServerInviteDialog";

const ChannelsList = () => {
  const { server } = useServerStore();
  const router = useRouter();
  const [isCreateChannelOpen, setIsCreateChannelOpen] = useState(false);
  const [inviteDialogOpen, setInviteDialogOpen] = useState(false);

  return (
    <div className="w-70 bg-layer-1 flex flex-col rounded-lg">
      <Dialog open={isCreateChannelOpen} onOpenChange={setIsCreateChannelOpen}>
        <CreateTextChannelDialog serverId={server?._id as string} setIsOpen={setIsCreateChannelOpen} />
      </Dialog>
      <Dialog open={inviteDialogOpen} onOpenChange={setInviteDialogOpen}>
          <CreateServerInviteDialog isOpen={inviteDialogOpen} server={server!} />
      </Dialog>
      <div className="flex-1 overflow-y-auto">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <div className="flex justify-between border-b border-border hover:cursor-pointer hover:bg-layer-2/40 transition-colors duration-150 items-center">
              <h2 className="text-base font-semibold text-foreground px-3 py-3 h-12 border-b border-border">{server?.name}</h2>
              <ChevronDown className=" mr-3" />
            </div>
          </DropdownMenuTrigger>
          <ServerDropdown serverId={server?._id as string} setInviteDialogOpen={setInviteDialogOpen} />
        </DropdownMenu>
        <div className="relative flex items-center justify-between mt-4">
          <h3 className="text-xs text-muted-foreground px-3 tracking-wide">Text Channels</h3>
          <Plus onClick={()=>setIsCreateChannelOpen(true)} className="mr-3 cursor-pointer text-foreground/90 hover:text-foreground transition-colors duration-150 w-5 h-5" />
        </div>
        <div className="mt-2">
          {server?.textChannels?.map((channel) => (
            <div
              key={channel._id}
              onClick={() => router.push(`/channels/${server._id}/${channel._id}`)}
              className="flex px-3 py-2 text-foreground/90 hover:bg-layer-2 transition-colors duration-150 rounded cursor-pointer"
            >
              <Hash />
              <div className="ml-2">{channel.name}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default ChannelsList