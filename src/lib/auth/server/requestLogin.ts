import {server$} from "@builder.io/qwik-city";
import {database} from "~/lib/db";
import {eq} from "drizzle-orm";
import {users} from "~/schema";
import {LoginError} from "~/lib/auth/server/index";
import {generateAuthenticationOptions} from "@simplewebauthn/server";
import {Result} from "~/lib/result";

export const requestLogin = server$(async function (username: string) {
    const db = database(this.platform.env.DB)
    const userFind = await db.query.users.findMany({
        where: eq(users.id, username),
        with: {
            authenticators: true
        }
    })
    if (userFind.length === 0) {
        return Result.err(LoginError.NotFound).serialize()
    }
    const user = userFind[0]
    const options = await generateAuthenticationOptions({
        rpID: this.url.hostname,
        allowCredentials: user.authenticators.map(authenticator => ({
            id: Buffer.from(authenticator.credentialId, "hex"),
            type: "public-key",
            transports: authenticator.transports ?? []
        }))
    })
    await this.platform.env.userChallenges.put(username, options.challenge)
    return Result.ok(options).serialize()
})
