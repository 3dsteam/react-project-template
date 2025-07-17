import { createRouter, RouterProvider } from "@tanstack/react-router";
import { render } from "@testing-library/react";

import * as TanstackQuery from "@integrations/tanstack-query/root-provider";
import { routeTree } from "../routeTree.gen";

// Export query client for use in tests
export const queryClient = TanstackQuery.getContext().queryClient;

// Create test router instance
export const router = createRouter({
    routeTree,
    context: { ...TanstackQuery.getContext() },
    // Avoid cache
    defaultPreloadStaleTime: 0,
    defaultGcTime: 0,
});

export const renderWithRouterProvider = () => {
    render(
        <TanstackQuery.Provider>
            <RouterProvider router={router} />
        </TanstackQuery.Provider>,
    );
};
