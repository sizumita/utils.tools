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
            format: MagickFormat
            resize?: {
                width: number
                height: number
            }
            grayscale?: boolean
            border?: number
            charcoal?: boolean
            blur?: boolean
            contrast?: boolean
            transparent?: {
                color: MagickColor
                fuzz: number
            },
            crop?: {
                x: number
                y: number
                width: number
                height: number
            }
        }
        output: Uint8Array
    } : never

export type MagickMessage<T extends MagickWorkerMessageType> = {
    output: {
        id: string
        data: MagickWorkerMessage<T>["output"]
    }
    input: {
        type: T
        id: string
        data: MagickWorkerMessage<T>["data"]
    }
}

export type MagickWorkerFunction<This, T extends MagickWorkerMessageType>
    = (this: This, data: MagickWorkerMessage<T>["data"] extends null ? void : MagickWorkerMessage<T>["data"]) => Promise<MagickWorkerMessage<T>["output"]>

export type MagickWorkerFunctions<This> = {
    init$: QRL<MagickWorkerFunction<This, MagickWorkerMessageType.Initialize>>
    getVersion$: QRL<MagickWorkerFunction<This, MagickWorkerMessageType.GetVersion>>
    process$: QRL<MagickWorkerFunction<This, MagickWorkerMessageType.Process>>
}
