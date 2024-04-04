import {$, component$, Slot, useContextProvider, useStore} from "@builder.io/qwik";
import {AuthContext, UserState} from "~/lib/auth/authContext";
import {RegisterStatus} from "~/lib/auth/server";
import {startRegistration} from "@simplewebauthn/browser";
import {serverRequestRegister} from "~/lib/auth/server/requestRegister";
import {serverVerifyRegister} from "~/lib/auth/server/verifyRegister";

export default component$(() => {
    const state = useStore<UserState>({
        currentUser: null,
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
                console.log(resp)
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
        })
    })

    useContextProvider(AuthContext, state)

    return <><Slot /></>
})
