import { combineReducers } from 'redux';
import AuthReducer from './auth-reducer';
import CreateHostReducer from './create-host-reducer';

export default combineReducers({
    auth: AuthReducer,
    host: CreateHostReducer
});
