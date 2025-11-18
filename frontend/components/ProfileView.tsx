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
import { useUserStore } from "@/store/useUserStore";
import Image from "next/image"

export function ProfileView() {
    const {user} = useUserStore();
  return (
      <DropdownMenuContent className="flex-1 pb-2 w-65 px-0! pt-0!  bg-[#2b2d31] rounded-xl shadow-xl  text-white font-sans" align="start">
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
                    <div className="w-5 h-5 rounded-full bg-yellow-500 border-4 border-[#2b2d31] absolute bottom-1 right-1"></div>
                    </div>
                </div>
                <div className="mt-30 px-2">
                    <h2 className="text-xl font-semibold">{user?.username}</h2>
                    <p className="text-gray-400 text-sm">{user?.name}</p>
            </div>
        </div>
        <DropdownMenuSeparator />
        <div className="px-2 pt-2">
            <DropdownMenuGroup className="bg-[#3a3c40] rounded-lg p-2">
                <DropdownMenuSub>
                    <DropdownMenuSubTrigger className="bg-[#3a3c40]">Status</DropdownMenuSubTrigger>
                    <DropdownMenuPortal>
                    <DropdownMenuSubContent>
                        <DropdownMenuItem>Online</DropdownMenuItem>
                        <DropdownMenuItem>Idle</DropdownMenuItem>
                        <DropdownMenuItem>DND</DropdownMenuItem>
                        <DropdownMenuItem>Offline</DropdownMenuItem>
                    </DropdownMenuSubContent>
                    </DropdownMenuPortal>
                </DropdownMenuSub>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="bg-[#3a3c40]">
                    Edit Profile
                </DropdownMenuItem>
            </DropdownMenuGroup>
        </div>
      </DropdownMenuContent>
  )
}
