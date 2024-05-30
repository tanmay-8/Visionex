import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    title: "",
    description: "",
    collaborators: [],
    category: [],
    visit: "",
    tags: [],
    externalLinks: [],
    images: [],
    videos: [],
    email: "",
    phone: "",
    linkedin: "",
    twitter: "",
    instagram: "",
};

const addIdeaSlice = createSlice({
    name: "addIdea",
    initialState: initialState,
    reducers: {
        setTitle: (state, action) => {
            state.title = action.payload;
        },
        setDescription: (state, action) => {
            state.description = action.payload;
        },
        setCategory: (state, action) => {
            state.category = action.payload;
        },
        setTags: (state, action) => {
            state.tags = action.payload;
        },
        setExternalLinks: (state, action) => {
            state.externalLinks = action.payload;
        },
        setImages: (state, action) => {
            state.images = action.payload;
        },
        setVideos: (state, action) => {
            state.videos = action.payload;
        },
        setCollborators: (state, action) => {
            state.collaborators = action.payload;
        },
        setVisit: (state, action) => {
            state.visit = action.payload;
        },
        setEmail: (state, action) => {
            state.email = action.payload;
        },
        setPhone: (state, action) => {
            state.phone = action.payload;
        },
        setLinkedin: (state, action) => {
            state.linkedin = action.payload;
        },
        setTwitter: (state, action) => {
            state.twitter = action.payload;
        },
        setInstagram: (state, action) => {
            state.instagram = action.payload;
        },
    },
});

export const {
    setTitle,
    setDescription,
    setCategory,
    setTags,
    setExternalLinks,
    setImages,
    setVideos,
    setCollborators,
    setVisit,
    setEmail,
    setPhone,
    setLinkedin,
    setTwitter,
    setInstagram,
} = addIdeaSlice.actions;

export const addIdeaReducer = addIdeaSlice.reducer;
