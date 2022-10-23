import type { PayloadAction } from '@reduxjs/toolkit'
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import AsyncStorage from '@react-native-async-storage/async-storage'

export type TType = 'Travel' | 'Food' | 'Other'

export interface IExpense {
  id: string | number[]
  date: string
  time: string
  comment: string
  amount: number
  type: TType
  idTrip: string | number[]
  address: string
}

// Define a type for the slice state
interface ExpensesState {
  data: Array<IExpense>
}

// Define the initial state using that type
const initialState: ExpensesState = {
  data: [],
}

export const getAllExpensesByLocal = createAsyncThunk(
  'expenses/getAllExpensesByLocal',
  async () => {
    const response = await AsyncStorage.getItem('expenses')
    return response
  }
)


export const expenseSlice = createSlice({
  name: 'expenses',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    addExpense: (state, action: PayloadAction<IExpense>) => {
      state.data.push(action.payload)
    },
    deleteExpenses: (state, { payload }: PayloadAction<string | number[]>) => {
      let data = [...state.data].filter(expense => {
        return expense.idTrip != payload
      })
      AsyncStorage.setItem('expenses', JSON.stringify(data))
      state.data = data
    }
  },
  extraReducers: (builder) => {
    builder.addCase(getAllExpensesByLocal.fulfilled, (state, action) => {
      if (action.payload) {
        state.data = JSON.parse(action.payload)
      } else {
        AsyncStorage.setItem('expenses', JSON.stringify([]))
      }
    })
  }
})

export const { addExpense, deleteExpenses } = expenseSlice.actions
export default expenseSlice.reducer