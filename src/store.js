// src/store.js
import { configureStore } from '@reduxjs/toolkit';
import authReducer from './features/authSlice';
import registerReducer from "./features/registerSlice"
import resumeReducer from './features/resumeSlice'

const store = configureStore({
  reducer: {
    auth: authReducer,
    register: registerReducer,
    resume:resumeReducer,
  },
  
  devTools: true,
});

export default store;
