"use client";
import { LogOut } from "lucide-react"
import { Button } from "./ui/button"
import { useUserStore } from "@/store/useUserStore";
import { logoutUser } from "@/services/userService";

export function Logout() {
    const {setIsLoggedIn, clearUser} = useUserStore();
    return (
        <Button
        onClick={async () => {
            await logoutUser();
            setIsLoggedIn(false);
            clearUser();
        }}
        className="bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded-md font-medium transition-transform duration-150 active:scale-95 hover:cursor-pointer"
        >
        <LogOut />
        </Button>
    )
}