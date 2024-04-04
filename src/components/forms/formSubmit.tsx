import { component$ } from "@builder.io/qwik";
import {button} from "~/lib/tv/button";

export default component$<{ title: string }>((props) => {
    return (
        <div class="flex items-center justify-end gap-x-6 border-t border-gray-900/5 px-4 py-4 shadow-sm sm:px-8 dark:border-white/10">
            <button
                type="submit"
                class={[
                    "rounded-md px-3 py-2 text-sm font-semibold shadow-sm",
                    button({color: "primary", ring: false})
                ]}
            >
                {props.title}
            </button>
        </div>
    );
});
