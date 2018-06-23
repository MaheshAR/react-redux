import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import { browserHistory } from 'react-router';
import * as loginActions from '../../actions/loginActions';
import TextInput from '../common/TextInput';
import Loader from '../common/Loader';
import Notifications, {notify} from 'react-notify-toast';
import * as commonUtils from '../../utils/common';

class LoginComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            formFields : {
                username: '',
                password: ''
            },
            showLoader: false
        };

        this.onLoginInputChange = this.onLoginInputChange.bind(this);
        this.onLogin = this.onLogin.bind(this);
        this.onRegister = this.onRegister.bind(this);
    }

    onLoginInputChange(e) {
        let field = e.target.name;
        let formFields = this.state.formFields;

        formFields[field] = e.target.value;

        this.setState({ formFields: formFields });
    }

    onLogin(e){
        e && e.preventDefault();
        this.setState({showLoader: true});
        this.props.actions.login(this.state.formFields).then(() => {
            const msg = this.props.login.success ? this.props.login.message : this.props.login.err;
            
            notify.show(msg);
            this.setState({showLoader: false});

            if(this.props.login.success){
                commonUtils.setUserInfo(this.props.login.result);
                browserHistory.push('/expenses');
            }
        })
    }

    onRegister(e){
        e.preventDefault();
        this.setState({showLoader: true});
        this.props.actions.register(this.state.formFields).then(() => {
            const msg = this.props.register.success ? this.props.register.message : this.props.register.err;
            
            notify.show(msg);
            this.setState({showLoader: false});

            this.props.register.success && this.onLogin();
        });
    }

    render() {
        return (
            <div className="login-component">
                <Notifications />
                <div className="login-body">
                    {this.state.showLoader && <Loader/>}
                    <div className="login-header">
                        <h4>Login</h4>
                    </div>
                    <form className="login-form">
                        <TextInput
                            type="text"
                            name="username"
                            placeholder="Enter username"
                            onChange={this.onLoginInputChange}
                            value={this.state.formFields.username} 
                            label="Username"/>

                        <TextInput
                            type="password"
                            name="password"
                            placeholder="Enter password"
                            onChange={this.onLoginInputChange}
                            value={this.state.formFields.password} 
                            label="Password"/>

                        <div className="actions">
                            <button className="btn btn-primary" type="button" disabled={!(this.state.formFields.username && this.state.formFields.password)} onClick={this.onRegister}>REGISTER</button>
                            <button className="btn btn-primary" type="button" disabled={!(this.state.formFields.username && this.state.formFields.password)} onClick={this.onLogin}>LOGIN</button>
                        </div>

                    </form>
                </div>
            </div>
        );
    }
}

function mapStateToProps(state, ownProps){
    return {
        login: state.login,
        register: state.register
    };
}

function mapDispatchToProps(dispatch){
    return {
        actions: bindActionCreators(loginActions, dispatch)
    };
}

LoginComponent.propTypes = {
    login: PropTypes.object,
    register: PropTypes.object,
    actions: PropTypes.object
};

export default connect(mapStateToProps, mapDispatchToProps)(LoginComponent);