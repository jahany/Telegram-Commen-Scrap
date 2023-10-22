import { createAsyncThunk } from "@reduxjs/toolkit";

const deleteUser = createAsyncThunk("users/deleteUser", async (userId) => {
  try {
    const response = await fetch(`https://comments.taradade.ir/api/comment/deleteUser?UserId=${userId}`, {
      method: "Post",
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

export { deleteUser };
