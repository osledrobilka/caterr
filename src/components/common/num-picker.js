import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { CardSection } from './index';

/* The reusable, stateless button component */
const NumPicker = ({
    value,
    onPressButtonOne,
    onPressButtonTwo,
    customCardSectionStyle,
    customViewStyle
}) => {
    const {
        cardSectionStyle,
        viewStyle,
        innerViewStyle,
        buttonStyle,
        buttonViewStyle,
        textStyle
    } = styles;

    return (
        <CardSection style={[cardSectionStyle, customCardSectionStyle]}>
            <View style={[viewStyle, customViewStyle]}>
                <View style={[innerViewStyle, buttonViewStyle]}>
                    <TouchableOpacity onPress={onPressButtonOne} style={buttonStyle}>
                        <Icon name={'minus'} size={20} color={'#23324D'} />
                    </TouchableOpacity>
                </View>
                <View style={[innerViewStyle, { flex: 4, backgroundColor: '#FFFFFF' }]}>
                    <Text style={textStyle}>
                        {value}
                    </Text>
                </View>
                <View style={[innerViewStyle, buttonViewStyle]}>
                    <TouchableOpacity onPress={onPressButtonTwo} style={buttonStyle}>
                        <Icon name={'plus'} size={20} color={'#23324D'} />
                    </TouchableOpacity>
                </View>
            </View>
        </CardSection>
    );
};

const styles = {
    textStyle: {
        fontSize: 20,
        textAlign: 'center',
        color: '#23324D',
        fontFamily: 'SourceSansPro-Light'
    },
    cardSectionStyle: {
        flexDirection: 'column',
        backgroundColor: '#FFFFFF',
        borderTopColor: '#FFFFFF',
        marginTop: 0,
        paddingTop: 16,
        paddingBottom: 15
    },
    innerViewStyle: {
        justifyContent: 'center',
        flexDirection: 'row',
        position: 'relative'
    },
    viewStyle: {
        alignItems: 'center',
        flexDirection: 'row'
    },
    buttonViewStyle: {
        flex: 1,
        marginRight: 30,
        marginLeft: 30,
        borderRadius: 5,
        backgroundColor: '#F1F1F1',
        height: 38,
        width: 40
    },
    buttonStyle: {
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'center',
        flex: 1
    }
};

export { NumPicker };
