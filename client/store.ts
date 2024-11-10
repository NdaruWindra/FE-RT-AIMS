import { configureStore } from '@reduxjs/toolkit'
import user from './src/features/user/userSlice'
import history from './src/features/history/historySlice'

export const store = configureStore({
  reducer: {
    user,
    history
  },
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch
