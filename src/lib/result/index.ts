export type SerializedResult<T, E> = {
    ok: true
    value: T
} | {
    ok: false
    error: E
}
