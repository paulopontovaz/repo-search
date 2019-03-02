import React from 'react';
import ReactDOM from 'react-dom';
import './assets/styles/index.scss';
import AppComponent from './components/app/app.component';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import reducer from './store/repositories/reducers';
import thunk from 'redux-thunk';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
    reducer,
    composeEnhancers(
        applyMiddleware(thunk)
    )
);

ReactDOM.render(
    <Provider store={store}>
        <AppComponent />
    </Provider>,
    document.getElementById('root'));
