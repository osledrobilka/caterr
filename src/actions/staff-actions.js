import firebase from 'firebase';
import {
    STAFF_FORM_UPDATE,
    CLEAR_STAFF_FORM,
    STAFF_FETCH_SUCCESS,
    TOGGLE_STAFF_DRAWER,
    MANAGE_STAFF_ACCOUNT
} from './types';

export const staffFormUpdate = ({ prop, value }) => ({
    type: STAFF_FORM_UPDATE,
    data: { prop, value }
});

export const clearStaffForm = () => ({
    type: CLEAR_STAFF_FORM
});

export const toggleStaffDrawer = (data) => ({
    type: TOGGLE_STAFF_DRAWER,
    data
});

export const staffFetch = (uid) => {
    return (dispatch) => {
        firebase.database().ref(`/staff/${uid}/profile`)
            .on('value', snapshot => {
                const data = snapshot.val();
                dispatch({ type: STAFF_FETCH_SUCCESS, data });
            });
    };
};

export const staffCreate = (data) => {
    const {
        uid,
        firstName,
        middleName,
        lastName,
        phone,
        email,
        address,
        city,
        state,
        zip
    } = data;

    const { currentUser } = firebase.auth();

    if (uid !== null) {
        return (dispatch) => {
            const ref = firebase.database().ref(`/staff/${currentUser.uid}/profile/${uid}`);

            ref.child('firstName').set(firstName);
            ref.child('middleName').set(middleName);
            ref.child('lastName').set(lastName);
            ref.child('phone').set(phone);
            ref.child('email').set(email);
            ref.child('address').set(address);
            ref.child('city').set(city);
            ref.child('state').set(state);
            ref.child('zip').set(zip)
                .then(() => {
                    const status = 'staff profile updated successfully.';
                    manageHostAccount(dispatch, status);
            });
        };
    }

    return (dispatch) => {
        firebase.database().ref(`/staff/${currentUser.uid}/profile`)
            .push({
                firstName,
                middleName,
                lastName,
                phone,
                email,
                address,
                city,
                state,
                zip
            })
            .then(() => {
                const status = 'staff profile created successfully.';
                manageHostAccount(dispatch, status);
        });
    };
};

export const staffDelete = () => {
    const { currentUser } = firebase.auth();

    return (dispatch) => {
        firebase.database().ref(`/staff/${currentUser.uid}`)
            .remove()
            .then(() => {
                const status = 'staff profile deleted successfully.';
                manageHostAccount(dispatch, status);
        });
    };
};

const manageHostAccount = (dispatch, status) => {
    dispatch({
        type: MANAGE_STAFF_ACCOUNT,
        data: status
    });
};
