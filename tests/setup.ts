import "@testing-library/jest-dom/vitest";
import "vitest-fetch-mock";

import { vi } from "vitest";
import createFetchMock from "vitest-fetch-mock";

// Enable fetch mocking
const fetchMocker = createFetchMock(vi);
fetchMocker.enableMocks();
