import { combineReducers, configureStore, PreloadedState } from "@reduxjs/toolkit";
import auth from "@store/reducers/auth";

export const rootReducer = combineReducers({
    auth,
});

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
