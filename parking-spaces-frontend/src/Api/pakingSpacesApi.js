import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const baseUrl = 'http://localhost:3000/';

export const pakingSpacesApi = createApi({
  reducerPath: 'pakingSpacesApi',
  tagTypes: ['ParkingSpaces'],
  baseQuery: fetchBaseQuery({ baseUrl }),
  endpoints: builder => ({
    getParkings: builder.query({
      query: () => 'parkings',
      providesTags: result =>
        result
          ? [...result.map(({ id }) => ({ type: 'ParkingSpaces', id })), { type: 'ParkingSpaces', id: 'LIST' }]
          : [{ type: 'ParkingSpaces', id: 'LIST' }],
    }),
    createParking: builder.mutation({
      query: data => ({
        url: 'parkings',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: [{ type: 'ParkingSpaces', id: 'LIST' }],
    }),
    getParkingById: builder.query({
      query: id => `parkings/${id}`,
    }),
    updateParkingById: builder.mutation({
      query: ({ id, data }) => ({
        url: `parkings/${id}`,
        method: 'PATCH',
        body: data,
      }),
      // invalidatesTags: [{ type: 'ParkingSpaces', id: 'LIST' }],
    }),
    deleteParkingById: builder.mutation({
      query: id => ({
        url: `parkings/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: [{ type: 'ParkingSpaces', id: 'LIST' }],
    }),
  }),
});

export const {
  useGetParkingsQuery,
  useCreateParkingMutation,
  useGetParkingByIdQuery,
  useUpdateParkingByIdMutation,
  useDeleteParkingByIdMutation,
} = pakingSpacesApi;
