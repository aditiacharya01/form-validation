import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { User, UserArray } from "../interfaces/User.types";

const initialUserState: UserArray = {
  invited_users: [],
};

const userSlice = createSlice({
  name: "user",
  initialState: initialUserState,
  reducers: {
    setUsers(state, action: PayloadAction<User[]>) {
      state.invited_users = action.payload;
    },
  },
});
export default userSlice;
