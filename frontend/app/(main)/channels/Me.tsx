"use client";
import { ActiveNow } from '@/components/main/ActiveNow'
import { DMChatArea } from '@/components/main/DMChatArea';
import DMList from '@/components/main/DMList'
import { FriendsList } from '@/components/main/FriendsList'
import { Input } from '@/components/ui/input';
import UserRow from '@/components/common/UserRow';
import useGetConvos from '@/hooks/useGetConvos';
import useGetDmMessages from '@/hooks/useGetDmMessages';
import useGetFriends from '@/hooks/useGetFriends';
import useGetPendingRequests from '@/hooks/useGetPendingRequests';
import { sendMessage } from '@/services/convoService';
import { useDMStore } from '@/store/useDMStore';
import { useUIStore } from '@/store/useUIStore';
import { useUserStore } from '@/store/useUserStore';
import { SendHorizonal, Users } from 'lucide-react';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';

const Me = () => {
  useGetFriends();
  useGetPendingRequests();
  useGetConvos();

  const {channelId: dmId} = useParams();
  const {setTopBarText} = useUIStore();
  const [msg, setMsg] = useState("");
  const [showProfile, setShowProfile] = useState(false);
  const {addMessage, updateMessage, dms} = useDMStore();
  const {user} = useUserStore();

  useGetDmMessages(dmId as string);

  useEffect(() => {
    setTopBarText("Friends"); 
  }, [setTopBarText]);

  const handleSendMessage = async () => {
      const mockMessageId = "temp-id-" + Date.now();
      const mockMessage = {
          _id: mockMessageId,
          message: msg,
          sender: user!,
          origin: 'directMessage' as const,
          convo: dmId as string,
          createdAt: new Date(),
      };
      addMessage(dmId as string, mockMessage);
      setMsg("");
      const response = await sendMessage(dmId as string,  msg.trim());
      if (response?.data.success) {
          updateMessage(dmId as string, mockMessageId, response.data.message);
      } else {
          toast.error(response?.data.message || "Failed to send message. Please try again.");
          console.error("Failed to send message:", response?.data.message);
      }
  };
  if (!dmId) return (
    <div className="flex flex-1 border-l-2 border-t-2 border-border rounded-lg">
        <DMList />
        <div className="flex-1 bg-background overflow-y-auto">
            <div className="flex flex-col flex-1 bg-background min-h-0">
                <FriendsList />
            </div>
        </div>
        <ActiveNow />
    </div>
  )

  return (
    <div className="flex flex-1 border-l-2 border-t-2 border-border rounded-lg">
        <DMList />
        <div className="flex-1 bg-background overflow-y-auto">
            <div className="shrink-0 sticky top-0 h-12 z-10 border-b border-border bg-background p-2.5 flex items-center justify-between">
                <UserRow user={dms[dmId! as string].participants.filter((participant)=>participant._id!=user?._id)[0]} />
                <div className="flex items-center gap-5">
                    <Users onClick={() => setShowProfile(!showProfile)} className="cursor-pointer w-5 h-5 text-foreground/70 hover:text-foreground" />
                    <input
                        placeholder="Search"
                        className="w-60 h-8 bg-layer-2 text-sm text-muted-foreground rounded p-2 outline-none"
                    />
                </div>
            </div>
            <div className="flex flex-1 bg-background overflow-y-auto">
                <div className="flex flex-col flex-1 bg-background min-h-0">
                    <DMChatArea />
                    <div className="relative bottom-3 px-2 pt-0 w-full bg-background">
                        <Input onKeyDown={(e) => {if (e.key === 'Enter' && !e.shiftKey){e.preventDefault();handleSendMessage();}}} value={msg} onChange={(e) => setMsg(e.target.value)} className="min-h-15 bg-layer-2! w-full!"/>
                        <SendHorizonal onClick={handleSendMessage} className="absolute right-7 bottom-5 w-5 h-5 text-foreground/70 hover:text-foreground cursor-pointer"/>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Me
