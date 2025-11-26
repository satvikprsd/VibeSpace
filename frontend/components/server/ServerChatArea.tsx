import { useParams } from "next/navigation";
import { useTextChannelStore } from "@/store/useTextChannelStore";
import ChatArea from "../common/ChatArea";

export function ServerChatArea() {
  const { channelId } = useParams();
  const { textChannels, loading } = useTextChannelStore();

  const messages = textChannels[channelId as string] || [];

  return <ChatArea messages={messages} loading={loading} />;
}
