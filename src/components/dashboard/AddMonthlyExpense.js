import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as expenseActions from '../../actions/expenseActions';
import Notifications, { notify } from 'react-notify-toast';
import TextInput from '../common/TextInput';
import MonthPicker from '../common/MonthPicker';
import Loader from '../common/Loader';

class AddMonthlyExpense extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            formFields: {
                amount: ''
            },
            monthId: '',
            monthName: '',
            showLoader: false
        };

        this.setMonthId = this.setMonthId.bind(this);
        this.onAddMonthlyExpenseInputChange = this.onAddMonthlyExpenseInputChange.bind(this);
        this.onAddExpense = this.onAddExpense.bind(this);
    }

    onAddMonthlyExpenseInputChange(e) {
        let field = e.target.name;
        let formFields = this.state.formFields;

        formFields[field] = e.target.value;

        this.setState({ formFields: formFields });
    }

    setMonthId(monthDetails) {
        this.setState({ monthId: monthDetails.id, monthName: monthDetails.name });
    }

    onAddExpense(e) {
        e.preventDefault();
        if (this.state.formFields.amount && this.state.monthId) {
            let payload = {};

            payload.expenseId = this.state.monthId;
            payload.name = this.state.monthName;
            payload.amount = this.state.formFields.amount;

            this.setState({ showLoader: true });
            this.props.actions.addMonthlyExpense(payload).then((error) => {
                this.setState({ showLoader: false });

                if(error && !error.success){
                    notify.show(error.err);
                }
                else{
                    this.props.bodyClick();
                }
            })
        }
        else {
            notify.show('Please fill all fields');
        }
    }

    render() {
        return (
            <div className="modal-window">
                <Notifications />
                <div className="modal-window-overlay" onClick={this.props.bodyClick}>
                </div>

                <div className="addExpenseForm">

                    {this.state.showLoader && <Loader />}
                    <div className="header">
                        <h4>Add Expense</h4>
                    </div>
                    <form className="expenseForm">
                        <TextInput
                            type="number"
                            name="amount"
                            placeholder="Enter Total Amount"
                            onChange={this.onAddMonthlyExpenseInputChange}
                            value={this.state.formFields.amount}
                            label="Total Amount" />

                        <div className="form-field">
                            <label>Month</label>
                            <MonthPicker monthId={this.state.monthId} setMonthId={this.setMonthId} />
                        </div>

                        <div className="row action">
                            <button className="btn pull-right" onClick={this.onAddExpense}>ADD</button>
                        </div>
                    </form>
                </div>
            </div>
        );
    }
}

function mapStateToProps(state, ownProps) {
    return {};
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(expenseActions, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(AddMonthlyExpense);