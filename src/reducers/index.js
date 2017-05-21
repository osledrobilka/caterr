import { combineReducers } from 'redux';
import AuthReducer from './auth-reducer';
import HostReducer from './host-reducer';
import StaffReducer from './staff-reducer';

export default combineReducers({
    auth: AuthReducer,
    host: HostReducer,
    staff: StaffReducer
});
