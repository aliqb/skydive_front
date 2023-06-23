import {configureStore} from '@reduxjs/toolkit'
import authReducer from './auth';
import accountReducer from './account';
import basketReducer  from './basket';

const store = configureStore({
    reducer: {
        auth: authReducer,
        account: accountReducer,
        basket: basketReducer
    }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export default store