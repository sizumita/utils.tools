import {tv} from "tailwind-variants";

export const form = tv({
    slots: {
        base: "text-gray-900 dark:text-white space-y-6",
        text: [
            "block w-full rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inset focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6",
            "text-gray-900 placeholder:text-gray-400",
            "dark:bg-white/5 dark:text-white dark:placeholder:text-gray-600"
        ],
        errorText: "text-sm text-red-700 dark:text-red-600",
        label: "text-sm font-medium leading-6 text-gray-900 dark:text-white"
    },
    variants: {
        error: {
            true: {
                text: [
                    "ring-2",
                    "ring-red-600 focus:ring-red-600",
                    "dark:ring-red-700 dark:focus:ring-red-700"
                ]
            },
            false: {
                text: [
                    "ring-gray-900/25 focus:ring-primary-600",
                    "dark:ring-gray-300/25 dark:focus:ring-primary-500"
                ]
            }
        }
    },
    defaultVariants: {
        error: false
    }
})
