import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import counterReducer from './counterSlice';
import authReducer from './authSlice';
import dietSlice from './dietSlice';
import exerciseSlice from './exerciseSlice';
export const store = configureStore({
  reducer: {
    counter: counterReducer,
    auth: authReducer,
    diet: dietSlice,
    exercise: exerciseSlice,
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
