"use client";
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    // isLogged: localStorage.getItem("visionToken") ? true : false,
    // authToken: localStorage.getItem("visionToken"),
    isLogged: true,
    authToken: null,
    email: null,
    name: null,
    username: null,
    birthDate: null,
    profileImageUrl: null,
    createdAt: null,
    updatedAt: null,
};

const userSlice = createSlice({
    name: "user",
    initialState: initialState,
    reducers: {
        login: (state, action) => {
            state.isLogged = true;
            state.authToken = action.payload;
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
        },
        setUserEmail: (state, action) => {
            state.email = action.payload;
        },
        setUserName: (state, action) => {
            state.name = action.payload;
        },
        setUserUsername: (state, action) => {
            state.username = action.payload;
        },
        setUserBirthDate: (state, action) => {
            state.birthDate = action.payload;
        },
        setLoggedIn: (state, action) => {
            state.isLogged = action.payload;
        },
        setToken: (state, action) => {
            state.authToken = action.payload;
        }
    },
});

export const {
    login,
    logout,
    setUserData,
    updateProfileImage,
    setUserBirthDate,
    setUserEmail,
    setUserName,
    setUserUsername,
    setLoggedIn,
    setToken,
} = userSlice.actions;
export const userReducer = userSlice.reducer;
