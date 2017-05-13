import React from 'react';
import { View } from 'react-native';

/**
 *  Component creating a container division between the different elements on
    a card component.
 *  Adds border and other styling around each section of the card.
 */
const CardSection = ({ children, style }) => {
    const { viewStyle } = styles;
    return (
        /*
         *  Nice react-native trick here. If we pass in multiple styles wrapped
            in an array, any props in the the last item of the array will
            override their equivalent in any earlier style settings.
         */
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
