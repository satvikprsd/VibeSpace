"use client";

import { useTextChannelStore } from "@/store/useTextChannelStore";
import Image from "next/image";
import { useEffect, useRef } from "react";

export default function ChatArea() {
  const { messages } = useTextChannelStore();
  
  const bottomRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const processed = messages.map((msg, i) => {
      const prev = messages[i - 1];
      if (!prev) return { ...msg, groupedWithPrevious: false };
      return { ...msg, groupedWithPrevious: prev.sender?._id === msg.sender?._id && (new Date(msg.createdAt).getTime() - new Date(prev.createdAt).getTime())/(1000*60) < 2 };
  });

  return (
    <div className="flex-1 overflow-y-auto px-4 py-6 text-foreground max-h-[calc(100vh-140px)] justify-end">

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
              <Message avatar={msg.sender?.avatar} username={msg.sender?.username} time={new Date(msg.createdAt).toLocaleTimeString("en-IN", {hour: "2-digit",minute: "2-digit",hour12: false})} message={msg.message} grouped={msg.groupedWithPrevious}/>
            </div>
          );
        }

        return (
          <Message key={index} avatar={msg.sender?.avatar} username={msg.sender?.username} time={new Date(msg.createdAt).toLocaleTimeString("en-IN", {hour: "2-digit",minute: "2-digit",hour12: false})} message={msg.message} grouped={msg.groupedWithPrevious}/>
        )})}
      <div ref={bottomRef} />
    </div>
  );
}


function Message({avatar, username, time, message, grouped}: {avatar: string; username: string; time: string; message: string;grouped: boolean;}) {
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

        <p className="text-sm leading-relaxed">{message}</p>
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
