import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  sideMenuCollapsed: false,
};

const uiSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    toggleCollapseSideMenu: (state) => {
      state.sideMenuCollapsed = !state.sideMenuCollapsed;
    },
  },
});

export const { toggleCollapseSideMenu } = uiSlice.actions;
export default uiSlice.reducer;
