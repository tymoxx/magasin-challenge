import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export type Launch = {
    flight_number: number,
    mission_name: string,
    launch_year: number,
    launch_date_utc: Date,
    launch_site: {
        site_name: string
    },
    rocket: {
        rocket_name: string
    }
    links: {
        mission_patch_small: string
    }
}

type Launches = Launch[];

export const launchesApi = createApi({
    reducerPath: 'launchesApi',
    baseQuery: fetchBaseQuery({ baseUrl: 'https://api.spacexdata.com/v3/' }),
    endpoints: (builder) => ({
        getAllLaunches: builder.query<Launches, number>({
            query: (page = 1) => `launches/?limit=15&offset=${(page - 1) * 15}`,
            serializeQueryArgs: ({ endpointName }) => {
                return endpointName
            },
            merge: (currentCache, newItems) => {
                const uniqueIds = new Set(currentCache.map(item => item.flight_number));
                const filteredNewItems = newItems.filter(item => !uniqueIds.has(item.flight_number));
                return [...currentCache, ...filteredNewItems];            },
            forceRefetch({ currentArg, previousArg }) {
                return currentArg !== previousArg
            },
        }),
        getLaunchByFlightName: builder.query<Launch, number>({
            query: (flightNumber) => `launches/${flightNumber}`,
        }),
    }),
})

export const { useGetAllLaunchesQuery, useGetLaunchByFlightNameQuery } = launchesApi
