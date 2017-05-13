import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { CardSection } from './index';

/**
 *  Stateless component for all of the touchable headers throughout our app,
    including the login-form and the add-med-form.
 */
const TitleButton = (props) => {
    const {
        onPress,
        startIconName,
        startIconSize,
        startIconColor,
        title,
        endIconName,
        endIconSize,
        endIconColor,
        customTouchableStyle,
        customViewStyle,
        customStartViewStyle,
        customTitleStyle,
        customTitleViewStyle,
        customCardSectionStyle,
        customEndViewStyle
    } = props;

    const {
        cardSectionStyle,
        viewStyle,
        startViewStyle,
        titleStyle,
        titleViewStyle,
        endViewStyle,
    } = styles;

    return (
        <TouchableOpacity onPress={onPress} style={customTouchableStyle}>
            <CardSection style={[cardSectionStyle, customCardSectionStyle]}>
                <View style={[viewStyle, customViewStyle]}>
                    <View style={[startViewStyle, customStartViewStyle]}>
                        <Icon name={startIconName} size={startIconSize} color={startIconColor} />
                    </View>
                    <View style={[titleViewStyle, customTitleViewStyle]}>
                        <Text style={[titleStyle, customTitleStyle]}>
                            {title}
                        </Text>
                    </View>
                    <View style={[endViewStyle, customEndViewStyle]}>
                        <Icon name={endIconName} size={endIconSize} color={endIconColor} />
                    </View>
                </View>
            </CardSection>
        </TouchableOpacity>
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
    titleStyle: {
        color: '#23324D',
        fontSize: 17,
        lineHeight: 23,
        marginTop: -2,
        fontFamily: 'SourceSansPro-Light'
    },
    titleViewStyle: {
        justifyContent: 'flex-start',
        flexDirection: 'row',
        position: 'relative',
        flex: 14
    },
    endViewStyle: {
        justifyContent: 'center',
        flexDirection: 'row',
        position: 'relative',
        flex: 2
    }
};

export { TitleButton };
