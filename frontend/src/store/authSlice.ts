import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from './store';
import { getUser } from '../Api/authApi';
export interface AuthState {
  authentication: boolean;
  status: 'idle' | 'loading' | 'failed';
  username: string,
  userId: number
}

const initialState: AuthState = {
  authentication: localStorage.getItem('access_token') !== null,
  status: 'idle',
  username: '',
  userId: -999
};

export const getUserWithJwt = createAsyncThunk(
  'auth/getUser',
  async () => {
    const response = await getUser();
    // The value we return becomes the `fulfilled` action payload
    return response.data;
  }
);

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setAuthentication: (state) => {
      state.authentication = true;
    },
    setUsername: (state, action: PayloadAction<string>) => {
      state.username = action.payload;
    },
    setUserId: (state, action: PayloadAction<number>) => {
      state.userId = action.payload;
    },
    clearAuthentication: (state) => {
      state.authentication = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getUserWithJwt.pending, (state) => {
        console.log('fetching data from the backend')
        state.status = 'loading';
      })
      .addCase(getUserWithJwt.fulfilled, (state, action) => {
        state.status = 'idle';
        state.username = action.payload.username;
        state.userId = action.payload.userId;
      })
      .addCase(getUserWithJwt.rejected, (state) => {
        state.authentication = false;
        state.status = 'failed';
      });
  },
});

export const { setAuthentication,clearAuthentication, setUsername, setUserId  } = authSlice.actions;

export const selectUsername = (state: RootState) => state.auth.username;
export const selectUserId = (state: RootState) => state.auth.userId;
export const selectAuth = (state: RootState) => state.auth.authentication;

export default authSlice.reducer;