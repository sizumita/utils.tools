import { component$, type QRL, useId, useSignal, useStore } from "@builder.io/qwik";
import { HiPhotoOutline } from "@qwikest/icons/heroicons";

type InputVideo = {
    url: null | string;
    name: null | string;
};

type PreviewProps = {
    onRemove$: QRL<() => void>;
} & InputVideo;

export const VideoPreview = component$<PreviewProps>((props) => {
    return (
        <div class={["relative z-20 flex h-full w-full flex-col"]}>
            <label class={"mx-auto text-sm font-semibold"}>{props.name}</label>
            <video
                class={"mx-auto my-4 max-h-52"}
                controls={true}
                src={props.url ?? ""}
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
                削除
            </button>
        </div>
    );
});

type Props = {
    name: string;
    title?: string;
};

export default component$<Props>((props) => {
    const inputVideo = useStore<InputVideo>({
        url: null,
        name: null,
    });
    const id = useId();
    const inputVideoRef = useSignal<HTMLInputElement>();

    return (
        <div class={"col-span-full"}>
            <label
                for={"input_image"}
                class={"block text-sm font-medium leading-6"}
            >
                Input Image
            </label>
            <div
                class={
                    "mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10 dark:border-gray-300/25"
                }
            >
                {inputVideo.url && (
                    <VideoPreview
                        url={inputVideo.url}
                        name={inputVideo.name}
                        onRemove$={() => {
                            inputVideo.url = null;
                            inputVideo.name = null;
                            if (inputVideoRef.value) {
                                inputVideoRef.value.value = "";
                            }
                        }}
                    />
                )}
                <div
                    class={[
                        "relative text-center",
                        !inputVideo.url ? "block" : "hidden",
                    ]}
                >
                    <HiPhotoOutline
                        class={
                            "mx-auto h-12 w-12 text-gray-300 dark:text-gray-600"
                        }
                        area-hidden={true}
                    />
                    <div class={"mt-4 flex text-base leading-6"}>
                        <label
                            for={id}
                            class={
                                "relative cursor-pointer rounded-md font-semibold text-primary-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-primary-600 focus-within:ring-offset-2 hover:text-primary-500"
                            }
                        >
                            <span class={"my-auto"}>
                                {props.title ?? "Upload a file"}
                            </span>
                            <input
                                required={true}
                                ref={inputVideoRef}
                                accept={"video/*"}
                                id={id}
                                name={props.name}
                                type={"file"}
                                class="sr-only"
                                onChange$={(event, element) => {
                                    event.preventDefault();
                                    if (element.files !== null) {
                                        const file = element.files.item(0);
                                        if (file !== null) {
                                            inputVideo.url =
                                                URL.createObjectURL(file);
                                            inputVideo.name = file.name;
                                            return;
                                        }
                                    }
                                    inputVideo.url = null;
                                    inputVideo.name = null;
                                }}
                            />
                        </label>
                        <p class="pl-1">or drag and drop</p>
                    </div>
                    <p class="text-xs leading-5">Wav, MP4, WebM, etc</p>
                </div>
            </div>
        </div>
    );
});
