import { createSlice } from '@reduxjs/toolkit';

interface Testimonial {
  id: number;
  firstName: string;
  lastName: string;
  rating: number;
  comment: string;
}

interface TestimonialState {
  testimonials: Testimonial[];
  loading: boolean;
  error: null;
}

const initialState: TestimonialState = {
  testimonials: [],
  loading: false,
  error: null,
};

export const testimonialSlice = createSlice({
  name: 'testimonial',
  initialState,
  reducers: {
    getTestimonials: (state) => {
      return { ...state, testimonials: state.testimonials };
    },
    setTestimonials: (state, action) => {
      return { ...state, testimonials: action.payload };
    },
  },
});

export const { getTestimonials, setTestimonials } = testimonialSlice.actions;
export default testimonialSlice.reducer;
