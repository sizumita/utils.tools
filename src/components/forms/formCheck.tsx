import { component$, type Signal, useId } from "@builder.io/qwik";

type Props = {
    name: string;
    label: string;
    value?: string;
    description?: string;
    bind?: Signal<boolean | undefined>;
};
export default component$<Props>((props) => {
    const id = useId();

    return (
        <div class="flex gap-x-3 sm:col-span-full">
            <div class="flex h-6 items-center">
                <input
                    id={id}
                    bind:checked={props.bind}
                    type="checkbox"
                    name={props.name}
                    value={props.value}
                    class={[
                        "h-4 w-4 rounded",
                        "border-gray-300 text-primary-600 focus:ring-primary-600",
                        "dark:border-white/10 dark:bg-white/5 dark:text-primary-600 dark:focus:ring-primary-600 dark:focus:ring-offset-gray-900",
                    ]}
                />
            </div>
            <div class="text-sm leading-6">
                <label for={id} class="font-medium">
                    {props.label}
                </label>
                {props.description && <p>{props.description}</p>}
            </div>
        </div>
    );
});
