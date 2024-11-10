import { type IHistoryState } from '@/utils/type'
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { getMyHistoryThunk } from './historyThunk'

const initialState: IHistoryState = {
  allHistory: [],

  paginationHistory: {
    currentPage: 1,
    totalPage: 10,
  },

  singleHistory: {
    id_history: '',
    fileName: '',
    title: '',
    createdAt: '',
  },

  result: {
    id_result: '',
    transcript: '',
    summary: '',
  },

  message: {
    status: '',
    text: '',
  },

  isLoading: false,
}

// BASE FETCH
export const getMyHistory = createAsyncThunk('getMyHistroy', getMyHistoryThunk)

export const historySlice = createSlice({
  name: 'history',
  initialState,
  reducers: {
    setCurrentPage: (state, { payload }) => {
      state.paginationHistory.currentPage = payload
    },
  },
  extraReducers(builder) {
    builder
      //Get My History
      .addCase(getMyHistory.pending, function (state) {
        state.isLoading = true
      })
      .addCase(getMyHistory.fulfilled, function (state, { payload }) {
        state.allHistory = payload.data
        state.paginationHistory.totalPage = payload.result

        state.isLoading = false
      })
      .addCase(getMyHistory.rejected, function (state) {
        state.isLoading = false
      })
  },
})

export const { setCurrentPage } = historySlice.actions

export default historySlice.reducer
