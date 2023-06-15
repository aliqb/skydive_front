import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { AuthData } from "../models/auth"

interface AuthState{
    enteredUsername: string,
    isAuthenticated: boolean,
    enteredPhone: string,
    token: string,
    refreshToken: string,
    userId: string
}

const initialState : AuthState = {
    enteredUsername: '',
    isAuthenticated: false,
    enteredPhone: '',
    token: '',
    userId: '',
    refreshToken: ''
}

const authSlice = createSlice({
    name: 'auth',
    initialState: initialState,
    reducers:{
        setUsername: (state, action: PayloadAction<string>)=>{
            state.enteredUsername = action.payload
        },
        setMobile:(state, action: PayloadAction<string>)=>{
            state.enteredPhone = action.payload
        },
        setToken:(state,action: PayloadAction<AuthData>)=>{
            localStorage.setItem('authData',JSON.stringify(action.payload))
            state.token = action.payload.authToken;
            state.refreshToken = action.payload.refreshToken;
            state.isAuthenticated = true;
        },
        signUpPhone:(state,action:PayloadAction<{id:string, phone:string}>)=>{
            state.enteredPhone = action.payload.phone;
            state.userId = action.payload.id;
        },

    }
})

export const authActions = authSlice.actions
export default authSlice.reducer