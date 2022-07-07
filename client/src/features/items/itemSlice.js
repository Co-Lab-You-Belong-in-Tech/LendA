import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import itemService from './itemService'


const initialState = {
    items: [],
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: ''

}

// Create new item
export const createItem = createAsyncThunk('items/create', async (itemData, thunkAPI) => {
    try {
        const token = thunkAPI.getState().auth.user.data.token
        return await itemService.createItem(itemData, token)
    } catch (error) {
        const message = 
        (error.response && 
            error.response.data && 
            error.response.data.message) || 
            error.message || 
            error.toString()
        return thunkAPI.rejectWithValue(message)
    }
})

// Get all items
export const getItems = createAsyncThunk('items/getAll', async (items, thunkAPI) => {
    try {
        // const token = thunkAPI.getState().auth.user.data.token
        return await itemService.getItems(items)
    } catch (error) {
        const message = 
        (error.response && 
            error.response.data && 
            error.response.data.message) || 
            error.message || 
            error.toString()
        return thunkAPI.rejectWithValue(message)
    }
})

export const itemSlice = createSlice({
    name: 'items',
    initialState,
    reducers: {
        reset: (state) => initialState
    },
    extraReducers: (builder) => {
        builder
            .addCase(createItem.pending, (state) => {
                state.isLoading = true
            })
            .addCase(createItem.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.items.push(action.payload)
            })
            .addCase(createItem.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
            })
            .addCase(getItems.pending, (state) => {
                state.isLoading = true
            })
            .addCase(getItems.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.items = action.payload
            })
            .addCase(getItems.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
            })

    }
})

export const { reset } = itemSlice.actions
export default itemSlice.reducer