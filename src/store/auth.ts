import { createSlice, PayloadAction } from "@reduxjs/toolkit"

interface AuthState{
    enteredUsername: string,
    isAuthenticated: boolean
}

const initialState : AuthState = {
    enteredUsername: '',
    isAuthenticated: false
}

const authSlice = createSlice({
    name: 'auth',
    initialState: initialState,
    reducers:{
        setUsername: (state, action: PayloadAction<string>)=>{
            state.enteredUsername = action.payload
        }
    }
})

export const authActions = authSlice.actions
export default authSlice.reducer