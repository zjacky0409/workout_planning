/*
    Redux to store the auth related data 
    and build some auth related api call
*/

import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from './store';
import { getUser, createUserAPI, checkEmailExistAPI, checkUsernameExistAPI } from '../api/authApi';
import { createUserJson, checkEmailExistJson, checkUsernameExistJson } from '../api/authApi';
import { StudentObject } from '../common';
import { getStudentListAPI } from '../api/coachApi';
export interface AuthState {
  authentication: boolean;
  status: 'idle' | 'pending' | 'failed';
  student_list_status: 'idle' | 'pending' | 'failed';
  username: string,
  userId: number,
  currentRequestId?: string
  role: string[]
  student_coach_id?: number,
  student_id?: number,
  coach_id?: number,
  isVerified: boolean,
  student_list?: StudentObject[] // to store all student of a coach
}

const initialState: AuthState = {
  authentication: localStorage.getItem('access_token') !== null,
  // if the localStorage have the access_token, we set the auth state to true, 
  // then we will send the token to server in the GetConfigLayout to check the tkoken
  status: 'pending',
  student_list_status: 'idle',
  username: '',
  userId: -999,
  currentRequestId: undefined,
  role: [],
  student_coach_id: undefined,
  student_id: undefined,
  coach_id: undefined,
  isVerified: false,
  student_list: undefined
};

// get the user infomation and config from the server and check the jwt token valid or not
export const getUserWithJwt = createAsyncThunk(
  'auth/getUser',
  async () => {
    const response = await getUser();
    return response.data;
  }
);

export const getStudentList = createAsyncThunk(
  'auth/get_student_list',
  async () => {
    const response = await getStudentListAPI()
    return response.data;
  }
)

// for registration page to create user
export const createUser = createAsyncThunk(
  'auth/createUser',
  async (userData: createUserJson) => {
    const response = await createUserAPI(userData);
    return response.data;
  }
);

// for registration page to create user
export const checkEmailExist = createAsyncThunk(
  'auth/checkEmailExist',
  async (userData: checkEmailExistJson) => {
    const response = await checkEmailExistAPI(userData);
    return response.data;
  }
);


// for registration page to create user
export const checkUsernameExist = createAsyncThunk(
  'auth/checkUsernameExist',
  async (userData: checkUsernameExistJson) => {
    const response = await checkUsernameExistAPI(userData);
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
      .addCase(getUserWithJwt.pending, (state, action) => {
        state.status = 'pending';
        state.currentRequestId = action.meta.requestId
      })
      .addCase(getUserWithJwt.fulfilled, (state, action) => {
        const { requestId } = action.meta
        if (
          state.status === 'pending' &&
          state.currentRequestId === requestId
        ) {

          console.log('get from db => ', action.payload)
          if (action.payload.user_coach !== null) {
            state.student_id = action.payload.user_coach.id;
            state.isVerified = action.payload.user.student.isVerified;
            state.student_coach_id = action.payload.user_coach.coach.id;
          }
          if (action.payload.coach_student !== null) {
            state.coach_id = action.payload.coach_student.id;
            state.student_list = action.payload.coach_student.students
          }
          // set the username and userID
          state.username = action.payload.user.username;
          state.userId = action.payload.user.userId;
          state.role = action.payload.user.role
          state.authentication = true;
          state.status = 'idle';
        }

      })
      .addCase(getUserWithJwt.rejected, (state, action) => {
        const { requestId } = action.meta
        if (
          state.status === 'pending' &&
          state.currentRequestId === requestId
        ) {
          state.status = 'failed';
          // if the jwt token is not vaild, we should let user go to login page
          state.authentication = false;
        }
      })
      .addCase(createUser.pending, (state) => {
        state.status = 'pending';
      })
      .addCase(createUser.fulfilled, (state, action) => {
        const { requestId } = action.meta
        if (
          state.status === 'pending' &&
          state.currentRequestId === requestId
        ) {
          state.status = 'idle';
        }
      })
      .addCase(createUser.rejected, (state, action) => {
        const { requestId } = action.meta
        if (
          state.status === 'pending' &&
          state.currentRequestId === requestId
        ) {
          state.status = 'failed';
        }
      })
      .addCase(checkUsernameExist.pending, (state, action) => {
        state.status = 'pending';
        state.currentRequestId = action.meta.requestId
      })
      .addCase(checkUsernameExist.fulfilled, (state, action) => {
        const { requestId } = action.meta
        if (
          state.status === 'pending' &&
          state.currentRequestId === requestId
        ) {
          state.status = 'idle';
        }
      })
      .addCase(checkUsernameExist.rejected, (state, action) => {
        const { requestId } = action.meta
        if (
          state.status === 'pending' &&
          state.currentRequestId === requestId
        ) {
          state.status = 'failed';
        }
      })
      .addCase(checkEmailExist.pending, (state, action) => {
        state.status = 'pending';
        state.currentRequestId = action.meta.requestId
      })
      .addCase(checkEmailExist.fulfilled, (state, action) => {
        const { requestId } = action.meta
        if (
          state.status === 'pending' &&
          state.currentRequestId === requestId
        ) {
          state.status = 'idle';
        }
      })
      .addCase(checkEmailExist.rejected, (state, action) => {
        const { requestId } = action.meta
        if (
          state.status === 'pending' &&
          state.currentRequestId === requestId
        ) {
          state.status = 'failed';
        }
      })
      .addCase(getStudentList.pending, (state, action) => {
        state.student_list_status = 'pending';
        state.currentRequestId = action.meta.requestId
      })
      .addCase(getStudentList.fulfilled, (state, action) => {
        const { requestId } = action.meta
        if (
          state.student_list_status === 'pending' &&
          state.currentRequestId === requestId
        ) {
          state.student_list_status = 'idle';
          console.log(action.payload)
          state.student_list = action.payload.student_list
        }
      })
      .addCase(getStudentList.rejected, (state, action) => {
        const { requestId } = action.meta
        if (
          state.student_list_status === 'pending' &&
          state.currentRequestId === requestId
        ) {
          state.student_list_status = 'failed';
        }
      });
  },
});

export const { setAuthentication, clearAuthentication, setUsername, setUserId } = authSlice.actions;

export const selectUsername = (state: RootState) => state.auth.username;
export const selectUserId = (state: RootState) => state.auth.userId;
export const selectAuth = (state: RootState) => state.auth.authentication;
export const selectStatus = (state: RootState) => state.auth.status;
export const selectRole = (state: RootState) => state.auth.role
export const selectIsVertified = (state: RootState) => state.auth.isVerified;
export const selectStudentList = (state: RootState) => state.auth.student_list

export default authSlice.reducer;