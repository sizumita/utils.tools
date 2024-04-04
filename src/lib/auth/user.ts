import {maxLength, minLength, Output, regex, string} from "valibot";

export const UsernameSchema = string([
    minLength(3, "Username is too short."),
    maxLength(60, "Username is too long."),
    regex(/^[a-zA-Z0-9_]+$/, "User names may contain only numbers or alphabets.")
])

export type User = {
    username: Output<typeof UsernameSchema>
}
