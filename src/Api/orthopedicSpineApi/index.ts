import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { RootState } from '../../Redux/store';
import { logout, refreshTokens } from '../../Redux/Slices/userSlice';

interface RefreshTokenResponse {
  accessToken: string;
  refreshToken: string;
}
export const apiBaseUrl = 'http://localhost:8000/';

const baseQuery = fetchBaseQuery({
  baseUrl: apiBaseUrl,
  prepareHeaders: (headers, { getState }) => {
    const state = getState() as RootState;
    const access_token = state.user.accessToken;
    if (access_token) {
      headers.set('Authorization', `Bearer ${access_token}`);
    }
    return headers;
  },
});

const baseQueryWithReAuth = async (args, api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions);

  if (result.error && result.error.status === 401) {
    // Unauthorized error: try to refresh token
    const state = api.getState() as RootState;
    const refreshToken = state.user.refreshToken;

    if (refreshToken) {
      // Try refreshing the token
      const refreshResponse = await baseQuery(
        {
          url: 'user/refresh-token',
          method: 'POST',
          body: { refreshToken: refreshToken },
        },
        api,
        extraOptions,
      );

      if (refreshResponse.data) {
        // Update tokens in Redux store
        const data = refreshResponse.data as RefreshTokenResponse;
        api.dispatch(
          refreshTokens({
            accessToken: data.accessToken,
            refreshToken: data.refreshToken,
          }),
        );

        // Retry the original request with new token
        result = await baseQuery(args, api, extraOptions);
      } else {
        // Refresh token failed, logout user
        api.dispatch(logout());
      }
    } else {
      // No refresh token available, force logout
      api.dispatch(logout());
    }
  }

  return result;
};

export const orthopedicSpineApi = createApi({
  reducerPath: 'orthopedicSpineApi',
  baseQuery: baseQueryWithReAuth,

  keepUnusedDataFor: 3600,

  tagTypes: ['testimonial', 'auth'],

  endpoints: (builder) => ({
    // User auth
    login: builder.mutation({
      query: (body) => ({
        url: 'user/login/',
        method: 'POST',
        body,
      }),
      invalidatesTags: ['auth'],
    }),

    //Testimonials
    getTestimonials: builder.query({
      query: () => 'testimonial/all',
      providesTags: ['testimonial'],
    }),

    createTestimonial: builder.mutation({
      query: (body) => ({
        url: 'testimonial/',
        method: 'POST',
        body,
      }),
      invalidatesTags: ['testimonial'],
    }),

    //Email
    sendEmail: builder.mutation({
      query: (body) => ({
        url: 'email/send-email/',
        method: 'POST',
        body,
      }),
    }),
  }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useLoginMutation, useGetTestimonialsQuery, useCreateTestimonialMutation, useSendEmailMutation } =
  orthopedicSpineApi;
