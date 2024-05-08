import {component$, Slot} from "@builder.io/qwik";
import {routeLoader$} from "@builder.io/qwik-city";
import {serverVerifyUser} from "~/lib/auth/server/verifyUser";

export const useGetUser = routeLoader$(async (event) => {
    const token = event.cookie.get("token")
    if (!token) return null
    const user = await serverVerifyUser(token.value)
    if (user === null) return null
    return user
})

export default component$(() => {
    return <Slot />
})

