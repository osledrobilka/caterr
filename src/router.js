import React from 'react';
import { Scene, Router, Actions } from 'react-native-router-flux';
import AuthPage from './components/auth-page.js';
import MainAdminPage from './components/main-admin-page.js';
import MainStaffPage from './components/main-staff-page.js';
import CreateStaffForm from './components/create-staff-form.js';

// mainAdmin
// mainStaff
// createStaff
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
                        titleStyle={[navBarTitleStyle, { color: '#FFFFFF' }]}
                        navigationBarStyle={{ backgroundColor: '#0D47A1' }}
                        title=''
                        sceneStyle={{ paddingTop: 60 }}
                    />
                </Scene>
                <Scene key='mainAdmin'>
                    <Scene
                        key='admin'
                        component={MainAdminPage}
                        title='Home'
                        sceneStyle={{ paddingTop: 60 }}
                    />
                </Scene>
                {/*// rightTitle=''
                // onRight={() => {
                //     BleManager.stopScan()
                //     .then(() => {
                //         // Actions.drawer();
                //         Actions.name();
                //     });
                // }}
                // rightButtonTextStyle={barButtonTextStyle}*/}
                <Scene key='createStaff'>
                    <Scene
                        key='newStaff'
                        component={CreateStaffForm}
                        title='New Staff'
                        sceneStyle={{ paddingTop: 60 }}
                    />
                </Scene>
                <Scene key='mainStaff'>
                    <Scene
                        key='staff'
                        component={MainStaffPage}
                        title='Home'
                        sceneStyle={{ paddingTop: 60 }}
                    />
                </Scene>
                {/*<Scene
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
             backgroundColor: '#FAFAFA',
             borderBottomColor: 'transparent',
             borderBottomWidth: 65
         },
         navBarTitleStyle: {
             color: '#092949',
             fontSize: 26,
             letterSpacing: 2,
             marginTop: -7,
             textAlign: 'center',
         },
         barButtonTextStyle: {
             color: '#092949',
             fontSize: 20
         },
         barButtonIconStyle: {
             tintColor: '#092949'
         }
     };

     export default RouterComponent;
