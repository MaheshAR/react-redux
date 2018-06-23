import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import { browserHistory } from 'react-router';
import CurrencyFormatter from '../common/CurrencyFormatter';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import AddMonthlyExpense from './AddMonthlyExpense';

class ExpensesComponent extends React.Component{
    constructor(props){
        super(props);

        const expenseList = props.expenseList.length ? props.expenseList : [];

        this.state = {
            expenseList: expenseList,
            showAddExpenseModal: false
        };

        this.addExpense = this.addExpense.bind(this);
        this.onModalBodyClick = this.onModalBodyClick.bind(this);
    }

    componentWillReceiveProps(props){
        this.setState({expenseList: props.expenseList});
    }

    onExpenseClick(id){
        browserHistory.push(`expenses/${id}`);
    }

    addExpense(){
        this.setState({showAddExpenseModal: true});
    }

    onModalBodyClick(){
        this.setState({showAddExpenseModal: false});
    }

    render(){
        return(
            <div>
                <div className="dashboardContent">
                    <ReactCSSTransitionGroup transitionName="modal-animation" transitionEnterTimeout={500} transitionLeaveTimeout={500}>
                        {this.state.showAddExpenseModal && <AddMonthlyExpense bodyClick={this.onModalBodyClick}/>}
                    </ReactCSSTransitionGroup>

                    <div className="addExpense row">
                        <button className="btn pull-right" onClick={this.addExpense}>Add Expense</button>
                    </div>

                    {
                        this.state.expenseList.length > 0 ? 
                            <div className="expenseList">
                                <ul className="list clearfix">
                                    {
                                        this.state.expenseList.map((data, index) => {
                                            return (
                                                <li key={index} onClick={this.onExpenseClick.bind(this, data.expenseId)}>
                                                    <h4>
                                                        {data.name}
                                                    </h4>
                                                    <p>Total Amount:
                                                        <CurrencyFormatter value = {data.amount} />
                                                    </p>
                                                    <p>Remaining Amount: 
                                                        <CurrencyFormatter value = {data.remainingAmount} />
                                                    </p>
                                                </li>
                                            );
                                        })
                                    }
                                </ul>
                            </div>
                            :
                            <h4 className="addExpenseTitle">No Expense to show, add expense</h4>
                    }

                </div>
            </div>
        );
    }
}

function mapStateToProps(state, ownProps){
    return {
        expenseList: state.expense
    };
}

ExpensesComponent.propTypes = {
    expenseList: PropTypes.array
};

export default connect(mapStateToProps)(ExpensesComponent);
