import React from 'react';
import { Text } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const IconButton = (props) => {
    const {
        name,
        color,
        backgroundColor,
        onPress,
        label,
        customButtonStyle,
        size
    } = props;

    const {
        buttonStyle,
        textStyle
    } = styles;

    const sizeProp = size || 15;

    return (
        <Icon.Button
            name={name}
            color={color}
            backgroundColor={backgroundColor}
            onPress={onPress}
            style={[buttonStyle, customButtonStyle]}
            size={sizeProp}
            height={30}
            paddingLeft={16}
        >
            <Text style={textStyle}>
                {label}
            </Text>
        </Icon.Button>
    );
};

const styles = {
    buttonStyle: {
    },
    textStyle: {
        fontFamily: 'SourceSansPro-Light'
    }
};

export { IconButton };
