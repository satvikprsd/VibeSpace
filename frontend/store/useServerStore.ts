import {create} from 'zustand';
import {persist, devtools} from 'zustand/middleware';
import { User } from './useUserStore';

interface Message{
    _id: string;
    sender: User;
    message: string;
    timestamp: string;
}

interface TextChannel {
    _id: string;
    name: string;
    messages: Array<Message>;
}

export interface Server {
    _id: string;
    name?: string;
    description?: string;
    owner?: User;
    members?: Array<User>;
    defaultChannelId?: string;
    textChannels: Array<TextChannel>;
}

interface ServerState {
    servers: Record<string, Server>;
    setServers: (servers: ServerState['servers']) => void;
    addServer: (server: Server) => void;
    logout: () => void;
}

export const useServerStore = create<ServerState>()(
    devtools(
        persist(
            (set) => ({
                servers: {},
                setServers: (servers: ServerState['servers']) => set({servers}),
                addServer: (server: Server) => set((state) => ({
                    servers: {
                        ...state.servers,
                        [server._id]: server,
                    },
                })),
                logout: () => set({ servers: {} }),
            }),
            {
                name: 'server-storage',
            }
        )
    )
);
