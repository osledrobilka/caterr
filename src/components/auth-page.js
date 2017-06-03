/* eslint no-underscore-dangle: 0 */
import React, { Component } from 'react';
import { View, Text, Image, AsyncStorage } from 'react-native';
import { connect } from 'react-redux';

import { Actions } from 'react-native-router-flux';
import moment from 'moment';

import * as actions from '../actions';
import { CustomButton, Input, Spinner, Card, TitleButton } from './common';

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
                            lastLogin
                        };
                        console.log('details --> ', details);

                        if (regComplete) {
                            if (type === 'host') {

                            } else {

                            }
                        } else {
                            if (type === 'host') {

                            } else {

                            }
                        }
                    }
                }
            });
        this.focused = false;
    }

    /**
     *  Helper function for updating the string stored as application state,
        associated with our email input.
     */
    onEmailChange(text) {
        this.props.emailChanged(text);
    }

    /**
     *  Helper function for updating the string stored as application state,
        associated with our password input.
     */
    onPasswordChange(text) {
        this.props.passwordChanged(text);
    }

    /**
     *  Helper function used to create an action to initiate an authentication
        request to firebase on the onPress event of our login page button.
     */
    onSubmit(action) {
        const {
            email,
            password,
            loginUser,
            registerUser,
            loginError,
            loginUserStart,
            passwordReset
        } = this.props;
        const validateEmail = /[A-Z0-9._%+-]+@[A-Z0-9.-]+.[A-Z]{2,4}/igm;
        // test@test.example use for testing purposes
        // /.@./ ONLY REAL VALIDATION YOU CAN DO FOR AN EMAIL
        // TODO REMOVE EMAIL VALIDATION CODE
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
                registerUser({ emailAddress: EMAIL, password: PASSWORD });
            } else {
                loginUser({ emailAddress: EMAIL, password: PASSWORD });
            }
        }
    }

    focusPasswordInput() {
        this.focused = true;
    }

    openSupportUrl() {
        Linking.openURL('http://elliegrid.com/contact')
            .catch(err => console.log('Redirect error.', err));
    }

    renderInputs() {
        const { register, login, forgotPassword, email, password } = this.props;
        // TODO: populate input with storedEmail
        // let userEmail = null;
        // AsyncStorage.getItem('@email')
        //     .then(storedEmail => {
        //         console.log('storedEmail --> ', storedEmail);
        //         if (storedEmail !== null) {
        //             userEmail = storedEmail;
        //         }
        //     });

        const {
            cardStyle,
            sectionStyleCard,
            inputStyle,
            viewStyleInput,
            viewStyleStart
        } = styles;
        const placeholderTextColor = '#A3AFB6';
        const autoCapitalize = 'none';
        const startIconSize = 20;
        const startIconColor = '#EFF6FD';
        const returnKey = 'done';
        const selectionColor = '#FFFFFF';

        if (register || login) {
            return (
                <Card style={cardStyle}>
                    <Input
                        value={email}
                        onChangeText={this.onEmailChange.bind(this)}
                        placeholder={'Email'}
                        placeholderTextColor={placeholderTextColor}
                        autoCapitalize={autoCapitalize}
                        startIconName={'envelope'}
                        startIconSize={startIconSize}
                        startIconColor={startIconColor}
                        keyboardType={'email-address'}
                        selectionColor={selectionColor}
                        returnKey={returnKey}
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
                        placeholderTextColor={placeholderTextColor}
                        autoCapitalize={autoCapitalize}
                        startIconName={'key'}
                        startIconSize={startIconSize}
                        startIconColor={startIconColor}
                        keyboardType={'email-address'}
                        selectionColor={selectionColor}
                        returnKey={returnKey}
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
                        placeholderTextColor={placeholderTextColor}
                        autoCapitalize={autoCapitalize}
                        startIconName={'envelope'}
                        startIconSize={startIconSize}
                        startIconColor={startIconColor}
                        keyboardType={'email-address'}
                        selectionColor={selectionColor}
                        returnKey={returnKey}
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
            forgotPassword
        } = this.props;
        const {
            viewStyleButton,
            buttonStyle1,
            buttonStyle2,
            buttonStyle3,
            textStyleButton1,
            textStyleButton2
        } = styles;
        const { blue } = Colors;
        let disabledBool = false;
        let disabledBool2 = false;

        /**
         *  Conditional for determining if the spinner component should be
            rendered, while the authentication request takes place.
         */

        if (email === '' || password === '') {
            disabledBool = true;
        }

        if (email === '') {
            disabledBool2 = true;
        }

        if (loading) {
            return <Spinner />;
        }

        /**
         *  Default button component to be rendered below our email & password
            inputs, when no authentication request is taking place.
         */
        if (login) {
            return (
                <View style={viewStyleButton}>
                    <CustomButton
                        onPress={this.onSubmit.bind(this, 'login')}
                        customTextStyle={textStyleButton1}
                        customStyle={buttonStyle1}
                        disabled={disabledBool}
                        spinnerColor={blue}
                    >
                        Log In
                    </CustomButton>
                    <CustomButton
                        onPress={() => manageAuth({
                            prop: 'register',
                            value: true
                        })}
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
                        onPress={this.openSupportUrl}
                        customTextStyle={textStyleButton2}
                        customStyle={buttonStyle3}
                    >
                        Need help?
                        Contact Caterr's support team.
                    </CustomButton>
                </View>
            );
        } else if (register) {
            return (
                <View style={viewStyleButton}>
                    <CustomButton
                        onPress={this.onSubmit.bind(this, 'register')}
                        customTextStyle={textStyleButton1}
                        customStyle={buttonStyle1}
                        disabled={disabledBool}
                        spinnerColor={blue}
                    >
                        Sign Up
                    </CustomButton>
                    <CustomButton
                        onPress={() => manageAuth({
                            prop: 'login',
                            value: true
                        })}
                        customTextStyle={textStyleButton2}
                        customStyle={buttonStyle2}
                    >
                        Already have an account?
                        Login instead.
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
                        onPress={this.openSupportUrl}
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
                        spinnerColor={blue}
                    >
                        Send Password Reset Email
                    </CustomButton>
                    <CustomButton
                        onPress={() => manageAuth({
                            prop: 'login',
                            value: true
                        })}
                        customTextStyle={textStyleButton2}
                        customStyle={buttonStyle2}
                    >
                        Return to login.
                    </CustomButton>
                    <CustomButton
                        onPress={() => manageAuth({
                            prop: 'register',
                            value: true
                        })}
                        customTextStyle={textStyleButton2}
                        customStyle={buttonStyle3}
                    >
                        Need a new account?
                        Create one here.
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
        return (
            <View style={viewStyleButton}>
                <CustomButton
                    onPress={() => manageAuth({
                        prop: 'register',
                        value: true
                    })}
                    customTextStyle={textStyleButton1}
                    customStyle={buttonStyle1}
                    spinnerColor={blue}
                >
                    Sign Up
                </CustomButton>
                <CustomButton
                    onPress={() => manageAuth({
                        prop: 'login',
                        value: true
                    })}
                    customTextStyle={textStyleButton1}
                    customStyle={buttonStyle1}
                    spinnerColor={blue}
                >
                    Log In
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
        const {
            viewStyle,
            imageStyle,
            viewStyleImage,
            titleStyle
        } = styles;

        return (
            <View style={viewStyle}>
                <Text style={titleStyle}>Hello!</Text>
                <View style={viewStyleImage}>
                    <Image
                        style={imageStyle}
                        source={elliegridLogo}
                    />
                </View>
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
