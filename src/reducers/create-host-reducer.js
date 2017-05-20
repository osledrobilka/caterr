import {
    HOST_FORM_UPDATE
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
        default:
            return state;
    }
};
