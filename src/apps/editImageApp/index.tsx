import { $, component$, useSignal, useStore } from "@builder.io/qwik";
import { useMagick } from "~/lib/magick/useMagick";
import AppForm from "~/components/forms/appForm";
import type { FormSubmitSuccessDetail } from "@builder.io/qwik-city";
import type { MagickFormat } from "@imagemagick/magick-wasm";
import ImageForm from "~/apps/editImageApp/imageForm";
import type {
    MagickWorkerMessage,
    MagickWorkerMessageType,
} from "~/lib/magick/message";
import Container from "~/components/container/container";
import LoadingAnimation from "~/components/animation/loadingAnimation";

const isOn = (data: FormDataEntryValue | null) => data === "on";
const intoInt = (data: FormDataEntryValue | null) =>
    typeof data === "string" ? parseInt(data) : 0;

const makeProcessData = (data: FormData) => {
    const result: MagickWorkerMessage<MagickWorkerMessageType.Process>["data"] =
        {
            file: data.get("input_image") as File,
            filename: data.get("filename") as string,
            format: data.get("file_type")! as MagickFormat,
            grayscale: isOn(data.get("grayscale")),
            charcoal: isOn(data.get("charcoal")),
            blur: isOn(data.get("blur")),
            contrast: isOn(data.get("contrast")),
            negate: isOn(data.get("negate")),
        };
    if (isOn(data.get("resize"))) {
        result.resize = {
            width: intoInt(data.get("resize_width")),
            height: intoInt(data.get("resize_height")),
        };
    }
    if (isOn(data.get("crop"))) {
        result.crop = {
            x: intoInt(data.get("crop_x")),
            y: intoInt(data.get("crop_y")),
            height: intoInt(data.get("crop_height")),
            width: intoInt(data.get("crop_width")),
        };
    }
    if (isOn(data.get("border"))) {
        result.border = {
            color: data.get("border_color") as string,
            size: intoInt(data.get("border_width")),
        };
    }
    if (isOn(data.get("transparent"))) {
        result.transparent = {
            color: data.get("transparent_color") as string,
            fuzz: intoInt(data.get("transparent_range")),
        };
    }
    return result;
};

type ResultStore = {
    proceed: boolean;
    url: string;
    filename: string;
};

export default component$(() => {
    const magick = useMagick();
    const isProcessing = useSignal(false);
    const result = useStore<ResultStore>({
        proceed: false,
        url: "",
        filename: "",
    });

    const process$ = $(
        async (
            event: CustomEvent<FormSubmitSuccessDetail<unknown>>,
            form: HTMLFormElement,
        ) => {
            if (isProcessing.value) return;
            const data = new FormData(form);
            isProcessing.value = true;
            if (result.proceed) {
                URL.revokeObjectURL(result.url);
                result.proceed = false;
            }
            const { url, filename } = await magick.process$(
                makeProcessData(data),
            );
            result.proceed = true;
            result.url = url;
            result.filename = filename;
            isProcessing.value = false;
        },
    );

    return (
        <div class={"space-y-4"}>
            <AppForm submit={"Process"} onSubmitCompleted$={process$}>
                <ImageForm />
            </AppForm>
            <h2>Output</h2>
            <Container>
                <div>
                    {result.proceed ? (
                        <div class={"flex w-full flex-col py-4"}>
                            <div class={"mx-auto p-2"}>
                                <img // eslint-disable-line qwik/jsx-img
                                    alt={""}
                                    src={result.url}
                                />
                            </div>
                            <a
                                href={result.url}
                                download={result.filename}
                                class={[
                                    "mx-auto rounded-md text-sm font-semibold text-gray-900 shadow-sm transition",
                                    "w-auto px-3.5 py-2 ring-1 ring-inset",
                                    "bg-white text-gray-900 ring-gray-300 hover:bg-gray-50",
                                    "dark:bg-white/10 dark:text-white dark:ring-transparent dark:hover:bg-white/20",
                                ]}
                            >
                                Download {result.filename}
                            </a>
                        </div>
                    ) : isProcessing.value ? (
                        <div class={"flex p-3"}>
                            <LoadingAnimation class={"h-20 w-20 scale-150"} />
                            <p class={"my-auto text-lg font-medium"}>
                                Processing...
                            </p>
                        </div>
                    ) : (
                        <div class={"flex p-3"}>
                            <p class={"my-auto text-lg font-medium"}>
                                Waiting Confirm...
                            </p>
                        </div>
                    )}
                </div>
            </Container>
        </div>
    );
});
