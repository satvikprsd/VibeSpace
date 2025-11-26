import {
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu"
import { leaveServer } from "@/services/serverService";
import { Server, useServerStore } from "@/store/useServerStore";
import { useUserStore } from "@/store/useUserStore";
import { LogOut, PlusCircle, Settings, Users } from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export function ServerDropdown({serverId, setInviteDialogOpen}: {serverId: string, setInviteDialogOpen: React.Dispatch<React.SetStateAction<boolean>>}) {
    const {setUser, user} = useUserStore();
    const router = useRouter();
    const handleLeaveServer = async () => {
        const response = await leaveServer(serverId);
        const data = response?.data;
        if (data?.success) {
            toast.success(data.message || "Successfully left the server");
            const updatedServers = user?.servers?.filter((server: {_id: string}) => server._id !== serverId);
            setUser({...user!, servers: updatedServers});
            router.push('/channels/@me');
        }
        else{
            toast.error(data?.message || "Failed to leave the server. Please try again.");
        }
    }
  return (
      <DropdownMenuContent className="flex-1 w-50 p-0!  bg-background rounded-xl shadow-xl text-white font-sans" align="center">
            <DropdownMenuGroup className="bg-background rounded-lg p-2">
                <DropdownMenuItem className="text-foreground h-10 flex justify-between items-center hover:bg-muted-foreground/10! hover:text-foreground!">
                    Server Settings
                    <Settings className="w-5! h-5!" />
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setInviteDialogOpen(true)} className="text-foreground h-10 flex justify-between items-center hover:bg-muted-foreground/10! hover:text-foreground!">
                    Invite People
                    <Users className="w-5! h-5!" />
                </DropdownMenuItem>
                <DropdownMenuItem className="text-foreground h-10 flex justify-between items-center hover:bg-muted-foreground/10! hover:text-foreground!">
                    Create Channel
                    <PlusCircle className="w-6! h-6! -mr-0.5!" />
                </DropdownMenuItem>
                <DropdownMenuItem onClick={handleLeaveServer} className="text-foreground h-10 flex justify-between items-center hover:bg-muted-foreground/10! hover:text-foreground!">
                    Leave Server
                    <LogOut className="w-5! h-5!" />
                </DropdownMenuItem>
            </DropdownMenuGroup>
      </DropdownMenuContent>
  )
}
