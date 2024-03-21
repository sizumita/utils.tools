import forms from "@tailwindcss/forms";
import { Config } from "tailwindcss";

export default {
    content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
    darkMode: "selector",
    theme: {
        extend: {},
    },
    plugins: [forms],
} satisfies Config;
