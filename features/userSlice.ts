import type { PayloadAction } from '@reduxjs/toolkit'
import { createSlice } from '@reduxjs/toolkit'

export type TType = 'Travel' | 'Food' | 'Other'

export interface IUser {
  email: string
  password?: string
  name?: string
  job?: string
  address?: string
  phone?: string
  facebook?: string
}

interface IUserState {
  infoUser?: IUser,
  isLogin: boolean
}

// Define the initial state using that type
const initialState: IUserState = {
  isLogin: false,
}

export const userSlice = createSlice({
  name: 'user',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    loginAccount: (state, { payload }: PayloadAction<IUser>) => {
      state.infoUser = payload
      state.isLogin = true
    },
    logOutAccount: (state, _: PayloadAction<undefined>) => {
      state.infoUser = {
        email: ''
      }
      state.isLogin = false
    }

  },
})

export const { loginAccount, logOutAccount } = userSlice.actions
export default userSlice.reducer