import { configureStore } from "@reduxjs/toolkit";
import { Middleware } from "redux"; // Import a Middleware type
import thunk from "redux-thunk";
import checkAuthUser from "./checkAuthUser";
import reducer from "./reducer";

const middleware: Middleware[] = [thunk, checkAuthUser]; // Define an array of middleware

const store = configureStore({
  reducer: reducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(middleware),
  devTools: import.meta.env.MODE === "development",
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
