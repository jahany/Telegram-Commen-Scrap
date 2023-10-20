
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const fetchchannels = createAsyncThunk("channels/fetchchannels", async () => {
    return fetch("https://comments.taradade.ir/api/comment/getChannels")
        .then((res) => res.json())
        .then((data) => data);
})

const channelSlice = createSlice({
    name: "channels",
    initialState: {
        loading: false,
        channels: [],
        error: ""
    },
    extraReducers: (builder) => {
        builder.addCase(fetchchannels.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(fetchchannels.fulfilled, (state, action) => {
            state.loading = false;
            state.channels = action.payload; 
            state.error = "";
        });
        
        builder.addCase(fetchchannels.rejected, (state, action) => {
            state.loading = false;
            state.channels = [];
            state.error = action.error.message;
        });
    }
});

export default channelSlice.reducer;
export { fetchchannels };
