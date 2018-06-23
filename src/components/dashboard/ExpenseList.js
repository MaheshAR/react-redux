import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';
import CurrencyFormatter from '../common/CurrencyFormatter';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import AddDailyExpense from './AddDailyExpense';
import ProgressBar from '../common/ProgressBar';

class ExpenseListComponent extends React.Component {
    constructor(props) {
        super(props);
        this.expenseId = +props.params.id;

        const monthlyExpenseObj = this.getDailyExpenseList(props.expenseList);

        this.state = {
            expenseId: +this.props.params.id,
            dailyExpenseList: monthlyExpenseObj.hasOwnProperty('expense') ? this.transformMonthlyExpenseObjToArray(monthlyExpenseObj.expense) : [],
            showAddDailyExpenseModal: false,
            monthName: monthlyExpenseObj.name,
            totalAmount: monthlyExpenseObj.amount,
            remainingAmount: monthlyExpenseObj.remainingAmount
        };

        this.addDailyExpense = this.addDailyExpense.bind(this);
        this.onModalBodyClick = this.onModalBodyClick.bind(this);

    }

    componentWillReceiveProps(props) {
        let monthlyExpenseObj = this.getDailyExpenseList(props.expenseList);

        this.setState({
            dailyExpenseList: this.transformMonthlyExpenseObjToArray(monthlyExpenseObj.expense),
            monthName: monthlyExpenseObj.name,
            totalAmount: monthlyExpenseObj.amount,
            remainingAmount: monthlyExpenseObj.remainingAmount
        });
    }

    getDailyExpenseList(expenses) {
        let expenseList = {};

        if (expenses.length) {
            expenseList = expenses.filter((obj) => {
                return (parseInt(obj.expenseId) == this.expenseId);
            })[0];
        }

        return expenseList;
    }

    transformMonthlyExpenseObjToArray(expenseObj) {
        let dailyExpenseList = [];

        Object.keys(expenseObj).forEach(function (exp) {
            dailyExpenseList.push(expenseObj[exp]);
        });

        return dailyExpenseList;
    }

    back() {
        browserHistory.push('/expenses');
    }

    addDailyExpense() {
        this.setState({ showAddDailyExpenseModal: true });
    }

    onModalBodyClick() {
        this.setState({ showAddDailyExpenseModal: false });
    }

    render() {
        const backText = '< Back';
        return (
            <div>
                <ReactCSSTransitionGroup transitionName="modal-animation" transitionEnterTimeout={500} transitionLeaveTimeout={500}>
                    {this.state.showAddDailyExpenseModal && <AddDailyExpense expenseId={this.state.expenseId} bodyClick={this.onModalBodyClick} />}
                </ReactCSSTransitionGroup>
                <div className="addExpense row">
                    {<p className="pull-left back" onClick={this.back.bind(this)}>{backText}</p>}
                    <button className="btn pull-right" onClick={this.addDailyExpense}>Add Daily Expense</button>
                </div>

                <div className="dailyExpense">
                    <div className="monthly-expense-highlight">
                        <p className="table-header">Expense for <b>{this.state.monthName}</b></p>
                        <p className="amounts">
                            <span>Total Amount: <b><CurrencyFormatter value={this.state.totalAmount} /></b></span>
                            <span>Remaining Amount: <b><CurrencyFormatter value={this.state.remainingAmount} /></b></span>
                        </p>
                        <ProgressBar value={this.state.remainingAmount} totalValue={this.state.totalAmount}/>
                    </div>
                    <table>
                        <thead>
                            <th>
                                <td>Day</td>
                            </th>
                            <th>
                                <td>Reason</td>
                            </th>
                            <th>
                                <td>Amount</td>
                            </th>
                        </thead>

                        <tbody>
                            {
                                this.state.dailyExpenseList.map((data, index) => {
                                    return (
                                        <tr key={index}>
                                            <td>{data.name}</td>
                                            <td>{data.reason}</td>
                                            <td><CurrencyFormatter value={data.amount} /></td>
                                        </tr>
                                    );
                                })
                            }
                        </tbody>
                    </table>
                </div>
            </div>
        );
    }
}

function mapStateToProps(state, ownProps) {
    return {
        expenseList: state.expense
    };
}

ExpenseListComponent.propTypes = {
    params: PropTypes.object.isRequired,
    expenseList: PropTypes.array
};

export default connect(mapStateToProps)(ExpenseListComponent);