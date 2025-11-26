import { SetStateAction, useEffect, useState } from "react";
import { Button } from "./ui/button";
import { DialogContent, DialogHeader, DialogTitle } from "./ui/dialog";
import { Input } from "./ui/input";
import { Search, ChevronDown } from "lucide-react";
import { generateInvite } from "@/services/serverService";
import { useFriendsStore } from "@/store/useFriendsStore";
import Image from "next/image";
import { Server } from "@/store/useServerStore";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";

const CreateServerInviteDialog = ({isOpen, server, }: {isOpen: boolean; server: Server;}) => {
  const {friends} = useFriendsStore();
  const [inviteLink, setInviteLink] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [expireAfter, setExpireAfter] = useState("7 days");
  const [maxUses, setMaxUses] = useState("No limit");
  const [copied, setCopied] = useState(false);

  const fetchInviteLink = async () => {
    setIsLoading(true);
    try {
        const maxAge = expireAfter === "7 days" ? 7*24*60*60 
        : expireAfter === "1 day" ? 24*60*60 
        : expireAfter === "12 hours" ? 12*60*60 
        : expireAfter === "6 hours" ? 6*60*60 
        : expireAfter === "1 hour" ? 60*60 
        : expireAfter === "30 minutes" ? 30*60 : undefined;
        const expiryDate =  maxAge ? maxAge * 1000 : undefined;
        const expiresAt = expiryDate ? new Date(Date.now() + expiryDate) : undefined;
        const maxUsesValue = maxUses === "No limit" ? null : parseInt(maxUses);
        const response = await generateInvite(server?._id, String(expiresAt), maxAge, maxUsesValue as number | null); 
        const data = response?.data;
        if (data?.success) {
            setInviteLink(`${process.env.NEXT_PUBLIC_FRONTEND_URL}/join/${data.inviteCode}`);
        }
    } catch (error) {
        console.error("Failed to generate invite", error);
    } finally {
        setIsLoading(false);
    }
  };

  useEffect(() => {
    if (isOpen && !inviteLink) fetchInviteLink();
  }, [isOpen, server]);

  const handleCopy = () => {
    navigator.clipboard.writeText(inviteLink);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleGenerateNew = async () => {
    await fetchInviteLink();
    setShowSettings(false);
  };

  if (showSettings) {
    return (
      <DialogContent className="bg-background text-foreground/90 rounded-lg shadow-2xl max-w-[440px] p-0 overflow-hidden gap-0">
        <div className="p-6 pb-4">
          <DialogHeader className="mb-6">
            <DialogTitle className="text-xl font-bold text-left">
              Server invite link settings
            </DialogTitle>
          </DialogHeader>

          <div className="space-y-6">
            <div className="space-y-2">
              <label className="text-xs font-bold text-foreground/70 uppercase tracking-wide">
                Expire After
              </label>
              <div className="relative">
                <Select value={expireAfter} onValueChange={setExpireAfter}>
                  <SelectTrigger className="w-full bg-foreground/10! border-none rounded-md text-sm focus:ring-2 focus:ring-blue-500">
                    <SelectValue placeholder="Select expiration" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="30 minutes">30 minutes</SelectItem>
                    <SelectItem value="1 hour">1 hour</SelectItem>
                    <SelectItem value="6 hours">6 hours</SelectItem>
                    <SelectItem value="12 hours">12 hours</SelectItem>
                    <SelectItem value="1 day">1 day</SelectItem>
                    <SelectItem value="7 days">7 days</SelectItem>
                    <SelectItem value="Never">Never</SelectItem>
                  </SelectContent>
                </Select>
                <ChevronDown className="absolute right-3 top-2.5 w-4 h-4 text-foreground/70 pointer-events-none" />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold text-foreground/70 uppercase tracking-wide">
                Max Number of Uses
              </label>
              <div className="relative">
                <Select value={maxUses} onValueChange={setMaxUses}>
                  <SelectTrigger className="w-full bg-foreground/10! border-none rounded-md text-sm focus:ring-2 focus:ring-blue-500">
                    <SelectValue placeholder="Select max uses" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="No limit">No limit</SelectItem>
                    <SelectItem value="1 use">1 use</SelectItem>
                    <SelectItem value="5 uses">5 uses</SelectItem>
                    <SelectItem value="10 uses">10 uses</SelectItem>
                    <SelectItem value="25 uses">25 uses</SelectItem>
                    <SelectItem value="50 uses">50 uses</SelectItem>
                    <SelectItem value="100 uses">100 uses</SelectItem>
                  </SelectContent>
                </Select>
                <ChevronDown className="absolute right-3 top-2.5 w-4 h-4 text-foreground/70 pointer-events-none" />
              </div>
            </div>
          </div>
        </div>

        <div className="bg-foreground/10! p-4 flex justify-end gap-3">
          <Button 
            variant="ghost" 
            onClick={() => setShowSettings(false)}
            className="text-sm text-foreground/70 hover:underline hover:bg-transparent"
          >
            Cancel
          </Button>
          <Button 
            onClick={handleGenerateNew}
            className="bg-indigo-500 hover:bg-indigo-600 text-white text-sm px-6"
          >
            Generate a New Link
          </Button>
        </div>
      </DialogContent>
    );
  }

  return (
    <DialogContent className="bg-background text-foreground rounded-lg shadow-2xl max-w-[440px] p-0 overflow-hidden gap-0">
      <div className="p-6 pb-2">
        <DialogHeader className="mb-4">
          <DialogTitle className="text-base font-bold uppercase text-foreground tracking-wider mb-1">
            Invite friends to {server?.name}
          </DialogTitle>
        </DialogHeader>

        <div className="relative mb-4">
          <Input 
            placeholder="Search for friends" 
            className="bg-foreground/10! border-none focus-visible:ring-1 focus-visible:ring-blue-500 pr-8"
          />
          <Search className="absolute right-3 top-2.5 w-4 h-4 text-foreground/70" />
        </div>

        <div className="max-h-[200px] overflow-y-auto pr-1 -mr-2 space-y-1 custom-scrollbar mb-6">
          {friends?.map((friend) => (
            <div key={friend._id} className="flex items-center justify-between p-2 hover:bg-foreground/10 rounded group transition-colors">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-gray-300 overflow-hidden">
                   <Image
                        alt="User Avatar"
                        src={friend?.avatar || "/default-avatar.png"}
                        className="w-8 h-8 rounded-full object-cover"
                        width={200}
                        height={200}
                    />
                </div>
                <span className="font-medium text-foreground/70 group-hover:text-foreground/90">{friend.username}</span>
              </div>
              <Button 
                variant="outline" 
                className="border-green-600! text-green-600! hover:bg-green-600! hover:text-background! h-7 text-xs px-4 transition-all"
              >
                Invite
              </Button>
            </div>
          ))}
        </div>

        <div className="h-px bg-foreground/20 w-full mb-4" />

        <div className="flex flex-col gap-2">
            <h3 className="text-xs font-bold text-foreground/70 uppercase tracking-wide">
                Or send a server invite link to a friend
            </h3>
            
            <div className="relative flex items-center mt-1">
                <Input 
                    readOnly
                    value={isLoading ? "Generating..." : inviteLink} 
                    className="bg-foreground/10! font-bold! border-none text-foreground! pr-20 h-10 focus-visible:border-none! focus-visible:ring-0!"
                />
                <Button 
                    size="sm"
                    onClick={handleCopy}
                    className={`absolute right-1 h-8 px-5 transition-colors ${inviteLink ? 'bg-indigo-500 hover:bg-indigo-600' : 'bg-gray-400 cursor-not-allowed'} ${copied ? 'bg-green-500 hover:bg-green-600' : ''}`}
                    disabled={!inviteLink}
                >
                    {copied ? "Copied!" : "Copy"}
                </Button>
            </div>
            
            <p className="text-xs text-foreground/70 mt-1">
                Your invite link expires in {expireAfter}.{" "}
                <span 
                    onClick={() => setShowSettings(true)}
                    className="text-blue-500 cursor-pointer hover:underline"
                >
                    Edit invite link.
                </span>
            </p>
        </div>
      </div>
    </DialogContent>
  );
};

export default CreateServerInviteDialog;