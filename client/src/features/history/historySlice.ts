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

  singleHistory: {
    id_history: '',
    fileName: '',
    title: '',
    createdAt: '',
    date: '',
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
    setResults: function (state, { payload }) {
      state.result.summary = payload.summary
      state.result.transcript = payload.transcript.segments
    },
    setHistory: function (state, { payload }) {
      state.allHistory = payload.data
      state.paginationHistory.totalPage = Math.ceil(payload.data.length / 10)
      state.showedHistory = payload.data.slice(
        state.paginationHistory.currentPage - 1,
        state.paginationHistory.pageSize
      )
    },
    setSearch: function (state, { payload }) {
      const histories = JSON.parse(JSON.stringify(state))

      const historySearch = histories.allHistory.filter((history: any) => {
        return history.title?.toLowerCase().includes(payload.toLowerCase())
      })

      state.paginationHistory.totalPage = Math.ceil(historySearch.length / 10)

      state.showedHistory = historySearch.slice(
        state.paginationHistory.currentPage - 1,
        state.paginationHistory.pageSize
      )
    },
    setIsLoading: function (state, { payload }) {
      state.isLoading = payload
    },
  },
})

export const {
  setCurrentPage,
  setResults,
  setIsLoading,
  setHistory,
  setSearch,
} = historySlice.actions

export default historySlice.reducer
