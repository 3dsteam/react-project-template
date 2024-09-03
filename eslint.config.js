import eslint from "@eslint/js";
import tsEslint from "typescript-eslint";
import reactEslint from "eslint-plugin-react";
import prettierEslint from "eslint-config-prettier";
import globals from "globals";

export default tsEslint.config(
    { ignores: ["node_modules", "dist"] },
    eslint.configs.recommended,
    // TypeScript specific rules
    ...tsEslint.configs.recommendedTypeChecked,
    // ...tsEslint.configs.stylisticTypeChecked,
    {
        languageOptions: {
            parserOptions: {
                project: true,
                tsconfigRootDir: import.meta.dirname,
                EXPERIMENTAL_useProjectService: true,
            },
        },
    },
    {
        files: ["**/*.js"],
        ...tsEslint.configs.disableTypeChecked,
    },
    // React specific rules
    {
        files: ["src/**/*.{ts,tsx}"],
        ...reactEslint.configs.flat.recommended,
        languageOptions: {
            ...reactEslint.configs.flat.recommended.languageOptions,
            globals: {
                ...globals.browser,
            },
        },
        rules: {
            ...reactEslint.configs.flat.recommended.rules,
            "react/react-in-jsx-scope": "off",
            "react/forbid-component-props": [1, { forbid: ["style"] }],
            "react/jsx-filename-extension": [1, { extensions: [".tsx"] }],
        },
        settings: {
            react: {
                version: "detect",
            },
        },
    },
    // Prettier Overrides
    prettierEslint,
);
