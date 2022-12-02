import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from './store';
import { createExerciseJson, createExerciseAPI, getExerciseAPI } from '../api/exerciseApi';
import { ExerciseObject } from '../common';

export interface DietState {
    status: 'idle' | 'pending' | 'failed';
    currentRequestId?: string
    exerciseList: ExerciseObject[]
}

const initialState: DietState = {
    status: 'idle',
    exerciseList: [],
    currentRequestId: undefined
};

// get the user infomation and config from the server and check the jwt token valid or not
export const createExercise = createAsyncThunk(
    'exercise/create',
    async (exerciseData: createExerciseJson) => {
        const response = await createExerciseAPI(exerciseData);
        return response.data;
    }
);

// export const deleteFood = createAsyncThunk(
//     'diet/delete',
//     async (toBeDelete: number) => {
//         const response = await deleteFoodAPI(toBeDelete);
//         return response.data;
//     }
// );


// export const updateFood = createAsyncThunk(
//     'diet/update',
//     async (foodData: updateFoodJson) => {
//         const response = await updateFoodAPI(foodData);
//         return response.data;
//     }
// )

export const getExercise = createAsyncThunk(
    'exercise/get',
    async () => {
        const response = await getExerciseAPI();
        return response.data;
    }
);

export const exerciseSlice = createSlice({
    name: 'diet',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(createExercise.pending, (state, action) => {
                state.status = 'pending';
                state.currentRequestId = action.meta.requestId
            })
            .addCase(createExercise.fulfilled, (state, action) => {
                const { requestId } = action.meta
                if (
                    state.status === 'pending' &&
                    state.currentRequestId === requestId
                ) {
                    state.status = 'idle';
                }

            })
            .addCase(createExercise.rejected, (state, action) => {
                const { requestId } = action.meta
                if (
                    state.status === 'pending' &&
                    state.currentRequestId === requestId
                ) {
                    state.status = 'failed';
                }
            })
            .addCase(getExercise.pending, (state, action) => {
                state.status = 'pending';
                state.currentRequestId = action.meta.requestId
            })
            .addCase(getExercise.fulfilled, (state, action) => {
                const { requestId } = action.meta
                if (
                    state.status === 'pending' &&
                    state.currentRequestId === requestId
                ) {
                    state.exerciseList = action.payload.exercise_list
                    state.status = 'idle';
                }

            })
            .addCase(getExercise.rejected, (state, action) => {
                const { requestId } = action.meta
                if (
                    state.status === 'pending' &&
                    state.currentRequestId === requestId
                ) {
                    state.status = 'failed';
                }
            })

            // .addCase(updateFood.pending, (state, action) => {
            //     state.status = 'pending';
            //     state.currentRequestId = action.meta.requestId
            // })
            // .addCase(updateFood.fulfilled, (state, action) => {
            //     const { requestId } = action.meta
            //     if (
            //         state.status === 'pending' &&
            //         state.currentRequestId === requestId
            //     ) {
            //         state.status = 'idle';
            //     }

            // })
            // .addCase(updateFood.rejected, (state, action) => {
            //     const { requestId } = action.meta
            //     if (
            //         state.status === 'pending' &&
            //         state.currentRequestId === requestId
            //     ) {
            //         state.status = 'failed';
            //     }
            // })

            // .addCase(deleteFood.pending, (state, action) => {
            //     state.status = 'pending';
            //     state.currentRequestId = action.meta.requestId
            // })
            // .addCase(deleteFood.fulfilled, (state, action) => {
            //     const { requestId } = action.meta
            //     if (
            //         state.status === 'pending' &&
            //         state.currentRequestId === requestId
            //     ) {
            //         state.status = 'idle';
            //     }

            // })
            // .addCase(deleteFood.rejected, (state, action) => {
            //     const { requestId } = action.meta
            //     if (
            //         state.status === 'pending' &&
            //         state.currentRequestId === requestId
            //     ) {
            //         state.status = 'failed';
            //     }
            // })
            
    },
});

// export const { setAuthentication, clearAuthentication, setUsername, setUserId } = authSlice.actions;
export const selectStatus = (state: RootState) => state.exercise.status
export const selectExerciseList = (state: RootState) => state.exercise.exerciseList

export default exerciseSlice.reducer;