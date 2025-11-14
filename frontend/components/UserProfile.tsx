"use client";

import { useUserStore } from "@/store/useUserStore";
import { Settings } from "lucide-react";
import Image from "next/image";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuShortcut, DropdownMenuTrigger } from "./ui/dropdown-menu";

const UserProfile = () => {
    const {user, isLoggedIn, setIsLoggedIn, clearUser} = useUserStore();
    if (!isLoggedIn) return null;
    return (
        <div className="flex items-center bg-layer-2 p-2 pr-4 rounded-lg w-84">
            <div className="flex items-center relative w-7  0 hover:bg-layer-1/40 p-1 rounded-lg transition-colors duration-150 hover:cursor-pointer flex-1">
                <div className="relative">
                    <Image
                        alt="User Avatar"
                        src={user?.avatar || "/default-avatar.png"}
                        className="w-8 h-8 rounded-full object-cover"
                        width={200}
                        height={200}
                    />
                    <span className="absolute bottom-0 right-0 w-3 h-3 bg-yellow-500 rounded-full border-2 border-layer-2"></span>
                </div>


                <div className="ml-2 flex-1">
                    <p className="text-foreground text-sm font-medium">{user?.username || "user"}</p>
                    <p className="text-xs text-muted-foreground">{user?.status || "Idle"}</p>
                </div>
            </div>


            <div className="flex items-center gap-2">
                <DropdownMenu>
                    <DropdownMenuTrigger className="p-2 rounded-lg hover:bg-layer-1/40 transition-colors duration-150 hover:cursor-pointer">
                        <Settings className="w-6 h-6" />
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="w-56" align="end">
                        <DropdownMenuItem onClick={() => {
                            window.location.href = process.env.NEXT_PUBLIC_BACKEND_URL + "/api/v1/users/logout";
                            setIsLoggedIn(false);
                            clearUser();
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