import { createSlice } from '@reduxjs/toolkit';

interface Testimony {
  id: number;
  firstName: string;
  lastName: string;
  rating: number;
  opinion: string;
}

interface TestimonyState {
  testimonies: Testimony[];
  loading: boolean;
  error: null;
}

const initialState: TestimonyState = {
  testimonies: [],
  loading: false,
  error: null,
};

export const testimoniesSlice = createSlice({
  name: 'testimonies',
  initialState,
  reducers: {
    getTestimonies: (state) => {
      return { ...state, testimonies: state.testimonies };
    },
    setTestimonies: (state, action) => {
      return { ...state, testimonies: action.payload };
    },
  },
});

export const { getTestimonies, setTestimonies } = testimoniesSlice.actions;
export default testimoniesSlice.reducer;
