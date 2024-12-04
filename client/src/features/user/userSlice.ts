import { type IUserState } from '@/utils/type'
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import {
  googleStartThunk,
  googleCallbackThunk,
  refreshThunk,
  signinThunk,
  signoutThunk,
  signupThunk,
  getAllUserThunk,
  updateThunk,
  deleteUserThunk,
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
export const googleStart = createAsyncThunk('googleStart', googleStartThunk) // Thunk baru
export const googleCallback = createAsyncThunk('googleCallback', googleCallbackThunk) // Thunk baru
export const signup = createAsyncThunk('signupUser', signupThunk)
export const signin = createAsyncThunk('signinUser', signinThunk)
export const signout = createAsyncThunk('signoutUser', signoutThunk)
export const getRefreshTokenSlice = createAsyncThunk(
  'refreshToken',
  refreshThunk
)
export const getAllUser = createAsyncThunk('getAllUser', getAllUserThunk)
export const updateUser = createAsyncThunk('updateUser', updateThunk)
export const deleteUser = createAsyncThunk('deleteUser', deleteUserThunk);

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setMessage: function (state, { payload }) {
      state.message = payload.message
    },
  },
  extraReducers(builder) {
    // Google Start
    builder.addCase(googleStart.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(googleStart.fulfilled, (_state, { payload }) => {
      window.location.href = payload.data.url; // Redirect to Google Auth URL
    });
    builder.addCase(googleStart.rejected, (state, { payload }: { payload: any }) => {
      state.isLoading = false;
      toast({
        title: 'Google Start Error',
        description: payload?.message || 'Failed to start Google authentication',
        variant: 'destructive',
      });
    });

    // Google Callback
    builder.addCase(googleCallback.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(googleCallback.fulfilled, (state, { payload }) => {
      state.accessToken = payload.data.accessToken;
      state.refreshToken = payload.data.refreshToken;
      setLocalStorage('refreshToken', payload.data.refreshToken);

      state.id = payload.data.id;
      state.email = payload.data.email;
      state.username = payload.data.username;
      state.role = payload.data.role;

      toast({
        title: 'Google Sign-In Success',
        description: payload.message,
      });

      state.isAuthenticated = true;
      state.isLoading = false;
    });
    builder.addCase(googleCallback.rejected, (state, { payload }: { payload: any }) => {
      state.isLoading = false;
      toast({
        title: 'Google Callback Error',
        description: payload?.message || 'Google authentication failed',
        variant: 'destructive',
      });
    });
    

    // Regular Sign-Up
    builder.addCase(signup.pending, (state) => {
      state.isLoading = true
    })
    builder.addCase(signup.fulfilled, (state, { payload }) => {
      state.isLoading = false
      toast({
        title: 'Success',
        description: payload.message,
      })
    })
    builder.addCase(
      signup.rejected,
      (state, { payload }: { payload: any }) => {
        state.isLoading = false
        toast({
          title: 'Error',
          description: payload,
          variant: 'destructive',
        })
      }
    )

    // Regular Sign-In
    builder.addCase(signin.pending, (state) => {
      state.isLoading = true
    })
    builder.addCase(signin.fulfilled, (state, { payload }) => {
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
    builder.addCase(
      signin.rejected,
      (state, { payload }: { payload: any }) => {
        toast({
          title: 'Error',
          description: payload,
          variant: 'destructive',
        })
        state.isLoading = false
      }
    )

    // Sign-Out
    builder.addCase(signout.pending, (state) => {
      state.isLoading = true
    })
    builder.addCase(signout.fulfilled, (state, { payload }) => {
      state.accessToken = ''
      state.id = ''
      state.email = ''
      state.username = ''
      removeLocalStorage('refreshToken')

      toast({ title: 'Success', description: payload.message })
      state.isAuthenticated = false
      state.isLoading = false
    })
    builder.addCase(
      signout.rejected,
      (state, { payload }: { payload: any }) => {
        toast({
          title: 'Error',
          description: payload,
          variant: 'destructive',
        })

        state.isLoading = false
      }
    )

    // Refresh Token
    builder.addCase(getRefreshTokenSlice.pending, (state) => {
      state.isLoading = true
    })
    builder.addCase(getRefreshTokenSlice.fulfilled, (state, { payload }) => {
      state.accessToken = payload.data.accessToken

      state.id = payload.data.id
      state.email = payload.data.email
      state.username = payload.data.username
      state.role = payload.data.role

      state.isAuthenticated = true
      state.isLoading = false
    })
    builder.addCase(getRefreshTokenSlice.rejected, (state) => {
      state.isLoading = false
    })

    // Get All User
    builder.addCase(getAllUser.pending, (state) => {
      state.isLoading = true
    })
    builder.addCase(
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
    builder.addCase(getAllUser.rejected, (state) => {
      state.isLoading = false
    })

    // Update User
    builder.addCase(updateUser.fulfilled, (state, { payload }) => {
      state.isLoading = false;

      // Update username and email
      if (payload.data) {
        state.username = payload.data.username || state.username;
        state.email = payload.data.newEmail || state.email; // Update to new email
      }

      state.message.status = 'Success';
      state.message.text = payload.message || 'User updated successfully';
    })

    //! delete user admin
    builder.addCase(deleteUser.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(deleteUser.fulfilled, (state, { payload }) => {
      state.allUser = state.allUser.filter((user) => user.id !== payload.id);
      state.isLoading = false;
    });
    builder.addCase(deleteUser.rejected, (state, { payload }: { payload: any }) => {
      state.isLoading = false;
      toast({
        title: 'Error',
        description: payload || 'Failed to delete user',
        variant: 'destructive',
      });
    });
    
  },
})

export const { setMessage } = userSlice.actions

export default userSlice.reducer
