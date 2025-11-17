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

interface Server {
    _id: string;
    name?: string;
    description?: string;
    owner?: User;
    members?: Array<User>;
    defaultChannelId?: string;
    textChannels: Array<TextChannel>;
}

interface ServerState {
    server: Server | null;
    servers: Record<string, Server>;
    setServers: (servers: ServerState['servers']) => void;
    setServer: (server: ServerState['server']) => void;
}

export const useServerStore = create<ServerState>()(
    devtools(
        persist(
            (set) => ({
                server: null,
                setServer: (server: ServerState['server']) => set({server}),
                servers: {},
                setServers: (servers: ServerState['servers']) => set({servers}),
            }),
            {
                name: 'server-storage',
            }
        )
    )
);
