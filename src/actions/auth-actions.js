import { Actions } from 'react-native-router-flux';
import { AsyncStorage } from 'react-native';
import firebase from 'firebase';

import {
    EMAIL_CHANGED,
    PASSWORD_CHANGED,
    LOGIN_USER_SUCCESS,
    LOGIN_USER_FAIL,
    LOGIN_USER_START,
    LOGIN_ERROR,
    LOGOUT_USER_SUCCESS,
    LOGOUT_USER_FAIL
} from './types';

export const emailChanged = (text) => ({
    type: EMAIL_CHANGED,
    data: text
});

export const passwordChanged = (text) => ({
    type: PASSWORD_CHANGED,
    data: text
});

export const loginError = (error) => ({
    type: LOGIN_ERROR,
    data: error
});

export const loginUserStart = () => ({
    type: LOGIN_USER_START
});

export const loginUser = ({ emailAddress, password, type }) => {
     return (dispatch) => {
         firebase.auth().signInWithEmailAndPassword(emailAddress, password)
             .then(user => {
                const typeString = `login-${type}`;
                AsyncStorage.mergeItem('authData', JSON.stringify(user))
                .then(() => {
                    const name = user.providerData[0].displayName || '';
                    const email = user.providerData[0].email || '';
                    const profileImageUrl = user.providerData[0].photoURL || '';
                    return loginUserSuccess(dispatch, typeString, user, {
                        name,
                        email,
                        profileImageUrl
                    });
                });
                const name = user.providerData[0].displayName || '';
                const email = user.providerData[0].email || '';
                const profileImageUrl = user.providerData[0].photoURL || '';
                return loginUserSuccess(dispatch, type, user, {
                    name,
                    email,
                    profileImageUrl
                });
             })
             .catch(() => {
                 loginUserFail(dispatch, 'Invalid email/password combination.');
             });
     };
 };

 export const registerUser = ({ emailAddress, password }) => {
    const type = 'reg-staff';
    return (dispatch) => {
        firebase.auth().createUserWithEmailAndPassword(emailAddress, password)
            .then(authData => {
                const name = authData.providerData[0].displayName || '';
                const email = authData.providerData[0].email || '';
                const profileImageUrl = authData.providerData[0].photoURL || '';
                return loginUserSuccess(dispatch, type, authData, {
                    name,
                    email,
                    profileImageUrl
                });
            })
            .catch((error) => {
                const code = error.code;
                if (code === 'auth/weak-password') {
                    loginUserFail(dispatch, 'A stronger password is required.');
                } else if (code === 'auth/email-already-in-use') {
                    loginUserFail(
                        dispatch,
                        'Email is already registered. Please log in.'
                    );
                } else {
                    loginUserFail(dispatch, 'Registration Failed.');
                }
                console.log(error);
            });
    };
};

export const logoutUser = () => {
    return (dispatch) => {
        firebase.auth().signOut()
            .then(() => {
                logoutUserSuccess(dispatch, 'You were successfully logged out.');
            })
            .catch(() => {
                logoutUserFail(dispatch, 'Logout unsuccessful, please try again.');
            });
    };
};

const loginUserSuccess = (dispatch, type, user, authData) => {
    dispatch({
        type: LOGIN_USER_SUCCESS,
        data: {
            user,
            authData
        }
    });

    if (type === 'login-admin') {
        Actions.mainAdmin();
    } else if (type === 'login-staff') {
        Actions.mainStaff();
    } else if (type === 'reg-staff') {
        Actions.createStaff();
    }
};

const loginUserFail = (dispatch, error) => {
    dispatch({
        type: LOGIN_USER_FAIL,
        data: error
    });
};

const logoutUserSuccess = (dispatch, message) => {
    dispatch({
        type: LOGOUT_USER_SUCCESS,
        data: message
    });

    Actions.auth();
};

const logoutUserFail = (dispatch, error) => {
    dispatch({
        type: LOGOUT_USER_FAIL,
        data: error
    });
};
