import { createSlice } from "@reduxjs/toolkit";

interface User {
  id: number;
  name: string;
  lastName: string;
  email: string;
}

interface UserState {
  users: User[];
  loading: boolean;
  error: string | null;
}

const initialState: UserState = {
  users: [],
  loading: false,
  error: null,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    getUsers: (state, action) => {
      state.loading = true;
      state.users = action.payload.users;
    },
  },
});

export default userSlice.reducer;
