import { Colors } from './index';

const {
    customWhite,
    customBeige,
    // customGrey_exLight,
    // customGrey_light,
    // customGrey_med,
    customGreyDark,
    customBlue
} = Colors;

export const AuthPageStyles = {
    buttonStyle1: {
        backgroundColor: customWhite,
        borderColor: customWhite
    },
    buttonStyle2: {
        backgroundColor: customGreyDark,
        borderColor: customBlue,
        marginBottom: 5,
        marginTop: 20,
        height: 15
    },
    buttonStyle3: {
        backgroundColor: customGreyDark,
        borderColor: customBlue,
        marginTop: 5,
        marginBottom: 5,
        height: 15
    },
    cardStyle: {
        backgroundColor: customGreyDark,
        borderColor: customBlue,
        shadowColor: customBlue,
    },
    inputStyle: {
        backgroundColor: customGreyDark,
        fontSize: 20,
        color: customBeige,
        marginBottom: -3,
        height: 24
    },
    sectionStyleCard: {
        backgroundColor: customGreyDark,
        borderColor: customBlue,
        marginTop: -10
    },
    textStyleButton1: {
        color: customBlue
    },
    textStyleButton2: {
        color: customWhite,
        fontSize: 13
    },
    viewStyle: {
        backgroundColor: customGreyDark,
        flexDirection: 'column',
        flex: 1
    },
    viewStyleButton: {
        position: 'absolute',
        bottom: 20,
        right: 0,
        left: 0,
    },
    viewStyleInput: {
        borderBottomColor: customBeige,
        borderBottomWidth: 1,
        backgroundColor: customGreyDark,
        paddingBottom: 15
    },
    viewStyleStart: {
        marginTop: 2
    }
};
