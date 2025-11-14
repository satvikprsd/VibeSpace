import { User } from "@/store/useUserStore"
import Image from "next/image"

const UserRow = ({ user } : { user: User}) => {
  return (
    <div className="flex items-center relative w-70 hover:bg-layer-1/40 p-1 rounded-lg transition-colors duration-150 hover:cursor-pointer flex-1">
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
  )
}

export default UserRow