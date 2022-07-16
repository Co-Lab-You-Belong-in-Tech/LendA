import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import authService from "./authService"

// Get user from localStorage
const currentUser = JSON.parse(localStorage.getItem("currentUser"))

const initialState = {
  currentUser: currentUser ? currentUser : null,
  user: null,
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
}

// Register user
export const register = createAsyncThunk(
  "auth/register",
  async (user, thunkAPI) => {
    try {
      return await authService.register(user)
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString()
      return thunkAPI.rejectWithValue(message)
    }
  }
)

// Login user
export const login = createAsyncThunk(
  "auth/login",
  async (currentUser, thunkAPI) => {
    try {
      return await authService.login(currentUser)
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString()
      return thunkAPI.rejectWithValue(message)
    }
  }
)

// Get User
export const getUser = createAsyncThunk(
  "auth/getUser",
  async (id, thunkAPI) => {
    try {
      return await authService.getUser(id)
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString()
      return thunkAPI.rejectWithValue(message)
    }
  }
)

// Update User
export const updateUser = createAsyncThunk(
  "auth/updateUser",
  async (id, userData, thunkAPI) => {
    try {
      const token = thunkAPI.getItem().auth.currentUser.token
      return await authService.updateUser(id, userData, token)
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString()
      return thunkAPI.rejectWithValue(message)
    }
  }
)

// delete user
export const deleteUser = createAsyncThunk(
  "auth/deleteUser",
  async (id, thunkAPI) => {
    try {
      const token = thunkAPI.getItem().auth.currentUser.token
      return await authService.updateUser(id, token)
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString()
      return thunkAPI.rejectWithValue(message)
    }
  }
)

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    reset: (state) => {
      state.isLoading = false
      state.isError = false
      state.message = ""
    },
    logout: (state) => {
      localStorage.removeItem("user")
      state.currentUser = null
    },
  },
  extraReducers: (builder) => {
    builder

      // Register User
      .addCase(register.pending, (state) => {
        state.isLoading = true
      })
      .addCase(register.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.currentUser = action.payload.data
      })
      .addCase(register.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload.message
        state.currentUser = null
      })

      // Login User
      .addCase(login.pending, (state) => {
        state.isLoading = true
      })
      .addCase(login.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.currentUser = action.payload.data
      })
      .addCase(login.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload.message
        state.currentUser = null
      })

      // Get User
      .addCase(getUser.pending, (state) => {
        state.isLoading = true
      })
      .addCase(getUser.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.user = action.payload.data
      })
      .addCase(getUser.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload.message
      })

      // Update User
      .addCase(updateUser.pending, (state) => {
        state.isLoading = true
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.currentUser = action.payload.data
      })
      .addCase(updateUser.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload.message
        state.currentUser = null
      })

      // delete User
      .addCase(deleteUser.pending, (state) => {
        state.isLoading = true
      })
      .addCase(deleteUser.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.currentUser = action.payload.data
      })
      .addCase(deleteUser.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload.message
        state.currentUser = null
      })
  },
})

export const { reset, logout } = authSlice.actions
export default authSlice.reducer
