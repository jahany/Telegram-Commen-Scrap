import { combineReducers, configureStore } from "@reduxjs/toolkit";

//Reducers
import channelSlice from "./channelSlice";
import modalSlice from "./modalSlice";
import userSlice from "./userSlice";
import selectedUserSlice from "./selectedUserSlice";

const store = configureStore({
  reducer: combineReducers({
        channelLists: channelSlice,
        userList: userSlice,
        selectedUser: selectedUserSlice,
        modal: modalSlice
  }),
});

export default store;