/* eslint-disable no-unused-vars */
import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice"; // Rename to authReducer for clarity
import notificationReducer from "./authSlice"; // Import notificationSlice

const store = configureStore({
    reducer: {
        auth: authReducer,
        notifications: notificationReducer, // Now correctly imported
        // TODO: add more slices here for posts
    }
});

export default store;
