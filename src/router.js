import React from 'react';
import { Scene, Router } from 'react-native-router-flux';

import AuthPage from './components/auth-page.js';
import MainAdminPage from './components/main-admin-page.js';
import MainStaffPage from './components/main-staff-page.js';
import CreateStaffForm from './components/form/create-staff-form.js';
import MainHostPage from './components/main-host-page.js';
import CreateHostForm from './components/form/create-host-form.js';
import Colors from './components/common';

const {
    // customBeige,
    // customGrey_light,
    // customGrey_med,
    customGrey_dark,
    customBlue
} = Colors;

const RouterComponent = () => {
    const {
        navBarStyle,
        navBarTitleStyle,
        barButtonTextStyle,
        barButtonIconStyle,
        sceneStyle
    } = styles;

    return (
            <Router
                navigationBarStyle={navBarStyle}
                titleStyle={navBarTitleStyle}
                barButtonTextStyle={barButtonTextStyle}
                barButtonIconStyle={barButtonIconStyle}
                sceneStyle={sceneStyle}
            >
                <Scene key='authForm'>
                    <Scene
                        key='auth'
                        component={AuthPage}
                        title='Caterr'
                    />
                </Scene>
                <Scene key='mainAdmin'>
                    <Scene
                        key='admin'
                        component={MainAdminPage}
                        title='Home'
                    />
                </Scene>
                <Scene key='createStaff'>
                    <Scene
                        key='newStaff'
                        component={CreateStaffForm}
                        title='New Staff'
                    />
                </Scene>
                <Scene key='mainStaff'>
                    <Scene
                        key='staff'
                        component={MainStaffPage}
                        title='Home'
                    />
                </Scene>
                <Scene key='createHost'>
                    <Scene
                        key='newHost'
                        component={CreateHostForm}
                        title='New Host'
                    />
                </Scene>
                <Scene key='mainHost'>
                    <Scene
                        key='host'
                        component={MainHostPage}
                        title='Home'
                    />
                </Scene>
                {/*
                    <Scene key='regForm'>
                        <Scene
                            key='reg'
                            component={AuthPage}
                            title=''
                            sceneStyle={{ paddingTop: 60 }}
                        />
                    </Scene>
                // rightTitle=''
                // onRight={() => {
                //     BleManager.stopScan()
                //     .then(() => {
                //         // Actions.drawer();
                //         Actions.name();
                //     });
                // }}
                // rightButtonTextStyle={barButtonTextStyle}
                <Scene
                    key='drawer'
                    component={LeftNavigationDrawer}
                    open={false}
                    duration={0}
                >
                    <Scene key='grid'>
                        <Scene
                            key='main'
                            component={MainPage}
                            title='Your Grid'
                            sceneStyle={{ paddingTop: 60 }}
                            leftTitle={
                                <Icon
                                    name={'bars'}
                                    size={20}
                                    color={'#092949'}
                                />
                            }
                            onLeft={
                                () => {
                                    Actions.refresh({
                                        key: 'drawer',
                                        component: LeftNavigationDrawer,
                                        open: value => !value
                                    });
                                }
                            }
                        />
                        <Scene
                            key='medForm'
                            component={AddMed}
                            title='Add Medication'
                            sceneStyle={{ paddingTop: 60 }}
                            titleStyle={{ fontSize: 18, marginTop: 5 }}
                        />
                    </Scene>
                </Scene>*/}
            </Router>
         );
     };

     const styles = {
         navBarStyle: {
             backgroundColor: customGrey_dark,
             borderBottomColor: 'transparent',
             borderBottomWidth: 65
         },
         navBarTitleStyle: {
             color: customBlue,
             fontSize: 26,
             letterSpacing: 2,
             textAlign: 'center',
             fontFamily: 'Inconsolata-Regular'
         },
         barButtonTextStyle: {
             color: customBlue,
             fontSize: 20,
             fontFamily: 'Inconsolata-Regular'
         },
         barButtonIconStyle: {
             tintColor: customBlue,
         },
         sceneStyle: {
             paddingTop: 60
         }
     };

     export default RouterComponent;
