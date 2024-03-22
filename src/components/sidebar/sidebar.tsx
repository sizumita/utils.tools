import { component$, Slot } from "@builder.io/qwik";
import { Link, useLocation } from "@builder.io/qwik-city";

export interface NavGroup {
    title: string;
    links: Array<{
        title: string;
        href: string;
    }>;
}

export const navigation: Array<NavGroup> = [
    {
        title: "Guides",
        links: [
            { title: "Introduction", href: "/" },
            { title: "Discord Bot", href: "/guides/discord-bot" },
        ],
    },
    {
        title: "Basic Apps",
        links: [
            {
                title: "Change Video Extension",
                href: "/apps/basic/change-video-extension",
            },
        ],
    },
];

export const NavLink = component$<{ href: string; active: boolean }>(
    ({ href, active = false }) => {
        return (
            <Link
                href={href}
                aria-current={active ? "page" : undefined}
                class={[
                    "flex justify-between gap-2 py-1 pr-3 text-sm transition",
                    "pl-4",
                    active
                        ? "text-zinc-900 dark:text-white"
                        : "text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white",
                ]}
            >
                <Slot />
            </Link>
        );
    },
);

export const NavigationGroup = component$<{ group: NavGroup; idx: number }>(
    ({ group, idx }) => {
        const loc = useLocation();

        const isActiveGroup =
            group.links.findIndex(
                (link) =>
                    link.href === loc.url.pathname ||
                    `${link.href}/` === loc.url.pathname,
            ) !== -1;
        const activePageIndex = group.links.findIndex(
            (link) =>
                link.href === loc.url.pathname ||
                `${link.href}/` === loc.url.pathname,
        );
        const top =
            group.links.findIndex(
                (link) =>
                    link.href === loc.url.pathname ||
                    `${link.href}/` === loc.url.pathname,
            ) * 2;

        return (
            <li class={[idx === 0 && "mt-0", "relative mt-6"]}>
                <h2
                    class={
                        "text-xs font-semibold text-zinc-900 dark:text-white"
                    }
                >
                    {group.title}
                </h2>
                <div class={"relative mt-3 pl-2"}>
                    {isActiveGroup && (
                        <div
                            class={
                                "absolute inset-x-0 top-0 h-[2rem] bg-zinc-800/2.5 will-change-transform dark:bg-white/2.5"
                            }
                            style={{ top: `${top}rem` }}
                        />
                    )}
                    <div
                        class={
                            "absolute inset-y-0 left-2 w-px bg-zinc-900/10 dark:bg-white/5"
                        }
                    />
                    {isActiveGroup && (
                        <div
                            class={"absolute left-2 h-6 w-px bg-emerald-500"}
                            style={{ top: `${0.25 + 2 * activePageIndex}rem` }}
                        />
                    )}
                    <ul role="list" class={"border-l border-transparent"}>
                        {group.links.map((link) => (
                            <li key={link.href} class={"relative"}>
                                <NavLink
                                    href={link.href}
                                    active={link.href === loc.url.pathname}
                                >
                                    {link.title}
                                </NavLink>
                            </li>
                        ))}
                    </ul>
                </div>
            </li>
        );
    },
);

export default component$<{ cls: string }>(({ cls }) => {
    return (
        <nav class={cls}>
            <ul role={"list"}>
                {navigation.map((group, idx) => (
                    <NavigationGroup group={group} idx={idx} key={idx} />
                ))}
            </ul>
        </nav>
    );
});
