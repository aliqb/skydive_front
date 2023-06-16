import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AuthData } from "../models/auth";
import { UserGeneralInfo } from "../models/shared";

interface AuthState {
  enteredUsername: string;
  isAuthenticated: boolean;
  enteredPhone: string;
  token: string;
  refreshToken: string;
  userId: string;
  name: string;
  userStatus: string;
  userType: string;
  username: string;
}

const initialState: AuthState = {
  enteredUsername: "",
  isAuthenticated: false,
  enteredPhone: "",
  token: "",
  userId: "",
  refreshToken: "",
  userStatus: '',
  userType: '',
  name: '',
  username: ''

};

const authSlice = createSlice({
  name: "auth",
  initialState: initialState,
  reducers: {
    setUsername: (state, action: PayloadAction<string>) => {
      state.enteredUsername = action.payload;
    },
    setMobile: (state, action: PayloadAction<string>) => {
      state.enteredPhone = action.payload;
    },
    setToken: (state, action: PayloadAction<AuthData>) => {
      localStorage.setItem("authData", JSON.stringify(action.payload));
      state.token = action.payload.authToken;
      state.refreshToken = action.payload.refreshToken;
      state.isAuthenticated = true;
    },
    signUpPhone: (
      state,
      action: PayloadAction<{ id: string; phone: string }>
    ) => {
      state.enteredPhone = action.payload.phone;
      state.userId = action.payload.id;
    },
    logOut: (state) => {
      console.log("here");
      localStorage.removeItem("authData");
      state.token = "";
      state.refreshToken = "";
      state.isAuthenticated = false;
      state.enteredPhone = "";
      state.enteredUsername = "";
    },
    setUserGenralInfo:(state, action: PayloadAction<UserGeneralInfo>)=>{
        state.name = `${action.payload.firstName} ${action.payload.lastName}`;
        state.userStatus = action.payload.userStatus;
        state.userType = action.payload.userType;
        state.username = action.payload.userName;
    }
  },
});

export const authActions = authSlice.actions;
export default authSlice.reducer;
