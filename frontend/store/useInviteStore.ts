import {create} from "zustand";
import {persist, devtools} from "zustand/middleware";
import { Server } from "./useServerStore";
import { User } from "./useUserStore";

interface InviteState {
    invite: {
        code: string;
        server: Server;
        expiresAt: string;
        maxUses: number;
        uses: number;
        createdBy: User;
    } | null;
    setInvite: (invite: InviteState['invite']) => void;
    loading: boolean;
    setLoading: (loading: boolean) => void;
}


export const useInviteStore = create<InviteState>()(
    devtools(
        persist(
            (set) => ({
                invite: null,
                setInvite: (invite: InviteState['invite']) => set({invite}),
                loading: false,
                setLoading: (loading: boolean) => set({loading}),
            }),
            {
                name: "invite-storage",
            }
        )
    )
);