import {
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
} from "@/components/ui/dropdown-menu"
import { updateStatus } from "@/services/userService";
import { useServerStore } from "@/store/useServerStore";
import { useUserStore } from "@/store/useUserStore";
import Image from "next/image"
import { toast } from "sonner";

export function ProfileView() {
    const {user, setUser} = useUserStore();
    const {server, setServer} = useServerStore();
    const handleStatusChange = async (status: 'Online' | 'Offline' | 'Idle' | 'Dnd') => {
        const response = await updateStatus(status);
        const data = response?.data;
        if (data.success) {
            setUser({...user!, status: status});
            const me = server?.members?.find(member => member._id === user?._id);
            const newme = {...me!, status: status};
            const updatedServer = {
                ...server!,
                members: server?.members?.map(member => member._id === user?._id ? newme : member)
            }
            setServer(updatedServer);
            toast.success("Status changed to " + status);
        }
        else {
            console.error(response?.data.message || "Failed to update status");
        }
    }

  return (
      <DropdownMenuContent className="flex-1 pb-2 w-65 px-0! pt-0!  bg-[#2b2d31] rounded-xl shadow-xl mb-2 text-white font-sans" align="start">
        <div className="h-45">
            <div className="h-25 w-full bg-[#3a3c40] rounded-t-lg mb-10"></div>
                <div className="relative -mt-20 px-2">
                    <div className="absolute">
                    <Image
                        alt="User Avatar"
                        src={user?.avatar || "/default-avatar.png"}
                        className="w-20 h-20 rounded-full border-4 border-[#2b2d31]"
                        width={200}
                        height={200}
                    />
                    <span className={`absolute w-5 h-5 rounded-full border-4 border-[#2b2d31] bottom-1 right-1 ${
                        user?.status === 'Online' ? 'bg-green-500' :
                        user?.status === 'Idle' ? 'bg-yellow-500' :
                        user?.status === 'Dnd' ? 'bg-red-500' :
                        'bg-gray-500'
                    }`}/>
                    </div>
                </div>
                <div className="mt-30 px-2">
                    <h2 className="text-xl font-semibold">{user?.username}</h2>
                    <p className="text-gray-400 text-sm">{user?.name}</p>
            </div>
        </div>
        <DropdownMenuSeparator />
        <div className="px-2 pt-2 space-y-3">
            <DropdownMenuGroup className="bg-[#3a3c40] rounded-lg p-2">
                <DropdownMenuSub>
                    <DropdownMenuSubTrigger className="bg-[#3a3c40]">Status</DropdownMenuSubTrigger>
                    <DropdownMenuPortal>
                    <DropdownMenuSubContent className="ml-3">
                        <DropdownMenuItem onClick={()=>handleStatusChange('Online')}>Online</DropdownMenuItem>
                        <DropdownMenuItem onClick={()=>handleStatusChange('Idle')}>Idle</DropdownMenuItem>
                        <DropdownMenuItem onClick={()=>handleStatusChange('Dnd')}>DND</DropdownMenuItem>
                        <DropdownMenuItem onClick={()=>handleStatusChange('Offline')}>Invisible</DropdownMenuItem>
                    </DropdownMenuSubContent>
                    </DropdownMenuPortal>
                </DropdownMenuSub>
                <DropdownMenuSeparator className="bg-foreground/30 mx-1 my-2" />
                <DropdownMenuItem className="bg-[#3a3c40]">
                    Edit Profile
                </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuGroup className="bg-[#3a3c40] rounded-lg p-2">
                <DropdownMenuItem onClick={()=>{navigator.clipboard.writeText(user?._id!);}}  className="bg-[#3a3c40]">
                    Copy User ID
                </DropdownMenuItem>
            </DropdownMenuGroup>
        </div>
      </DropdownMenuContent>
  )
}
