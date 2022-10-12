import { configureStore } from '@reduxjs/toolkit'
import tripsReducer from '../features/tripSlice'
import expensesReducer from '../features/expenseSlice'
import userReducer from '../features/userSlice'
export const store = configureStore({
  reducer: {
    tripsReducer,
    expensesReducer,
    userReducer
  },
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch