"use client";

import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const carsApi = createApi({
  reducerPath: "carsApi",
  refetchOnFocus: true,
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_API_URL
  }),
  endpoints: (builder) => ({
    postNewCar: builder.mutation({
      query: (body) => {
        const url = '/cars'
        return { url, method: "POST", body }
      }
    }),
    getCars: builder.query({
      query: () => {
        const url = '/cars';
        return { url, method: "GET" }
      },
    }),
    getSpecifications: builder.query({
      query: (id) => {
        const url = `/cars/${id}`;
        return { url, method: "GET" }
      },
    }),
  }),
});

export const {
    usePostNewCarMutation,
    useGetCarsQuery,
    useGetSpecificationsQuery
} = carsApi;