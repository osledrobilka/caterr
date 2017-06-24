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
    LOGOUT_USER_FAIL,
    RESET_PASSWORD_SUCCESS,
    MANAGE_AUTH,
    RESET_SUCCESS,
    UPDATE_USER
} from './types';

export const manageAuth = ({ prop, value }) => ({
    type: MANAGE_AUTH,
    data: { prop, value }
});

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

export const resetSuccess = (message) => ({
    type: RESET_SUCCESS,
    data: message
});

export const updateUser = (data) => ({
    type: UPDATE_USER,
    data
});

export const passwordReset = (email) => {
    return (dispatch) => {
        firebase.auth().sendPasswordResetEmail(email)
            .then(() => {
                resetPasswordSuccess(
                    dispatch,
                    'Instructions to reset your password have been emailed to you.'
                );
            })
            .catch(() => {
                logoutUserFail(
                    dispatch,
                    'An error occurred, please try again.'
                );
            });
    };
};


export const loginUser = ({ emailAddress, password, type }) => {
    return (dispatch) => {
        firebase.auth().signInWithEmailAndPassword(emailAddress, password)
            .then(() => {
                let typeString = `reg-${type}`;
                const currentUser = firebase.auth().currentUser;
                console.log('currentUser --> ', currentUser);
                const lastLogin = new Date();
                const { uid, emailVerified, email } = currentUser;
                const userDetails = {
                    email,
                    lastLogin,
                    uid,
                };

                if (emailVerified) {
                    AsyncStorage.multiGet(
                        ['@email', '@uid', '@lastLogin', '@regComplete', '@type']
                    )
                        .then(values => {
                            if (values[0][4] === 'yes') {
                                if ((values[0][1] !== null) && (values[1][1] !== null)) {
                                AsyncStorage.setItem('@lastLogin', JSON.stringify(lastLogin))
                                    .then(() => {
                                    return loginUserSuccess(dispatch, userDetails, typeString);
                                    });
                                } else {
                                    AsyncStorage.multiSet([
                                        ['@email', email],
                                        ['@uid', uid],
                                        ['@lastLogin', JSON.stringify(lastLogin)],
                                    ])
                                    .then(() => {
                                    return loginUserSuccess(dispatch, userDetails, typeString);
                                    });
                                }
                            } else {
                                typeString = `reg-${type}`;
                                    AsyncStorage.multiSet([
                                        ['@email', email],
                                        ['@uid', uid],
                                        ['@lastLogin', JSON.stringify(lastLogin)],
                                        ['@regComplete', 'no']
                                    ])
                                    .then(() => {
                                    return loginUserSuccess(dispatch, userDetails, typeString);
                                    });
                            }
                        })
                        .catch(() => {
                            return loginUserSuccess(dispatch, userDetails, typeString);
                        });
                    // loginUserSuccess(dispatch, userDetails, typeString);
                } else {
                    // CASE: auth successful, but account not yet verified.
                    currentUser.sendEmailVerification()
                        .then(() => {
                            // CASE: account created & verification email sent successfully.
                            loginUserFail(
                                dispatch,
                        'We just sent you a verification email! Follow the instructions to log in'
                            );
                        })
                        .catch(() => {
                            // CASE: error sending verification email.
                            loginUserFail(
                                dispatch,
                                'There was an error verifying your account, please contact support.'
                            );
                        });
                }
             })
             .catch(() => {
                 // CASE: unsuccessful login attempt.
                 loginUserFail(dispatch, 'Invalid email/password combination.');
             });
     };
 };

export const createUser = ({ emailAddress, password, type }) => {
    return (dispatch) => {
        firebase.auth().createUserWithEmailAndPassword(emailAddress, password)
            .then(() => {
                const { currentUser } = firebase.auth();

                currentUser.sendEmailVerification()
                    .then(() => {
                        // CASE: account created & verification email sent successfully.
                        loginUserFail(
                            dispatch,
                            'Thanks for signing up, we just sent you a verification email!'
                        );
                        AsyncStorage.setItem('@type', type);
                    })
                    .catch(error => {
                        // CASE: account was created but there was an error
                        // sending the verification email.
                        console.log(error);

                        loginUserFail(
                            dispatch,
                            'Account created successfully. Please log in to verify your account.'
                        );
                        AsyncStorage.set('@type', type);
                    });
            })
            .catch(error => {
                const code = error.code;

                if (code === 'auth/weak-password') {
                    // CASE: weak password passed for account registration.
                    loginUserFail(dispatch, 'A stronger password is required.');
                } else if (code === 'auth/email-already-in-use') {
                    // CASE: email passed for account registration already in use.
                    loginUserFail(
                        dispatch,
                        'Email is already registered. Please log in.'
                    );
                } else {
                    // CASE: some other error occurred with registration.
                    loginUserFail(dispatch, 'Registration failed. Please try again later.');
                }
                console.log(error);
            });
    };
};

export const logoutUser = () => {
    return (dispatch) => {
        firebase.auth().signOut()
            .then(() => {
                logoutUserSuccess(
                    dispatch,
                    'You were successfully logged out.'
                );
            })
            .catch(() => {
                logoutUserFail(
                    dispatch,
                    'Logout unsuccessful, please try again.'
                );
            });
    };
};

const loginUserSuccess = (dispatch, data, type) => {
    console.log('here', type);
    dispatch({
        type: LOGIN_USER_SUCCESS,
        data
    });

    if (type === 'login-admin') {
        Actions.mainAdmin();
    } else if (type === 'login-staff') {
        Actions.mainStaff();
    } else if (type === 'reg-staff') {
        Actions.createStaff();
    } else if (type === 'login-host') {
        Actions.mainHost();
    } else if (type === 'reg-staff') {
        Actions.createHost();
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

const resetPasswordSuccess = (dispatch, message) => {
    dispatch({
        type: RESET_PASSWORD_SUCCESS,
        data: message
    });
};
