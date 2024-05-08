import type { RequestEventBase } from "@builder.io/qwik-city";


export type ServerFn<R> = (this: RequestEventBase, ...args: any[]) => R

export type AwaitedReturnType<T extends (...args: any) => any> =
    T extends (...args: any) => infer R
        ? R extends Promise<infer K> ? K : R
        : never
