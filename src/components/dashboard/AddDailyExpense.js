import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as expenseActions from '../../actions/expenseActions';
import Notifications, { notify } from 'react-notify-toast';
import TextInput from '../common/TextInput';
import Loader from '../common/Loader';
import Datepicker from '../common/DatePicker';

class AddDailyExpense extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            showLoader: false,
            formFields: {
                amount: '',
                reason: ''
            },
            date: ''
        };

        this.onAddDailyExpenseInputChange = this.onAddDailyExpenseInputChange.bind(this);
        this.setDate = this.setDate.bind(this);
        this.onAddDailyExpense = this.onAddDailyExpense.bind(this);
    }

    onAddDailyExpenseInputChange(e) {
        let field = e.target.name;
        let formFields = this.state.formFields;

        formFields[field] = e.target.value;

        this.setState({ formFields: formFields });
    }

    setDate(date){
        this.setState({date: date});
    }

    onAddDailyExpense(e){
        e.preventDefault();
        if(this.state.formFields.amount && this.state.formFields.reason && this.state.date){
            let payload = {};

            payload.name = this.state.date._d.toLocaleDateString();
            payload.dailyExpenseId = this.state.date.date();
            payload.amount = parseInt(this.state.formFields.amount);
            payload.reason = this.state.formFields.reason;

            this.setState({ showLoader: true });
            this.props.actions.addDailyExpense(payload, this.props.expenseId).then(error => {
                this.setState({ showLoader: false });

                if(error && !error.success){
                    notify.show(error.err);
                }
                else{
                    this.props.bodyClick();
                }
            })
        }
        else{
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
                        <h4>Add Daily Expense</h4>
                    </div>
                    <form className="expenseForm">
                        <div className="form-field">
                            <label>Date</label>
                            {<Datepicker expenseId={this.props.expenseId} setDate={this.setDate}/>}
                        </div>

                        <TextInput
                            type="number"
                            name="amount"
                            placeholder="Enter Amount"
                            onChange={this.onAddDailyExpenseInputChange}
                            value={this.state.formFields.amount}
                            label="Amount" />

                        <TextInput
                            type="text"
                            name="reason"
                            placeholder="Enter reason"
                            onChange={this.onAddDailyExpenseInputChange}
                            value={this.state.formFields.reason}
                            label="Reason" />

                        <div className="row action">
                            <button className="btn pull-right" onClick={this.onAddDailyExpense}>ADD</button>
                        </div>
                    </form>
                </div>
            </div>
        );
    }
}

// AddDailyExpense.propTypes = {
//     bodyClick: PropTypes.func,
//     expenseId: PropTypes.string
// };

function mapStateToProps(state, ownProps){
    return {};
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(expenseActions, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(AddDailyExpense);