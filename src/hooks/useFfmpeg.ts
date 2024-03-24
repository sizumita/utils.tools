import { $, type NoSerialize, noSerialize, type QRL, useStore } from "@builder.io/qwik";
import { FFmpeg } from "@ffmpeg/ffmpeg";
import classWorkerURL from "../utils/ffmpegWorker.js?url";


type FfmpegStore = {
    ref: NoSerialize<FFmpeg>;
    isLoaded: boolean;
    currentMessage: string | null;
    load: QRL<(this: FfmpegStore) => void>;
    writeFile: QRL<
        (
            this: FfmpegStore,
            name: string,
            data: Uint8Array | string,
        ) => Promise<boolean>
    >;
    exec: QRL<(this: FfmpegStore, args: string[]) => Promise<void>>;
    readFile: QRL<
        (
            this: FfmpegStore,
            path: string,
            encoding?: string,
        ) => Promise<Uint8Array | string>
    >;
};

const getBlobUrl = async (url: string) => {
    const response = await fetch(url)
    const blob = await response.blob()
    return URL.createObjectURL(blob)
}


export function useFfmpeg() {
    return useStore<FfmpegStore>({
        ref: noSerialize(undefined),
        isLoaded: false,
        currentMessage: null,
        load: $(async function (this) {
            const baseURL = 'https://unpkg.com/@ffmpeg/core@0.12.6/dist/esm'
            this.ref = noSerialize(new FFmpeg());
            this.ref!.on("log", ({ message }) => {
                console.log(message);
                this.currentMessage = message;
            });
            await this.ref!.load({
                classWorkerURL,
                wasmURL: await getBlobUrl(`${baseURL}/ffmpeg-core.wasm`)
            });
            this.isLoaded = true;
        }),
        writeFile: $(async function (this, name, data) {
            return (await this.ref?.writeFile(name, data)) ?? false;
        }),
        exec: $(async function (this, args) {
            await this.ref?.exec(args);
        }),
        readFile: $(async function (this, path, encoding) {
            return await this.ref!.readFile(path, encoding);
        }),
    });
}
