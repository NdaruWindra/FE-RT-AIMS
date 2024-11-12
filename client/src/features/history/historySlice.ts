import { type IHistoryState } from '@/utils/type'
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { getMyHistoryThunk, uploadNewAudioThunk } from './historyThunk'

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
export const uploadAudio = createAsyncThunk(
  'uploadNewAudio',
  uploadNewAudioThunk
)

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

      //Upload new audio
      .addCase(uploadAudio.pending, function (state) {
        state.isLoading = true
      })
      .addCase(uploadAudio.fulfilled, function (state, { payload }) {
        state.result.summary = payload.summary
        state.result.transcript  = payload.transcript  

        state.isLoading = false
      })
      .addCase(uploadAudio.rejected, function (state) {
        state.isLoading = false
      })
  },
})

export const { setCurrentPage } = historySlice.actions

export default historySlice.reducer
