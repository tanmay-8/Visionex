"use client";
import { createSlice } from "@reduxjs/toolkit";
const initialState = {
    ideas: [],
}

const ideasSlice = createSlice({
    name: "ideas",
    initialState: initialState,
    reducers: {
        setIdeas: (state, action) => {
            state.ideas = action.payload;
        },
        clearIdeas: (state) => {
            state.ideas = [];
        }
    }
});

export const { setIdeas, clearIdeas } = ideasSlice.actions;

export const ideasReducer = ideasSlice.reducer;

