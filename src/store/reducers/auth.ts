import { createSlice } from "@reduxjs/toolkit";
import { IAuthState } from "@models/auth.ts";
import { getLocalStorage, removeLocalStorage, setLocalStorage } from "@utils/storage.ts";

interface IState {
    data: IAuthState;
}

interface IAction {
    payload: Pick<IAuthState, "token"> & Pick<IAuthState, "user">;
}

// Load initial state from localStorage
const local = getLocalStorage("authentication", true) as IAuthState | null;
const initialState: IState = {
    data: local ?? {
        isAuth: false,
        token: null,
        user: null,
    },
};

const slice = createSlice({
    name: "Auth",
    initialState,
    reducers: {
        authenticate: (state: IState, action: IAction) => {
            const data: IAuthState = { isAuth: true, ...action.payload };
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
