import type { PayloadAction } from '@reduxjs/toolkit'
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import AsyncStorage  from '@react-native-async-storage/async-storage'

export interface Trip {
  id: string | number[]
  name: string
  description: string
  destination: string
  isRisk: boolean
  img: string
  date: string
}

// Define a type for the slice state
interface TripsState {
  data: Array<Trip>,
  tripSelected?: Trip 
}

export const getAllByLocal = createAsyncThunk(
  'trips/getAllByLocal',
  async () => {
    const response = await AsyncStorage.getItem('trips')
    return response
  }
)

// Define the initial state using that type
const initialState: TripsState = {
  data: [], 
}

export const tripSlice = createSlice({
  name: 'trips',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    changeData: (state, action: PayloadAction<Array<Trip>>) => {
      state.data = action.payload
    },
    addTrip: (state, action: PayloadAction<Trip>)=> {
      let data = [...state.data, action.payload]
      AsyncStorage.setItem("trips", JSON.stringify(data))
      state.data = data
    },
    updateTripSelected: (state, action: PayloadAction<Trip>)=> {
      state.tripSelected = action.payload
    },
    updateTrip: (state, action: PayloadAction<Trip>)=> {
      let data = [...state.data]
      data = data.map(item => {
        if(item.id == action.payload.id) {
          console.log(action)
          item = action.payload
        }
        return item
      })
      AsyncStorage.setItem("trips", JSON.stringify(data))
      state.data = data
    },
    deleteTrip: (state, {payload}: PayloadAction<string | number[]>)=> {
      let data = [...state.data].filter(trip => {
        return trip.id != payload
      })
      AsyncStorage.setItem('trips', JSON.stringify(data))
      state.data = data
    }
  },

  extraReducers: (builder) => {
    builder.addCase(getAllByLocal.fulfilled, (state, action) => {
      if (action.payload) {
        state.data = JSON.parse(action.payload)
      } else {
        AsyncStorage.setItem('trips', JSON.stringify([]))
      }
    })
  }
})

export const { changeData, addTrip, updateTripSelected, updateTrip, deleteTrip } = tripSlice.actions

export default tripSlice.reducer