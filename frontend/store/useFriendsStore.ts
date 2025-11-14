import {create} from 'zustand';
import {persist, devtools} from 'zustand/middleware';

interface FriendsState {
    friends: string[];
    setFriends: (friends: string[]) => void;
}

export const useFriendsStore = create<FriendsState>()(
    devtools(
        persist(
            (set) => ({
                friends: [],
                setFriends: (friends: string[]) => set({friends}),
            }),
            {
                name: 'friends-storage',
            }
        )
    )
);
