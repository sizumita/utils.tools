import {component$, type HTMLInputAutocompleteAttribute, useId} from "@builder.io/qwik";

type Props = {
    name: string
    max?: number
    min?: number
    placeholder?: string
    label: string
    startFirst?: boolean
    autoComplete?: HTMLInputAutocompleteAttribute
    required?: boolean
    step?: number
    default?: string
}

export default component$<Props>((props) => {
    const id = useId()

    return <div class={["sm:col-span-2", props.startFirst ? "col-start-1" : ""]}>
        <label for={id} class="block text-sm font-medium leading-6">
            {props.label}
        </label>
        <div class="mt-2">
            <input
                required={props.required}
                type={"number"}
                name={props.name}
                max={props.max}
                min={props.min}
                defaultValue={props.default}
                step={props.step}
                placeholder={props.placeholder}
                id={id}
                autoComplete={props.autoComplete}
                class={[
                    "block w-full rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inset focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6",
                    "text-gray-900 ring-gray-900/25 dark:ring-gray-300/25 placeholder:text-gray-400 focus:ring-primary-600",
                    "dark:bg-white/5 dark:text-white dark:placeholder:text-gray-600 dark:focus:ring-primary-500"
                ]}
            />
        </div>
    </div>
})