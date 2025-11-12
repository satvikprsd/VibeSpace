"use client";
import { LogOut } from "lucide-react"
import { Button } from "./ui/button"

export function Logout() {
    return (
        <Button
        onClick={() => {
            window.location.href = process.env.NEXT_PUBLIC_BACKEND_URL + "/api/v1/users/logout"
        }}
        className="bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded-md font-medium transition-transform duration-150 active:scale-95"
        >
        <LogOut />
        </Button>
    )
}