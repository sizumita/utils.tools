import {server$} from "@builder.io/qwik-city";
import jwt from "@tsndr/cloudflare-worker-jwt";
import {User} from "~/lib/auth/user";

export const serverVerifyUser = server$(async function (token: string)  {
    if (!await jwt.verify(token, this.platform.env.JWT_SECRET).catch(_ => false)) {
        return null
    }
    const userObject = jwt.decode(token)
    if (!userObject.payload?.sub) {
        return null
    }
    return {
        username: userObject.payload.sub
    } satisfies User
})
