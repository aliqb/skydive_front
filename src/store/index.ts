import {configureStore} from '@reduxjs/toolkit'
import authReducer from './auth';
import accountReducer from './account';
import basketReducer  from './basket';
import userManagementReducer from './usermanagement';
import messages from './messages';

const store = configureStore({
    reducer: {
        auth: authReducer,
        account: accountReducer,
        basket: basketReducer,
        userManagement: userManagementReducer,
        messages: messages
    }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export default store