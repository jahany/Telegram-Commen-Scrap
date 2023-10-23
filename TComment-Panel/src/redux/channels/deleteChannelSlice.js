import { createAsyncThunk } from "@reduxjs/toolkit";

const deleteChannel = createAsyncThunk("users/deleteChannel", async (ChannelId) => {
  try {
    console.log(" channel ID:", ChannelId); // Log the ID being deleted
    const response = await fetch(`https://comments.taradade.ir/api/comment/deleteChannels?ChannelId=${ChannelId}`, {
      method: "Post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({}),
    });
    console.log("Delete response:", response); // Log the response

    if (!response.ok) {
      const data = await response.json();
      throw new Error(data.message);
    }
  } catch (error) {
    throw error;
  }
});

export { deleteChannel };
