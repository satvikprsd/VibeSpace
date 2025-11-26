import { useDMStore } from "@/store/useDMStore";
import { useParams } from "next/navigation";
import ChatArea from "../common/ChatArea";

export function DMChatArea() {
  const { channelId } = useParams();
  const { dms, loading } = useDMStore();

  const messages = dms[channelId as string]?.messages || [];

  return <ChatArea messages={messages} loading={loading} />;
}
