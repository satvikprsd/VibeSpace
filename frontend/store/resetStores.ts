import { useDMStore } from "./useDMStore";
import { useFriendsStore } from "./useFriendsStore";
import { useServerStore } from "./useServerStore";
import { useTextChannelStore } from "./useTextChannelStore";
import { useUIStore } from "./useUIStore";
import { useUserStore } from "./useUserStore"

export const resestStores = () => {
    useUserStore.getState().logout();
    useUIStore.getState().logout();
    useServerStore.getState().logout();
    useTextChannelStore.getState().logout();
    useDMStore.getState().logout();
    useFriendsStore.getState().logout();
}