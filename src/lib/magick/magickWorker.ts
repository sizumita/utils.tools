import {ImageMagick, initializeImageMagick, Magick, MagickFormat, Quantum} from "@imagemagick/magick-wasm";
import {MagickMessage, MagickWorkerMessageType} from "~/lib/magick/message";

const url = "https://unpkg.com/@imagemagick/magick-wasm@0.0.28/dist/magick.wasm"


const init = async (id: string) => {
    const module = await WebAssembly.compileStreaming(fetch(url))
    await initializeImageMagick(module)
    // console.log(Magick.imageMagickVersion);
    // console.log('Delegates:', Magick.delegates);
    // console.log('Features:', Magick.features);
    // console.log('Quantum:', Quantum.depth);
    postMessage({
        id,
    })
}

const getVersion = (id: string) => {
    postMessage({
        id,
        data: Magick.imageMagickVersion
    })
}

const process = (id: string) => {
    ImageMagick.read(new Uint8Array(2), image => {
        image
        image.write(MagickFormat.Png, data => {
            postMessage({
                id,
                data
            })
        })
    })
}

onmessage = (event: MessageEvent<MagickMessage<MagickWorkerMessageType>["input"]>) => {
    const id = event.data.id
    switch (event.data.type) {
        case MagickWorkerMessageType.Initialize:
            return init(id).catch(console.error)
        case MagickWorkerMessageType.GetVersion:
            return getVersion(id)
    }
}


export default {}
