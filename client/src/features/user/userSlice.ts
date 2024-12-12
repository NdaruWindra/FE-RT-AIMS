import { type IUserState } from '@/utils/type'
import { createSlice } from '@reduxjs/toolkit'
import {
  getLocalStorage,
  removeLocalStorage,
  setLocalStorage,
} from '@/utils/localStorage'

const initialState: IUserState = {
  allUser: [],
  displayedUsers: [],
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
    pageSize: 10,
  },

  filterBy: 'A-Z',
  isAuthenticated: false,
  isLoading: false,
}

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

      state.isAuthenticated = true
      state.isLoading = false
    },
    setIsLoading: function (state, { payload }) {
      state.isLoading = payload
    },
    setAllUsers: function (state, { payload }) {
      state.allUser = payload.data
      state.paginationUser.totalPage = Math.ceil(payload.data.length / state.paginationUser.pageSize)
      state.paginationUser.currentPage = 1
      const startIndex = 0
      const endIndex = state.paginationUser.pageSize
      state.displayedUsers = state.allUser.slice(startIndex, endIndex)
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
      state.allUser = state.allUser.filter(user => user.id !== payload)
      state.paginationUser.totalPage = Math.ceil(state.allUser.length / state.paginationUser.pageSize)
      const startIndex = (state.paginationUser.currentPage - 1) * state.paginationUser.pageSize
      const endIndex = startIndex + state.paginationUser.pageSize
      state.displayedUsers = state.allUser.slice(startIndex, endIndex)
    },
    setCurrentPage: (state, { payload }) => {
      state.paginationUser.currentPage = payload

      const startIndex = (payload - 1) * state.paginationUser.pageSize
      const endIndex = startIndex + state.paginationUser.pageSize

      state.displayedUsers = state.allUser.slice(startIndex, endIndex)
    },
    setSearch: (state, { payload }) => {
      const userSearch = state.allUser.filter(user =>
        user.username?.toLowerCase().includes(payload.toLowerCase())
      )

      state.paginationUser.totalPage = Math.ceil(userSearch.length / state.paginationUser.pageSize)

      const startIndex = (state.paginationUser.currentPage - 1) * state.paginationUser.pageSize
      const endIndex = startIndex + state.paginationUser.pageSize

      state.displayedUsers = userSearch.slice(startIndex, endIndex)
    },
    setFilter: (state, { payload }) => {
      state.filterBy = payload

      const users = [...state.allUser]

      switch (payload) {
        case 'A-Z':
          users.sort((a, b) => a.username.localeCompare(b.username))
          break

        case 'Z-A':
          users.sort((a, b) => b.username.localeCompare(a.username))
          break

        default:
          break
      }

      const startIndex = (state.paginationUser.currentPage - 1) * state.paginationUser.pageSize
      const endIndex = startIndex + state.paginationUser.pageSize

      state.displayedUsers = users.slice(startIndex, endIndex)
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
  setCurrentPage,
  setSearch,
  setFilter,
} = userSlice.actions

export default userSlice.reducer
