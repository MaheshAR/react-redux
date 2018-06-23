import * as types from './actionTypes';
import ExpenseApi from '../api/expenseApi';

export function onExpensesLoad(data){
    return {type: types.EXPENSELIST, data};
}

export function onMonthlyExpenseAdded(data){
    return {type: types.ADDMONTHLYEXPENSE, data};
}

export function onDailyExpenseAdded(data){
    return {type: types.ADDDAILYEXPENSE, data};
}

function calculateRemainingAmount(expense){
    let remainingAmount = 0;
    
    Object.keys(expense.expense).forEach(exp => {
        if(expense.expense[exp].amount){
            remainingAmount = remainingAmount + parseInt(expense.expense[exp].amount);
        }
    });

    return remainingAmount;
}

export function getExpenses(){
    return function(dispatch){
        return ExpenseApi.getExpenses()
            .then(data => {
                data.result.forEach(expense => {
                    expense.remainingAmount = parseInt(expense.amount) - calculateRemainingAmount(expense);
                });
                dispatch(onExpensesLoad(data.result));
            })
            .catch(error => {
                dispatch(onExpensesLoad(error));
            });
    };
}

export function addMonthlyExpense(monthlyExpense){
    return function(dispatch){
        return ExpenseApi.addMonthlyExpense(monthlyExpense)
            .then(data => {
                data.result.remainingAmount = data.result.amount;
                dispatch(onMonthlyExpenseAdded(data.result));
            })
            .catch(error => {
                return error;
            });
    };
}

export function addDailyExpense(dailyExpense, expenseId){
    return function(disptach, getState){
        return ExpenseApi.addDailyExpense(dailyExpense, expenseId)
            .then(data => {
                data.result.remainingAmount = parseInt(data.result.amount) - calculateRemainingAmount(data.result);
                disptach(onDailyExpenseAdded(data.result));
            })
            .catch(error => {
                return error;
            });
    };
}