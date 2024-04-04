import {component$} from "@builder.io/qwik";
import {Form, Link} from "@builder.io/qwik-city";
import {environment} from "~/lib/tv/environment";
import {heading} from "~/lib/tv/heading";
import {button} from "~/lib/tv/button";

export default component$(() => {
    const {text, bg, ring, placeholder} = environment()
    return <div class="flex min-h-full w-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div class="sm:mx-auto sm:w-full sm:max-w-sm">
            <div class="sm:mx-auto sm:w-full sm:max-w-sm">
                <h2 class={heading().h2()}>
                    Sign in to your account
                </h2>
            </div>
            <div class="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                <Form class={"m-2 space-y-6"}>
                    <div>
                        <label for="username" class={["block text-sm font-medium leading-6", text()]}>
                            User Name
                        </label>
                        <div class="mt-2">
                            <input
                                id="username"
                                name="username"
                                type="text"
                                autoComplete="username"
                                required
                                class={[
                                    "block w-full rounded-md border-0 py-1.5 sm:text-sm sm:leading-6",
                                    text(), bg(), ring()
                                ]}
                            />
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
                            Sign in
                        </button>
                    </div>

                    <p class={["mt-10 text-center text-sm", placeholder()]}>
                        Not a member?{' '}
                        <Link href="/auth/register" class="font-semibold leading-6 text-primary-400 hover:text-primary-300">
                            Register
                        </Link>
                    </p>
                </Form>
            </div>
        </div>
    </div>
})
