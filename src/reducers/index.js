import { combineReducers } from 'redux';
import AuthReducer from './auth-reducer';
import RegReducer from './reg-reducer';


export default combineReducers({
    auth: AuthReducer,
    reg: RegReducer
});
