import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import authReducer from './authSlice';
import dietSlice from './dietSlice';
import exerciseSlice from './exerciseSlice';
import coachSlice from './coachSlice';
export const store = configureStore({
  reducer: {
    auth: authReducer,
    diet: dietSlice,
    exercise: exerciseSlice,
    coach: coachSlice,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
