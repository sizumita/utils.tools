import { component$, Slot } from "@builder.io/qwik";

export default component$(() => {
    return (
        <div
            class={[
                "prose dark:prose-invert",
                "[html_:where(&>*)]:mx-auto [html_:where(&>*)]:max-w-2xl [html_:where(&>*)]:lg:mx-[calc(50%-min(50%,theme(maxWidth.lg)))] [html_:where(&>*)]:lg:max-w-3xl",
            ]}
        >
            <Slot />
        </div>
    );
});
