import { Users } from "lucide-react"

const TopBar = () => {
  return (
    <div className="flex bg-layer-1 justify-center items-center w-full h-8 text-sm font-bold gap-2">
        <Users className="w-5 h-5" />
        <div>Friends</div>
    </div>
  )
}

export default TopBar