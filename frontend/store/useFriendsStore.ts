import {create} from 'zustand';
import {persist, devtools} from 'zustand/middleware';
import { User } from './useUserStore';

interface FriendsState {
    friends: User[];
    setFriends: (friends: User[]) => void;
    pendingRequests: {_id:string, from: User, to: User, status: string}[];
    setPendingRequests: (pendingRequests: {_id:string, from: User, to: User, status: string}[]) => void;
}

export const useFriendsStore = create<FriendsState>()(
    devtools(
        persist(
            (set) => ({
                friends: [],
                setFriends: (friends: User[]) => set({friends}),
                pendingRequests: [],
                setPendingRequests: (pendingRequests: {_id:string, from: User, to: User, status: string}[]) => set({pendingRequests}),
            }),
            {
                name: 'friends-storage',
            }
        )
    )
);
