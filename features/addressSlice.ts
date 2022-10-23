import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import * as Location from 'expo-location'

export interface IAddress {
    address: string,
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
        const data = await Location.reverseGeocodeAsync(location.coords)
        let address = `${data[0].city} city, ${data[0].country}, ${data[0].region} region, ${data[0].street} street`
        console.log(address)
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