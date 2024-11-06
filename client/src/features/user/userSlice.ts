import { type IUserState } from '@/utils/type'
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { signinThunk, signupThunk } from './userThunk'

const initialState: IUserState = {
  id: 0,
  uuid: '',
  username: '',
  email: '',
  password: '',
  role: '',
  accessToken: '',
  id_history: '',
  isLoading: false,
}

// BASE FETCH
export const signup = createAsyncThunk('signupUser', signupThunk)
export const signin = createAsyncThunk('signinUser', signinThunk)

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    incrementByAmount: (state, action: PayloadAction) => {},
  },
  extraReducers(builder) {
    builder
      //SignUp
      .addCase(signup.pending, function (state) {
        state.isLoading = true
      })
      .addCase(signup.fulfilled, function (state) {
        state.isLoading = false
      })
      .addCase(signup.rejected, function (state) {
        state.isLoading = false
      })

      //SignIn
      .addCase(signin.pending, function (state) {
        state.isLoading = true
      })
      .addCase(signin.fulfilled, function (state) {
        state.isLoading = false
      })
      .addCase(signin.rejected, function (state) {
        state.isLoading = false
      })
  },
})

// Action creators are generated for each case reducer function
export const { incrementByAmount } = userSlice.actions

export default userSlice.reducer
