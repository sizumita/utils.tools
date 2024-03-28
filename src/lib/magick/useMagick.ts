import {$, noSerialize, NoSerialize, QRL, useSignal, useStore, useVisibleTask$} from "@builder.io/qwik";
import MagickWorker from "./magickWorker?worker";
import {MagickMessage, MagickWorkerFunctions, MagickWorkerMessage, MagickWorkerMessageType} from "~/lib/magick/message";


const createMessage = <T extends MagickWorkerMessageType>(id: string, type: T, data: MagickWorkerMessage<T>["data"]) => {
    return {
        id,
        type,
        data
    }
}

const genId = () => Math.random().toString(16)

type PResult<T extends MagickWorkerMessageType> = Promise<MagickWorkerMessage<T>["output"]>


type MagickState = {
    isReady: boolean
    ref: NoSerialize<Worker>
    _promises: {
        [k: string]: NoSerialize<{
            resolve: (value: MagickWorkerMessage<MagickWorkerMessageType>["output"]) => void
            reject: (value: any) => void
        }>
    }
    register$: QRL<<T extends MagickWorkerMessageType>(this: MagickState, id: string) => Promise<MagickWorkerMessage<T>["output"]>>
    return$: QRL<<T extends MagickWorkerMessageType>(this: MagickState, type: T, data: MagickWorkerMessage<T>["data"]) => Promise<any>>
}

export const useMagick = () => {
    const workerRef = useSignal<NoSerialize<Worker>>(undefined);
    const state = useStore<MagickState & MagickWorkerFunctions<MagickState>>({
        ref: noSerialize(undefined),
        isReady: false,
        _promises: {},
        register$: $(function (id: string) {
            return new Promise((resolve, reject) => {
                this._promises[id] = noSerialize({resolve, reject})
            })
        }),
        return$: $(function (type, data) {
            if (!this.ref) throw new Error("Uninitialized")
            const id = genId()
            const p = this.register$(id) as PResult<typeof type>
            this.ref.postMessage(createMessage(id, type, data))
            return p
        }),
        init$: $(function () {
            const worker = new MagickWorker()
            this.ref = noSerialize(worker)
            worker.addEventListener("message", event => {
                const data: MagickMessage<MagickWorkerMessageType>["output"] = event.data
                const promise = this._promises[data.id]
                if (typeof promise === "undefined") return
                promise.resolve(data.data)
                delete this._promises[data.id]
            })
            return this.return$(MagickWorkerMessageType.Initialize, null)
        }),
        getVersion$: $(function () {
            return this.return$(MagickWorkerMessageType.GetVersion, null)
        }),
        process$: $(function (data) {
            return this.return$(MagickWorkerMessageType.Process, data)
        })
    })

    useVisibleTask$(async ({cleanup}) => {
        await state.init$()
        state.isReady = true
        cleanup(() => workerRef.value?.terminate())
    })

    return state
}
