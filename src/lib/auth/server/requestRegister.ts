import {server$} from "@builder.io/qwik-city";
import {database} from "~/lib/db";
import {safeParse} from "valibot";
import {UsernameSchema} from "~/lib/auth/user";
import {users} from "~/schema";
import {eq} from "drizzle-orm";
import {generateRegistrationOptions} from "@simplewebauthn/server";
import {RegisterRequestResult, RegisterStatus, RP_NAME} from "~/lib/auth/server";

export const serverRequestRegister = server$(async function (userName: string): Promise<RegisterRequestResult> {
    const db = database(this.platform.env.DB)
    const v = safeParse(UsernameSchema, userName)
    if (!v.success) {
        return {
            status: RegisterStatus.NameValidationError,
            issues: v.issues
        }
    }
    const user = await db.select().from(users).where(eq(users.id, userName))
    if (user.length > 0) {
        return {
            status: RegisterStatus.AlreadyRegistered
        }
    }

    const options = await generateRegistrationOptions({
        rpName: RP_NAME,
        rpID: this.url.hostname,
        userName,
        userID: userName,
        attestationType: 'none',
        authenticatorSelection: {
            residentKey: "preferred",
            userVerification: "preferred",
            authenticatorAttachment: "platform",
        }
    })
    await this.platform.env.userChallenges.put(userName, options.challenge)
    return {
        status: RegisterStatus.Success,
        options
    }
})
