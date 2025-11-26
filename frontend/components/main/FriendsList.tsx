import { useFriendsStore } from "@/store/useFriendsStore";
import { Check, MessageCircle, X } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { useState } from "react";
import { Button } from "../ui/button";
import { handleFriendRequest, sendFriendRequest } from "@/services/userService";
import { toast } from "sonner";
import UserRow from "../UserRow";
import { useUserStore } from "@/store/useUserStore";
import { createOrGetConvo } from "@/services/convoService";
import { useRouter } from "next/navigation";
import { useDMStore } from "@/store/useDMStore";

export const FriendsList = () => {
  const {friends, pendingRequests} = useFriendsStore();
  const {user} = useUserStore();
  const { addDM, dms } = useDMStore();
  // console.log(friends);/
  const router = useRouter();
  const onlineFriends = friends.filter(friend => friend.status != 'Offline');
  const [sendRequest, setSendRequest] = useState(''); 

  const sendRequestHandler = async () => {
    const response = await sendFriendRequest(sendRequest);
    const data = response?.data;
    if (data.success) {
      toast.success("Friend request sent!");
      setSendRequest('');
    } else {
      toast.error(data?.message || "Failed to send friend request.");
      console.log(data?.message);
    }
  };

  const handleRequest = async (requestId:string, action: 'accept' | 'reject') => {
    const response = await handleFriendRequest(requestId, action);
    const data = response?.data;
    if (data.success) {
      toast.success(`Friend request ${action}ed!`);
    } else {
      toast.error(data?.message || `Failed to ${action} friend request.`);
    }
  };

  const handleConvo = async (friendId : string) => {
    if (!user) return;
    if (Object.values(dms).some(dm => dm.participants.some(participant => participant._id === friendId))) {
      const existingDM = Object.values(dms).find(dm => dm.participants.some(participant => participant._id === friendId));
      router.push(`/channels/@me/${existingDM?._id}`);
      return;
    }

    const response = await createOrGetConvo(friendId);
    const data = response?.data;
    if (data.success) {
      if (!dms[data.convo._id]) {
        addDM(data.convo);
      }
      router.push(`/channels/@me/${data.convo._id}`);
    }
    else {
      toast.error(data?.message || "Failed to create or get convo.");
    }
  };

  return (
    <div className="p-4">
      <Tabs defaultValue="online">
        <TabsList className="bg-background flex space-x-2 p-1 rounded">
          <TabsTrigger value="online" className="data-[state=active]:bg-layer-2! hover:bg-layer-2/70! h-8 text-base! p-3! transition-colors!">Online</TabsTrigger>
          <TabsTrigger value="all" className="data-[state=active]:bg-layer-2! hover:bg-layer-2/70! h-8 text-base! p-3! transition-colors!">All</TabsTrigger>
          {pendingRequests.length > 0 && <TabsTrigger value="pending" className="data-[state=active]:bg-layer-2! hover:bg-layer-2/70! h-8 text-base! p-3! transition-colors!">Pending</TabsTrigger>}
          <TabsTrigger value="addfriend" className="bg-primary! data-[state=active]:bg-primary/20! data-[state=active]:text-primary/80! hover:bg-primary/70! h-8 text-base! text-accent-foreground p-3! transition-colors!">Add Friend</TabsTrigger>
        </TabsList>
      <TabsContent value="online" className="mt-4">
          <h2 className="text-lg font-semibold mb-3">Online — {onlineFriends.length}</h2> 
          <div className="space-y-2">
            {onlineFriends.map((f) => (
              <div key={f._id} className="flex items-center bg-layer-2 p-2 pr-4 rounded-lg w-full hover:bg-layer-1/50 transition-colors duration-150">
                <UserRow key={f._id} user={f} />
                <MessageCircle onClick={() => handleConvo(f._id)} className="ml-auto w-5 h-5 text-foreground/70 hover:text-foreground cursor-pointer"/>
              </div>
            ))}
          </div>
      </TabsContent>
      <TabsContent value="all" className="mt-4">
          <h2 className="text-lg font-semibold mb-3">All friends — {friends.length}</h2> 
          <div className="space-y-2">
            {friends.map((f) => (
              <div key={f._id} className="flex items-center bg-layer-2 p-2 pr-4 rounded-lg w-full hover:bg-layer-1/50 transition-colors duration-150">
                <UserRow key={f._id} user={f} />
                <MessageCircle onClick={() => handleConvo(f._id)} className="ml-auto w-5 h-5 text-foreground/70 hover:text-foreground cursor-pointer"/>
              </div>
            ))}
          </div>
      </TabsContent>
      <TabsContent value="pending" className="mt-4">
          <h2 className="text-lg font-semibold mb-3">Pending — {pendingRequests?.length}</h2> 
          <div className="space-y-2">
            {pendingRequests?.map((request) => {
              const isRequestSent = request.from._id === user?._id;
              const f = isRequestSent ? request.to : request.from;
              return (
                <div key={f._id} className="flex items-center bg-layer-2 p-2 pr-4 rounded-lg w-full hover:bg-layer-1/50 transition-colors duration-150">
                  <UserRow key={f._id} user={f} />
                  <div className="ml-auto">
                    {isRequestSent ? (
                      <span className="text-sm text-muted-foreground">Request Sent</span>
                    ) : (
                      <div>
                        <button onClick={() => handleRequest(request._id, 'accept')} className="text-sm text-primary hover:underline hover:cursor-pointer rounded-full p-2 hover:bg-layer-2 active:scale-95"><Check /></button>
                        <button onClick={() => handleRequest(request._id, 'reject')} className="text-sm text-destructive hover:underline ml-2 hover:cursor-pointer rounded-full p-2 hover:bg-layer-2 active:scale-95"><X /></button>
                      </div>
                    )}
                  </div>
                </div>
              )
            })}
          </div>
      </TabsContent>
      <TabsContent value="addfriend" className="mt-4">
          <div className="space-y-4">
            <h2 className="text-lg font-semibold mb-2">Add Friend</h2>
            <p className="text-base text-muted-foreground">You can add friends using their username.</p>
            <div className="relative">
              <input
                name="username"
                type="text"
                placeholder="Enter username"
                className="w-full p-2 border border-border rounded-xl min-h-13 bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                value={sendRequest}
                onChange={(e) => setSendRequest(e.target.value)}
              />
              <Button onClick={() => sendRequestHandler()} disabled={sendRequest.length === 0} className="absolute right-3 top-2 w-40 text-sm font-bold bg-primary text-primary-foreground py-2 rounded-lg hover:bg-primary/80 transition-colors">
                Send Friend Request
              </Button>
            </div>
          </div>
      </TabsContent>
      </Tabs>
    </div>
  );
};
