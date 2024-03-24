import { component$, useId } from "@builder.io/qwik";

type Props = {
    title: string;
    name: string;
    options: string[];
};

export default component$<Props>((props) => {
    const id = useId();

    return (
        <div class="sm:col-span-4">
            <label for={id} class="block text-sm font-medium leading-6">
                {props.title}
            </label>
            <div class="mt-2">
                <select
                    required={true}
                    id={id}
                    name={props.name}
                    class={[
                        "block w-full rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inset ring-gray-900/25 dark:ring-gray-300/25 focus:ring-2 focus:ring-inset focus:ring-primary-600 sm:max-w-xs sm:text-sm sm:leading-6",
                        "bg-white dark:bg-white/5 dark:text-white",
                    ]}
                >
                    {props.options.map((option, idx) => (
                        <option key={idx}>{option}</option>
                    ))}
                </select>
            </div>
        </div>
    );
});
