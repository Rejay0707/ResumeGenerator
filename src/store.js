// src/store.js
import { configureStore } from '@reduxjs/toolkit';
import authReducer from './features/authSlice';
import registerReducer from "./features/registerSlice"
import resumeReducer from './features/resumeSlice'
import adminReducer from './features/adminSlice'
import attendanceReducer from "./features/attendanceSlice";
import examReducer from "./features/examSlice"

const store = configureStore({
  reducer: {
    auth: authReducer,
    register: registerReducer,
    resume:resumeReducer,
    admin: adminReducer,
    attendance: attendanceReducer,
    exam: examReducer,
  },
  
  devTools: true,
});

export default store;
