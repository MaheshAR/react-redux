import React from 'react';
import { Route, IndexRoute } from 'react-router';
import App from './components/App';
import LoginComponent from './components/login/Login';
import DashboardComponent from './components/dashboard/Dashboard';
import ExpensesComponent from './components/dashboard/Expenses';
import ExpenseListComponent from './components/dashboard/ExpenseList';
import DummyComponent from './components/dashboard/dummy';
import * as commonUtils from './utils/common';

const requireAuth = (nextState, replace) => {
  const userInfo = commonUtils.getUserInfo();

  if(userInfo === null || Object.keys(userInfo).length === 0){
    replace({ pathname: '/' })
  }
}

export default (
  <Route path="/" component={App}>
    <IndexRoute component={LoginComponent} />
    <Route path="login" component={LoginComponent} />
    <Route component={DashboardComponent} onEnter={requireAuth}>
      <Route path="/expenses" component={ExpensesComponent}/>
      <Route path="/expenses/:id" component={ExpenseListComponent}/>
      <Route path="/dummy" component={DummyComponent}/>
    </Route>
  </Route>
);
