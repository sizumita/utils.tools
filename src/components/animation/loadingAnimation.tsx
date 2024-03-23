import {
    component$,
    type DOMAttributes,
    useSignal,
    useVisibleTask$,
} from "@builder.io/qwik";
import lottie from "lottie-web";
import loadingAnimationUrl from "~/media/loadingAnimation.json?url";

export default component$<DOMAttributes<HTMLDivElement>>((props) => {
    const ref = useSignal<Element>();

    // eslint-disable-next-line qwik/no-use-visible-task
    useVisibleTask$(({ track, cleanup }) => {
        track(() => ref.value);
        if (ref.value) {
            const animation = lottie.loadAnimation({
                container: ref.value,
                path: loadingAnimationUrl,
                renderer: "svg",
                loop: true,
                autoplay: true,
            });
            cleanup(() => animation.destroy());
        }
    });

    return <div {...props} ref={ref} />;
});
