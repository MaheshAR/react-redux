import {combineReducers} from 'redux';
import login from './loginReducer';
import register from './registerReducer';
import expense from './expenseReducer';

const rootReducer = combineReducers({
    login,
    register,
    expense
});

export default rootReducer;
