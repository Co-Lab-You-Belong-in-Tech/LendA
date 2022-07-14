/* eslint-disable no-param-reassign */
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import itemService from './itemService';

const initialState = {
  items: [],
  item: null,
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: '',
};

// Get all items
export const getItems = createAsyncThunk(
  'items/getAll',
  async (items, thunkAPI) => {
    try {
      return await itemService.getItems(items);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Create new item
export const createItem = createAsyncThunk(
  'items/create',
  async (itemData, thunkAPI) => {
    try {
      const { token } = thunkAPI.getState().auth.currentUser;
      return await itemService.createItem(itemData, token);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Get a single item via id
export const getItem = createAsyncThunk(
  'items/getItem',
  async (id, thunkAPI) => {
    try {
      return await itemService.getItem(id);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// update item
export const updateItem = createAsyncThunk(
  'items/updateItem',
  async (id, itemData, thunkAPI) => {
    try {
      const { token } = thunkAPI.getState().auth.currentUser;
      return await itemService.updateItem(id, itemData, token);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// delete item
export const deleteItem = createAsyncThunk(
  'items/deleteItem',
  async (id, thunkAPI) => {
    try {
      const { token } = thunkAPI.getState().auth.currentUser;
      return await itemService.updateItem(id, token);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const itemSlice = createSlice({
  name: 'items',
  initialState,
  reducers: {
    reset: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder

      // Get Items
      .addCase(getItems.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getItems.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.items = action.payload.data;
      })
      .addCase(getItems.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload.message;
      })

      // Create Item
      .addCase(createItem.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createItem.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.item = action.payload.data;
      })
      .addCase(createItem.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload.message;
      })

      // Get Item
      .addCase(getItem.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getItem.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.item = action.payload.data;
      })
      .addCase(getItem.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload.message;
      })

      // Update Item
      .addCase(updateItem.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateItem.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.item = action.payload.data;
      })
      .addCase(updateItem.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload.message;
      })

      // Delete Item
      .addCase(deleteItem.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteItem.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.item = action.payload.data;
      })
      .addCase(deleteItem.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload.message;
      });
  },
});

export const { reset } = itemSlice.actions;
export default itemSlice.reducer;
