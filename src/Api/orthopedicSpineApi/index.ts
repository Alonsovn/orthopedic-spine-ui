import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { RootState } from '../../Redux/store';
import { logout, refreshTokens } from '../../Redux/Slices/userSlice';
import { BaseQueryFn, FetchArgs, FetchBaseQueryError, FetchBaseQueryMeta } from '@reduxjs/toolkit/query';

interface RefreshTokenResponse {
  accessToken: string;
  refreshToken: string;
}
export const apiBaseUrl = 'http://localhost:8000/';

const baseQuery = fetchBaseQuery({
  baseUrl: apiBaseUrl,
  prepareHeaders: (headers, { getState }) => {
    const { user } = getState() as RootState;
    const access_token = user.accessToken;
    if (access_token) {
      headers.set('Authorization', `Bearer ${access_token}`);
    }
    return headers;
  },
  credentials: 'include', // Ensures cookies are sent if needed
});

const baseQueryWithReAuth: BaseQueryFn<
  string | FetchArgs, // Args can be a string (endpoint URL) or an object with method, body, etc.
  unknown, // Response type (unknown since different endpoints return different types)
  FetchBaseQueryError, // Error type from fetchBaseQuery
  object, // Extra options (not used in this case, so an empty object)
  FetchBaseQueryMeta // Metadata returned by fetchBaseQuery
> = async (args, api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions);

  if (result.error && result.error.status === 401) {
    // Unauthorized error: try to refresh token
    const { user } = api.getState() as RootState;
    const refreshToken = user.refreshToken;

    if (!refreshToken) {
      // No refresh token available, logout user
      api.dispatch(logout());
      return result;
    }

    try {
      // Try refreshing the token
      const refreshResponse = await baseQuery(
        {
          url: 'user/refresh-token',
          method: 'POST',
          body: { refreshToken: refreshToken },
          headers: { 'Content-Type': 'application/json' },
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
    } catch {
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
      query: (payload) => ({
        url: 'user/login/',
        method: 'POST',
        body: payload,
      }),
      invalidatesTags: ['auth'],
    }),

    //Testimonials
    getTestimonials: builder.query({
      query: () => 'testimonial/all',
      providesTags: ['testimonial'],
    }),

    createTestimonial: builder.mutation({
      query: (payload) => ({
        url: 'testimonial/',
        method: 'POST',
        body: payload,
      }),
      invalidatesTags: ['testimonial'],
    }),
    deleteTestimonial: builder.mutation({
      query: (payload) => ({
        url: `testimonial/${payload}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['testimonial'],
    }),

    //Email
    receiveEmail: builder.mutation({
      query: (payload) => ({
        url: 'email/receive-email/',
        method: 'POST',
        body: payload,
      }),
    }),
    sendVerificationCodeEmail: builder.mutation({
      query: (payload) => ({
        url: `email/send-verification-code-email?email=${payload.email}`,
        method: 'POST',
        body: payload,
      }),
    }),
  }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const {
  useLoginMutation,
  useGetTestimonialsQuery,
  useCreateTestimonialMutation,
  useDeleteTestimonialMutation,
  useReceiveEmailMutation,
  useSendVerificationCodeEmailMutation,
} = orthopedicSpineApi;
