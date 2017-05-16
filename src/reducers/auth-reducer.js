import {
    EMAIL_CHANGED,
    PASSWORD_CHANGED,
    LOGIN_USER_SUCCESS,
    LOGIN_USER_FAIL,
    LOGIN_USER_START,
    LOGIN_ERROR,
    LOGOUT_USER_SUCCESS,
    LOGOUT_USER_FAIL
} from '../actions/types';

const INITIAL_STATE = {
    email: '',
    password: '',
    error: ' ',
    message: '',
    user: {
        // uid: 'ghTdd3XxmeSVxmAU2bHFdXM3yaH2'
    },
    userDetails: {
        name: '',
        email: '',
        profileImageUrl: ''
    },
    loading: null
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
            return {
                ...state,
                ...INITIAL_STATE,
                user: action.data.user,
                userDetails: {
                    name: action.data.authData.name,
                    email: action.data.authData.email,
                    profileImageUrl: action.data.authData.profileImageUrl
                }
            };
        case LOGIN_USER_FAIL:
            return { ...state, ...INITIAL_STATE, error: action.data };
        case LOGIN_ERROR:
            return { ...state, ...INITIAL_STATE, error: action.data };
        case LOGOUT_USER_SUCCESS:
            return { ...state, ...INITIAL_STATE, message: action.data };
        case LOGOUT_USER_FAIL:
            return { ...state, error: action.data };
        default:
            return state;
    }
};
