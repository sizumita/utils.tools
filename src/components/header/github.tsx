import { component$ } from "@builder.io/qwik";
import { SiGithub } from "@qwikest/icons/simpleicons";
import { Link } from "@builder.io/qwik-city";

export default component$(() => {
    return (
        <Link
            href={"https://github.com/sizumita/utils.tools"}
            class={
                "flex h-8 w-8 items-center justify-center rounded-full transition hover:bg-zinc-900/5 dark:hover:bg-white/5"
            }
        >
            <SiGithub class={["h-5 w-5", "text-zinc-900 dark:text-white"]} />
        </Link>
    );
});
