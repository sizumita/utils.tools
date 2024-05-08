import {$, component$, Slot, useContextProvider, useStore, useVisibleTask$} from "@builder.io/qwik";
import {AuthContext, UserState} from "~/lib/auth/authContext";
import {RegisterStatus} from "~/lib/auth/server";
import {startRegistration, startAuthentication} from "@simplewebauthn/browser";
import {serverRequestRegister} from "~/lib/auth/server/requestRegister";
import {serverVerifyRegister} from "~/lib/auth/server/verifyRegister";
import {useGetUser} from "~/routes/layout";

export default component$(() => {
    const user = useGetUser()
    const state = useStore<UserState>({
        currentUser: user.value,
        register$: $(async function(username: string) {
            const result = await serverRequestRegister(username)
            if (result.status === RegisterStatus.AlreadyRegistered) {
                return {
                    status: RegisterStatus.AlreadyRegistered
                }
            }
            if (result.status === RegisterStatus.NameValidationError) {
                return {
                    status: RegisterStatus.NameValidationError,
                    reasons: result.issues.map(x => x.message)
                }
            }
            try {
                const resp = await startRegistration(result.options)
                const token = await serverVerifyRegister(username, resp)
                if (token === null) {
                    return {
                        status: RegisterStatus.ClientError
                    }
                }
                this.currentUser = {
                    username
                }
                return {
                    status: RegisterStatus.Success
                }
            } catch (e) {
                return {
                    status: RegisterStatus.ClientError
                }
            }
        }),
        login$: $(async function(username) {

            return
        })
    })

    useContextProvider(AuthContext, state)

    useVisibleTask$(() => {
        console.log(state.currentUser?.username)
    })

    return <><Slot /></>
})
