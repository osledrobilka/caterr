import React from 'react';
import Button from 'apsl-react-native-button';


/* The reusable, stateless button component */
const CustomButton = (props) => {
    const {
        onPress,
        children,
        customStyle,
        customTextStyle,
        loading,
        disabled,
        spinnerColor
    } = props;

    const loadingBool = loading || false;
    const disabledBool = disabled || false;
    const color = spinnerColor || '#FFFFFF';

    const { buttonStyle, textStyle } = styles;
    return (
        <Button
            onPress={onPress}
            style={[buttonStyle, customStyle]}
            textStyle={[textStyle, customTextStyle]}
            isLoading={loadingBool}
            isDisabled={disabledBool}
            activityIndicatorColor={color}
        >
            {children}
        </Button>
    );
    // OTHER PROPS
        // onLongPress
        // onPressOut
        // onPressIn
        // disabledStyle
};

const styles = {
    buttonStyle: {
        backgroundColor: '#318CE7',
        borderColor: '#318CE7',
        borderRadius: 5,
        marginRight: 10,
        marginLeft: 10
    },
    textStyle: {
        color: '#FFFFFF',
        fontFamily: 'SourceSansPro-Light',
        letterSpacing: 2
    }
};

export { CustomButton };