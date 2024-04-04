import { component$, useSignal } from "@builder.io/qwik";
import { navigation, NavigationGroup } from "~/components/sidebar/sidebar";
import { HiXMarkOutline } from "@qwikest/icons/heroicons";
import { Link } from "@builder.io/qwik-city";
import Logo from "~/media/logo.svg?jsx";

export default component$<{ id: string }>(({ id }) => {
    const ref = useSignal<HTMLElement>();

    return (
        <div
            ref={ref}
            popover={"auto"}
            id={id}
            class={
                "absolute left-0 top-0 min-h-screen w-full justify-start bg-transparent p-0"
            }
        >
            <div
                class={
                    "fixed -z-50 h-full w-full bg-zinc-200 opacity-80 dark:bg-zinc-700"
                }
                onClick$={() => {
                    ref.value?.hidePopover();
                }}
            />
            <div
                class={
                    "fixed inset-x-0 top-0 min-h-screen w-72 rounded-md bg-white opacity-100 dark:bg-zinc-900"
                }
            >
                <div
                    class={[
                        "inset-x-0 top-0 flex h-14 items-center justify-between px-4",
                    ]}
                >
                    <div class={"flex items-center gap-5 lg:hidden"}>
                        <button
                            type={"button"}
                            popovertargetaction={"hide"}
                            popovertarget={id}
                            class={
                                "flex h-8 w-8 items-center justify-center rounded-full transition hover:bg-zinc-900/5 dark:hover:bg-white/5"
                            }
                        >
                            <HiXMarkOutline
                                class={"h-6 w-6 text-zinc-900 dark:text-white"}
                            />
                        </button>
                        <Link href={"/"} area-label={"Index"}>
                            <Logo class={"h-5 w-auto"} />
                        </Link>
                    </div>
                </div>
                <nav class={"px-6"}>
                    <ul role={"list"}>
                        {navigation.map((group, idx) => (
                            <NavigationGroup
                                group={group}
                                idx={idx}
                                key={idx}
                            />
                        ))}
                    </ul>
                </nav>
            </div>
        </div>
    );
});
