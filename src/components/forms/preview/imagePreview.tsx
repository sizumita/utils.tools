import { component$, Slot, useStore } from "@builder.io/qwik";
import type { PreviewProps } from "~/components/forms/preview/previewContainer";

export const SizeBadge = component$(() => {
    return (
        <span
            class={[
                "inline-flex items-center rounded-md px-2 py-1 text-xs font-medium ring-1 ring-inset ",
                "bg-gray-50 text-gray-600 ring-gray-500/10",
                "dark:bg-gray-400/10 dark:text-gray-400 dark:ring-gray-400/20",
            ]}
        >
            <Slot />
        </span>
    );
});

export default component$<PreviewProps>((props) => {
    const size = useStore({
        width: 0,
        height: 0,
    });

    if (props.inputFiles.length === 0) return <></>;
    const file = props.inputFiles[0];

    return (
        <div class={["relative z-20 flex h-full w-full flex-col"]}>
            <label class={"mx-auto text-sm font-semibold"}>
                <span class={"mr-2"}>{file.name}</span>
                <SizeBadge>
                    {size.width} x {size.height} pixel
                </SizeBadge>
            </label>

            <img // eslint-disable-line qwik/jsx-img
                class={"mx-auto my-4 max-h-56 p-0"}
                alt={""}
                src={file.url}
                onLoad$={(_, element) => {
                    size.width = element.naturalWidth;
                    size.height = element.naturalHeight;
                }}
            />
            <button
                type="button"
                class={[
                    "mx-auto rounded-full bg-red-500 text-sm font-semibold text-white shadow-sm transition hover:bg-red-600 dark:bg-red-900",
                    "w-20 px-3.5 py-2",
                    "ring-1 ring-inset ring-red-500/50 dark:ring-red-500/10",
                    "dark:hover:bg-red-800",
                ]}
                onClick$={props.onRemove$}
            >
                Remove
            </button>
        </div>
    );
});
