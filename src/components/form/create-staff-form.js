import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View } from 'react-native';
import { Actions, ActionConst } from 'react-native-router-flux';
import * as actions from '../../actions';
import { Card, CustomButton, Input } from '../common';

class CreateStaffForm extends Component {
    componentWillMount() {
        const { staffFormUpdate, thisStaff } = this.props;

        if (thisStaff) {
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
            } = thisStaff;

            staffFormUpdate({ prop: 'uid', value: uid });
            staffFormUpdate({ prop: 'firstName', value: firstName });
            staffFormUpdate({ prop: 'middleName', value: middleName });
            staffFormUpdate({ prop: 'lastName', value: lastName });
            staffFormUpdate({ prop: 'phone', value: phone });
            staffFormUpdate({ prop: 'email', value: email });
            staffFormUpdate({ prop: 'address', value: address });
            staffFormUpdate({ prop: 'city', value: city });
            staffFormUpdate({ prop: 'state', value: state });
            staffFormUpdate({ prop: 'zip', value: zip });
        }
    }

    createStaff() {
        const {
            firstName,
            middleName,
            lastName,
            phone,
            email,
            address,
            city,
            state,
            zip,
            staffCreate,
            clearStaffForm,
            thisStaff
        } = this.props;

        let uid = null;

        if (thisStaff) {
            uid = thisStaff.uid;
        }

        staffCreate({
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
        });

        clearStaffForm();

        // TODO: ADD THIS KEY TO SCENE IN ROUTER
        Actions.staffMain({ type: ActionConst.RESET });
    }

    render() {
        const {
            cardStyle,
            viewStyle,
            buttonViewStyle,
            cardStyle2
        } = styles;
        const {
            staffFormUpdate,
            firstName,
            middleName,
            lastName,
            phone,
            email,
            address,
            city,
            state,
            zip
        } = this.props;

        return (
            <View style={viewStyle}>
                <Card style={cardStyle}>
                    <Input
                        value={firstName}
                        onChangeText={value => staffFormUpdate({
                            prop: 'firstName',
                            value
                        })}
                        placeholder={'First Name'}
                        autoCapitalize={'words'}
                        startIconName={'address-card'}
                        startIconSize={20}
                        startIconColor={'#23324D'}
                        selectionColor={'#0D47A1'}
                        keyboardType={'default'}
                        returnKeyType={'done'}
                        autoFocus={'true'}
                    />
                    <Input
                        value={middleName}
                        onChangeText={value => staffFormUpdate({
                            prop: 'middleName',
                            value
                        })}
                        placeholder={'Middle Name'}
                        autoCapitalize={'words'}
                        startIconName={'address-card'}
                        startIconSize={20}
                        startIconColor={'#23324D'}
                        selectionColor={'#0D47A1'}
                        keyboardType={'default'}
                        returnKeyType={'done'}
                        autoFocus={'true'}
                    />
                    <Input
                        value={lastName}
                        onChangeText={value => staffFormUpdate({
                            prop: 'lastName',
                            value
                        })}
                        placeholder={'Last Name'}
                        autoCapitalize={'words'}
                        startIconName={'address-card'}
                        startIconSize={20}
                        startIconColor={'#23324D'}
                        selectionColor={'#0D47A1'}
                        keyboardType={'default'}
                        returnKeyType={'done'}
                        autoFocus={'true'}
                    />
                    <Input
                        value={phone}
                        onChangeText={value => staffFormUpdate({
                            prop: 'phone',
                            value
                        })}
                        placeholder={'Phone Number'}
                        autoCapitalize={'words'}
                        startIconName={'address-card'}
                        startIconSize={20}
                        startIconColor={'#23324D'}
                        selectionColor={'#0D47A1'}
                        keyboardType={'default'}
                        returnKeyType={'done'}
                        autoFocus={'true'}
                    />
                    <Input
                        value={email}
                        onChangeText={value => staffFormUpdate({
                            prop: 'email',
                            value
                        })}
                        placeholder={'Email Address'}
                        autoCapitalize={'words'}
                        startIconName={'address-card'}
                        startIconSize={20}
                        startIconColor={'#23324D'}
                        selectionColor={'#0D47A1'}
                        keyboardType={'default'}
                        returnKeyType={'done'}
                        autoFocus={'true'}
                    />
                    <Input
                        value={address}
                        onChangeText={value => staffFormUpdate({
                            prop: 'address',
                            value
                        })}
                        placeholder={'Street Address'}
                        autoCapitalize={'words'}
                        startIconName={'address-card'}
                        startIconSize={20}
                        startIconColor={'#23324D'}
                        selectionColor={'#0D47A1'}
                        keyboardType={'default'}
                        returnKeyType={'done'}
                        autoFocus={'true'}
                    />
                    <Input
                        value={city}
                        onChangeText={value => staffFormUpdate({
                            prop: 'city',
                            value
                        })}
                        placeholder={'City'}
                        autoCapitalize={'words'}
                        startIconName={'address-card'}
                        startIconSize={20}
                        startIconColor={'#23324D'}
                        selectionColor={'#0D47A1'}
                        keyboardType={'default'}
                        returnKeyType={'done'}
                        autoFocus={'true'}
                    />
                    <Input
                        value={state}
                        onChangeText={value => staffFormUpdate({
                            prop: 'state',
                            value
                        })}
                        placeholder={'State'}
                        autoCapitalize={'words'}
                        startIconName={'address-card'}
                        startIconSize={20}
                        startIconColor={'#23324D'}
                        selectionColor={'#0D47A1'}
                        keyboardType={'default'}
                        returnKeyType={'done'}
                        autoFocus={'true'}
                    />
                    <Input
                        value={zip}
                        onChangeText={value => staffFormUpdate({
                            prop: 'zip',
                            value
                        })}
                        placeholder={'Zip Code'}
                        autoCapitalize={'words'}
                        startIconName={'address-card'}
                        startIconSize={20}
                        startIconColor={'#23324D'}
                        selectionColor={'#0D47A1'}
                        keyboardType={'default'}
                        returnKeyType={'done'}
                        autoFocus={'true'}
                    />
                </Card>
                <View style={buttonViewStyle}>
                    <Card style={cardStyle2}>
                        <CustomButton onPress={this.createStaff.bind(this)}>
                            Create Account
                        </CustomButton>
                    </Card>
                </View>
            </View>
        );
    }
}

const styles = {
    cardStyle: {
        backgroundColor: '#F1F1F1',
        borderColor: '#F1F1F1',
        shadowColor: '#F1F1F1',
        flex: 1,
    },
    buttonViewStyle: {
        alignSelf: 'center',
        justifyContent: 'flex-start',
        position: 'absolute',
        bottom: 60,
        flexDirection: 'row'
    },
    viewStyle: {
        backgroundColor: '#F1F1F1',
        flexDirection: 'column',
        flex: 1
    },
    cardStyle2: {
        backgroundColor: '#F1F1F1',
        borderColor: '#F1F1F1',
        shadowColor: '#F1F1F1',
        marginLeft: 0,
        marginRight: 0,
        flex: 1
    }
};

export default connect(({ staff }, ownProps) => {
    const {
        firstName,
        lastName,
        phone,
        email,
        address,
        city,
        state,
        zip,
    } = staff;
    const { thisStaff } = ownProps;

    return {
        firstName,
        lastName,
        phone,
        email,
        address,
        city,
        state,
        zip,
        thisStaff
    };
}, actions)(CreateStaffForm);
