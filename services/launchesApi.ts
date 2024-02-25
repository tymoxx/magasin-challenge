import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

type Launch = {
    flight_number: number,
    mission_name: string
    launch_year: number
    rocket: {
        rocket_name: string
    }
}

type Launches = Launch[];

export const launchesApi = createApi({
    reducerPath: 'launchesApi',
    baseQuery: fetchBaseQuery({ baseUrl: 'https://api.spacexdata.com/v3/' }),
    endpoints: (builder) => ({
        getAllLaunches: builder.query<Launches, void>({
            query: () => `launches/`,
        }),
        getLaunchByFlightName: builder.query<Launch, number>({
            query: (flightNumber) => `launches/${flightNumber}`,
        }),
    }),
})

export const { useGetAllLaunchesQuery, useGetLaunchByFlightNameQuery } = launchesApi
