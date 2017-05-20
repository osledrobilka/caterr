import firebase from 'firebase';
import {
    HOST_FORM_UPDATE,
    CLEAR_HOST_FORM,
    HOST_FETCH_SUCCESS,
    TOGGLE_HOST_DRAWER,
    MANAGE_HOST_ACCOUNT
} from './types';

export const hostFormUpdate = ({ prop, value }) => ({
    type: HOST_FORM_UPDATE,
    data: { prop, value }
});

export const clearHostForm = () => ({
    type: CLEAR_HOST_FORM
});

export const toggleHostDrawer = (data) => ({
    type: TOGGLE_HOST_DRAWER,
    data
});

export const hostFetch = (uid) => {
    return (dispatch) => {
        firebase.database().ref(`/hosts/${uid}/profile`)
            .on('value', snapshot => {
                const data = snapshot.val();
                dispatch({ type: HOST_FETCH_SUCCESS, data });
            });
    };
};

export const hostCreate = (data) => {
    const {
        contactFirstName,
        contactLastName,
        contactPhone,
        contactEmail,
        address,
        city,
        state,
        zip,
        accountType,
        companyName,
        companyPhone,
        companyUrl,
        uid
    } = data;

    const { currentUser } = firebase.auth();

    if (uid !== null) {
        return (dispatch) => {
            const ref = firebase.database().ref(`/hosts/${currentUser.uid}/profile/${uid}`);

            ref.child('contactFirstName').set(contactFirstName);
            ref.child('contactLastName').set(contactLastName);
            ref.child('contactPhone').set(contactPhone);
            ref.child('contactEmail').set(contactEmail);
            ref.child('address').set(address);
            ref.child('city').set(city);
            ref.child('state').set(state);
            ref.child('zip').set(zip);
            ref.child('accountType').set(accountType);
            ref.child('companyName').set(companyName);
            ref.child('companyPhone').set(companyPhone);
            ref.child('companyUrl').set(companyUrl)
                .then(() => {
                    const status = 'host profile updated successfully.';
                    manageHostAccount(dispatch, status);
            });
        };
    }

    return (dispatch) => {
        firebase.database().ref(`/hosts/${currentUser.uid}/profile`)
            .push({
                contactFirstName,
                contactLastName,
                contactPhone,
                contactEmail,
                address,
                city,
                state,
                zip,
                accountType,
                companyName,
                companyPhone,
                companyUrl
            })
            .then(() => {
                const status = 'host profile created successfully.';
                manageHostAccount(dispatch, status);
        });
    };
};

export const hostDelete = () => {
    const { currentUser } = firebase.auth();

    return (dispatch) => {
        firebase.database().ref(`/hosts/${currentUser.uid}`)
            .remove()
            .then(() => {
                const status = 'host profile deleted successfully.';
                manageHostAccount(dispatch, status);
        });
    };
};

const manageHostAccount = (dispatch, status) => {
    dispatch({
        type: MANAGE_HOST_ACCOUNT,
        data: status
    });
};
