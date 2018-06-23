import * as apicall from './apiCall';
import * as commonUtils from '../utils/common';

class ExpenseApi{
    static getExpenses(){
        const userID = commonUtils.getUserInfo().id;
        const url = `/api/getExpenseById/${userID}`;
        const method = 'GET';

        return apicall.apiCall(url, method, {});
    }

    static addMonthlyExpense(payload){
        const url = '/api/addExpense';
        const method = 'POST';

        payload.userId = commonUtils.getUserInfo().id;

        return apicall.apiCall(url, method, payload);
    }

    static addDailyExpense(payload, expenseId){
        const userID = commonUtils.getUserInfo().id;
        const url = `/api/dailyExpense/${userID}/${expenseId}`;
        const method = 'POST';

        return apicall.apiCall(url, method, payload);
    }
}

export default ExpenseApi;