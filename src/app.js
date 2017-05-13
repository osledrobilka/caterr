import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import ReduxThunk from 'redux-thunk';
import firebase from 'firebase';
import reducers from './reducers';
import Router from './router';

class App extends Component {

    // componentWillMount() {
    //     /* Initialize Firebase */
    //     const config = {
    //         apiKey: '',
    //         authDomain: '',
    //         databaseURL: '',
    //         storageBucket: '',
    //         messagingSenderId: '',
    //         setPersistenceEnabled: true,
    //         keepSynced: true
    //     };
    //
    //     firebase.initializeApp(config);
    // }

    render() {
        const store = createStore(reducers, {}, applyMiddleware(ReduxThunk));

        return (
            <Provider store={store}>
                <View style={{ flex: 1 }}>
                        <Router connected={this.state.connected} />
                </View>
            </Provider>
        );
    }
}

export default App;


const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    },
    header: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
    },
    subheader: {
        textAlign: 'center',
        color: '#333333',
        marginBottom: 5,
    }
});
