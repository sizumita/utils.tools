import { component$, useId } from "@builder.io/qwik";

type Props = {
    name: string;
    label: string;
};

export default component$<Props>((props) => {
    const id = useId();

    return (
        <div class="col-span-full sm:col-span-2">
            <label for={id} class="block text-sm font-medium leading-6">
                {props.label}
            </label>
            <div class="mt-2 flex items-center space-x-2">
                <input
                    id={id}
                    name={props.name}
                    type={"color"}
                    class={"h-9 w-9 overflow-hidden rounded-md border-0 p-0"}
                />
                <label
                    for={id}
                    class={[
                        "rounded-md px-2.5 py-1.5 text-sm font-semibold shadow-sm ring-1 ring-inset transition hover:cursor-pointer",
                        "bg-white text-gray-900 ring-gray-300 hover:bg-gray-50",
                        "dark:bg-white/10 dark:text-white dark:ring-transparent dark:hover:bg-white/20",
                    ]}
                >
                    Change
                </label>
            </div>
        </div>
    );
});
