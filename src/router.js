import React from 'react';
import { Scene, Router } from 'react-native-router-flux';

import AuthPage from './components/auth-page.js';
import MainAdminPage from './components/main-admin-page.js';
import MainStaffPage from './components/main-staff-page.js';
import CreateStaffForm from './components/form/create-staff-form.js';
import MainHostPage from './components/main-host-page.js';
import CreateHostForm from './components/form/create-host-form.js';

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
                        title=''
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
                        title='Staff Application'
                    />
                </Scene>
                <Scene key='mainStaff'>
                    <Scene
                        key='staff'
                        component={MainStaffPage}
                        title='Staff Home'
                    />
                </Scene>
                <Scene key='createHost'>
                    <Scene
                        key='newHost'
                        component={CreateHostForm}
                        title='Host Application'
                    />
                </Scene>
                <Scene key='mainHost'>
                    <Scene
                        key='host'
                        component={MainHostPage}
                        title='Host Home'
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
             backgroundColor: '#4c4c4c',
             borderBottomColor: 'transparent',
             borderBottomWidth: 65
         },
         navBarTitleStyle: {
             color: '#B1DBF6',
             fontSize: 20,
             letterSpacing: 2,
             textAlign: 'center',
             fontFamily: 'NewsCycle'
         },
         barButtonTextStyle: {
             color: '#B1DBF6',
             fontSize: 20,
             fontFamily: 'Inconsolata-Regular'
         },
         barButtonIconStyle: {
             tintColor: '#B1DBF6',
         },
         sceneStyle: {
             paddingTop: 60
         }
     };

     export default RouterComponent;
