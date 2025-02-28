import { createSlice } from '@reduxjs/toolkit';

interface UiState {
  siderMenuCollapsed: boolean;
  siderMenuSelectedKey: string;
}

const initialState: UiState = {
  siderMenuCollapsed: false,
  siderMenuSelectedKey: '/',
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
  },
});

export const { toggleCollapseSiderMenu, setSiderMenuSelectedKey } = uiSlice.actions;
export default uiSlice.reducer;
