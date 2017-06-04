import { AlertIOS } from 'react-native';
import {
    EMAIL_CHANGED,
    PASSWORD_CHANGED,
    LOGIN_USER_SUCCESS,
    LOGIN_USER_FAIL,
    LOGIN_USER_START,
    LOGIN_ERROR,
    LOGOUT_USER_SUCCESS,
    LOGOUT_USER_FAIL,
    RESET_PASSWORD_SUCCESS,
    MANAGE_AUTH,
    RESET_SUCCESS,
    UPDATE_USER
} from '../actions/types';

const INITIAL_STATE = {
    accountType: '',
    email: '',
    password: '',
    error: '',
    message: '',
    userDetails: null,
    loading: null,
    reg: false,
    loginHost: false,
    loginStaff: false,
    regHost: false,
    regStaff: false,
    forgotPassword: false

};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case EMAIL_CHANGED:
            return { ...state, email: action.data };
        case PASSWORD_CHANGED:
            return { ...state, password: action.data };
        case LOGIN_USER_START:
            return { ...state, loading: true, error: '', message: '' };
        case LOGIN_USER_SUCCESS:
            return { ...state, ...INITIAL_STATE, userDetails: action.data
            };
        case LOGIN_USER_FAIL: {
            AlertIOS.alert(action.data);

            return { ...state, ...INITIAL_STATE, error: action.data };
        }
        case LOGIN_ERROR: {
            AlertIOS.alert(action.data);

            return { ...state, ...INITIAL_STATE, error: action.data };
        }
        case LOGOUT_USER_SUCCESS:
            return { ...state, ...INITIAL_STATE, message: action.data };
        case LOGOUT_USER_FAIL:
            return { ...state, error: action.data };
        case MANAGE_AUTH:
            return { ...state, ...INITIAL_STATE, [action.data.prop]: action.data.value };
        case RESET_PASSWORD_SUCCESS: {
            AlertIOS.alert(action.data);

            return { ...state, ...INITIAL_STATE, error: action.data, login: true };
        }
        case RESET_SUCCESS: {
            AlertIOS.alert(action.data);

            return { ...state, ...INITIAL_STATE, error: action.data, login: true };
        }
        case UPDATE_USER:
            return {
                ...state,
                ...INITIAL_STATE,
                type: action.data.accountType,
                userDetails: action.data.details
            };
        default:
            return state;
    }
};
