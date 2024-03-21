import { component$, Slot, useStyles$ } from "@builder.io/qwik";
import { Link, routeLoader$ } from "@builder.io/qwik-city";
import type { RequestHandler } from "@builder.io/qwik-city";
import Logo from "~/media/logo.svg?jsx";
import styles from "./styles.css?inline";
import Header from "~/components/header/header";

export const onGet: RequestHandler = async ({ cacheControl }) => {
    // Control caching for this request for best performance and to reduce hosting costs:
    // https://qwik.builder.io/docs/caching/
    cacheControl({
        // Always serve a cached response by default, up to a week stale
        staleWhileRevalidate: 60 * 60 * 24 * 7,
        // Max once every 5 seconds, revalidate on the server to get a fresh version of this page
        maxAge: 5,
    });
};

export const useServerTimeLoader = routeLoader$(() => {
    return {
        date: new Date().toISOString(),
    };
});

export default component$(() => {
    useStyles$(styles);
    return (
        <div class={"w-full"}>
            <div class={"h-full lg:ml-72 xl:ml-80"}>
                <div
                    class={
                        "contents lg:pointer-events-none lg:fixed lg:inset-0 lg:z-40 lg:flex"
                    }
                >
                    <div
                        class={[
                            "contents lg:pointer-events-auto lg:block lg:w-72 lg:overflow-y-auto lg:border-r lg:border-zinc-900/10 lg:px-6 lg:pb-8 lg:pt-4 xl:w-80",
                            "lg:dark:border-white/10",
                        ]}
                    >
                        <div class={"hidden lg:flex"}>
                            <Link
                                href={"/"}
                                aria-label={"Index"}
                                class={"mr-auto"}
                            >
                                <Logo class={"h-5 w-auto"} />
                            </Link>
                        </div>
                        <Header />
                    </div>
                </div>
                <div
                    class={
                        "relative flex h-full flex-col px-4 pt-14 sm:px-6 lg:px-8"
                    }
                >
                    <main class={"flex-auto"}>
                        <Slot />
                    </main>
                </div>
            </div>
        </div>
    );
});
