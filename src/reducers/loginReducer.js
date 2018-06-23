import * as types from '../actions/actionTypes';

export default function LoginReducer(state={}, action){
    switch(action.type){
        case 'LOGIN':
            return action.data;

        case 'REGISTER':
            return action.data;
        
        default:
            return state;
    }
}