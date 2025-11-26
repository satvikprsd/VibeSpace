import {create} from "zustand";
import {persist, devtools} from "zustand/middleware";

interface UIState {
    topBarText: string;
    setTopBarText: (text: string) => void;
    logout: () => void;
}

export const useUIStore = create<UIState>()(
    devtools(
        persist(
            (set) => ({
                topBarText: "Friends",
                setTopBarText: (text: string) => set({topBarText: text}),
                logout: () => set({ topBarText: "Friends" }),
            }),
            {
                name: "ui-storage",
            }
        )
    )
);