import { createAsyncThunk } from "@reduxjs/toolkit";

const deleteChannel = createAsyncThunk("users/deleteChannel", async (ChannelId) => {
  try {
    const response = await fetch(`https://comments.taradade.ir/api/comment/deleteChannels?ChannelId=${ChannelId}`, {
      method: "Get",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({  }),
    });

    if (!response.ok) {
      const data = await response.json();
      throw new Error(data.message);
    }

  } catch (error) {
    throw error;
  }
});

export { deleteChannel };
