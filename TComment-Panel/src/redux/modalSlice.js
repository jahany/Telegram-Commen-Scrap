import { createSlice } from "@reduxjs/toolkit";

const modalSlice = createSlice({
  name: "modal",
  initialState: {
    userPopup: false,
    channelPopup: false
  },
  reducers: {
    toggleModalUsers: (state) => {
      return { ...state, userPopup: !state.userPopup };
    },
    toggleModalChannels: (state) => {
      return { ...state, channelPopup: !state.channelPopup };
    }
  }
});

export default modalSlice.reducer;
export const { toggleModalUsers, toggleModalChannels } = modalSlice.actions;
