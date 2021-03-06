import React from 'react';
import { View } from 'react-native';

const Card = ({ children, style }) => {
    const { viewStyle } = styles;

    return (
        <View style={[viewStyle, style]}>
            {children}
        </View>
    );
};

const styles = {
    viewStyle: {
      /* Borders & Shadows */
        borderWidth: 1,
        borderRadius: 2,
        borderColor: '#ddd',
        borderBottomWidth: 0,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
      /* Spacing */
        marginLeft: 5,
        marginRight: 5,
        marginTop: 10,
      /* Layout */
        elevation: 1
    }
};

export { Card };
