import { combineReducers } from 'redux';
import AuthReducer from './auth-reducer';
import HostReducer from './host-reducer';

export default combineReducers({
    auth: AuthReducer,
    host: HostReducer
});
