import { createSlice } from "@reduxjs/toolkit";

const selectedChannelSlice = createSlice({
  name: "selectedchannel",
  initialState: {
    channelID: "", 
  },
  reducers: {
    setSelectedChannel: (state, action) => {
      state.channelID = action.payload;
    },
  },
});

export default selectedChannelSlice.reducer;
export const { setSelectedChannel } = selectedChannelSlice.actions;
