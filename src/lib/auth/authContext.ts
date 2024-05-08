import {$, createContextId, QRL} from "@builder.io/qwik";
import {User} from "~/lib/auth/user";
import {RegisterStatus} from "~/lib/auth/server";
import {Result} from "~/lib/result";

type RegisterResponse = {
    status: RegisterStatus
    reasons?: string[]
}

export type UserState = {
    currentUser: null | User
    register$: QRL<(this: UserState, username: string) => Promise<RegisterResponse>>
    login$: QRL<(this: UserState, username: string) => Promise<Result<{}, {}>>>
}

export const AuthContext = createContextId<UserState>("auth")
