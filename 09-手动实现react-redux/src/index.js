import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import createStore from './store';
import { Provider } from './react-redux';
import themeReducer from './reducer';

const store = createStore(themeReducer)

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>, document.getElementById('root'));
