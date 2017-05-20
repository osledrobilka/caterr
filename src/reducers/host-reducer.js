import {
    HOST_FORM_UPDATE,
    CLEAR_HOST_FORM,
    HOST_FETCH_SUCCESS,
    TOGGLE_HOST_DRAWER,
    MANAGE_HOST_ACCOUNT
} from '../actions/types';

const INITIAL_STATE = {
    /* company & individual */
    contactFirstName: '',
    contactLastName: '',
    contactPhone: '',
    contactEmail: '',
    address: '',
    city: '',
    state: '',
    zip: '',
    accountType: false,
    // company or individual
    /* company only */
    companyName: '',
    companyPhone: '',
    companyUrl: ''
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case HOST_FORM_UPDATE:
            return { ...state, [action.data.prop]: action.data.value };
        case CLEAR_HOST_FORM:
            return { ...state };
        case HOST_FETCH_SUCCESS:
            return { ...state };
        case TOGGLE_HOST_DRAWER:
            return { ...state };
        case MANAGE_HOST_ACCOUNT:
            return { ...state };
        default:
            return state;
    }
};
