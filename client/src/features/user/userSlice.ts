import { type IUserState } from '@/utils/type'
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import {
  refreshThunk,
  signinThunk,
  signoutThunk,
  signupThunk,
  getAllUserThunk,
} from './userThunk'
import {
  getLocalStorage,
  removeLocalStorage,
  setLocalStorage,
} from '@/utils/localStorage'
import { toast } from '@/components/ui/use-toast'

const initialState: IUserState = {
  allUser: [],
  id: '',
  username: '',
  email: '',
  role: '',
  accessToken: '',
  refreshToken: getLocalStorage('refreshToken'),
  message: {
    status: '',
    text: '',
  },

  paginationUser: {
    currentPage: 1,
    totalPage: 10,
  },

  isAuthenticated: false,
  isLoading: false,
}

// BASE FETCH
export const signup = createAsyncThunk('signupUser', signupThunk)
export const signin = createAsyncThunk('signinUser', signinThunk)
export const signout = createAsyncThunk('signoutUser', signoutThunk)
export const getRefreshTokenSlice = createAsyncThunk(
  'refreshToken',
  refreshThunk
)
export const getAllUser = createAsyncThunk('getAllUser', getAllUserThunk)

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setMessage: function (state, { payload }) {
      state.message = payload.message
    },
  },
  extraReducers(builder) {
    builder
      //! 1. SignUp
      .addCase(signup.pending, function (state) {
        state.isLoading = true
      })
      .addCase(signup.fulfilled, function (state, { payload }) {
        state.isLoading = false

        toast({
          title: 'Success',
          description: payload.message,
        })
      })
      .addCase(
        signup.rejected,
        function (state, { payload }: { payload: any }) {
          state.isLoading = false

          toast({
            title: 'Error',
            description: payload,
            variant: 'destructive',
          })
        }
      )

      //! 2. SignIn
      .addCase(signin.pending, function (state) {
        state.isLoading = true
      })
      .addCase(signin.fulfilled, function (state, { payload }) {
        state.accessToken = payload.data.accessToken
        state.refreshToken = payload.data.refreshToken
        setLocalStorage('refreshToken', payload.data.refreshToken)

        state.id = payload.data.id
        state.email = payload.data.email
        state.username = payload.data.username
        state.role = payload.data.role

        toast({
          title: 'Success',
          description: payload.message,
        })

        state.isAuthenticated = true
        state.isLoading = false
      })
      .addCase(
        signin.rejected,
        function (state, { payload }: { payload: any }) {
          toast({
            title: 'Error',
            description: payload,
            variant: 'destructive',
          })
          state.isLoading = false
        }
      )

      //! 3. SignOut
      .addCase(signout.pending, function (state) {
        state.isLoading = true
      })
      .addCase(signout.fulfilled, function (state, { payload }) {
        state.accessToken = ''
        state.id = ''
        state.email = ''
        state.username = ''

        removeLocalStorage('refreshToken')

        toast({ title: 'Success', description: payload.message })
        state.isAuthenticated = false
        state.isLoading = false
      })
      .addCase(
        signout.rejected,
        function (state, { payload }: { payload: any }) {
          toast({
            title: 'Error',
            description: payload,
            variant: 'destructive',
          })

          state.isLoading = false
        }
      )

      //! 4. Refresh Token
      .addCase(getRefreshTokenSlice.pending, function (state) {
        state.isLoading = true
      })
      .addCase(getRefreshTokenSlice.fulfilled, function (state, { payload }) {
        state.accessToken = payload.data.accessToken

        state.id = payload.data.id
        state.email = payload.data.email
        state.username = payload.data.username
        state.role = payload.data.role

        state.isAuthenticated = true
        state.isLoading = false
      })
      .addCase(getRefreshTokenSlice.rejected, function (state) {
        state.isLoading = false
      })

      //! 5. Get My History
      .addCase(getAllUser.pending, (state) => {
        state.isLoading = true
      })
      .addCase(
        getAllUser.fulfilled,
        (
          state,
          action: PayloadAction<{
            data: typeof initialState.allUser
            result: number
          }>
        ) => {
          state.allUser = action.payload.data
          state.paginationUser.totalPage = action.payload.result
          state.isLoading = false
        }
      )
      .addCase(getAllUser.rejected, (state) => {
        state.isLoading = false
      })
  },
})

export const { setMessage } = userSlice.actions

export default userSlice.reducer
