import "@testing-library/jest-dom/vitest";
import "vitest-fetch-mock";

import { vi } from "vitest";
import createFetchMock from "vitest-fetch-mock";

// Enable fetch mocking
const fetchMocker = createFetchMock(vi);
fetchMocker.enableMocks();

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
