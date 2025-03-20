import { createSlice } from '@reduxjs/toolkit';
import { refreshToken } from '../../Api/orthopedicSpineApi/auth_helper';

interface UserState {
  email: string;
  password: string;
  loggedIn: boolean;
  accessToken: string | null;
  refreshToken: string | null;
}

const initialState: UserState = {
  email: '',
  password: '',
  loggedIn: false,
  accessToken: null,
  refreshToken: null,
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    login: (state, action) => {
      return {
        ...state,
        email: action.payload.email,
        password: action.payload.password,
        loggedIn: true,
        accessToken: action.payload.accessToken,
        refreshToken: action.payload.refreshToken,
      };
    },
    logout: (state) => {
      return {
        ...state,
        email: '',
        password: '',
        loggedIn: false,
        accessToken: null,
        refreshToken: null,
      };
    },
    refreshTokens: (state, action) => {
      return {
        ...state,
        accessToken: action.payload.accessToken,
        refreshToken: action.payload.refreshToken,
      };
    },
  },
});

export const { login, logout, refreshTokens } = userSlice.actions;
export default userSlice.reducer;
