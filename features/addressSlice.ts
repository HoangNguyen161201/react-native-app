import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import * as Location from 'expo-location'

export interface IAddress {
    address: string,
    location?: Location.LocationObject
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
        return {
            address: `${address[0].street}, ${address[0].country}, ${address[0].district}, ${address[0].streetNumber}`,
            location
        }
    }
)


export const addressSlice = createSlice({
    name: 'address',
    initialState,
    reducers: {

    },
    extraReducers: (builder) => {
        builder.addCase(getAddress.fulfilled, (state, { payload }) => {
            if (payload?.address) {
                state = {
                    ...state,
                    address: payload.address,
                    location: payload.location
                }
            }
        })
    }
})

export default addressSlice.reducer