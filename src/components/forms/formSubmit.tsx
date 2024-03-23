import { component$ } from "@builder.io/qwik";

export default component$<{ title: string }>((props) => {
    return (
        <div class="flex items-center justify-end gap-x-6 border-t border-gray-900/5 px-4 py-4 shadow-sm sm:px-8 dark:border-white/10">
            <button
                type="submit"
                class={[
                    "rounded-md bg-primary-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-primary-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-600",
                    "transition",
                ]}
            >
                {props.title}
            </button>
        </div>
    );
});
