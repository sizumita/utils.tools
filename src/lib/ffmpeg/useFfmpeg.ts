import {
    $,
    type NoSerialize,
    noSerialize,
    type QRL,
    useStore,
} from "@builder.io/qwik";
import { FFmpeg } from "@ffmpeg/ffmpeg";
import classWorkerURL from "./ffmpegWorker.js?url";

type FfmpegStore = {
    ref: NoSerialize<FFmpeg>;
    isLoaded: boolean;
    currentMessage: string | null;
    progress: number | null;
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
    const response = await fetch(url);
    const blob = await response.blob();
    return URL.createObjectURL(blob);
};

export type Clip = {
    start: number;
    length: number;
};

export class FFmpegCommandBuilder {
    private speed: number | null = null;
    private noAudio: boolean | null = null;
    private clip: Clip | null = null;

    constructor(
        private filename: string,
        private outputExtension: string,
        private outputFilename: string,
    ) {}

    setSpeed(speed: number) {
        this.speed = speed;
    }

    setNoAudio(value: boolean) {
        this.noAudio = value;
    }

    setClip(value: Clip) {
        this.clip = value;
    }

    isSameExtension() {
        return (
            this.filename.endsWith(this.outputExtension) &&
            this.outputFilename.endsWith(this.outputExtension)
        );
    }

    build() {
        let args = ["-i", this.filename];
        if (this.clip !== null) {
            if (this.isSameExtension()) {
                args = [
                    "-ss",
                    this.clip.start.toString(),
                    "-i",
                    this.filename,
                    "-vcodec",
                    "copy",
                    "-t",
                    this.clip.length.toString(),
                ];
            } else {
                args.push(
                    "-ss",
                    this.clip.start.toString(),
                    "-t",
                    this.clip.length.toString(),
                );
            }
        }
        if (this.noAudio) {
            args.push("-an");
        }
        if (this.speed !== null && this.speed !== 1) {
            const fixed = this.speed.toFixed(2);
            args.push("-vf", `setpts=PTS/${fixed}`, "-af", `atempo=${fixed}`);
        }
        if (this.outputExtension === ".webm" && !this.isSameExtension()) {
            args.push(
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
            );
        }
        args.push(this.outputFilename);
        return args;
    }
}

export function useFfmpeg() {
    return useStore<FfmpegStore>({
        ref: noSerialize(undefined),
        isLoaded: false,
        currentMessage: null,
        progress: null,
        load: $(async function (this) {
            const baseURL = "https://unpkg.com/@ffmpeg/core@0.12.6/dist/esm";
            this.ref = noSerialize(new FFmpeg());
            this.ref!.on("log", ({ message }) => {
                console.log(message);
                this.currentMessage = message;
            });
            this.ref!.on("progress", ({ progress }) => {
                this.progress = progress;
            });
            await this.ref!.load({
                classWorkerURL,
                wasmURL: await getBlobUrl(`${baseURL}/ffmpeg-core.wasm`),
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
