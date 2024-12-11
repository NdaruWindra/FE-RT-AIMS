import { configureStore } from '@reduxjs/toolkit'
import user from './src/features/user/userSlice'
import history from './src/features/history/historySlice'
import { historySlice,  } from '@/features/history/historyThunk'
import { dataSlice } from '@/features/user/userThunk'

export const store = configureStore({
  reducer: {
    user,
    history,
    [dataSlice.reducerPath]:dataSlice.reducer,
    [historySlice.reducerPath]:historySlice.reducer
  },
  middleware:(getDefaultMiddleware)=>
    getDefaultMiddleware().concat(historySlice.middleware).concat(dataSlice.middleware)
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch
