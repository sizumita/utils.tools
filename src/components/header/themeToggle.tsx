import { component$ } from "@builder.io/qwik";
import { useTheme } from "~/hooks/useTheme";
import { HiSunSolid, HiMoonOutline } from "@qwikest/icons/heroicons";

export default component$(() => {
    const { toggle } = useTheme();

    return (
        <button
            type={"button"}
            class={
                "flex h-8 w-8 items-center justify-center rounded-full p-2 transition hover:bg-zinc-900/5 dark:hover:bg-white/5"
            }
            onClick$={toggle}
        >
            <HiSunSolid class={"h-5 w-5 text-zinc-900 dark:hidden"} />
            <HiMoonOutline class={"hidden h-5 w-5 text-white dark:block"} />
        </button>
    );
});
