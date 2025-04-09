import { configureStore } from '@reduxjs/toolkit'
import ComponentsReducer from './slices/ComponentsSlice';
import BoardReducer from './slices/BoardSlice';
import indexedDBSyncMiddleware from '../Middleware/indexedDBsyncMiddleware';
export const store = configureStore({
  reducer: {
    Components:ComponentsReducer,
    Board:BoardReducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(indexedDBSyncMiddleware),
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch