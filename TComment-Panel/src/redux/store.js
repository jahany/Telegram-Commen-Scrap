import { combineReducers, configureStore } from "@reduxjs/toolkit";

//Reducers
import channelSlice from "./channelSlice";
import modalSlice from "./modalSlice";
import userSlice from "./userSlice";
import selectedUserSlice from "./selectedUserSlice";
import commentsSlice from "./commentsSlice";

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