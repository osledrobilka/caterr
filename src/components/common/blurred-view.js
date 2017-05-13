import React from 'react';
import { Modal, View } from 'react-native';
import { BlurView } from 'react-native-blur';

const BlurredView = ({ isVisible, children, drawerChildren }) => {
    const { background, outerView, innerView } = styles;
    let drawerHeight = 413;
    if (drawerChildren === 'doseTimesPicker') {
        drawerHeight = 532;
    }

    return (
        <Modal
            animationType={'slide'}
            visible={isVisible}
            transparent
        >
            <BlurView style={background} blurType='light' blurAmount={3} >
                <View style={outerView}>
                    <View style={[innerView, { height: drawerHeight }]}>
                        {children}
                    </View>
                </View>
            </BlurView>
        </Modal>
    );
};

const styles = {
    background: {
        flex: 1,
        justifyContent: 'center'
    },
    innerView: {
        height: 383,
        width: 380,
        backgroundColor: '#FFFFFF',
    },
    outerView: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'flex-end',
        alignItems: 'center'
    }
};

export { BlurredView };
