import { ThemeContext } from "~/contexts/themeContext";
import { $, useContext } from "@builder.io/qwik";

export const useTheme = () => {
    const theme = useContext(ThemeContext);

    return {
        theme,
        toggle: $(() => {
            theme.value = theme.value === "light" ? "dark" : "light";
        }),
    };
};
