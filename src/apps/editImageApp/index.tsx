import {component$, useSignal, useVisibleTask$} from "@builder.io/qwik";
import {useMagick} from "~/lib/magick/useMagick";

export default component$(() => {
    const magick = useMagick()
    const version = useSignal("")

    // eslint-disable-next-line qwik/no-use-visible-task
    useVisibleTask$(async ({track}) => {
        track(() => magick.isReady)
        version.value = await magick.getVersion$()
    })

    return <div>{version.value}</div>
})
