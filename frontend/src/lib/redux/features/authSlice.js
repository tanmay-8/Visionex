'use client';
import { createSlice } from "@reduxjs/toolkit";
import { userAgent } from "next/server";

const initialState = {
    curStep: 0,
    isVerified: false,
    isWithGoogle: false,
    email:"",
    password:"",
    name:"",
    username:"",
    dob:"",
    code:"",
}

const authSlice = createSlice({
    name: "auth",
    initialState: initialState,
    reducers: {
        setStep: (state, action) => {
            state.curStep = action.payload;
        },
        setVerified: (state, action) => {
            state.isVerified = action.payload;
        },
        setWithGoogle: (state, action) => {
            state.isWithGoogle = action.payload;
        },
        setEmail: (state, action) => {
            state.email = action.payload;
        },
        setPassword: (state, action) => {
            state.password = action.payload;
        },
        setName: (state, action) => {
            state.name = action.payload;
        },
        setUsername: (state, action) => {
            state.username = action.payload;
        },
        setDob: (state, action) => {
            state.dob = action.payload;
        },
        setCode: (state, action) => {
            state.code = action.payload;
        },
        reset: (state) => {
            state.curStep = 0;
            state.isVerified = false;
            state.isWithGoogle = false;
            state.email = "";
            state.password = "";
            state.name = "";
            state.username = "";
            state.dob = "";
            state.code = "";
        }
    }
});

export const { setStep, setVerified, setWithGoogle, setEmail, setPassword, setName, setUsername, setDob, setCode, reset } = authSlice.actions;

export const authReducer = authSlice.reducer;