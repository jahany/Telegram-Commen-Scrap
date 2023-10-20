import { createAsyncThunk } from "@reduxjs/toolkit";

const createChannel = createAsyncThunk("channels/createChannel", async (newChannelData) => {
  try {
    const response = await fetch("https://comments.taradade.ir/api/comment/insertcahnnel", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newChannelData),
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

export { createChannel };
