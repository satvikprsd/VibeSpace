"use client";

import { useUserStore } from "@/store/useUserStore";
import { Settings } from "lucide-react";
import Image from "next/image";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuShortcut, DropdownMenuTrigger } from "./ui/dropdown-menu";
import { ProfileView } from "./ProfileView";
import { resestStores } from "@/store/resetStores";

const UserProfile = () => {
    const {user, isLoggedIn, setIsLoggedIn} = useUserStore();
    if (!isLoggedIn) return null;
    return (
        <div className="flex items-center bg-layer-2 p-2 pr-4 rounded-lg w-84">
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <div className="flex items-center relative w-7  0 hover:bg-layer-1/40 p-1 rounded-lg transition-colors duration-150 hover:cursor-pointer flex-1">
                        <div className="relative">
                            <Image
                                alt="User Avatar"
                                src={user?.avatar || "/default-avatar.png"}
                                className="w-8 h-8 rounded-full object-cover"
                                width={200}
                                height={200}
                            />
                            <span className={`absolute bottom-0 -right-1 w-3 h-3 rounded-full border-2 border-layer-2 ${
                                user?.status === 'Online' ? 'bg-green-500' :
                                user?.status === 'Idle' ? 'bg-yellow-500' :
                                user?.status === 'Dnd' ? 'bg-red-500' :
                                'bg-gray-500'
                            }`}/>
                        </div>


                    <div className="ml-2 flex-1 group relative overflow-hidden">
                        <p className="text-foreground text-sm font-medium">
                            {user?.username || "user"}
                        </p>
                        <div className="relative h-4 mt-px">
                            <p className="absolute inset-0 text-xs text-muted-foreground transition-all duration-300 ease-out backface-hidden transform-3d group-hover:rotate-x-90 group-hover:opacity-0">
                                {user?.status === "Offline" ? "Invisible" : user?.status || "Idle"}
                            </p>
                            <p className="absolute inset-0 text-xs text-muted-foreground opacity-0 transition-all duration-300 ease-out backface-hidden transform-3d -rotate-x-90 group-hover:rotate-x-0 group-hover:opacity-100">
                                {user?.username || "user"}
                            </p>
                        </div>
                    </div>
                </div>
                </DropdownMenuTrigger>
                <ProfileView />
            </DropdownMenu>

            <div className="flex items-center gap-2">
                <DropdownMenu>
                    <DropdownMenuTrigger className="p-2 rounded-lg hover:bg-layer-1/40 transition-colors duration-150 hover:cursor-pointer">
                        <Settings className="w-6 h-6" />
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="w-56 mb-3" align="end">
                        <DropdownMenuItem className="text-foreground hover:bg-muted-foreground/10! hover:text-foreground!" onClick={() => {
                            window.location.href = process.env.NEXT_PUBLIC_BACKEND_URL + "/api/v1/auth/logout";
                            setIsLoggedIn(false);
                            resestStores();
                        }}>
                            Log out 
                            <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
        </div>
    )
}

export default UserProfile