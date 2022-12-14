/*
    Redux to store the diet related data 
    and build some diet related api call
*/


import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { RootState } from './store';
import { createFoodAPI, getFoodListAPI, updateFoodAPI, deleteFoodAPI } from '../api/dietApi';
import { createFoodJson } from '../api/dietApi';
import { updateFoodJson } from '../api/dietApi';
import { FoodObject } from '../common';
export interface DietState {
    status: 'idle' | 'pending' | 'failed';
    currentRequestId?: string
    foodList: FoodObject[]
}

const initialState: DietState = {
    status: 'idle',
    foodList: [],
    currentRequestId: undefined
};

// get the user infomation and config from the server and check the jwt token valid or not
export const createFood = createAsyncThunk(
    'diet/create',
    async (foodData: createFoodJson) => {
        const response = await createFoodAPI(foodData);
        return response.data;
    }
);

export const deleteFood = createAsyncThunk(
    'diet/delete',
    async (toBeDelete: number) => {
        const response = await deleteFoodAPI(toBeDelete);
        return response.data;
    }
);


export const updateFood = createAsyncThunk(
    'diet/update',
    async (foodData: updateFoodJson) => {
        const response = await updateFoodAPI(foodData);
        return response.data;
    }
)

export const getFood = createAsyncThunk(
    'diet/get',
    async () => {
        const response = await getFoodListAPI();
        return response.data;
    }
);

export const dietSlice = createSlice({
    name: 'diet',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(createFood.pending, (state, action) => {
                state.status = 'pending';
                state.currentRequestId = action.meta.requestId
            })
            .addCase(createFood.fulfilled, (state, action) => {
                const { requestId } = action.meta
                if (
                    state.status === 'pending' &&
                    state.currentRequestId === requestId
                ) {
                    state.status = 'idle';
                }

            })
            .addCase(createFood.rejected, (state, action) => {
                const { requestId } = action.meta
                if (
                    state.status === 'pending' &&
                    state.currentRequestId === requestId
                ) {
                    state.status = 'failed';
                }
            })
            .addCase(getFood.pending, (state, action) => {
                state.status = 'pending';
                state.currentRequestId = action.meta.requestId
            })
            .addCase(getFood.fulfilled, (state, action) => {
                const { requestId } = action.meta
                if (
                    state.status === 'pending' &&
                    state.currentRequestId === requestId
                ) {
                    state.foodList = action.payload.food_list
                    state.status = 'idle';
                }

            })
            .addCase(getFood.rejected, (state, action) => {
                const { requestId } = action.meta
                if (
                    state.status === 'pending' &&
                    state.currentRequestId === requestId
                ) {
                    state.status = 'failed';
                }
            })

            .addCase(updateFood.pending, (state, action) => {
                state.status = 'pending';
                state.currentRequestId = action.meta.requestId
            })
            .addCase(updateFood.fulfilled, (state, action) => {
                const { requestId } = action.meta
                if (
                    state.status === 'pending' &&
                    state.currentRequestId === requestId
                ) {
                    state.status = 'idle';
                }

            })
            .addCase(updateFood.rejected, (state, action) => {
                const { requestId } = action.meta
                if (
                    state.status === 'pending' &&
                    state.currentRequestId === requestId
                ) {
                    state.status = 'failed';
                }
            })

            .addCase(deleteFood.pending, (state, action) => {
                state.status = 'pending';
                state.currentRequestId = action.meta.requestId
            })
            .addCase(deleteFood.fulfilled, (state, action) => {
                const { requestId } = action.meta
                if (
                    state.status === 'pending' &&
                    state.currentRequestId === requestId
                ) {
                    state.status = 'idle';
                }

            })
            .addCase(deleteFood.rejected, (state, action) => {
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
export const selectStatus = (state: RootState) => state.diet.status
export const selectFoodList = (state: RootState) => state.diet.foodList

export default dietSlice.reducer;