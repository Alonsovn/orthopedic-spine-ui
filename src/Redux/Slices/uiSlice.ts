import { createSlice } from "@reduxjs/toolkit";

interface UiState {
  siderMenuCollapsed: boolean;
}

const initialState: UiState = {
  siderMenuCollapsed: false,
};

const uiSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    toggleCollapseSiderMenu: (state) => {
      // state.siderMenuCollapsed = !state.siderMenuCollapsed;
      return { ...state, siderMenuCollapsed: !state.siderMenuCollapsed };
    },
  },
});

export const { toggleCollapseSiderMenu } = uiSlice.actions;
export default uiSlice.reducer;
