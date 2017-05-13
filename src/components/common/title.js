import React from 'react';
import { View, Text } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { CardSection } from './index';

const Title = (props) => {
    const {
        startIconName,
        startIconSize,
        startIconColor,
        title,
        endIconName,
        endIconSize,
        endIconColor,
        customViewStyle,
        customStartViewStyle,
        customTitleStyle,
        customTitleViewStyle,
        customEndViewStyle,
        customCardSectionStyle
    } = props;

    const {
        cardSectionStyle,
        viewStyle,
        startViewStyle,
        titleStyle,
        titleViewStyle,
        endViewStyle
    } = styles;

    const endIcon = () => {
        if (endIconName !== null) {
            return <Icon name={endIconName} size={endIconSize} color={endIconColor} />;
        }
        return null;
    };

    return (
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
                    {endIcon}
                </View>
            </View>
        </CardSection>
    );
};

const styles = {
    cardSectionStyle: {
        flexDirection: 'column',
        backgroundColor: '#F1F1F1',
        borderColor: '#F1F1F1',
        marginTop: 30,
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
        flex: 1
    }
};

export { Title };
