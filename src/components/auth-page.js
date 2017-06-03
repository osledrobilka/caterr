/* eslint no-underscore-dangle: 0 */
/* eslint camelcase: 0 */
import React, { Component } from 'react';
import { View, AsyncStorage } from 'react-native';
import { connect } from 'react-redux';

import { Actions } from 'react-native-router-flux';
import moment from 'moment';

import * as actions from '../actions';
import { CustomButton, Input, Spinner, Card, Colors, AuthPageStyles } from './common';

const {
    customWhite,
    // customBeige,
    // customGrey_exLight,
    customGrey_light,
    // customGrey_med,
    customGrey_dark,
    customBlue
} = Colors;

const {
    buttonStyle1,
    buttonStyle2,
    buttonStyle3,
    cardStyle,
    inputStyle,
    sectionStyleCard,
    textStyleButton1,
    textStyleButton2,
    viewStyle,
    viewStyleButton,
    viewStyleInput,
    viewStyleStart
} = AuthPageStyles;

class AuthPage extends Component {
    componentWillMount() {
        AsyncStorage.multiGet(
            ['@email', '@uid', '@regComplete', '@type', '@lastLogin']
        )
            .then(storedDetails => {
                console.log('storedDetails --> ', storedDetails);

                if (storedDetails !== null) {
                    const email = storedDetails[0][1];
                    const uid = storedDetails[1][1];
                    const regComplete = storedDetails[2][1];
                    const type = storedDetails[3][1];
                    const lastLoginUTC = JSON.parse(storedDetails[4][1]);
                    const lastLoginMoment = moment(lastLoginUTC);
                    const timeExpired = moment(lastLoginMoment).add(1, 'h');
                    const currentTime = moment(new Date());

                    if (currentTime < timeExpired) {
                        const { updateUser } = this.props;

                        console.log('storedDetails --> ', storedDetails);
                        const lastLogin = lastLoginMoment._d;
                        const details = {
                            email,
                            uid,
                            lastLogin,
                            regComplete
                        };
                        console.log('details --> ', details);
                        updateUser({ type, details });

                        if (type === 'host') {
                            if (regComplete) {
                                Actions.mainHost();
                            } else {
                                Actions.createHost();
                            }
                        } else if (type === 'staff') {
                            if (regComplete) {
                                Actions.mainStaff();
                            } else {
                                Actions.createStaff();
                            }
                        } else if (type === 'admin') {
                            Actions.mainAdmin();
                        }
                    }
                }
            });
        this.focused = false;
    }

    onEmailChange(text) {
        this.props.emailChanged(text);
    }

    onPasswordChange(text) {
        this.props.passwordChanged(text);
    }

    onSubmit({ action, type }) {
        const {
            email,
            password,
            loginUser,
            createUser,
            loginError,
            loginUserStart,
            passwordReset
        } = this.props;

        const validateEmail = /[A-Z0-9._%+-]+@[A-Z0-9.-]+.[A-Z]{2,4}/igm;
        const EMAIL = email.trim();
        const PASSWORD = password.trim();
        let error = '';

        loginUserStart();

        if (action === 'reset') {
            if (EMAIL === '' || !validateEmail.test(EMAIL)) {
                error = 'Please enter a valid email address.';
                loginError(error);
            } else {
                passwordReset(EMAIL);
            }
        } else if (EMAIL === '' || !validateEmail.test(EMAIL) || PASSWORD.length < 8) {
            error = 'Invalid email/password combination.';
            if (action === 'register') {
                error = 'Please enter a valid email address.';
                if (PASSWORD.length < 8) {
                    error = 'Password must be at least 8 characters.';
                }
            }
            loginError(error);
        } else if (EMAIL && PASSWORD) {
            if (action === 'register') {
                createUser({ emailAddress: EMAIL, password: PASSWORD, type });
            } else {
                loginUser({ emailAddress: EMAIL, password: PASSWORD, type });
            }
        }
    }

    focusPasswordInput() {
        this.focused = true;
    }

    renderInputs() {
        const { register, login, forgotPassword, email, password } = this.props;

        if (register || login) {
            return (
                <Card style={cardStyle}>
                    <Input
                        value={email}
                        onChangeText={this.onEmailChange.bind(this)}
                        placeholder={'Email'}
                        placeholderTextColor={customGrey_light}
                        autoCapitalize={'none'}
                        startIconName={'envelope'}
                        startIconSize={20}
                        startIconColor={customGrey_dark}
                        keyboardType={'email-address'}
                        selectionColor={customWhite}
                        returnKey={'done'}
                        customInputStyle={inputStyle}
                        customViewStyle={viewStyleInput}
                        customCardSectionStyle={sectionStyleCard}
                        customStartViewStyle={viewStyleStart}
                        autoFocus={'true'}
                        onSubmitEditing={this.focusPasswordInput}
                    />
                    <Input
                        value={password}
                        onChangeText={this.onPasswordChange.bind(this)}
                        placeholder={'Password'}
                        placeholderTextColor={customGrey_light}
                        autoCapitalize={'none'}
                        startIconName={'key'}
                        startIconSize={20}
                        startIconColor={customGrey_dark}
                        keyboardType={'email-address'}
                        selectionColor={customWhite}
                        returnKey={'done'}
                        secureTextEntry={'true'}
                        customInputStyle={inputStyle}
                        customViewStyle={viewStyleInput}
                        customCardSectionStyle={sectionStyleCard}
                        customStartViewStyle={viewStyleStart}
                        isFocused={this.focused}
                    />
                </Card>
            );
        } else if (forgotPassword) {
            return (
                <Card style={cardStyle}>
                    <Input
                        value={email}
                        onChangeText={this.onEmailChange.bind(this)}
                        placeholder={'Email'}
                        placeholderTextColor={customGrey_light}
                        autoCapitalize={'none'}
                        startIconName={'envelope'}
                        startIconSize={20}
                        startIconColor={customGrey_dark}
                        keyboardType={'email-address'}
                        selectionColor={customWhite}
                        returnKey={'done'}
                        customInputStyle={inputStyle}
                        customViewStyle={viewStyleInput}
                        customCardSectionStyle={sectionStyleCard}
                        customStartViewStyle={viewStyleStart}
                        autoFocus={'true'}
                        onSubmitEditing={this.focusPasswordInput}
                    />
                </Card>
            );
        }
        return null;
    }

    renderButton() {
        const {
            loading,
            email,
            password,
            manageAuth,
            login,
            register,
            type,
            forgotPassword
        } = this.props;

        let disabledBool = false;
        let disabledBool2 = false;

        if (email === '' || password === '') {
            disabledBool = true;
        }

        if (email === '') {
            disabledBool2 = true;
        }

        if (loading) {
            return <Spinner />;
        }

        if (register && (type === '')) {
            return (
                <View style={viewStyleButton}>
                    <CustomButton
                        onPress={() => manageAuth({
                            prop: 'type',
                            value: 'host'
                        })}
                        customTextStyle={textStyleButton1}
                        customStyle={buttonStyle1}
                        disabled={false}
                        spinnerColor={customBlue}
                    >
                        I want Caterr to staff my next event.
                    </CustomButton>
                    <CustomButton
                        onPress={() => manageAuth({
                            prop: 'type',
                            value: 'staff'
                        })}
                        customTextStyle={textStyleButton1}
                        customStyle={buttonStyle1}
                        disabled={false}
                        spinnerColor={customBlue}
                    >
                        I want to join Caterr's team.
                    </CustomButton>
                    <CustomButton
                        onPress={() => {
                            manageAuth({ prop: 'type', value: '' });
                            manageAuth({ prop: 'login', value: true });
                        }}
                        customTextStyle={textStyleButton2}
                        customStyle={buttonStyle2}
                    >
                        Already have an account?
                        Login instead.
                    </CustomButton>
                    <CustomButton
                        onPress={() => console.log('contact support')}
                        customTextStyle={textStyleButton2}
                        customStyle={buttonStyle3}
                    >
                        Need help?
                        Contact Caterr's support team.
                    </CustomButton>
                </View>
            );
        } else if (login && (type !== '')) {
            return (
                <View style={viewStyleButton}>
                    <CustomButton
                        onPress={this.onSubmit.bind(this, { action: 'login', type })}
                        customTextStyle={textStyleButton1}
                        customStyle={buttonStyle1}
                        disabled={disabledBool}
                        spinnerColor={customBlue}
                    >
                        Log In
                    </CustomButton>
                    <CustomButton
                        onPress={() => {
                            manageAuth({ prop: 'type', value: '' });
                            manageAuth({ prop: 'register', value: true });
                        }}
                        customTextStyle={textStyleButton2}
                        customStyle={buttonStyle2}
                    >
                        Need a new account?
                        Create one here.
                    </CustomButton>
                    <CustomButton
                        onPress={() => manageAuth({
                            prop: 'forgotPassword',
                            value: true
                        })}
                        customTextStyle={textStyleButton2}
                        customStyle={buttonStyle3}
                    >
                        Trouble logging in?
                        Reset your password.
                    </CustomButton>
                    <CustomButton
                        onPress={() => console.log('contact support')}
                        customTextStyle={textStyleButton2}
                        customStyle={buttonStyle3}
                    >
                        Need help?
                        Contact Caterr's support team.
                    </CustomButton>
                </View>
            );
        } else if (register && (type !== '')) {
            return (
                <View style={viewStyleButton}>
                    <CustomButton
                        onPress={this.onSubmit.bind(this, { action: 'register', type })}
                        customTextStyle={textStyleButton1}
                        customStyle={buttonStyle1}
                        disabled={disabledBool}
                        spinnerColor={customBlue}
                    >
                        Sign Up
                    </CustomButton>
                    <CustomButton
                        onPress={() => {
                            manageAuth({ prop: 'type', value: '' });
                            manageAuth({ prop: 'login', value: true });
                        }}
                        customTextStyle={textStyleButton2}
                        customStyle={buttonStyle2}
                    >
                        Already have an account?
                        Login instead.
                    </CustomButton>
                    <CustomButton
                        onPress={() => console.log('contact support')}
                        customTextStyle={textStyleButton2}
                        customStyle={buttonStyle3}
                    >
                        Need help?
                        Contact Caterr's support team.
                    </CustomButton>
                </View>
            );
        } else if (forgotPassword) {
            return (
                <View style={viewStyleButton}>
                    <CustomButton
                        onPress={this.onSubmit.bind(this, 'reset')}
                        customTextStyle={textStyleButton1}
                        customStyle={buttonStyle1}
                        disabled={disabledBool2}
                        spinnerColor={customBlue}
                    >
                        Send Password Reset Email
                    </CustomButton>
                    <CustomButton
                        onPress={() => {
                            manageAuth({ prop: 'type', value: '' });
                            manageAuth({ prop: 'login', value: true });
                        }}
                        customTextStyle={textStyleButton2}
                        customStyle={buttonStyle2}
                    >
                        Return to login.
                    </CustomButton>
                    <CustomButton
                        onPress={() => {
                            manageAuth({ prop: 'type', value: '' });
                            manageAuth({ prop: 'register', value: true });
                        }}
                        customTextStyle={textStyleButton2}
                        customStyle={buttonStyle3}
                    >
                        Need a new account?
                        Create one here.
                    </CustomButton>
                    <CustomButton
                        onPress={() => console.log('contact support')}
                        customTextStyle={textStyleButton2}
                        customStyle={buttonStyle3}
                    >
                        Need help?
                        Contact Caterr's support team.
                    </CustomButton>
                </View>
            );
        }
        return (
            <View style={viewStyleButton}>
                <CustomButton
                    onPress={() => {
                        manageAuth({ prop: 'type', value: 'host' });
                        manageAuth({ prop: 'login', value: true });
                    }}
                    customTextStyle={textStyleButton1}
                    customStyle={buttonStyle1}
                    spinnerColor={customBlue}
                >
                    Host Log In
                </CustomButton>
                <CustomButton
                    onPress={() => {
                        manageAuth({ prop: 'type', value: 'staff' });
                        manageAuth({ prop: 'login', value: true });
                    }}
                    customTextStyle={textStyleButton1}
                    customStyle={buttonStyle1}
                    spinnerColor={customBlue}
                >
                    Staff Log In
                </CustomButton>
                <CustomButton
                    onPress={() => manageAuth({
                        prop: 'register',
                        value: true
                    })}
                    customTextStyle={textStyleButton1}
                    customStyle={buttonStyle1}
                    spinnerColor={customBlue}
                >
                    Create a Free Account
                </CustomButton>
                <CustomButton
                    onPress={() => manageAuth({
                        prop: 'forgotPassword',
                        value: true
                    })}
                    customTextStyle={textStyleButton2}
                    customStyle={buttonStyle2}
                >
                    Trouble logging in?
                    Reset your password.
                </CustomButton>
                <CustomButton
                    onPress={this.openSupportUrl}
                    customTextStyle={textStyleButton2}
                    customStyle={buttonStyle3}
                >
                    Need help?
                    Contact Caterr's support team.
                </CustomButton>
            </View>
        );
    }

    render() {
        return (
            <View style={viewStyle}>
                {this.renderInputs()}
                {this.renderButton()}
            </View>
        );
    }
}

export default connect(({ auth }) => {
    const { email, password, loading, login, register, forgotPassword } = auth;
    return { email, password, loading, login, register, forgotPassword };
}, actions)(AuthPage);
