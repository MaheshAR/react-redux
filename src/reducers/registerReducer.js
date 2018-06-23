import * as types from '../actions/actionTypes';

export default function RegisterReducer(state={}, action){
    switch(action.type){
        case 'REGISTER':
            return action.data;
        
        default:
            return state;
    }
}