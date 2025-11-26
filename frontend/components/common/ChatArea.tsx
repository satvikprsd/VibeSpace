"use client";

import { Message } from "@/store/useTextChannelStore";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import MessageSkeleton from "../skeletons/MessageSkeleton";
import { getInviteDetails } from "@/services/serverService";
import { useUserStore } from "@/store/useUserStore";

export default function ChatArea({messages, loading}: {messages: Message[]; loading: boolean;}) {
  const bottomRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const processed = messages.map((msg, i) => {
      const prev = messages[i - 1];
      if (!prev) return { ...msg, groupedWithPrevious: false };
      return { ...msg, groupedWithPrevious: prev.sender?._id === msg.sender?._id && (new Date(msg.createdAt).getTime() - new Date(prev.createdAt).getTime())/(1000*60) < 2 };
  });

  if (loading) return <MessageSkeleton />;
    
  return (
    <div className="flex-1 overflow-y-auto px-4 py-6 text-foreground max-h-[calc(100vh-150px)] min-h-[calc(100vh-150px)] justify-end">

      {processed.length === 0 && (
        <div className="text-center text-foreground mt-10">
          No messages yet. Start the conversation!
        </div>
      )}

      {processed.map((msg, index) => {
        const prev = processed[index - 1];
        if (!prev || new Date(msg.createdAt).toDateString() !== new Date(prev.createdAt).toDateString()) {
          const dateString = new Date(msg.createdAt).toLocaleDateString("en-IN", {year: "numeric",month: "long",day: "numeric"});
          return (
            <div key={index}>
              <DateDivider date={dateString} />
              <ChatMessage avatar={msg.sender?.avatar} username={msg.sender?.username} time={new Date(msg.createdAt).toLocaleTimeString("en-IN", {hour: "2-digit",minute: "2-digit",hour12: false})} message={msg.message} grouped={msg.groupedWithPrevious}/>
            </div>
          );
        }

        return (
          <ChatMessage key={index} avatar={msg.sender?.avatar} username={msg.sender?.username} time={new Date(msg.createdAt).toLocaleTimeString("en-IN", {hour: "2-digit",minute: "2-digit",hour12: false})} message={msg.message} grouped={msg.groupedWithPrevious}/>
        )})}
      <div ref={bottomRef} />
    </div>
  );
}


function ChatMessage({avatar, username, time, message, grouped}: {avatar: string; username: string; time: string; message: string;grouped: boolean;}) {
  return (
    <div className={`flex items-start mb-0 ${grouped ? "pl-14" : "gap-4 mt-4"}`}>
      {!grouped && (
        <Image
          alt="User Avatar"
          src={avatar || "/default-avatar.png"}
          className="w-10 h-10 rounded-full object-cover mt-2"
          width={200}
          height={200}
        />
      )}

      <div>
        {!grouped && (<div className="flex items-center gap-2">
          <span className="font-semibold">{username}</span>
          <span className="text-xs text-foreground">{time}</span>
        </div>)}

        {isLink(message) ? 
          isInviteLink(message) ? (
            <InviteCard inviteCode={message.split("/").pop()!} />
          ) : (
            <a href={message} className="text-sm leading-relaxed text-blue-500 underline" target="_blank" rel="noopener noreferrer">
              {message}
            </a>
          ) : (
            <p className="text-sm leading-relaxed">{message}</p>
        )}
      </div>
    </div>
  );
}

function DateDivider({ date }: { date: string }) {
  return (
    <div className="flex items-center gap-4 opacity-60 select-none">
      <div className="flex-1 h-px bg-gray-600" />
      <span className="text-xs text-gray-400">{date}</span>
      <div className="flex-1 h-px bg-gray-600" />
    </div>
  );
}

function isLink(text: string) {
  const urlPattern = /^(https?:\/\/)([\w.-]+)(:\d+)?(\/.*)?$/;
  return urlPattern.test(text);
}

function isInviteLink(text: string) {
  const frontendUrl = process.env.NEXT_PUBLIC_FRONTEND_URL;
  const escapedUrl = frontendUrl?.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  console.log("Frontend URL:", escapedUrl);
  const invitePattern =new RegExp(`^${escapedUrl}\\/join\\/[a-zA-Z0-9]+$`);
  console.log("Checking invite link:", text, invitePattern.test(text));
  return invitePattern.test(text);
}
function InviteCard({inviteCode}: {inviteCode: string}) {
  const [invite, setInvite] = useState<any | null>(null);
  const { user } = useUserStore();
  useEffect(() => {
    const fetchInviteDetails = async () => {
      const response = await getInviteDetails(inviteCode);
      const invite = response?.data.invite;
      setInvite(invite);
    }
    if (inviteCode) fetchInviteDetails();
  }, [inviteCode]);

  return (
    <div className="w-[300px] bg-layer-2 rounded-xl flex flex-col gap-5">
      <div className="relative h-20 bg-linear-to-r from-background via-secondary to-background">
        <div className="absolute -bottom-8 left-4 w-16 h-16 bg-background rounded-xl flex items-center justify-center text-foreground text-xl border-2 border-layer-1">
          {invite?.server?.name.charAt(0).toUpperCase()}
        </div>
      </div>
      <div className="text-foreground p-4 pb-0">
        <h2 className="text-xl font-semibold">{invite?.server?.name}</h2>
        <div className="flex gap-3 text-sm text-layer-2/40 mt-1">
          <span className="flex items-center gap-1 text-foreground">
            <span className="inline-block w-2 h-2 rounded-full bg-gray-500" />
            {invite ? invite.server.members.length : 0} Member
          </span>
        </div>
      </div>

      <button className="bg-[#23a55a] hover:bg-[#1c8e4b] text-foreground font-medium py-2 rounded-lg p-4  m-4">
        {user?.servers?.some(s => s._id === invite?.server?._id) ? 'Go to Server' : 'Join Server'}
      </button>
    </div>
  );
}
