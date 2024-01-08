import { configureStore } from '@reduxjs/toolkit';
import { pakingSpacesApi } from '../Api/pakingSpacesApi';
import parkingsSlice from './parkingSpaces/parkingsSlice';

const store = configureStore({
  reducer: {
    parkings: parkingsSlice,
    [pakingSpacesApi.reducerPath]: pakingSpacesApi.reducer,
  },
  middleware: getDefaultMiddleware => getDefaultMiddleware().concat(pakingSpacesApi.middleware),
});

export default store;
