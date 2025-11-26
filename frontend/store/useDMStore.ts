import { create } from "zustand";
import { persist, devtools } from "zustand/middleware";
import { User } from "./useUserStore";
import { Message } from "./useTextChannelStore";

export interface DM {
    _id: string;
    participants: Array<User>;
    messages: Array<Message>;
}

interface DMState {
    dms: Record<string, DM>;
    setDMs: (dms: DMState['dms']) => void;
    addDM: (dm: DM) => void;
    addMessage: (dmId: string, message: Message) => void;
    updateMessage: (dmId: string, messageId: string, message: Message) => void;
    loading: boolean;
    setLoading: (loading: boolean) => void;
    logout: () => void;
}

export const useDMStore = create<DMState>()(
    devtools(
        persist(
            (set, get) => ({
                dms: {},
                setDMs: (dms: DMState['dms']) => set({ dms }),
                addDM: (dm: DM) => {
                    const currentDMs = get().dms;
                    set({ dms: { ...currentDMs, [dm._id]: dm } });
                },
                addMessage: (dmId: string, message: Message) => set((state) => {
                    const dm = state.dms[dmId];
                    if (dm) {
                        return {
                            dms: {
                                ...state.dms,
                                [dmId]: {
                                    ...dm,
                                    messages: [...dm.messages, message],
                                },
                            },
                        };
                    }
                    return state;
                }),
                updateMessage: (dmId: string, messageId: string, message: Message) => set((state) => {
                    const dm = state.dms[dmId];
                    if (dm) {
                        const updatedMessages = dm.messages.map((msg) =>
                            msg._id === messageId ? message : msg
                        );
                        return {
                            dms: {
                                ...state.dms,
                                [dmId]: {
                                    ...dm,
                                    messages: updatedMessages,
                                },
                            },
                        };
                    }
                    return state;
                }),
                loading: false,
                setLoading: (loading: boolean) => set({ loading }),
                logout: () => set({ dms: {} }),
            }),
            {
                name: "dm-storage",
            }
        )
    )
);
