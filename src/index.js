import 'babel-polyfill';
import React from 'react';
import { render } from 'react-dom';
import { Router, browserHistory } from 'react-router';
import {Provider} from 'react-redux';
import routes from './routes';
import configureStore from './stores/configureStore';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import './styles/common.css';
import './styles/login-component.css';
import './styles/dashboard.css';
import '../node_modules/react-month-picker/css/month-picker.css';
import '../node_modules/react-datepicker/dist/react-datepicker.css';

const store = configureStore();

render (
    <Provider store={store}>
       <Router history={browserHistory} routes={routes} />
    </Provider>,
    document.getElementById('app')
);