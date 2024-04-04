import {generateRegistrationOptions} from "@simplewebauthn/server";
import {SchemaIssues} from "valibot/dist";

export enum RegisterStatus {
    Success,
    AlreadyRegistered,
    NameValidationError,
    ClientError,
}

export type Return<T> = T extends (...args: any[]) => infer O ? O extends Promise<infer I> ? I : O : never

export type RegisterRequestResult = {
    status: RegisterStatus.Success
    options: Return<typeof generateRegistrationOptions>
} | {
    status: RegisterStatus.AlreadyRegistered
} | {
    status: RegisterStatus.NameValidationError
    issues: SchemaIssues
}
