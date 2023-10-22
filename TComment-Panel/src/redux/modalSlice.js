import { createSlice } from "@reduxjs/toolkit";

const modalSlice = createSlice({
  name: "modal",
  initialState: {
    userPopup: false,
    channelPopup: false
  },
  reducers: {
    toggleModalUsers: (state, action) => {
      state.userPopup = action.payload
    },
    toggleModalChannels: (state, action) => {
      state.channelPopup = action.payload
    }
  }
});

export default modalSlice.reducer;
export const { toggleModalUsers, toggleModalChannels } = modalSlice.actions;
