import { defineConfig, type UserConfig } from "vite";
import { qwikVite } from "@builder.io/qwik/optimizer";
import { qwikCity } from "@builder.io/qwik-city/vite";
import tsconfigPaths from "vite-tsconfig-paths";
import { qwikReact } from "@builder.io/qwik-react/vite";
let platform = {};
if (process.env.NODE_ENV === "development") {
  const { getPlatformProxy } = await import("wrangler");
  platform = await getPlatformProxy();
}

export default defineConfig((): UserConfig => {
  return {
    plugins: [
      qwikCity({
        platform,
      }),
      qwikVite(),
      tsconfigPaths(),
      qwikReact(),
    ],
    server: {
      headers: {
        "Cache-Control": "public, max-age=0",
      },
    },
    preview: {
      headers: {
        "Cache-Control": "public, max-age=600",
      },
    },
  };
});
