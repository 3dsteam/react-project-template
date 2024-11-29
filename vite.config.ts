import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import { TanStackRouterVite } from "@tanstack/router-plugin/vite";

export default defineConfig({
    plugins: [TanStackRouterVite(), react()],
    resolve: {
        mainFields: ["module", "main"],
        alias: {
            "@assets": "/src/assets",
            "@pages": "/src/pages",
            "@components": "/src/components",
            "@hooks": "/src/hooks",
            "@mocks": "/mocks",
            "@models": "/src/models",
            "@store": "/src/redux-store",
            "@tests": "/tests",
            "@utils": "/src/utils",
        },
    },
    css: {
        preprocessorOptions: {
            scss: {
                api: "legacy",
                includePaths: ["node_modules/@syncfusion"],
            },
        },
    },
});
