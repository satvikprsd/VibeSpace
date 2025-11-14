import {create} from "zustand";
import {persist, devtools} from "zustand/middleware";

interface UIState {
    topBarText: string;
    setTopBarText: (text: string) => void;
}

export const useUIStore = create<UIState>()(
    devtools(
        persist(
            (set) => ({
                topBarText: "Friends",
                setTopBarText: (text: string) => set({topBarText: text}),
            }),
            {
                name: "ui-storage",
            }
        )
    )
);