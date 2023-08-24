import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react-swc";

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [react()],
    resolve: {
        alias: {
            "@pages": "/src/pages",
            "@store": "/src/store",
            "@utils": "/src/utils",
        },
    },
    test: {
        // ...
        globals: true,
        environment: "jsdom",
    },
});
