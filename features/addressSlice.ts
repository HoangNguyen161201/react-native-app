import type { PayloadAction } from '@reduxjs/toolkit'
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import * as Location from 'expo-location'
import AsyncStorage from '@react-native-async-storage/async-storage'

export interface IAddress {
    address: string
}

// Define the initial state using that type
const initialState: IAddress = {
    address: ""
}

export const getAddress = createAsyncThunk(
    'address/getAddress',
    async () => {

        let { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== "granted") {
            console.log('error roi nha')
            return
        }

        let location = await Location.getCurrentPositionAsync({})
        const address = await Location.reverseGeocodeAsync(location.coords)
        console.log(address)
        return address[0].name
    }
)


export const addressSlice = createSlice({
    name: 'address',
    // `createSlice` will infer the state type from the `initialState` argument
    initialState,
    reducers: {
      
    },
    extraReducers: (builder) => {
        builder.addCase(getAddress.fulfilled, (state, action) => {
            if (action.payload) {
                state.address = action.payload
            }
        })
    }
})

export default addressSlice.reducer