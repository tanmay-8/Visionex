'use client';
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isLogged: localStorage.getItem("visionToken") ? true : false,
    authToken: localStorage.getItem("visionToken"),
    email: null,
    name: null,
    username: null,
    birthDate: null,
    profileImageUrl: null,
    createdAt: null,
    updatedAt: null
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
        },
        setUserData: (state, action) => {
            state.email = action.payload.email;
            state.name = action.payload.name;
            state.username = action.payload.username;
            state.birthDate = action.payload.birthDate;
            state.profileImageUrl = action.payload.profileImageUrl;
            state.createdAt = action.payload.createdAt;
            state.updatedAt = action.payload.updatedAt;
        },
        updateProfileImage: (state, action) => {
            state.profileImageUrl = action.payload;
        }

    }
});

export const { login, logout,setUserData,updateProfileImage } = userSlice.actions;
export const userReducer = userSlice.reducer;