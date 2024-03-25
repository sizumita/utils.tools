import { $, component$, useId, useSignal, useStore } from "@builder.io/qwik";
import { HiPhotoOutline } from "@qwikest/icons/heroicons";
import VideoPreview from "~/components/forms/preview/videoPreview";
import ImagePreview from "~/components/forms/preview/imagePreview";

type Props = {
    name: string;
    title?: string;
    type: InputType;
    multiple?: boolean;
};

type InputFile = {
    name: string;
    url: string;
};

export enum InputType {
    Video,
    Image,
}

const useAccept = (type: InputType) => {
    switch (type) {
        case InputType.Image:
            return "image/*";
        case InputType.Video:
            return "video/*";
    }
};

const useDescription = (type: InputType) => {
    switch (type) {
        case InputType.Video:
            return "wav, mp4, webm, etc";
        case InputType.Image:
            return "png, jpg, webp, etc";
    }
};

export default component$<Props>((props) => {
    const id = useId();
    const inputVideoRef = useSignal<HTMLInputElement>();
    const inputFiles = useStore<{ files: InputFile[] }>({ files: [] });
    const accept = useAccept(props.type);
    const desc = useDescription(props.type);

    const fileChanged$ = $((event: Event, element: HTMLInputElement) => {
        if (element.files === null) return;
        const newInputFiles: InputFile[] = [];
        for (let i = 0; i < element.files.length; i++) {
            const file = element.files.item(i);
            if (file === null) continue;
            const url = URL.createObjectURL(file);
            newInputFiles.push({
                url,
                name: file.name,
            });
        }
        inputFiles.files = newInputFiles;
    });
    const removeFiles$ = $(() => {
        inputFiles.files.forEach((file) => URL.revokeObjectURL(file.url));
        inputFiles.files = [];
    });

    return (
        <div class={"col-span-full"}>
            <label
                for={"input_image"}
                class={"block text-sm font-medium leading-6"}
            >
                Input Image
            </label>
            <div
                class={[
                    "mt-2 flex justify-center rounded-lg border px-6 py-10",
                    inputFiles.files.length === 0
                        ? "border-dashed border-gray-900/25 dark:border-gray-300/25"
                        : "border-2 border-primary-500 dark:border-primary-300/25",
                ]}
            >
                {inputFiles.files.length > 0 &&
                    props.type === InputType.Video && (
                        <VideoPreview
                            inputFiles={inputFiles.files}
                            onRemove$={removeFiles$}
                        />
                    )}
                {inputFiles.files.length > 0 &&
                    props.type === InputType.Image && (
                        <ImagePreview
                            inputFiles={inputFiles.files}
                            onRemove$={removeFiles$}
                        />
                    )}
                <div
                    class={[
                        "relative text-center",
                        !(inputFiles.files.length > 0) ? "block" : "hidden",
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
                                "relative w-full cursor-pointer rounded-md font-semibold text-primary-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-primary-600 focus-within:ring-offset-2 hover:text-primary-500"
                            }
                        >
                            <span class={"mx-auto my-auto text-lg"}>
                                {props.title ?? "Upload a file"}
                            </span>
                            <input
                                required={true}
                                ref={inputVideoRef}
                                accept={accept}
                                id={id}
                                name={props.name}
                                multiple={props.multiple}
                                type={"file"}
                                class="sr-only"
                                preventdefault:change
                                onChange$={fileChanged$}
                            />
                        </label>
                    </div>
                    <p class="text-xs leading-5">{desc}</p>
                </div>
            </div>
        </div>
    );
});
