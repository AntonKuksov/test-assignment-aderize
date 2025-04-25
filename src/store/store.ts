import { configureStore } from "@reduxjs/toolkit";
import teamReducer from "./teamSlice";

export const store = configureStore({
    reducer: {
        teams: teamReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
