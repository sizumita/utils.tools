import { component$, type QRL, Slot } from "@builder.io/qwik";
import {
    type ActionStore,
    Form,
    type FormSubmitSuccessDetail,
} from "@builder.io/qwik-city";
import FormSubmit from "~/components/forms/formSubmit";
import Container from "~/components/container/container";

type Props = {
    submit: string;
    action?: ActionStore<unknown, Record<string, unknown>>;
    onSubmitCompleted$?: QRL<
        (
            event: CustomEvent<FormSubmitSuccessDetail<unknown>>,
            form: HTMLFormElement,
        ) => void
    >;
};

export default component$<Props>((props) => {
    return (
        <Container>
            <Form
                class={"md:col-span-2"}
                action={props.action}
                preventdefault:submit
                onSubmitCompleted$={props.onSubmitCompleted$}
            >
                <div class={"px-4 py-6 sm:p-8"}>
                    <div
                        class={
                            "mx-auto grid max-w-2xl grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6"
                        }
                    >
                        <Slot />
                    </div>
                </div>
                <FormSubmit title={props.submit} />
            </Form>
        </Container>
    );
});
