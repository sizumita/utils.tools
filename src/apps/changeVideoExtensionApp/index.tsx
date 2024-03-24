import {
    $,
    component$,
    type NoSerialize,
    noSerialize,
    type Signal,
    Slot,
    useSignal,
    useStore,
} from "@builder.io/qwik";
import AppForm from "~/components/forms/appForm";
import FormVideoInput from "~/components/forms/formVideoInput";
import FormSelect from "~/components/forms/formSelect";
import { useFfmpeg } from "~/hooks/useFfmpeg";
import Container from "~/components/container/container";
import LoadingAnimation from "~/components/animation/loadingAnimation";
import type { FormSubmitSuccessDetail } from "@builder.io/qwik-city";
import CheckAnimation from "~/components/animation/checkAnimation";

enum ProcessState {
    WaitSubmit = "wait_submit",
    LoadFFmpeg = "load_ffmpeg",
    Processing = "processing",
    Finished = "finished",
    Error = "error",
}

type ViewProps = {
    value: Signal<ProcessState>;
};

type Extension = ".mp4" | ".webm" | ".mov" | ".avi";

const extensionList: { [p in Extension]: string } = {
    ".mov": "video/quicktime",
    ".webm": "video/webm",
    ".mp4": "video/mp4",
    ".avi": "video/x-msvideo",
};
const extensions: Extension[] = [".mp4", ".webm", ".mov", ".avi"];

export const ProcessView = component$<ViewProps>((props) => {
    switch (props.value.value) {
        case ProcessState.WaitSubmit:
            return <Slot name={ProcessState.WaitSubmit} />;
        case ProcessState.LoadFFmpeg:
            return <Slot name={ProcessState.LoadFFmpeg} />;
        case ProcessState.Processing:
            return <Slot name={ProcessState.Processing} />;
        case ProcessState.Finished:
            return <Slot name={ProcessState.Finished} />;
        case ProcessState.Error:
            return <Slot name={ProcessState.Error} />;
    }
});

export const FFmpegLastLogView = component$<{ message: string | null }>(
    (props) => {
        return (
            <div
                class={
                    "w-full bg-white p-3 shadow-sm ring-1 ring-gray-900/5 sm:rounded-xl dark:bg-gray-900 dark:ring-white/10"
                }
            >
                <h2 class={"font-2xl font-semibold"}>FFmpeg Last Log</h2>
                <p
                    class={
                        "py-2 font-mono font-medium text-gray-900 dark:text-gray-200"
                    }
                >
                    {props.message}
                </p>
            </div>
        );
    },
);

type OutputState = {
    file: NoSerialize<File>;
    url: string | null;
};

export default component$(() => {
    const state = useSignal<ProcessState>(ProcessState.WaitSubmit);
    const output = useStore<OutputState>({
        file: noSerialize(undefined),
        url: null,
    });
    const ffmpeg = useFfmpeg();

    const onSubmit$ = $(
        async (
            _: CustomEvent<FormSubmitSuccessDetail<unknown>>,
            form: HTMLFormElement,
        ) => {
            const data = new FormData(form);
            const extension = data.get("extension") as Extension | null;
            const video = data.get("input_video") as File | null;
            if (extension === null || video === null) {
                return;
            }
            const videoNameSplit = video.name.split(".");
            videoNameSplit.pop();
            const newVideoName = videoNameSplit.join(".") + extension;

            if (!ffmpeg.isLoaded) {
                state.value = ProcessState.LoadFFmpeg;
                await ffmpeg.load();
            }
            state.value = ProcessState.Processing;
            await ffmpeg.writeFile(
                video.name,
                new Uint8Array(await video.arrayBuffer()),
            );
            if (extension === ".webm") {
                await ffmpeg.exec([
                    "-i",
                    video.name,
                    "-fflags",
                    "+genpts",
                    "-preset",
                    "ultrafast",
                    "-c:v",
                    "libvpx",
                    "-c:a",
                    "libvorbis",
                    "-crf",
                    "23",
                    "-threads",
                    "0",
                    newVideoName,
                ]);
            } else {
                await ffmpeg.exec(["-i", video.name, newVideoName]);
            }
            const outputFile = new File(
                [await ffmpeg.readFile(newVideoName)],
                newVideoName,
                { type: extensionList[extension] },
            );
            output.file = noSerialize(outputFile);
            output.url = URL.createObjectURL(outputFile);
            state.value = ProcessState.Finished;
        },
    );

    return (
        <div class={"space-y-6"}>
            <AppForm submit={"Proceed"} onSubmitCompleted$={onSubmit$}>
                <FormVideoInput name={"input_video"} />
                <FormSelect
                    name={"extension"}
                    title={"Output Extension"}
                    options={extensions}
                />
            </AppForm>
            <Container>
                <div class={"px-4 py-6 sm:p-8"}>
                    <div class={"flex w-full"}>
                        <ProcessView value={state}>
                            <div
                                q:slot={ProcessState.WaitSubmit}
                                class={"flex"}
                            >
                                <LoadingAnimation
                                    class={"h-20 w-20 scale-150"}
                                />
                                <p class={"my-auto text-lg font-medium"}>
                                    Please input a file and press proceed...
                                </p>
                            </div>
                            <div
                                q:slot={ProcessState.LoadFFmpeg}
                                class={"flex"}
                            >
                                <LoadingAnimation
                                    class={"h-20 w-20 scale-150"}
                                />
                                <p class={"my-auto text-lg font-medium"}>
                                    Loading FFmpeg...
                                </p>
                            </div>
                            <div
                                q:slot={ProcessState.Processing}
                                class={"w-full"}
                            >
                                <div class={"flex"}>
                                    <LoadingAnimation
                                        class={"h-20 w-20 scale-150"}
                                    />
                                    <p class={"my-auto text-lg font-medium"}>
                                        Processing...
                                    </p>
                                </div>
                                <FFmpegLastLogView
                                    message={ffmpeg.currentMessage}
                                />
                            </div>
                            <div
                                q:slot={ProcessState.Finished}
                                class={"flex w-full flex-col"}
                            >
                                <div class={"flex"}>
                                    <CheckAnimation
                                        class={"my-auto h-16 w-16"}
                                    />
                                    <p class={"my-auto text-lg font-medium"}>
                                        Finished!
                                    </p>
                                </div>
                                <FFmpegLastLogView
                                    message={ffmpeg.currentMessage}
                                />
                                <video
                                    class={"mx-auto my-4 max-h-52"}
                                    controls={true}
                                    src={output.url ?? ""}
                                />
                                <a
                                    href={output.url ?? "#"}
                                    download={output.file?.name ?? "unknown"}
                                    class={[
                                        "mx-auto rounded-full bg-white text-sm font-semibold text-gray-900 shadow-sm transition hover:bg-gray-100 dark:bg-gray-900 dark:text-white",
                                        "w-auto px-3.5 py-2",
                                        "ring-1 ring-inset ring-gray-500/50 dark:ring-gray-500/10",
                                        "dark:hover:bg-gray-800",
                                    ]}
                                >
                                    Download {output.file?.name ?? "unknown"}
                                </a>
                            </div>
                        </ProcessView>
                    </div>
                </div>
            </Container>
        </div>
    );
});
