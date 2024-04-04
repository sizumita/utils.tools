import {component$, Slot} from "@builder.io/qwik";

export default component$(() => {
    return <div class={"min-h-screen w-full"}>
        <Slot />
    </div>
})