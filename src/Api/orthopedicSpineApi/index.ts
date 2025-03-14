import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const apiBaseUrl = 'http://localhost:8000/';

export const orthopedicSpineApi = createApi({
  reducerPath: 'orthopedicSpineApi',
  baseQuery: fetchBaseQuery({
    baseUrl: apiBaseUrl,
  }),

  keepUnusedDataFor: 3600,

  tagTypes: ['testimonial'],

  endpoints: (builder) => ({
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
export const { useGetTestimonialsQuery, useCreateTestimonialMutation, useSendEmailMutation } = orthopedicSpineApi;
