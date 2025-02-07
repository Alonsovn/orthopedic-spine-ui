import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const apiBaseUrl = "http://127.0.0.1:8000";

export const backendServiceApi = createApi({
  reducerPath: "backendServiceApi",
  baseQuery: fetchBaseQuery({
    baseUrl: apiBaseUrl,
  }),

  keepUnusedDataFor: 3600,

  tagTypes: ["users"], // TODO learn about it
  endpoints: (builder) => ({
    //Users
    getUsersData: builder.query({
      query: () => "user/all",
      providesTags: ["users"],
    }),
  }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useGetUsersDataQuery } = backendServiceApi;
