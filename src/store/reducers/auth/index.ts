import { createSlice } from "@reduxjs/toolkit";
import { getLocalStorage, removeLocalStorage, setLocalStorage } from "@utils/storage.ts";

type AuthState = {
    data: {
        isAuth: boolean;
        token: string | null;
        user: unknown;
    };
};

// Load initial state from localStorage
const local = getLocalStorage("authentication", true) as AuthState["data"] | null;
const initialState: AuthState = {
    data: local || {
        isAuth: false,
        token: null,
        user: null,
    },
};

const slice = createSlice({
    name: "Auth",
    initialState,
    reducers: {
        authenticate: (state: AuthState, action: { payload: { token: string; user: unknown } }) => {
            const data: AuthState["data"] = {
                // Set auth flag
                isAuth: true,
                ...action.payload,
            };
            // Save to localStorage
            setLocalStorage("authentication", JSON.stringify(data));
            state.data = data;
        },
        expire: (state) => {
            removeLocalStorage("authentication");
            state.data = { isAuth: false, token: null, user: null };
        },
    },
});

export default slice.reducer;
export const { authenticate, expire } = slice.actions;
