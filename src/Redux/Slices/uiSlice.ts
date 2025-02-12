import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  siderMenuCollapsed: false,
};

const uiSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    toggleCollapseSideMenu: (state) => {
      state.siderMenuCollapsed = !state.siderMenuCollapsed;
    },
  },
});

export const { toggleCollapseSideMenu } = uiSlice.actions;
export default uiSlice.reducer;
