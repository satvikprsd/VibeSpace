import {create} from 'zustand';
import {persist, devtools} from 'zustand/middleware';
import { User } from './useUserStore';

interface Message {
    _id: string;
    sender: User;
    origin: 'textChannel' | 'directMessage';
    receiver?: string;
    channel?: string;
    message: string;
    createdAt: Date;
}
    

interface TextChannelState {
    messages: Message[];
    setMessages: (messages: Message[]) => void;
}

export const useTextChannelStore = create<TextChannelState>()(
    devtools(
        persist(
            (set) => ({
                messages: [],
                setMessages: (messages: Message[]) => set({messages}),
            }),
            {
                name: 'text-channel-storage',
            }
        )
    )
);
