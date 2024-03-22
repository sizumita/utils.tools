import { createContextId, type Signal } from "@builder.io/qwik";

export type Theme = "light" | "dark";
export const ThemeContext = createContextId<Signal<Theme>>("theme-context");
