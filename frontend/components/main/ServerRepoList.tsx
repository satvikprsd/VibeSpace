"use client";
import CreateServerDialog from "@/components/CreateServerDialog";
import { Dialog, DialogHeader } from "@/components/ui/dialog"
import { getUserServers } from "@/services/serverService";
import { PlusCircle } from "lucide-react"
import Image from "next/image"
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const ServerRepoList = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [servers, setServers] = useState<Array<{_id: string; name: string;}>>([]);
  const router = useRouter();

  useEffect(() => {
      const getUserServersData = async () => {
        try {
          const response = await getUserServers();
          const data = response.data;
          console.log(data);
          if (data.success) {
            setServers(data.servers);
          }
        } catch (error) {
          console.error("Failed to fetch user servers:", error);
          setServers([]);
        }
      };
      getUserServersData();
  }, []);

  return (
    <div className="w-18 bg-layer-1 flex flex-col items-center py-8 space-y-3">
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogHeader>
        </DialogHeader>
        <CreateServerDialog setIsOpen={setIsOpen} />
      </Dialog>
      <div onClick={()=>router.push('/channels/@me')} className="h-12 w-12 bg-accent rounded-full flex items-center justify-center text-accent-foreground font-bold hover:cursor-pointer hover:rounded-2xl hover:bg-primary/80 active:translate-y-1 transition">
      <Image
        src="/logo.png"
        alt="Logo"
        width={70}
        height={70}
      /> 
      </div>
      {servers.map((server, id) => 
        (
        <div key={id} onClick={()=> router.push(`${process.env.NEXT_PUBLIC_FRONTEND_URL}/channels/${server._id}`)} className="h-12 w-12 bg-accent rounded-full flex items-center justify-center text-accent-foreground font-bold hover:cursor-pointer hover:rounded-2xl hover:bg-primary/80 active:translate-y-1 transition">
          {server.name.charAt(0).toUpperCase()}
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