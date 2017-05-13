import React from 'react';
import { View, ActivityIndicator } from 'react-native';

const Spinner = ({ size }) => {
    const { viewStyle } = styles;

    return (
        <View style={viewStyle}>
          <ActivityIndicator size={size || 'large'} />
        </View>
    );
};

const styles = {
    viewStyle: {
      /* Layout */
        alignSelf: 'center',
        flexDirection: 'column',
        flex: 1.5
    }
};

export { Spinner };
