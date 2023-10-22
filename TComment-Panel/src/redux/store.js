import { combineReducers, configureStore } from "@reduxjs/toolkit";

//Reducers
import channelSlice from "./channels/channelSlice";
import modalSlice from "./modalSlice";
import userSlice from "./users/userSlice";
import selectedUserSlice from "./users/selectedUserSlice";
import commentsSlice from "./comments/commentsSlice";

const store = configureStore({
  reducer: combineReducers({
        channelLists: channelSlice,
        userList: userSlice,
        selectedUser: selectedUserSlice,
        commentsList:commentsSlice,
        modal: modalSlice
  }),
});

export default store;