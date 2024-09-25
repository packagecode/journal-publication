import reducer from "./reducer";
import thunk from "redux-thunk";
import {  configureStore } from "@reduxjs/toolkit";
import { Middleware } from "redux"; // Import a Middleware type

const middleware: Middleware[] = [thunk]; // Define an array of middleware

const store = configureStore({
  reducer: reducer,
  middleware: middleware, // Pass the middleware array
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;

