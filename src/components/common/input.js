import React from 'react';
import { View, TextInput, Text } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { CardSection } from './index';

/**
 *  Stateless component for all of the input fields throughout our app,
    including the login-form and the add-med-form.
 */
const Input = (props) => {
    const {
        value,
        onChangeText,
        placeholder,
        secureTextEntry,
        keyboardType,
        placeholderTextColor,
        selectionColor,
        autoCapitalize,
        startIconName,
        startIconSize,
        startIconColor,
        endIconName,
        endIconSize,
        endIconColor,
        customViewStyle,
        customStartViewStyle,
        customInputStyle,
        customEndViewStyle,
        returnKeyType,
        customCardSectionStyle,
        onSubmitEditing,
        endLabel,
        autoFocus,
        isFocused
    } = props;

    const {
        cardSectionStyle,
        viewStyle,
        startViewStyle,
        inputStyle,
        endViewStyle,
        textStyle
    } = styles;

    let securitySetting = false;
    if (secureTextEntry === 'true') {
        securitySetting = true;
    }

    let focusSetting = false;
    if (autoFocus === 'true') {
        focusSetting = true;
    }

    let endIcon = null;

    if (endIconName !== null) {
        endIcon = () => {
            return <Icon name={endIconName} size={endIconSize} color={endIconColor} />;
        };
    }

    return (
        <CardSection style={[cardSectionStyle, customCardSectionStyle]}>
            <View style={[viewStyle, customViewStyle]}>
                <View style={[startViewStyle, customStartViewStyle]}>
                    <Icon name={startIconName} size={startIconSize} color={startIconColor} />
                </View>
                <TextInput
                    placeholder={placeholder}
                    autoCorrect={false}
                    style={[inputStyle, customInputStyle]}
                    value={value}
                    onChangeText={onChangeText}
                    keyboardType={keyboardType}
                    placeholderTextColor={placeholderTextColor}
                    selectionColor={selectionColor}
                    autoCapitalize={autoCapitalize}
                    returnKeyType={returnKeyType}
                    secureTextEntry={securitySetting}
                    onSubmitEditing={onSubmitEditing}
                    autoFocus={focusSetting}
                    isFocused={isFocused}
                />
                <View style={[endViewStyle, customEndViewStyle]}>
                    <Text style={textStyle}>{endLabel}{endIcon}</Text>
                </View>
            </View>
        </CardSection>
    );
};

const styles = {
    cardSectionStyle: {
        flexDirection: 'column',
        backgroundColor: '#FFFFFF',
        borderTopColor: '#FFFFFF',
        marginTop: 30,
        paddingTop: 16,
        paddingBottom: 15
    },
    viewStyle: {
        alignItems: 'flex-start',
        flexDirection: 'row'
    },
    startViewStyle: {
        justifyContent: 'center',
        flexDirection: 'row',
        position: 'relative',
        flex: 3
    },
    inputStyle: {
        color: '#092949',
        fontSize: 18,
        lineHeight: 30,
        justifyContent: 'flex-start',
        flexDirection: 'row',
        position: 'relative',
        flex: 14,
        fontFamily: 'SourceSansPro-Light',
        height: 20
    },
    textStyle: {
        color: '#092949',
        fontSize: 15,
        marginTop: 2
    },
    endViewStyle: {
        justifyContent: 'center',
        flexDirection: 'row',
        position: 'relative',
        flex: 2
    }
};

export { Input };
