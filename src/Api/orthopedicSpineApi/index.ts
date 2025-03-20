import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { RootState } from '../../Redux/store';

export const apiBaseUrl = 'http://localhost:8000/';

const customBaseQuery = fetchBaseQuery({
  baseUrl: apiBaseUrl,
  prepareHeaders: (headers, { getState }) => {
    const state = getState() as RootState;
    const access_token = state.user.access_token;
    if (access_token) {
      headers.set('Authorization', `Bearer ${access_token}`);
    }
    return headers;
  },
});

export const orthopedicSpineApi = createApi({
  reducerPath: 'orthopedicSpineApi',
  baseQuery: customBaseQuery,

  keepUnusedDataFor: 3600,

  tagTypes: ['testimonial', 'auth'],

  endpoints: (builder) => ({
    // User auth
    login: builder.mutation({
      query: (credentials: { email: string; password: string }) => ({
        url: 'user/login/',
        method: 'POST',
        body: credentials,
      }),
      invalidatesTags: ['auth'],
    }),
    refreshToken: builder.mutation({
      query: (refreshToken: string) => ({
        url: 'user/refresh-token/',
        method: 'POST',
        body: { refreshToken },
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
export const {
  useLoginMutation,
  useRefreshTokenMutation,
  useGetTestimonialsQuery,
  useCreateTestimonialMutation,
  useSendEmailMutation,
} = orthopedicSpineApi;
