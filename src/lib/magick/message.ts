import type {QRL} from "@builder.io/qwik";
import {MagickColor, MagickFormat} from "@imagemagick/magick-wasm";

export enum MagickWorkerMessageType {
    Initialize = "init",
    GetVersion = "getVersion",
    Process = "process"
}

export type MagickWorkerMessage<T> =
    T extends MagickWorkerMessageType.Initialize ? {
        type: MagickWorkerMessageType.Initialize
        data: null
        output: void
    } : T extends MagickWorkerMessageType.GetVersion ? {
        type: T
        data: null
        output: string
    } : T extends MagickWorkerMessageType.Process ? {
        type: T
        data: {
            file: Blob
            filename: string
            format: MagickFormat
            resize?: {
                width: number
                height: number
            }
            grayscale?: boolean
            border?: {
                size: number
                color: string
            }
            charcoal?: boolean
            blur?: boolean
            contrast?: boolean
            negate?: boolean
            transparent?: {
                color: string
                fuzz: number
            },
            crop?: {
                x: number
                y: number
                width: number
                height: number
            }
        }
        output: {
            url: string
            filename: string
        }
    } : never

export type MagickMessage<T extends MagickWorkerMessageType, Data = MagickWorkerMessage<T>["data"]> = {
    output: {
        id: string
        data: MagickWorkerMessage<T>["output"]
    }
    input: {
        type: T
        id: string
        data: Data
    }
}

export type MagickWorkerFunction<This, T extends MagickWorkerMessageType>
    = (this: This, data: MagickWorkerMessage<T>["data"] extends null ? void : MagickWorkerMessage<T>["data"]) => Promise<MagickWorkerMessage<T>["output"]>

export type MagickWorkerFunctions<This> = {
    init$: QRL<MagickWorkerFunction<This, MagickWorkerMessageType.Initialize>>
    getVersion$: QRL<MagickWorkerFunction<This, MagickWorkerMessageType.GetVersion>>
    process$: QRL<MagickWorkerFunction<This, MagickWorkerMessageType.Process>>
}
