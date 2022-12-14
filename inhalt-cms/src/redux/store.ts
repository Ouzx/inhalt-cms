import { configureStore } from "@reduxjs/toolkit";
import { cmsCoreApi } from "./services/cmsCore";
import { userCoreApi } from "./services/userCore";
import authSlice from "./features/authSlice";
import themeSlice from "./features/themeSlice";

const store = configureStore({
  reducer: {
    [cmsCoreApi.reducerPath]: cmsCoreApi.reducer,
    [userCoreApi.reducerPath]: userCoreApi.reducer,
    auth: authSlice,
    theme: themeSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      cmsCoreApi.middleware,
      userCoreApi.middleware
    ),
});

export default store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
