import { type IHistoryState } from '@/utils/type'
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { getMyHistoryThunk, getAllThunk, uploadNewAudioThunk } from './historyThunk'

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
export const getMyHistory = createAsyncThunk('getMyHistory', getMyHistoryThunk)
export const getAllHistory = createAsyncThunk('getAllHistory', getAllThunk)
export const uploadAudio = createAsyncThunk(
  'uploadNewAudio',
  uploadNewAudioThunk
)

export const historySlice = createSlice({
  name: 'history',
  initialState,
  reducers: {
    setCurrentPage: (state, action: PayloadAction<number>) => {
      state.paginationHistory.currentPage = action.payload
    },
  },
  extraReducers(builder) {
    builder
      // Get My History
      .addCase(getMyHistory.pending, (state) => {
        state.isLoading = true

      })
      .addCase(getMyHistory.fulfilled, (state, action: PayloadAction<{ data: typeof initialState.allHistory, result: number }>) => {
        state.allHistory = action.payload.data
        state.paginationHistory.totalPage = action.payload.result
        state.isLoading = false

      })
      .addCase(getMyHistory.rejected, (state, action) => {
        state.isLoading = false

      })
      
      // Get My History
      .addCase(getAllHistory.pending, (state) => {
        state.isLoading = true

      })
      .addCase(getAllHistory.fulfilled, (state, action: PayloadAction<{ data: typeof initialState.allHistory, result: number }>) => {
        state.allHistory = action.payload.data
        state.paginationHistory.totalPage = action.payload.result
        state.isLoading = false

      })
      .addCase(getAllHistory.rejected, (state, action) => {
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
