import { combineReducers, configureStore } from "@reduxjs/toolkit";
import auth from "@store/reducers/auth.ts";
import { signInApi } from "@store/services/queries/sign-in.ts";

export const rootReducer = combineReducers({
    auth,
    // Services
    signInApi: signInApi.reducer,
});

export const createStore = (preloadedState?: Partial<RootState>) => {
    return configureStore({
        reducer: rootReducer,
        preloadedState,
        devTools: import.meta.env.DEV,
        // Middleware
        middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(signInApi.middleware),
    });
};

export default createStore();

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof createStore>;
export type AppDispatch = AppStore["dispatch"];
