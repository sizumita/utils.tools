import {
    Channels,
    ImageMagick,
    initializeImageMagick,
    Magick, MagickColor,
    MagickGeometry,
    Percentage,
    Quantum
} from "@imagemagick/magick-wasm";
import {MagickMessage, MagickWorkerMessage, MagickWorkerMessageType} from "~/lib/magick/message";

const url = "https://unpkg.com/@imagemagick/magick-wasm@0.0.28/dist/magick.wasm"


const init = async (id: string) => {
    const module = await WebAssembly.compileStreaming(fetch(url))
    await initializeImageMagick(module)
    console.log(Magick.imageMagickVersion);
    console.log('Delegates:', Magick.delegates);
    console.log('Features:', Magick.features);
    console.log('Quantum:', Quantum.depth);
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

const process = async (id: string, data: MagickWorkerMessage<MagickWorkerMessageType.Process>["data"]) => {
    const array = new Uint8Array(await data.file.arrayBuffer())
    ImageMagick.read(array, image => {
        if (data.resize) image.resize(data.resize.width, data.resize.height)
        if (data.grayscale) image.grayscale()
        if (data.border) {
            image.borderColor = new MagickColor(data.border.color)
            image.border(data.border.size, data.border.size)
        }
        if (data.charcoal) image.charcoal()
        if (data.blur) image.blur(20, 10)
        if (data.contrast) image.contrast()
        if (data.transparent) {
            image.colorFuzz = new Percentage(data.transparent.fuzz)
            image.transparent(new MagickColor(data.transparent.color))
        }
        if (data.crop) {
            const {x, y, width, height} = data.crop
            image.crop(new MagickGeometry(x, y, width, height))
        }
        if (data.negate) image.negate(Channels.RGB)

        image.write(data.format, result => {
            const file = new File([result], `${data.filename}.${data.format.toLowerCase()}`, {
                type: `image/${data.format.toLowerCase()}`
            })
            postMessage({
                id,
                data: {
                    url: URL.createObjectURL(file),
                    filename: file.name
                }
            })
        })
    })
}

onmessage = <T extends MagickWorkerMessageType>(event: MessageEvent<MagickMessage<T>["input"]>) => {
    const id = event.data.id
    switch (event.data.type) {
        case MagickWorkerMessageType.Initialize:
            return init(id).catch(console.error)
        case MagickWorkerMessageType.GetVersion:
            return getVersion(id)
        case MagickWorkerMessageType.Process:
            return process(id, event.data.data as any).catch(console.error)
    }
}


export default {}
