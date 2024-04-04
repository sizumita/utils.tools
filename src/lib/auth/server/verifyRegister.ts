import {server$} from "@builder.io/qwik-city";
import {startRegistration} from "@simplewebauthn/browser";
import {database} from "~/lib/db";
import {verifyRegistrationResponse} from "@simplewebauthn/server";
import {authenticators, users} from "~/schema";
import {Buffer} from "node:buffer";
import jwt from "@tsndr/cloudflare-worker-jwt";
import {Return} from "~/lib/auth/server/index";

export const serverVerifyRegister = server$(async function (username: string, response: Return<typeof startRegistration>) {
    try {
        const db = database(this.platform.env.DB)

        const challenge = await this.platform.env.userChallenges.get(username)
        if (challenge === null) return null
        try {
            const verification = await verifyRegistrationResponse({
                response,
                expectedChallenge: challenge,
                expectedOrigin: `${this.url.protocol}//${this.url.host}`,
                expectedRPID: this.url.hostname
            })

            if (verification.verified) {
                const registrationInfo = verification.registrationInfo!
                await db.insert(users).values({
                    id: username
                })
                await db.insert(authenticators).values({
                    credentialId: Buffer.from(registrationInfo.credentialID).toString("hex"),
                    credentialPublicKey: Buffer.from(registrationInfo.credentialPublicKey).toString("hex"),
                    counter: registrationInfo.counter,
                    credentialDeviceType: registrationInfo.credentialDeviceType,
                    credentialBackedUp: registrationInfo.credentialBackedUp,
                    transports: response.response.transports,
                    userId: username
                })
            }
            const token = await jwt.sign({
                sub: username,
                iat: Date.now(),
                iss: "utils.tools",
                exp: Date.now() + 1000 * 60 * 24 * 365, // 1year
            }, this.platform.env.JWT_SECRET)
            this.cookie.set("token", token, {
                sameSite: "strict",
                secure: !import.meta.env.DEV,
                httpOnly: true,
                path: "/",
                maxAge: 60 * 60 * 24 * 365
            })
            return token
        } catch (e) {
            console.error(e);
            return null
        }
    } catch (e) {
        console.error(e)
    }
})
