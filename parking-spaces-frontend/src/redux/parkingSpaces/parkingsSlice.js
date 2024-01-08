import { createSlice } from '@reduxjs/toolkit';

const initialState = [];

const parkingsSlice = createSlice({
  name: 'parkings',
  initialState,
  reducers: {
    setParkingSpaces: (_state, action) => {
      return action.payload;
    },
    updateParkingSpaces: (state, action) => {
      return state.map(parking => (parking._id === action.payload._id ? action.payload : parking));
    },
  },
});

export const { setParkingSpaces, updateParkingSpaces } = parkingsSlice.actions;

export default parkingsSlice.reducer;
