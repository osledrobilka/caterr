// #4c4c4c Dk Grey
// #636363 Grey
// #d1d1d1 Lt Grey
// #f8f8f8 Off White
// #b1dbf6 Blue

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, Text } from 'react-native';
// import { View, Text, Image, AsyncStorage } from 'react-native';
// import { Actions } from 'react-native-router-flux';
import * as actions from '../actions';
import { CustomButton, Input, Spinner, Card, TitleButton } from './common';

class LoginForm extends Component {
    state = {
        action: 'login',
        type: null,
    };

    componentWillMount() {
        // AsyncStorage.getItem('authData')
        //     .then((authData) => {
        //         if (authData !== null) {
        //             // Actions.bluetooth();
        //             Actions.drawer();
        //         }
        // });
        this.focused = false;
    }

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
    onSubmit({ action, type }) {
        const {
            email,
            password,
            loginUser,
            registerUser,
            loginError,
            loginUserStart
        } = this.props;
        const validateEmail = /[A-Z0-9._%+-]+@[A-Z0-9.-]+.[A-Z]{2,4}/igm;
        const EMAIL = email.trim();
        const PASSWORD = password.trim();
        let error = '';

        loginUserStart();

        if (EMAIL === '' || !validateEmail.test(EMAIL) || PASSWORD.length < 8) {
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
                registerUser({ emailAddress: EMAIL, password: PASSWORD, type });
            } else {
                loginUser({ emailAddress: EMAIL, password: PASSWORD });
            }
        }
    }

    toggleType(type) {
        const currentType = this.state.type;

        if (type === currentType) {
            this.setState({ type: null });
        } else {
            this.setState({ type });
        }
    }

    focusPasswordInput() {
        this.focused = true;
    }

    renderButton() {
        const { email, password, loading } = this.props;
        const { action, type } = this.state;
        const {
            buttonViewStyle,
            buttonStyle1,
            buttonStyle2,
            buttonStyle3,
            buttonTextStyle1,
            buttonTextStyle2
        } = styles;
        let disabledBool = false;

        if (email === '' || password === '') {
            disabledBool = true;
        }

        if (loading) {
            return <Spinner />;
        } else if (action === 'login') {
            return (
                <View style={buttonViewStyle}>
                    <CustomButton
                        onPress={this.onSubmit.bind(this, { action, type: null })}
                        customTextStyle={buttonTextStyle1}
                        customStyle={buttonStyle1}
                        disabled={disabledBool}
                    >
                        Log In
                    </CustomButton>
                    <CustomButton
                        onPress={this.setState({ action: 'register' })}
                        customTextStyle={buttonTextStyle2}
                        customStyle={buttonStyle2}
                    >
                        New to Caterr?
                        Sign up for a free account!
                    </CustomButton>
                    <CustomButton
                        onPress={() => { console.log('Reset Password.'); }}
                        customTextStyle={buttonTextStyle2}
                        customStyle={buttonStyle2}
                    >
                        Trouble logging in?
                        Reset your email/password.
                    </CustomButton>
                    <CustomButton
                        onPress={() => { console.log('Contact Support.'); }}
                        customTextStyle={buttonTextStyle2}
                        customStyle={buttonStyle3}
                    >
                        Need help?
                        Contact Caterr's support team.
                    </CustomButton>
                </View>
            );
        } else if (action === 'register') {
            let hostCheckBox = 'square-o';
            let staffCheckBox = 'square-o';

            if (type === 'host') {
                hostCheckBox = 'check-square-o';
            } else if (type === 'staff') {
                staffCheckBox = 'check-square-o';
            }

            return (
                <View style={buttonViewStyle}>
                    <TitleButton
                        onPress={this.toggleType.bind(this, 'staff')}
                        startIconName={staffCheckBox}
                        startIconSize={20}
                        startIconColor={'#f8f8f8'}
                        title={'I want to join the Caterr team.'}
                    />
                    <TitleButton
                        onPress={this.toggleType.bind(this, 'host')}
                        startIconName={hostCheckBox}
                        startIconSize={20}
                        startIconColor={'#f8f8f8'}
                        title={'I want Caterr to staff my next event.'}
                    />
                    <CustomButton
                        onPress={this.onSubmit.bind(this, { action, type })}
                        customTextStyle={buttonTextStyle1}
                        customStyle={buttonStyle1}
                        disabled={disabledBool}
                    >
                        Sign Up
                    </CustomButton>
                </View>
            );
        }
    }

    render() {
        const { email, password, error } = this.props;
        const {
            viewStyle,
            headerTextStyle,
            headerViewStyle,
            errorTextStyle,
            cardStyle,
            cardSectionStyle,
            inputStyle,
            inputViewStyle,
            startViewStyle
        } = styles;
        const placeholderTextColor = '#A3AFB6';
        const autoCapitalize = 'none';
        const startIconSize = 20;
        const startIconColor = '#EFF6FD';
        const returnKey = 'done';
        const selectionColor = '#FFFFFF';

        return (
            <View style={viewStyle}>
                <View style={headerViewStyle}>
                    <Text style={headerTextStyle}>
                        Caterr
                    </Text>
                </View>
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
                        customViewStyle={inputViewStyle}
                        customCardSectionStyle={cardSectionStyle}
                        customStartViewStyle={startViewStyle}
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
                        customViewStyle={inputViewStyle}
                        customCardSectionStyle={cardSectionStyle}
                        customStartViewStyle={startViewStyle}
                        isFocused={this.focused}
                    />
                    <Text style={errorTextStyle}>
                        {error}
                    </Text>
                </Card>
                    {this.renderButton()}
            </View>
        );
    }
}

const styles = {
    errorTextStyle: {
        /* Font Styling */
        color: '#FF0080',
        fontSize: 14,
        /* Layout */
        alignSelf: 'center',
        paddingBottom: 25,
        letterSpacing: 2,
        paddingTop: 5,
        fontFamily: 'SourceSansPro-Light'
    },
    headerViewStyle: {
        paddingTop: 35,
        paddingBottom: 25,
        alignSelf: 'center'
    },
    inputStyle: {
        backgroundColor: '#0D47A1',
        fontSize: 20,
        color: '#EFF6FD',
        marginBottom: -3,
        height: 24
    },
    topInputStyle: {
        // marginTop: 0
    },
    viewStyle: {
        backgroundColor: '#0D47A1',
        flexDirection: 'column',
        flex: 1
    },
    inputViewStyle: {
        borderBottomColor: '#EFF6FD',
        borderBottomWidth: 1,
        backgroundColor: '#0D47A1',
        paddingBottom: 15,
    },
    cardStyle: {
        backgroundColor: '#0D47A1',
        borderColor: '#0D47A1',
        shadowColor: '#0D47A1',
    },
    cardSectionStyle: {
        backgroundColor: '#0D47A1',
        borderColor: '#0D47A1',
        marginTop: -10
    },
    startViewStyle: {
        marginTop: 2
    },
    buttonViewStyle: {
        position: 'absolute',
        bottom: 20,
        right: 0,
        left: 0,
    },
    buttonStyle1: {
        backgroundColor: '#FFFFFF',
        borderColor: '#FFFFFF'
    },
    buttonStyle2: {
        backgroundColor: '#0D47A1',
        borderColor: '#0D47A1',
        marginBottom: 5,
        marginTop: 20,
        height: 15
    },
    buttonStyle3: {
        backgroundColor: '#0D47A1',
        borderColor: '#0D47A1',
        marginTop: 5,
        height: 15
    },
    buttonTextStyle1: {
        color: '#0D47A1'
    },
    buttonTextStyle2: {
        color: '#FFFFFF',
        fontSize: 13
    }
};

export default connect(({ auth }) => {
    const { email, password, error, loading } = auth;
    return { email, password, error, loading };
}, actions)(LoginForm);
