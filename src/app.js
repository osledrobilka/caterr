import React, { Component } from 'react';
import { View } from 'react-native';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import ReduxThunk from 'redux-thunk';
import firebase from 'firebase';
import reducers from './reducers';
import Router from './router';
import config from '../firebase-config';

class App extends Component {
    componentWillMount() {
        /* Initialize Firebase */
        firebase.initializeApp(config);
    }

    render() {
        const store = createStore(reducers, {}, applyMiddleware(ReduxThunk));

        return (
            <Provider store={store}>
                <View style={{ flex: 1 }}>
                        <Router />
                </View>
            </Provider>
        );
    }
}

export default App;


// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//         justifyContent: 'center',
//         alignItems: 'center',
//         backgroundColor: '#F5FCFF',
//     },
//     header: {
//         fontSize: 20,
//         textAlign: 'center',
//         margin: 10,
//     },
//     subheader: {
//         textAlign: 'center',
//         color: '#333333',
//         marginBottom: 5,
//     }
// });
