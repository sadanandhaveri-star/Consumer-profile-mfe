import { configureStore } from '@reduxjs/toolkit';
import userProfileReducer from '../features/userProfile/userProfileSlice';

export const store = configureStore({
  reducer: {
    userProfile: userProfileReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        // Ignore these action types
        ignoredActions: ['userProfile/uploadAvatar'],
        // Ignore these field paths in all actions
        ignoredActionPaths: ['payload.file'],
        // Ignore these paths in the state
        ignoredPaths: ['userProfile.avatarFile'],
      },
    }),
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
