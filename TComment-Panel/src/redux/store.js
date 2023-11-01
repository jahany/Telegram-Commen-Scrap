import { combineReducers, configureStore } from "@reduxjs/toolkit";

//Reducers
import channelSlice from "./channels/channelSlice";
import modalSlice from "./modalSlice";
import userSlice from "./users/userSlice";
import selectedUserSlice from "./users/selectedUserSlice";
import commentsSlice from "./comments/commentsSlice";
import selectedChannel from "./channels/selectedChannel";

const store = configureStore({
  reducer: combineReducers({
        channelLists: channelSlice,
        userList: userSlice,
        selectedUser: selectedUserSlice,
        selectedChannel: selectedChannel,
        commentsList:commentsSlice,
        modal: modalSlice
  }),
});

export default store;