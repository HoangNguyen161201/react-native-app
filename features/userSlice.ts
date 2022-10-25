import AsyncStorage from "@react-native-async-storage/async-storage"
import { createAsyncThunk, PayloadAction } from "@reduxjs/toolkit"
import { createSlice } from "@reduxjs/toolkit"

export type TType = "Travel" | "Food" | "Other"

export interface IUser {
    email: string
    password?: string
    name?: string
    job?: string
    address?: string
    phone?: string
    facebook?: string
    id?: string
    avatar?: string
}

interface IUserState {
    infoUser?: IUser
    isLogin: boolean
}

// Define the initial state using that type
const initialState: IUserState = {
    isLogin: false,
}

export const getUserInfoByLocal = createAsyncThunk(
    "user/getUserInfo",
    async () => {
        const response = await AsyncStorage.getItem("user")
        return response
    }
)

export const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        loginAccount: (state, { payload }: PayloadAction<IUser>) => {
            state.infoUser = payload
            state.isLogin = true
            AsyncStorage.setItem("user", JSON.stringify(state.infoUser))
        },
        logOutAccount: (state, _: PayloadAction<undefined>) => {
            state.infoUser = {
                email: "",
            }
            state.isLogin = false
            AsyncStorage.clear()
        },
        updateProfile: (state, { payload }: PayloadAction<IUser>) => {
            state.infoUser = {
                ...state.infoUser,
                ...payload,
            }
            AsyncStorage.setItem("user", JSON.stringify(state.infoUser))
        },
    },
    extraReducers: (builder) => {
        builder.addCase(getUserInfoByLocal.fulfilled, (state, action) => {
          if(action.payload) {

            state.infoUser = {...state.infoUser, ...JSON.parse(action.payload)}
          }
        })
    },
})

export const { loginAccount, logOutAccount, updateProfile } = userSlice.actions
export default userSlice.reducer
