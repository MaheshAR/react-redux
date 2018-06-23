import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import Loader from '../common/Loader';
import * as expenseActions from '../../actions/expenseActions';
import * as commonUtils from '../../utils/common';

class DashboardComponent extends React.Component {
    constructor(props) {
        super(props);

        this.userInfo = commonUtils.getUserInfo();

        this.state = {
            username: this.userInfo.username,
            showLoader: true
        };

        this.getExpenses();
    }

    getExpenses(){
        this.props.actions.getExpenses().then(() => {
            this.setState({showLoader: false});
        });
    }    

    render() {
        return (
            <div className="dashboard">
                {this.state.showLoader && <Loader />}
                <div className="header row">
                    <div className="col-xs-2"></div>
                    <div className="centerDiv col-xs-8">
                        <h4>
                            Expense Manager
                        </h4>
                    </div>
                    <div className="userInfo col-xs-2 padding0">
                        <p>Hello, {this.state.username}</p>
                    </div>
                </div>
                
                {this.props.children}
            </div>
        );
    }
}

function mapStateToProps(state, ownProps){
    return {
        expenseList: state.expense
    };
}

function mapDispatchToProps(dispatch){
    return {
        actions: bindActionCreators(expenseActions, dispatch)
    };
}

DashboardComponent.propTypes = {
    actions: PropTypes.object,
    children: PropTypes.object
};

export default connect(mapStateToProps, mapDispatchToProps)(DashboardComponent);