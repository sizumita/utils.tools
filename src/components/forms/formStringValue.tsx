import {
    component$,
    type HTMLInputAutocompleteAttribute,
    Slot,
    useId,
} from "@builder.io/qwik";

type Props = {
    name: string;
    placeholder?: string;
    autoComplete?: HTMLInputAutocompleteAttribute;
    required?: boolean;
    default?: string;
    long?: boolean;
};

export default component$<Props>((props) => {
    const id = useId();

    return (
        <div class={[props.long ? "col-span-full" : "sm:col-span-2"]}>
            <label for={id} class="block text-sm font-medium leading-6">
                <Slot />
            </label>
            <div class="mt-2">
                <input
                    required={props.required}
                    type={"text"}
                    name={props.name}
                    value={props.default}
                    placeholder={props.placeholder}
                    id={id}
                    autoComplete={props.autoComplete}
                    class={[
                        "block w-full rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inset focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6",
                        "text-gray-900 ring-gray-900/25 placeholder:text-gray-400 focus:ring-primary-600 dark:ring-gray-300/25",
                        "dark:bg-white/5 dark:text-white dark:placeholder:text-gray-600 dark:focus:ring-primary-500",
                    ]}
                />
            </div>
        </div>
    );
});
