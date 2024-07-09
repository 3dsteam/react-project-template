import { PropsWithChildren, ReactElement } from "react";
import type { RenderOptions } from "@testing-library/react";
import { render } from "@testing-library/react";
import { Provider } from "react-redux";
import { AppStore, createStore, RootState } from "@store/index.ts";

interface ExtendedRenderOptions extends Omit<RenderOptions, "queries"> {
    preloadedState?: Partial<RootState>;
    store?: AppStore;
}

export const renderWithProviders = (
    ui: ReactElement,
    {
        preloadedState = {},
        // Automatically create a store instance if no store was passed in
        store = createStore(preloadedState),
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
