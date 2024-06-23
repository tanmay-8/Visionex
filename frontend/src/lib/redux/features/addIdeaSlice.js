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
        setCollaborators: (state, action) => {
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
        clearIdea: (state) => {
            state.title = "";
            state.description = "";
            state.collaborators = [];
            state.category = [];
            state.visit = "";
            state.tags = [];
            state.externalLinks = [];
            state.images = [];
            state.videos = [];
            state.email = "";
            state.phone = "";
            state.linkedin = "";
            state.twitter = "";
            state.instagram = "";
        }
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
    setCollaborators,
    setVisit,
    setEmail,
    setPhone,
    setLinkedin,
    setTwitter,
    setInstagram,
    clearIdea,
} = addIdeaSlice.actions;

export const addIdeaReducer = addIdeaSlice.reducer;
