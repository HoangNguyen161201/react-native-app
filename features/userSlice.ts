import type { PayloadAction } from '@reduxjs/toolkit'
import { createSlice } from '@reduxjs/toolkit'

export type TType = 'Travel' | 'Food' | 'Other'

export interface IUser {
  email?: string
  password?: string
}

interface IUserState {
  infoUser: IUser,
  isLogin: boolean
}

// Define the initial state using that type
const initialState: IUserState = {
  isLogin: false,
  infoUser: {

  }
}

export const userSlice = createSlice({
  name: 'user',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    login: (state, {payload}: PayloadAction<IUser>) => {
      state.infoUser = payload
      state.isLogin = true 
    },
   
  },
})

export const { login } = userSlice.actions
export default userSlice.reducer