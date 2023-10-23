import { createSlice } from "@reduxjs/toolkit";

const modalSlice = createSlice({
  name: "modal",
  initialState: {
    userPopup: false,
    edituserPopup: false,
    channelPopup: false
  },
  reducers: {
    toggleModalUsers: (state, action) => {
      state.userPopup = action.payload
    },
    toggleModalEditusers: (state, action) => {
      state.edituserPopup = action.payload
    },
    toggleModalChannels: (state, action) => {
      state.channelPopup = action.payload
    }
  }
});

export default modalSlice.reducer;
export const { toggleModalUsers, toggleModalEditusers, toggleModalChannels } = modalSlice.actions;
