import { combineReducers, configureStore, PreloadedState } from "@reduxjs/toolkit";

export const rootReducer = combineReducers({});

export const setupStore = (preloadedState?: PreloadedState<typeof rootReducer>) => {
    return configureStore({
        reducer: rootReducer,
        preloadedState,
        devTools: import.meta.env.DEV,
    });
};

export default setupStore();

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore["dispatch"];
