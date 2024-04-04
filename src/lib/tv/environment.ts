import {tv} from "tailwind-variants";

export const environment = tv({
    slots: {
        text: "text-gray-900 dark:text-white",
        placeholder: "placeholder:text-gray-400 dark:placeholder:text-gray-200",
        bg: "bg-white dark:bg-white/5",
        border: "border border-gray-900/25 dark:border-gray-300/25",
        ring: "ring-1 focus:ring-2 ring-gray-900/25 ring-inset focus:ring-primary-600 dark:ring-gray-300/25 dark:focus:ring-primary-500",
    },
    variants: {
        color: {
            red: {
                ring: "ring-2 ring-red-600 dark:ring-red-700 focus:ring-red-600 dark:focus:ring-red-700"
            }
        }
    }
})
