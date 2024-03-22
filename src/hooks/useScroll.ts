import { $, useOnWindow, useStore } from "@builder.io/qwik";

export const useScroll = () => {
    const store = useStore({
        scrollX: 0,
        scrollY: 0,
    });
    useOnWindow(
        "scroll",
        $(() => {
            store.scrollX = window.scrollX;
            store.scrollY = window.scrollY;
        }),
    );

    return store;
};
