import { type IUserState } from '@/utils/type'
import { createSlice } from '@reduxjs/toolkit'
import {
  getLocalStorage,
  removeLocalStorage,
  setLocalStorage,
} from '@/utils/localStorage'

const initialState: IUserState = {
  allUser: [],
  id: '',
  username: '',
  email: '',
  role: '',
  accessToken: '',
  imageProfile: '',

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

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setMessage: function (state, { payload }) {
      state.message = payload.message
    },
    setProfile: function (state, { payload }) {
      state.accessToken = payload.data.accessToken
      state.refreshToken = payload.data.refreshToken
      setLocalStorage('refreshToken', payload.data.refreshToken)

      state.id = payload.data.id
      state.email = payload.data.email
      state.username = payload.data.username
      state.role = payload.data.role
      state.imageProfile = payload.data.imageProfile

      state.isAuthenticated = true
      state.isLoading = false
    },
    setIsLoading: function (state, { payload }) {
      state.isLoading = payload
    },
    setAllUsers: function (state, { payload }) {
      state.allUser = payload.data
      state.paginationUser.totalPage = payload.result
    },
    setRemoveProfile: function (state) {
      state.accessToken = ''
      state.id = ''
      state.email = ''
      state.username = ''
      state.refreshToken = ''

      removeLocalStorage('refreshToken')

      state.isAuthenticated = false
      state.isLoading = false
    },
    removeUser: function (state, { payload }) {
      // Menghapus user dari state.allUser berdasarkan id
      state.allUser = state.allUser.filter((user) => user.id !== payload)
    },
  },
})

export const {
  setMessage,
  setProfile,
  setIsLoading,
  setAllUsers,
  setRemoveProfile,
  removeUser,
} = userSlice.actions

export default userSlice.reducer
