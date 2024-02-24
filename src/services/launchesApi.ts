import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
/* TODO: types*/
import type { Launches } from './types'

// Define a service using a base URL and expected endpoints
export const launchesApi = createApi({
    reducerPath: 'launchesApi',
    baseQuery: fetchBaseQuery({ baseUrl: 'https://api.spacexdata.com/v3/' }),
    endpoints: (builder) => ({
        getAllLaunches: builder.query<Launches, void>({
            query: () => `launches/`,
        }),
        getLaunchByName: builder.query<Launches, string>({
            query: (name) => `launches/${name}`,
        }),
    }),
})

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useGetAllLaunchesQuery, useGetLaunchByNameQuery } = launchesApi
