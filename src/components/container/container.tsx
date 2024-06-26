import { component$, Slot } from "@builder.io/qwik";

export default component$(() => {
    return (
        <div
            class={[
                "not-prose rounded-md bg-zinc-50 sm:rounded-xl dark:bg-white/2.5",
                "shadow-sm ring-1 ring-gray-900/5 dark:ring-white/10",
                "my-4 dark:text-zinc-200",
            ]}
        >
            <Slot />
        </div>
    );
});
