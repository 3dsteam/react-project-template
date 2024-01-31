import { combineReducers, configureStore } from "@reduxjs/toolkit";
import auth from "@store/reducers/auth.ts";

export const rootReducer = combineReducers({
    auth,
});

const store = configureStore({
    reducer: rootReducer,
    devTools: import.meta.env.DEV,
});

export default store;

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = typeof store;
export type AppDispatch = AppStore["dispatch"];
