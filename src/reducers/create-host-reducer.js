import {
    HOST_FORM_UPDATE
} from '../actions/types';

const INITIAL_STATE = {
    type: '',

};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case HOST_FORM_UPDATE:
            return { ...state, [action.data.prop]: action.data.value };
        default:
            return state;
    }
};
