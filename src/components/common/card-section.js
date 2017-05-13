import React from 'react';
import { View } from 'react-native';

const CardSection = ({ children, style }) => {
    const { viewStyle } = styles;
    return (
        <View style={[viewStyle, style]}>
            {children}
        </View>
    );
};

const styles = {
    viewStyle: {
      /* Borders & Coloring */
        backgroundColor: '#fff',
        borderColor: '#ddd',
        borderBottomWidth: 1,
      /* Spacing */
        padding: 5,
      /* Layout */
        justifyContent: 'flex-start',
        flexDirection: 'row',
        position: 'relative'
    }
};

export { CardSection };
