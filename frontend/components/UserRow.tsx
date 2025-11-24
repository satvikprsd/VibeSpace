import { User } from "@/store/useUserStore"
import Image from "next/image"

const UserRow = ({ user, className } : { user: User; className?: string}) => {
  return (
    <div className={`flex items-center relative w-70 hover:bg-layer-1/40 p-1 rounded-lg transition-colors duration-150 hover:cursor-pointer flex-1 ${className}`}>
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


        <div className="ml-2 flex-1">
            <p className="text-foreground text-sm font-medium">{user?.username || "user"}</p>
        </div>
    </div>
  )
}

export default UserRow