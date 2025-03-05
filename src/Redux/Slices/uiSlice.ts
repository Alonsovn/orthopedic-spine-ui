import { createSlice } from '@reduxjs/toolkit';

interface UiState {
  siderMenuCollapsed: boolean;
  siderMenuSelectedKey: string;
  searchQuery: string;
}

const initialState: UiState = {
  siderMenuCollapsed: false,
  siderMenuSelectedKey: '/',
  searchQuery: '',
};

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    toggleCollapseSiderMenu: (state) => {
      // state.siderMenuCollapsed = !state.siderMenuCollapsed;
      return { ...state, siderMenuCollapsed: !state.siderMenuCollapsed };
    },
    setSiderMenuSelectedKey: (state, action) => {
      return { ...state, siderMenuSelectedKey: action.payload };
    },
    setSearchQuery: (state, action) => {
      return { ...state, searchQuery: action.payload };
    },
  },
});

export const { toggleCollapseSiderMenu, setSiderMenuSelectedKey, setSearchQuery } = uiSlice.actions;
export default uiSlice.reducer;
