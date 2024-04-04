import {$, component$, useStore} from "@builder.io/qwik";
import {Link, routeLoader$, useLocation, useNavigate} from "@builder.io/qwik-city";
import {environment} from "~/lib/tv/environment";
import {heading} from "~/lib/tv/heading";
import {button} from "~/lib/tv/button";
import {useAuth} from "~/lib/auth/useAuth";
import {Input, object} from "valibot";
import {UsernameSchema} from "~/lib/auth/user";
import {InitialValues, SubmitHandler, useForm, valiForm$} from "@modular-forms/qwik";
import {form} from "~/lib/tv/form";
import {RegisterStatus} from "~/lib/auth/server";
import {AlertError} from "~/components/alart/alart";

const RegisterSchema = object({
    username: UsernameSchema
})
type RegisterForm = Input<typeof RegisterSchema>

export const useFormLoader = routeLoader$<InitialValues<RegisterForm>>(() => ({
    username: ""
}));

export default component$(() => {
    const nav = useNavigate();
    const loc = useLocation()
    const errorState = useStore<{errors: string[]}>({errors: []})
    const [registerForm, {Form, Field}] = useForm<RegisterForm>({
        loader: useFormLoader(),
        validate: valiForm$(RegisterSchema)
    })
    const auth = useAuth()

    const handleSubmit = $<SubmitHandler<RegisterForm>>(async (values, event) => {
        const {status, reasons} = await auth.register$(values.username)
        switch (status) {
            case RegisterStatus.Success:
                const redirectTo = loc.params.redirectTo
                await nav(!redirectTo ? "/" : atob(redirectTo))
                return
            case RegisterStatus.AlreadyRegistered:
                errorState.errors = ["This username is already registered!", ...(reasons ?? [])]
                return
            case RegisterStatus.ClientError:
                errorState.errors = ["Some error occurred during registration!",  ...(reasons ?? [])]
                return
            case RegisterStatus.NameValidationError:
                errorState.errors = ["There is a problem with your username!",  ...(reasons ?? [])]
                return
        }
    });

    const {placeholder} = environment()
    const {text, errorText, label, base} = form()

    return <div class="flex min-h-full w-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div class="sm:mx-auto sm:w-full sm:max-w-sm">
            <div class="sm:mx-auto sm:w-full sm:max-w-sm">
                <h2 class={heading().h2()}>
                    Register
                </h2>
            </div>
            {(errorState.errors.length > 0) && <AlertError>
                <span q:slot={"title"}>
                    Several errors occurred during registration!
                </span>
                {errorState.errors.map((error, i) => <li key={i}>{error}</li>)}
            </AlertError>}
            <div class="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                <Form class={["m-2", base()]} onSubmit$={handleSubmit}>
                    <div>
                        <label for="username" class={label()}>
                            Username
                        </label>
                        <div class="mt-2">
                            <Field
                                name={"username"}>
                                {(field, props) => (
                                    <div>
                                        <input {...props} class={[
                                            text({error: !!field.error})
                                        ]} type={"text"} autoComplete={"username"} />
                                        {field.error && <div class={errorText()}>{field.error}</div>}
                                    </div>
                                )}
                            </Field>
                        </div>
                    </div>

                    <div class={"pt-4"}>
                        <button
                            type="submit"
                            class={[
                                "flex w-full justify-center transition rounded-md px-3 py-1.5 text-sm font-semibold leading-6",
                                button({color: "primary", ring: false})
                            ]}
                        >
                            Register
                        </button>
                    </div>
                    <p class={["mt-10 text-center text-sm", placeholder()]}>
                        By creating an account, you agree to the{' '}
                        <Link href="/docs/tos" class="font-semibold leading-6 text-primary-400 hover:text-primary-300">
                            Terms of Service
                        </Link>
                        .
                    </p>
                </Form>
            </div>
        </div>
    </div>
})
