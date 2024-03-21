import {
    $,
    component$,
    Slot,
    useContextProvider,
    useOn,
    useOnWindow,
    useSignal,
    useVisibleTask$,
} from "@builder.io/qwik";
import themeScript from "~/media/theme?raw";
import { Theme, ThemeContext } from "~/contexts/themeContext";

export default component$(() => {
    const theme = useSignal<Theme>("light");
    const isLoaded = useSignal(false);
    useContextProvider(ThemeContext, theme);

    // eslint-disable-next-line qwik/no-use-visible-task
    useVisibleTask$(({ track }) => {
        track(() => theme.value);
        if (isLoaded.value) {
            // Disables transitions. This technique is from https://paco.me/writing/disable-theme-transitions .
            const css = document.createElement("style");
            css.type = "text/css";
            css.appendChild(
                document.createTextNode(
                    `* {
                   -webkit-transition: none !important;
                   -moz-transition: none !important;
                   -o-transition: none !important;
                   -ms-transition: none !important;
                   transition: none !important;
                }`,
                ),
            );
            document.head.appendChild(css);
            const isSystemDark = window.matchMedia(
                "(prefers-color-scheme: dark)",
            );
            switch (theme.value) {
                case "dark":
                    if (isSystemDark) {
                        window.localStorage.removeItem("theme");
                    } else {
                        window.localStorage.setItem("theme", "dark");
                    }
                    document.documentElement.classList.add("dark");
                    break;
                case "light":
                    if (isSystemDark) {
                        window.localStorage.removeItem("theme");
                    } else {
                        window.localStorage.setItem("theme", "light");
                    }
                    document.documentElement.classList.remove("dark");
                    break;
            }

            const _ = window.getComputedStyle(css).opacity;
            document.head.removeChild(css);
        }
    });

    // eslint-disable-next-line qwik/no-use-visible-task
    useVisibleTask$(({ cleanup }) => {
        const value = window.localStorage.getItem("theme");
        const media = window.matchMedia("(prefers-color-scheme: dark)");

        if (value !== null) {
            theme.value = value as Theme;
        } else {
            theme.value = media.matches ? "dark" : "light";
        }
        isLoaded.value = true;

        const handleMediaQuery = (e: MediaQueryListEvent | MediaQueryList) => {
            console.log(e);
            if (window.localStorage.getItem("theme") === null) {
                if (e.matches) {
                    document.documentElement.classList.add("dark");
                } else {
                    document.documentElement.classList.remove("dark");
                }
            }
        };
        media.addEventListener("change", handleMediaQuery);

        cleanup(() => media.removeEventListener("change", handleMediaQuery));
    });

    return (
        <>
            <script dangerouslySetInnerHTML={themeScript} />
            <Slot />
        </>
    );
});
