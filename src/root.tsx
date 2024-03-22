import {
    component$,
} from "@builder.io/qwik";
import {
    QwikCityProvider,
    RouterOutlet,
    ServiceWorkerRegister,
} from "@builder.io/qwik-city";
import { RouterHead } from "./components/router-head/router-head";

import "./global.css";
import ThemeProvider from "~/providers/themeProvider";

export default component$(() => {
    /**
     * The root of a QwikCity site always start with the <QwikCityProvider> component,
     * immediately followed by the document's <head> and <body>.
     *
     * Don't remove the `<head>` and `<body>` elements.
     */

    // useVisibleTask$(() => {
    //     theme.value = (window.localStorage.getItem("theme") ?? "") as Theme
    //     if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
    //         theme.value = "dark"
    //     }
    // })

    return (
        <QwikCityProvider>
            <head>
                <meta charSet="utf-8" />
                <link rel="manifest" href="/manifest.json" />
                <RouterHead />
                <ServiceWorkerRegister />
            </head>
            <body
                lang="ja"
                class={[
                    "flex min-h-full bg-white antialiased dark:bg-zinc-900",
                ]}
            >
                <ThemeProvider>
                    <RouterOutlet />
                </ThemeProvider>
            </body>
        </QwikCityProvider>
    );
});
