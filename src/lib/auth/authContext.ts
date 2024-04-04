import {$, createContextId, QRL} from "@builder.io/qwik";
import {User} from "~/lib/auth/user";
import {RegisterStatus} from "~/lib/auth/server";

type RegisterResponse = {
    status: RegisterStatus
    reasons?: string[]
}

export type UserState = {
    currentUser: null | User
    register$: QRL<(this: UserState, username: string) => Promise<RegisterResponse>>
}

export const AuthContext = createContextId<UserState>("auth")
