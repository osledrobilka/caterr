import React from 'react';
import { Text } from 'react-native';

const DefaultOption = ({ text }) => {
    const { optionsTextStyle } = styles;

    return (
        <Text style={optionsTextStyle}>
            {text}
        </Text>
    );
};

const styles = {
    optionsTextStyle: {
      /* Font Styling */
        fontSize: 14,
        color: '#A3AFB6',
        fontStyle: 'italic',
      /* Spacing */
        marginTop: 15,
        marginBottom: 20,
      /* Layout */
        justifyContent: 'center',
        alignSelf: 'center'
    }
};

export { DefaultOption };
