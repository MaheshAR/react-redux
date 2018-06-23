import * as types from './actionTypes';
import LoginApi from '../api/loginApi';

export function onLogin(data) {
    return { type: types.LOGIN, data };
}

export function onRegister(data) {
    return { type: types.REGISTER, data };
}

export function login(data) {
    return function (dispatch) {
        return LoginApi.login(data)
            .then(data => {
                dispatch(onLogin(data));
            })
            .catch(error => {
                dispatch(onLogin(error));
            });
    };
}

export function register(data){
    return function(dispatch){
        return LoginApi.register(data)
            .then(data => {
                dispatch(onRegister(data));
            })
            .catch(error => {
                dispatch(onRegister(error));
            })
    }
}