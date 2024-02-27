import "@testing-library/jest-dom/vitest";

// i18next
vi.mock("react-i18next", () => ({
    // this mock makes sure any components using the translation hook can use it without a warning being shown
    useTranslation: () => {
        return {
            t: (str: string) => str,
            i18n: {
                changeLanguage: () => Promise.resolve(),
            },
        };
    },
}));
