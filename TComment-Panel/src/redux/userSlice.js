
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const fetchusers = createAsyncThunk("users/fetchusers", async () => {
    return fetch("https://comments.taradade.ir/api/comment/getUsers")
        .then((res) => res.json())
        .then((data) => data);
});

const userSlice = createSlice({
    name: "users",
    initialState: {
        loading: false,
        users: [],
        error: ""
    },
    extraReducers: (builder) => {
        builder.addCase(fetchusers.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(fetchusers.fulfilled, (state, action) => {
            state.loading = false;
            state.users = action.payload; 
            state.error = "";
        });
        
        builder.addCase(fetchusers.rejected, (state, action) => {
            state.loading = false;
            state.users = [];
            state.error = action.error.message;
        });
    }
});

export default userSlice.reducer;
export { fetchusers };
