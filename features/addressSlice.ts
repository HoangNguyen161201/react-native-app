import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import * as Location from 'expo-location'
import { Address } from '../utils/interfaces';

const initialState: Address = {
    address: ""
}

export const getAddress = createAsyncThunk(
    'address/getAddress',
    async () => {

        let { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== "granted") {
            return
        }

        let location = await Location.getCurrentPositionAsync({})
        const data = await Location.reverseGeocodeAsync(location.coords)
        let address = `${data[0].city} city, ${data[0].country}, ${data[0].region} region, ${data[0].street} street`
        return address
    }
)


export const addressSlice = createSlice({
    name: 'address',
    initialState,
    reducers: {

    },
    extraReducers: (builder) => {
        builder.addCase(getAddress.fulfilled, (state, { payload }) => {
            if (payload) {
                state.address = payload
            }
        })
    }
})

export default addressSlice.reducer