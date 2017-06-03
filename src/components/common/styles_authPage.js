import { Colors } from './index';

const {
    customWhite,
    customBeige,
    // customGrey_exLight,
    // customGrey_light,
    // customGrey_med,
    customGrey_dark,
    customBlue
} = Colors;

export const AuthPageStyles = {
    buttonStyle1: {
        backgroundColor: customWhite,
        borderColor: customWhite
    },
    buttonStyle2: {
        backgroundColor: customGrey_dark,
        borderColor: customBlue,
        marginBottom: 5,
        marginTop: 20,
        height: 15
    },
    buttonStyle3: {
        backgroundColor: customGrey_dark,
        borderColor: customBlue,
        marginTop: 5,
        marginBottom: 5,
        height: 15
    },
    cardStyle: {
        backgroundColor: customGrey_dark,
        borderColor: customBlue,
        shadowColor: customBlue,
    },
    inputStyle: {
        backgroundColor: customGrey_dark,
        fontSize: 20,
        color: customBeige,
        marginBottom: -3,
        height: 24
    },
    sectionStyleCard: {
        backgroundColor: customGrey_dark,
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
        backgroundColor: customGrey_dark,
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
        backgroundColor: customGrey_dark,
        paddingBottom: 15
    },
    viewStyleStart: {
        marginTop: 2
    }
};
