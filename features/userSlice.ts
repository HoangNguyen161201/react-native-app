import AsyncStorage from "@react-native-async-storage/async-storage"
import { createAsyncThunk, PayloadAction } from "@reduxjs/toolkit"
import { createSlice } from "@reduxjs/toolkit"
import { User } from "../utils/interfaces"

interface UserState {
    infoUser?: User
    isLogin: boolean
}

const initialState: UserState = {
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
        loginAccount: (state, { payload }: PayloadAction<User>) => {
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
        updateProfile: (state, { payload }: PayloadAction<User>) => {
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
