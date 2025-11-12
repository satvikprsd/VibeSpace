import { PlusCircle } from "lucide-react"
import Image from "next/image"

const ServerRepoList = () => {
  return (
    <div className="w-18 bg-layer-1 flex flex-col items-center py-8 space-y-3">
      <div className="h-12 w-12 bg-accent rounded-full flex items-center justify-center text-accent-foreground font-bold hover:cursor-pointer hover:rounded-2xl hover:bg-primary/80 active:translate-y-1 transition">
      <Image
        src="/logo.png"
        alt="Logo"
        width={70}
        height={70}
      /> 
      </div>
      {[1,2,3,4,5].map(() => 
        (
        <div className="h-12 w-12 bg-accent rounded-full flex items-center justify-center text-accent-foreground font-bold hover:cursor-pointer hover:rounded-2xl hover:bg-primary/80 active:translate-y-1 transition">
         D
         </div>
        ))
      }
      <div className="h-12 w-12 bg-accent rounded-full flex items-center justify-center text-accent-foreground font-bold hover:cursor-pointer hover:rounded-2xl hover:bg-primary/80 active:translate-y-1 transition">
        <PlusCircle />
      </div>
    </div>
  )
}

export default ServerRepoList