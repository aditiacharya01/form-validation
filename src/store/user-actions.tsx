import userSlice from "./user-slice";
import { User } from "../interfaces/User.types";

export const userActions = userSlice.actions;

export const inviteUsers = (value: any) => {
  return async (dispatch: any, getState: any) => {
    const response: User[] = value;
    dispatch(userActions.setUsers(response));
  };
};
