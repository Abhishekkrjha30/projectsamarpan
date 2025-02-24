import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    status: false,
    userData: null,
    count: 0,
    unread: 0, // Track unread notifications
};

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        login: (state, action) => {
            state.status = true;
            state.userData = action.payload.userData;
        },
        logout: (state) => {
            state.status = false;
            state.userData = null;
            state.count = 0;
            state.unread = 0;
        },
        addNotification: (state) => {
            state.count += 1;
            state.unread += 1; // Increase unread count
        },
        markAsRead: (state) => {
            state.unread = 0; // Reset unread count
        },
        setUnreadCount: (state, action) => {
            state.unread = action.payload; // Set unread count dynamically
        }
    }
});

export const { login, logout, addNotification, markAsRead, setUnreadCount } = authSlice.actions;

export default authSlice.reducer;
