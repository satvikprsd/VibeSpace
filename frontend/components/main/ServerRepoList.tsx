"use client";
import CreateServerDialog from "@/components/CreateServerDialog";
import { Dialog, DialogHeader } from "@/components/ui/dialog"
import { getUserServers } from "@/services/serverService";
import { useUIStore } from "@/store/useUIStore";
import { useUserStore } from "@/store/useUserStore";
import { PlusCircle } from "lucide-react"
import Image from "next/image"
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const ServerRepoList = () => {
  const [isOpen, setIsOpen] = useState(false);
  const {user} = useUserStore();
  const {setTopBarText} = useUIStore();
  const router = useRouter();

  return (
    <div className="w-18 bg-layer-1 flex flex-col items-center py-8 space-y-3">
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogHeader>
        </DialogHeader>
        <CreateServerDialog setIsOpen={setIsOpen} />
      </Dialog>
      <div onClick={()=>{router.push('/channels/@me')}} className="h-12 w-12 bg-accent rounded-full flex items-center justify-center text-accent-foreground font-bold hover:cursor-pointer hover:rounded-2xl hover:bg-primary/80 active:translate-y-1 transition">
      <Image
        src="/logo.png"
        alt="Logo"
        width={70}
        height={70}
      /> 
      </div>
      {user?.servers?.map((server) => 
        (
        <div key={server._id} onClick={()=> {router.push(`/channels/${server._id}`);setTopBarText(server.name!)}} className="h-12 w-12 bg-accent rounded-full flex items-center justify-center text-accent-foreground font-bold hover:cursor-pointer hover:rounded-2xl hover:bg-primary/80 active:translate-y-1 transition">
          {server.name!.charAt(0).toUpperCase()}
         </div>
        ))
      }
      <div onClick={()=>setIsOpen(true)} className="h-12 w-12 bg-accent rounded-full flex items-center justify-center text-accent-foreground font-bold hover:cursor-pointer hover:rounded-2xl hover:bg-primary/80 active:translate-y-1 transition">
        <PlusCircle />
      </div>
    </div>
  )
}

export default ServerRepoList