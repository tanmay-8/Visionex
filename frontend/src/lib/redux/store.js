import { configureStore } from "@reduxjs/toolkit";
import { themeReducer } from "./features/themeSlice";
import { userReducer } from "./features/userSlice";
import { authReducer } from "./features/authSlice";
import { addIdeaReducer } from "./features/addIdeaSlice";
import { ideasReducer } from "./features/ideasSlice";

export const makeStore = () => {
    // console.log(themeReducer)
    return configureStore({
        reducer: {
            theme: themeReducer,
            user: userReducer,
            auth: authReducer,
            addIdea: addIdeaReducer,
            ideas:ideasReducer
        },
        middleware: (getDefaultMiddleware) =>
            getDefaultMiddleware({
                serializableCheck: false,
            }),
    });
};
