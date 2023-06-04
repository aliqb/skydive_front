import { createSlice, PayloadAction } from "@reduxjs/toolkit"

interface AuthState{
    enteredUsername: string,
    isAuthenticated: boolean,
    enteredPhone: string
}

const initialState : AuthState = {
    enteredUsername: '',
    isAuthenticated: false,
    enteredPhone: ''
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
    }
})

export const authActions = authSlice.actions
export default authSlice.reducer