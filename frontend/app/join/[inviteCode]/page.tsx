"use client";
import { Button } from "@/components/ui/button";
import useGetInviteDetails from "@/hooks/useGetInviteDetails";
import { joinServer } from "@/services/serverService";
import { useInviteStore } from "@/store/useInviteStore";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation"
import { toast } from "sonner";

const JoinPage = () => {
  const {inviteCode} = useParams();
  const router = useRouter();
  useGetInviteDetails(inviteCode as string);

  const {invite, setInvite, loading} = useInviteStore();

  const handleJoin = async () => {
    const response = await joinServer(inviteCode as string);
    const data = response?.data;
    if (data?.success) {
        setInvite(null);
        toast.success(data.message || "Successfully joined the server");
        router.push(`/channels/${data.server._id}/${data.server?.defaultChannelId}`);
    } else {
        toast.error(data?.message || "Failed to join the server. Please try again.");
    }
  }
  
  if (loading) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div className="flex flex-col justify-center items-center bg-layer-2 w-[400px] p-6 rounded-lg shadow-md">
                    <p className="text-white text-lg">Loading invite details...</p>
                </div>
            </div>
        );
    }


  return (
    <div className="flex items-center justify-center min-h-screen">
        {invite && <div className="flex flex-col justify-center items-center bg-layer-2 w-[400px] p-6 rounded-lg shadow-md">
            <div className="w-20 h-20 rounded-full bg-gray-300 overflow-hidden">
                <Image
                    alt="User Avatar"
                    src={invite?.createdBy?.avatar || "/default-avatar.png"}
                    className="w-20 h-20 rounded-full object-cover"
                    width={200}
                    height={200}
                />
            </div>
            <h2 className="text-xl text-white mt-4 mb-2">
                {invite?.createdBy.username} invited you to join
            </h2>
            <h3 className="text-2xl font-bold text-gray-300 mb-2">
                {invite?.server.name}
            </h3>
            <div className="flex items-center mb-6">
                <span className="w-5 h-5 rounded-full border-4 border-[#2b2d31] bg-gray-500"/>
                <p className="text-gray-400 ml-1">
                    {invite?.server.members?.length || 0} members
                </p>
            </div>
            <Button onClick={handleJoin} className="w-full bg-primary hover:bg-primary/70 cursor-pointer text-white font-semibold py-2 px-4 rounded-xl">
                Join Server
            </Button>
        </div>}
        {!invite && !loading && <div className="flex flex-col justify-center items-center bg-layer-2 w-[400px] p-6 rounded-lg shadow-md">
            <h2 className="text-xl text-white mt-4 mb-2">
                Invalid or Expired Invite Link
            </h2>
            <p className="text-gray-400 mb-6">
                The invite link you used is either invalid or has expired. Please check the link and try again.
            </p> 
        </div>}
    </div>
  )
}

export default JoinPage
