import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    status: !!localStorage.getItem("user"),  // ✅ Check "user" instead of "userData"
    userData: JSON.parse(localStorage.getItem("user")) || null,  // ✅ Load correct key
    count: parseInt(localStorage.getItem("notificationCount")) || 0,
    unread: parseInt(localStorage.getItem("unreadCount")) || 0,
};

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        login: (state, action) => {
           
            state.status = true;
            state.userData = action.payload;
            localStorage.setItem("user", JSON.stringify(action.payload)); // ✅ Save user data
        },
        
        logout: (state) => {
            
            state.status = false;
            state.userData = null;
            state.count = 0;
            state.unread = 0;
            localStorage.removeItem("user"); // ✅ Clear user data
        },
        addNotification: (state) => {
            state.count += 1;
            state.unread += 1;
            localStorage.setItem("notificationCount", state.count);
            localStorage.setItem("unreadCount", state.unread);
        },
        
        markAsRead: (state) => {
            state.unread = 0;
            localStorage.setItem("unreadCount", state.unread);
        },
        
        setUnreadCount: (state, action) => {
            state.unread = action.payload;
            localStorage.setItem("unreadCount", state.unread);
        },
    }
});

export const { login, logout } = authSlice.actions;

export default authSlice.reducer;
