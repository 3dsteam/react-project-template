import { PropsWithChildren, ReactElement } from "react";
import type { RenderOptions } from "@testing-library/react";
import { render } from "@testing-library/react";
import { configureStore } from "@reduxjs/toolkit";
import { Provider } from "react-redux";
import { AppStore, rootReducer, RootState } from "./index.ts";

interface ExtendedRenderOptions extends Omit<RenderOptions, "queries"> {
    preloadedState?: Partial<RootState>;
    store?: AppStore;
}

export const renderWithProviders = (
    ui: ReactElement,
    {
        preloadedState = {},
        // Automatically create a store instance if no store was passed in
        store = configureStore({ reducer: rootReducer, preloadedState }),
        ...renderOptions
    }: ExtendedRenderOptions = {},
) => {
    // Wrap ui in Redux Provider with the passed in store
    const Wrapper = ({ children }: PropsWithChildren): ReactElement => {
        return <Provider store={store}>{children}</Provider>;
    };

    // Return an object with the store and all of RTL's query functions
    return { store, ...render(ui, { wrapper: Wrapper, ...renderOptions }) };
};
