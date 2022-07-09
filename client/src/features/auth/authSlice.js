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
export const login = createAsyncThunk("auth/login", async (user, thunkAPI) => {
  try {
    return await authService.login(user)
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString()
    return thunkAPI.rejectWithValue(message)
  }
})

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
        state.currentUser = action.payload
      })
      .addCase(login.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
        state.currentUser = null
      })
  },
})

export const { reset, logout } = authSlice.actions
export default authSlice.reducer
