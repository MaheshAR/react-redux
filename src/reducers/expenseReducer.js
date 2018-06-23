import * as types from '../actions/actionTypes';

export default function ExpenseReducer(state = [], action) {
    switch (action.type) {
        case types.EXPENSELIST:
            return action.data;

        case types.ADDMONTHLYEXPENSE:
            return [...state, Object.assign({}, action.data)];

        case types.ADDDAILYEXPENSE:
            const index = state.findIndex(function(data){return (data.expenseId == action.data.expenseId)});
            let newState = [...state.filter(expense => expense.expenseId !== action.data.expenseId)];

            return newState.slice(0, index).concat([action.data]).concat(newState.slice(index+1));

        default:
            return state;
    }
}