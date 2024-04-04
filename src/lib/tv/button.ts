import {tv} from "tailwind-variants";

export const button = tv({
    base: [
        "transition shadow-sm",
        "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
    ],
    variants: {
        color: {
            white: [
                "bg-white text-gray-900 hover:bg-gray-50",
                "dark:bg-white/10 dark:text-white dark:hover:bg-white/20",
                "focus-visible:outline-primary-600"
            ],
            primary: [
                "text-white",
                "bg-primary-600 hover:bg-primary-700",
                "dark:bg-primary-600 dark:hover:bg-primary-500",
                "focus-visible:outline-primary-600"
            ]
        },
        ring: {
            true: "ring-1 ring-inset"
        }
    },
    compoundVariants: [
        {
            color: "white",
            ring: true,
            class: "ring-gray-300 dark:ring-transparent"
        },
        {
            color: "primary",
            ring: true,
            class: "ring-white"
        },
    ],
    defaultVariants: {
        color: "white",
        ring: true
    }
})
