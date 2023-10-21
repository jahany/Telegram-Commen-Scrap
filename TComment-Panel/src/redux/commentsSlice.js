
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const fetchcomments = createAsyncThunk("comments/fetchcomments", async(telegramID) => {
    try {
        const response = await fetch(`https://comments.taradade.ir/api/comment/getComments?TelegramUserId=${telegramID}`,{
            method: "Get",
            headers: {
              "Content-Type": "application/json",
            }
        });
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        return data;
    } catch (error) {
        throw error;
    }
});


const commentSlice = createSlice({
    name: "comments",
    initialState: {
        loading: false,
        comments: [],
        error: ""
    },
    extraReducers: (builder) => {
        builder.addCase(fetchcomments.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(fetchcomments.fulfilled, (state, action) => {
            state.loading = false;
            state.comments = action.payload; 
            state.error = "";
        });
        
        builder.addCase(fetchcomments.rejected, (state, action) => {
            state.loading = false;
            state.comments = [];
            state.error = action.error.message;
        });
    }
});

export default commentSlice.reducer;
export { fetchcomments };
