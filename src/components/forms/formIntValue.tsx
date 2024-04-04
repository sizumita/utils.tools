import {
    component$,
    type HTMLInputAutocompleteAttribute,
    useId,
} from "@builder.io/qwik";
import {environment} from "~/lib/tv/environment";

type Props = {
    name: string;
    max?: number;
    min?: number;
    placeholder?: string;
    label: string;
    startFirst?: boolean;
    autoComplete?: HTMLInputAutocompleteAttribute;
    required?: boolean;
    step?: number;
    default?: string;
};

export default component$<Props>((props) => {
    const id = useId();

    const {text, placeholder, bg, ring} = environment()

    return (
        <div class={["sm:col-span-2", props.startFirst ? "col-start-1" : ""]}>
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
                    value={props.default}
                    step={props.step}
                    placeholder={props.placeholder}
                    id={id}
                    autoComplete={props.autoComplete}
                    class={[
                        "block w-full rounded-md border-0 py-1.5 shadow-sm sm:text-sm sm:leading-6",
                        text(), placeholder(), bg(), ring()
                    ]}
                />
            </div>
        </div>
    );
});
