import { component$, Slot, useId, useSignal } from "@builder.io/qwik";
import { Link } from "@builder.io/qwik-city";
import Logo from "~/media/logo.svg?jsx";
import ThemeToggle from "~/components/header/themeToggle";
import Github from "~/components/header/github";
import { HiBars3Outline } from "@qwikest/icons/heroicons";
import Mobile from "~/components/sidebar/mobile";

export const HeaderMobileNav = component$(() => {
    const id = useId();
    const buttonRef = useSignal<Element>();

    return (
        <div class={"flex z-50 items-center gap-5 lg:hidden"}>
            <button
                ref={buttonRef}
                class={
                    "flex h-8 w-8 items-center justify-center rounded-full transition hover:bg-zinc-900/5 dark:hover:bg-white/5"
                }
                popovertarget={id}
            >
                <HiBars3Outline
                    class={"h-6 w-6 text-zinc-900 dark:text-white"}
                />
            </button>
            <Mobile id={id} />
            <Link href={"/"} area-label={"Index"}>
                <Logo class={"h-5 w-auto"} />
            </Link>
        </div>
    );
});

export const NavItem = component$<{ href: string }>(({ href }) => {
    return (
        <li>
            <Link
                href={href}
                class={
                    "text-sm leading-5 text-zinc-600 transition hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white"
                }
            >
                <Slot />
            </Link>
        </li>
    );
});

export default component$(() => {
    return (
        <div
            class={[
                "fixed inset-x-0 top-0 z-50 flex h-14 items-center justify-between gap-12 px-4 transition sm:px-6 lg:left-72 lg:z-30 lg:px-8 xl:left-80",
                "bg-white dark:bg-zinc-900",
            ]}
        >
            <div class={["absolute inset-x-0 top-full h-px transition"]} />
            <div class={"hidden lg:block lg:max-w-md lg:flex-auto"} />
            <HeaderMobileNav />
            <div class={"flex items-center gap-5"}>
                <nav class={"hidden md:block"}>
                    <ul role={"list"} class={"flex items-center gap-8"}>
                        <NavItem href={"/"}>FAQ</NavItem>
                    </ul>
                </nav>
                <div class="hidden md:block md:h-5 md:w-px md:bg-zinc-900/10 md:dark:bg-white/15" />
                <div class="flex gap-4">
                    <ThemeToggle />
                    <Github />
                </div>
            </div>
        </div>
    );
});
