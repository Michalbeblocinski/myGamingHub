import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { User } from "../utils/types/user";
import { RootState } from "./store";
import { GhDataApi, GhDataApiFile } from "../utils/axiosConfig";
import { Friend } from "../utils";

type AuthState = {
  user: User | null;
  friends: Friend[] | null;
};

const initialState: AuthState = {
  user: null,
  friends: null,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setLogin: (state, action) => {
      state.user = action.payload.user;
    },
    setUserPicturePath: (state, action: PayloadAction<string>) => {
      if (state.user) {
        state.user.userPicturePath = action.payload;
      }
    },
    setLogout: (state) => {
      state.user = null;
      delete GhDataApi.defaults.headers.common["Authorization"];
    },
    addFriend: (state, action) => {
      if (state.friends) state.friends.push(action.payload);
    },
    setToken: (state) => {
      GhDataApi.defaults.headers.common[
        "Authorization"
      ] = `${state.user?.resetToken}`;
      GhDataApiFile.defaults.headers.common[
        "Authorization"
      ] = `${state.user?.resetToken}`;
    
    },
    setFriends: (state, action) => {
      state.friends = action.payload;
    },
    addUserFriend: (state, action) => {
      if (state.user) state.user.friends.push(action.payload);
    },
    removeFriend: (state, action) => {
      if (state.user)
        state.user.friends = state.user.friends.filter(
          (friend) => friend !== action.payload
        );
    },
    setUserFriends: (state, action) => {
      if (state.user) state.user.friends = action.payload;
    },
    changeUserBasicCredentials: (state, action) => {
      if (state.user) {
        state.user.email = action.payload.email;
        state.user.name = action.payload.name;
      }
    },
  },
});
export const selectUser = (state: RootState) => state.user.user;

export const selectFriends = (state: RootState) => state.user.friends;
export const {
  setLogin,
  setLogout,
  addFriend,
  setToken,
  setFriends,
  setUserPicturePath,
  removeFriend,
  addUserFriend,
  changeUserBasicCredentials
} = authSlice.actions;
export const authReducer = authSlice.reducer;
export const selectUserId = (state: RootState) => state.user.user?._id;
export default authSlice.reducer;
