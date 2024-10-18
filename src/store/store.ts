import { configureStore } from '@reduxjs/toolkit'
import ComponentsReducer from './slices/ComponentsSlice';
import BoardReducer from './slices/BoardSlice';
export const store = configureStore({
  reducer: {
    Components:ComponentsReducer,
    Board:BoardReducer
  },
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch