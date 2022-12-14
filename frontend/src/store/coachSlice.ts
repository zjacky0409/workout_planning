/*
    Redux to store the coach related data 
    and build some coach related api call
*/

import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { updateStudentAPI, updateStudentJson } from '../api/coachApi';
import { RootState } from './store';

export interface CoachState {
    status: 'idle' | 'pending' | 'failed';
    currentRequestId?: string
}

const initialState: CoachState = {
    status: 'idle',
    currentRequestId: undefined
};


// get the user infomation and config from the server and check the jwt token valid or not
export const updateStudent = createAsyncThunk(
    'coach/update_student',
    async (studentData: updateStudentJson) => {
        const response = await updateStudentAPI(studentData);
        return response.data;
    }
);


// export const getExercise = createAsyncThunk(
//     'exercise/get',
//     async (jsonData: getExerciseJson) => {
//         const response = await getExerciseAPI(jsonData);
//         return response.data;
//     }
// );

export const coachSlice = createSlice({
    name: 'coach',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            // .addCase(getExercise.pending, (state, action) => {
            //     state.status = 'pending';
            //     state.currentRequestId = action.meta.requestId
            // })
            // .addCase(getExercise.fulfilled, (state, action) => {
            //     const { requestId } = action.meta
            //     if (
            //         state.status === 'pending' &&
            //         state.currentRequestId === requestId
            //     ) {
            //         state.exerciseList = action.payload.exercise_list
            //         state.status = 'idle';
            //     }

            // })
            // .addCase(getExercise.rejected, (state, action) => {
            //     const { requestId } = action.meta
            //     if (
            //         state.status === 'pending' &&
            //         state.currentRequestId === requestId
            //     ) {
            //         state.status = 'failed';
            //     }
            // })
            .addCase(updateStudent.pending, (state, action) => {
                state.status = 'pending';
                state.currentRequestId = action.meta.requestId
            })
            .addCase(updateStudent.fulfilled, (state, action) => {
                const { requestId } = action.meta
                if (
                    state.status === 'pending' &&
                    state.currentRequestId === requestId
                ) {
                    state.status = 'idle';
                }

            })
            .addCase(updateStudent.rejected, (state, action) => {
                const { requestId } = action.meta
                if (
                    state.status === 'pending' &&
                    state.currentRequestId === requestId
                ) {
                    state.status = 'failed';
                }
            })
    },
});

// export const { setAuthentication, clearAuthentication, setUsername, setUserId } = authSlice.actions;
export const selectStatus = (state: RootState) => state.coach.status

export default coachSlice.reducer;