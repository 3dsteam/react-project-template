import { combineReducers, configureStore } from "@reduxjs/toolkit";
import auth from "@store/reducers/auth.ts";
import { signInApi } from "@store/services/queries/sign-in.ts";

export const rootReducer = combineReducers({
    auth,
    // Services
    signInApi: signInApi.reducer,
});

const store = configureStore({
    reducer: rootReducer,
    devTools: import.meta.env.DEV,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(signInApi.middleware),
});

export default store;

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = typeof store;
export type AppDispatch = AppStore["dispatch"];
