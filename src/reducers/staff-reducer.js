import {
    STAFF_FORM_UPDATE,
    CLEAR_STAFF_FORM,
    STAFF_FETCH_SUCCESS,
    TOGGLE_STAFF_DRAWER,
    MANAGE_STAFF_ACCOUNT
} from '../actions/types';

const INITIAL_STATE = {
    /* company & individual */
    firstName: '',
    middleName: '',
    lastName: '',
    phone: '',
    email: '',
    address: '',
    city: '',
    state: '',
    zip: ''
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case STAFF_FORM_UPDATE:
            return { ...state, [action.data.prop]: action.data.value };
        case CLEAR_STAFF_FORM:
            return { ...state };
        case STAFF_FETCH_SUCCESS:
            return { ...state };
        case TOGGLE_STAFF_DRAWER:
            return { ...state };
        case MANAGE_STAFF_ACCOUNT:
            return { ...state };
        default:
            return state;
    }
};
