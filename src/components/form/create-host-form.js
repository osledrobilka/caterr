import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Text, View, Switch } from 'react-native';
import { Actions, ActionConst } from 'react-native-router-flux';
import * as actions from '../../actions';
import { Card, CustomButton, Input, Title, CardSection } from '../common';

class CreateHostForm extends Component {
    componentWillMount() {
        const { hostFormUpdate, thisHost } = this.props;

        if (thisHost) {
            const {
                uid,
                contactFirstName,
                contactLastName,
                contactPhone,
                contactEmail,
                accountType,
                address,
                city,
                state,
                zip,
                companyName,
                companyPhone,
                companyWebsite
            } = thisHost;

            hostFormUpdate({ prop: 'uid', value: uid });
            hostFormUpdate({ prop: 'contactFirstName', value: contactFirstName });
            hostFormUpdate({ prop: 'contactLastName', value: contactLastName });
            hostFormUpdate({ prop: 'contactPhone', value: contactPhone });
            hostFormUpdate({ prop: 'contactEmail', value: contactEmail });
            hostFormUpdate({ prop: 'accountType', value: accountType });
            hostFormUpdate({ prop: 'address', value: address });
            hostFormUpdate({ prop: 'city', value: city });
            hostFormUpdate({ prop: 'state', value: state });
            hostFormUpdate({ prop: 'zip', value: zip });
            hostFormUpdate({ prop: 'companyName', value: companyName });
            hostFormUpdate({ prop: 'companyPhone', value: companyPhone });
            hostFormUpdate({ prop: 'companyWebsite', value: companyWebsite });
        }
    }

    createHost() {
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
            hostCreate,
            clearHostForm
        } = this.props;

        if (accountType) {
            hostCreate({
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
            });
        } else {
            hostCreate({
                contactFirstName,
                contactLastName,
                contactPhone,
                contactEmail,
                address,
                city,
                state,
                zip,
                accountType
            });
        }
        clearHostForm();
        Actions.hostMain({ type: ActionConst.RESET });
    }

    renderAdditionalDetails() {
        const {
            accountType,
            companyName,
            companyPhone,
            companyUrl,
            hostFormUpdate
        } = this.props;

        if (accountType) {
            return (
                <View>
                    <Input
                        value={companyName}
                        onChangeText={value => hostFormUpdate({
                            prop: 'companyName',
                            value
                        })}
                        placeholder={'Company Name'}
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
                        value={companyPhone}
                        onChangeText={value => hostFormUpdate({
                            prop: 'companyPhone',
                            value
                        })}
                        placeholder={'Company Phone Number'}
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
                        value={companyUrl}
                        onChangeText={value => hostFormUpdate({
                            prop: 'companyUrl',
                            value
                        })}
                        placeholder={'Company Website'}
                        autoCapitalize={'words'}
                        startIconName={'address-card'}
                        startIconSize={20}
                        startIconColor={'#23324D'}
                        selectionColor={'#0D47A1'}
                        keyboardType={'default'}
                        returnKeyType={'done'}
                        autoFocus={'true'}
                    />
                </View>
            );
        }
        return null;
    }

    render() {
        const {
            cardSectionStyle,
            italicTextStyle,
            cardStyle,
            viewStyle,
            buttonViewStyle,
            cardStyle2
        } = styles;
        const {
            hostFormUpdate,
            contactFirstName,
            contactLastName,
            contactPhone,
            contactEmail,
            accountType
        } = this.props;
        let accountTypeString = 'Individual';

        if (accountType) {
            accountTypeString = 'Company';
        }

        return (
            <View style={viewStyle}>
                <Card style={cardStyle}>
                    <Input
                        value={contactFirstName}
                        onChangeText={value => hostFormUpdate({
                            prop: 'contactFirstName',
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
                        value={contactLastName}
                        onChangeText={value => hostFormUpdate({
                            prop: 'contactLastName',
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
                        value={contactPhone}
                        onChangeText={value => hostFormUpdate({
                            prop: 'contactPhone',
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
                        value={contactEmail}
                        onChangeText={value => hostFormUpdate({
                            prop: 'contactEmail',
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
                    <View>
                        <Title
                            startIconName={'clock-o'}
                            startIconSize={20}
                            startIconColor={'#23324D'}
                            title={'Do you host events as an individual or a company?:'}
                            customTitleStyle={{ fontSize: 17 }}
                            customCardSectionStyle={{ marginTop: 15 }}
                        />
                        <CardSection style={[cardSectionStyle, { flexDirection: 'row' }]}>
                            <Switch
                                value={accountType}
                                onValueChange={value => hostFormUpdate({
                                    prop: 'accountType',
                                    value
                                })}
                                style={{ marginBottom: 10 }}
                            />
                        <Text style={italicTextStyle}>{accountTypeString}</Text>
                        </CardSection>
                    </View>
                    {this.renderAdditionalDetails()}
                </Card>
                <View style={buttonViewStyle}>
                    <Card style={cardStyle2}>
                        <CustomButton onPress={this.createHost.bind(this)}>
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
    },
    cardSectionStyle: {
        backgroundColor: '#FFFFFF',
        shadowColor: '#000',
        borderColor: '#FFFFFF',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
        width: 245
    },
    italicTextStyle: {
        // fontFamily: 'SourceSansPro-Light',
        paddingLeft: 15,
        fontSize: 16,
        fontStyle: 'italic',
        color: '#A3AFB6',
        marginTop: 2
    }
};

export default connect(({ host }, ownProps) => {
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
        companyUrl
    } = host;
    const { thisHost } = ownProps;

    return {
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
        thisHost
    };
}, actions)(CreateHostForm);
