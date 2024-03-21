import { component$ } from "@builder.io/qwik";
import type { DocumentHead } from "@builder.io/qwik-city";

export default component$(() => {
    return <></>;
});

export const head: DocumentHead = {
    title: "utils.tools",
    meta: [
        {
            name: "description",
            content: "The perfect util tools for everyone.",
        },
    ],
};
