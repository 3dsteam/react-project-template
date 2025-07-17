import type { IApiError } from "@models/error";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import type { PropsWithChildren } from "react";

const queryClient = new QueryClient();

// Define default error for the query client
declare module "@tanstack/react-query" {
    interface Register {
        defaultError: IApiError;
    }
}

export function getContext() {
    return {
        queryClient,
    };
}

export function Provider({ children }: PropsWithChildren) {
    return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>;
}
