import { type IHistoryState } from '@/utils/type'
import { createSlice } from '@reduxjs/toolkit'

const initialState: IHistoryState = {
  allHistory: [],

  showedHistory: [],

  paginationHistory: {
    currentPage: 1,
    totalPage: 10,
    pageSize: 10,
  },

  filterBy: 'A-Z',

  singleHistory: {
    id: '',
    id_users: '',
    id_history: '',
    fileName: '',
    title: '',
    createdAt: '',
    result: {
      id_result: '',
      transcript: [],
      summary: '',
    },
  },

  result: {
    id_result: '',
    transcript: [],
    summary: '',
  },

  message: {
    status: '',
    text: '',
  },

  isLoading: false,
}

export const historySlice = createSlice({
  name: 'history',
  initialState,
  reducers: {
    setCurrentPage: (state, { payload }) => {
      state.paginationHistory.currentPage = payload

      const startIndex = (payload - 1) * state.paginationHistory.pageSize
      const endIndex = startIndex + state.paginationHistory.pageSize

      state.showedHistory = state.allHistory.slice(startIndex, endIndex)
    },
    setResults: (state, { payload }) => {
      state.result.summary = payload.summary
      state.result.transcript = payload.transcript.segments
    },
    setHistory: (state, { payload }) => {
      state.allHistory = payload.data
      state.paginationHistory.totalPage = Math.ceil(payload.data.length / 10)
      state.showedHistory = payload.data.slice(
        (state.paginationHistory.currentPage - 1) * state.paginationHistory.pageSize,
        state.paginationHistory.pageSize
      )
    },
    setSingleHistory: (state, { payload }) => {
      state.singleHistory.id = payload.id_history
      state.singleHistory.id_users = payload.id_users
      state.singleHistory.fileName = payload.fileName
      state.singleHistory.title = payload.title
      state.singleHistory.createdAt = payload.createdAt
      state.singleHistory.result.id_result = payload.result.id_result
      state.singleHistory.result.summary = payload.result.summary
      state.singleHistory.result.transcript = payload.result.transcript.split('-')
    },
    setSearch: (state, { payload }) => {
      const histories = JSON.parse(JSON.stringify(state))

      const historySearch = histories.allHistory.filter((history: any) => {
        return history.title?.toLowerCase().includes(payload.toLowerCase())
      })

      state.paginationHistory.totalPage = Math.ceil(historySearch.length / 10)

      state.showedHistory = historySearch.slice(
        (state.paginationHistory.currentPage - 1) * state.paginationHistory.pageSize,
        state.paginationHistory.pageSize
      )
    },
    setIsLoading: (state, { payload }) => {
      state.isLoading = payload
    },
    setFilter: (state, { payload }) => {
      state.filterBy = payload

      const histories = [...state.allHistory]

      switch (payload) {
        case 'A-Z':
          histories.sort((a, b) => a.title.localeCompare(b.title))
          break

        case 'Z-A':
          histories.sort((a, b) => b.title.localeCompare(a.title))
          break

        case 'NEWEST':
          histories.sort(
            (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
          )
          break

        case 'LATEST':
          histories.sort(
            (a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
          )
          break

        default:
          break
      }

      const startIndex =
        (state.paginationHistory.currentPage - 1) *
        state.paginationHistory.pageSize
      const endIndex = startIndex + state.paginationHistory.pageSize

      state.showedHistory = histories.slice(startIndex, endIndex)
    },
  },
})

export const {
  setCurrentPage,
  setResults,
  setIsLoading,
  setHistory,
  setSingleHistory,
  setSearch,
  setFilter,
} = historySlice.actions

export default historySlice.reducer
