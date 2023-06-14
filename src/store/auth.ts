import { createSlice, PayloadAction } from "@reduxjs/toolkit"

interface AuthState{
    enteredUsername: string,
    isAuthenticated: boolean,
    enteredPhone: string,
    token: string
}

const initialState : AuthState = {
    enteredUsername: '',
    isAuthenticated: false,
    enteredPhone: '',
    token: ''
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
        setToken:(state,action: PayloadAction<string>)=>{
            state.token = action.payload;
        }
    }
})

export const authActions = authSlice.actions
export default authSlice.reducer