import {create} from 'zustand';
import {persist, devtools} from 'zustand/middleware';
import { User } from './useUserStore';
import { DM } from './useDMStore';

export interface Message {
    _id: string;
    sender: User;
    origin: 'textChannel' | 'directMessage';
    convo?: string;
    channel?: string;
    message: string;
    createdAt: Date;
}
    

interface TextChannelState {
    textChannels: Record<string, Message[]>;
    setTextChannels: (textChannels: TextChannelState['textChannels']) => void;
    getTextChannel: (channelId: string) => Message[];
    addMessage: (channelId: string, message: Message) => void;
    updateMessage: (channelId: string, messageId: string, message: Message) => void;
    loading: boolean;
    setLoading: (loading: boolean) => void;
    logout: () => void;
}

export const useTextChannelStore = create<TextChannelState>()(
    devtools(
        persist(
            (set, get) => ({
                textChannels: {},
                setTextChannels: (textChannels: TextChannelState['textChannels']) => set({textChannels}),
                getTextChannel: (channelId: string) => {
                    return get().textChannels[channelId];
                },
                addMessage: (channelId: string, message: Message) => set((state) => {
                    const channel = state.textChannels[channelId];
                    if (channel) {
                        return {
                            textChannels: {
                                ...state.textChannels,
                                [channelId]: [...channel, message]
                            },
                        };
                    }
                    return state;
                }),
                updateMessage: (channelId: string, messageId: string, message: Message) => set((state) => {
                    const channel = state.textChannels[channelId];
                    if (channel) {
                        const updatedMessages = channel.map((msg) =>
                            msg._id === messageId ? message : msg
                        );
                        return {
                            textChannels: {
                                ...state.textChannels,
                                [channelId]: updatedMessages,
                            },
                        };
                    }
                    return state;
                }),
                loading: false,
                setLoading: (loading: boolean) => set({loading}),
                logout: () => set({ textChannels: {}, loading: false}),
            }),
            {
                name: 'text-channel-storage',
            }
        )
    )
);
