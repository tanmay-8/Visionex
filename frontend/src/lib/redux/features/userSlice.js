'use client';
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isLogged: localStorage.getItem("visionToken") ? true : false,
    authToken: localStorage.getItem("visionToken"),
    user: null
}

const userSlice = createSlice({
    name: "user",
    initialState: initialState,
    reducers: {
        login: (state, action) => {
            state.isLogged = true;
            state.authToken = action.payload
        },
        logout: (state) => {
            state.isLogged = false;
            state.user = null;
        }
    }
});

export const { login, logout } = userSlice.actions;
export const userReducer = userSlice.reducer;