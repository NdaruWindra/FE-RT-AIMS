import { type IHistoryState } from '@/utils/type'
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import {
  getMyHistoryThunk,
  getAllThunk,
  uploadNewAudioThunk,
  createNewHistoryThunk,
} from './historyThunk'
import { toast } from '@/components/ui/use-toast'

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
    date: ''
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

// BASE FETCH
export const getMyHistory = createAsyncThunk('getMyHistory', getMyHistoryThunk)
export const getAllHistory = createAsyncThunk('getAllHistory', getAllThunk)
export const uploadAudio = createAsyncThunk(
  'uploadNewAudio',
  uploadNewAudioThunk
)

export const createNewHistory = createAsyncThunk(
  'createNewHistory',
  createNewHistoryThunk
)

export const historySlice = createSlice({
  name: 'history',
  initialState,
  reducers: {
    setCurrentPage: function (state, action: PayloadAction<number>) {
      state.paginationHistory.currentPage = action.payload
    },
    setResults: function (state, { payload }) {
      state.result.summary = payload.summary
      state.result.transcript = payload.transcript
    },
    setIsLoading: function (state, { payload }) {
      state.isLoading = payload
    },
  },
  extraReducers(builder) {
    builder
      // Get My History
      .addCase(getMyHistory.pending, function (state) {
        state.isLoading = true
      })
      .addCase(
        getMyHistory.fulfilled,
        (
          state,
          action: PayloadAction<{
            data: typeof initialState.allHistory
            result: number
          }>
        ) => {
          state.allHistory = action.payload.data
          state.paginationHistory.totalPage = action.payload.result
          state.isLoading = false
        }
      )
      .addCase(getMyHistory.rejected, function (state) {
        state.isLoading = false
      })

      // Get My History
      .addCase(getAllHistory.pending, function (state) {
        state.isLoading = true
      })
      .addCase(
        getAllHistory.fulfilled,
        function (
          state,
          action: PayloadAction<{
            data: typeof initialState.allHistory
            result: number
          }>
        ) {
          state.allHistory = action.payload.data
          state.paginationHistory.totalPage = action.payload.result
          state.isLoading = false
        }
      )
      .addCase(getAllHistory.rejected, function (state) {
        state.isLoading = false
      })

      //Upload new audio
      .addCase(uploadAudio.pending, function (state) {
        state.isLoading = true
      })
      .addCase(uploadAudio.fulfilled, function (state, { payload }) {
        state.result.summary = payload.summary
        state.result.transcript = payload.transcript.segments

        state.isLoading = false
      })
      .addCase(uploadAudio.rejected, function (state) {
        state.isLoading = false
      })

      //Create New History
      .addCase(createNewHistory.pending, function (state) {
        state.isLoading = true
      })
      .addCase(createNewHistory.fulfilled, function (state, { payload }) {
        state.isLoading = false

        toast({ title: 'Success', description: payload.message })
      })
      .addCase(
        createNewHistory.rejected,
        function (state, { payload }: { payload: any }) {
          toast({
            title: 'Error',
            description: payload,
            variant: 'destructive',
          })
          state.isLoading = false
        }
      )
  },
})

export const { setCurrentPage, setResults, setIsLoading } = historySlice.actions

export default historySlice.reducer
