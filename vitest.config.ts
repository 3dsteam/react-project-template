import { defineConfig } from "vitest/config";

export default defineConfig({
    test: {
        // ...
        globals: true,
        environment: "jsdom",
    },
    resolve: {
        alias: {
            "@pages": "/src/pages",
            "@store": "/src/store",
            "@utils": "/src/utils",
        },
    },
});
