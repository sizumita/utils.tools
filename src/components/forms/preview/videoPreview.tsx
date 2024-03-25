import { component$ } from "@builder.io/qwik";
import type { PreviewProps } from "~/components/forms/preview/previewContainer";

export default component$<PreviewProps>((props) => {
    if (props.inputFiles.length === 0) {
        return <></>;
    }
    const file = props.inputFiles[0];

    return (
        <div class={["relative z-20 flex h-full w-full flex-col"]}>
            <label class={"mx-auto text-sm font-semibold"}>{file.name}</label>
            <video
                class={"mx-auto my-4 max-h-52"}
                controls={true}
                src={file.url}
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
