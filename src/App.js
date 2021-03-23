import React, { Component, Fragment } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import Layout from './components/Layout/Layout';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';
import Logout from './containers/Auth/Logout/Logout';
import * as authActions from './store/auth/authActions';
import asyncComp from './hoc/asyncComponent/asyncComponent';

const asyncAuth = asyncComp(() => import('./containers/Auth/Auth'));
const asyncCheckout = asyncComp(() => import('./containers/Checkout/Checkout'));
const asyncOrders = asyncComp(() => import('./containers/Orders/Orders'));

class App extends Component {
  componentDidMount() {
    this.props.authCheckStateDispatch();
  }

  render() {
    let authRoutes = (
      <Fragment>
        <Route path='/checkout' component={asyncCheckout} />
        <Route path='/orders' component={asyncOrders} />
        <Route path='/logout' component={Logout} />
      </Fragment>
    );

    if (!this.props.isAuth) {
      authRoutes = null;
    }

    return (
      <div>
        {/* <BrowserRouter> ...included in index.js*/}
        <Layout>
          <Switch>
            <Redirect exact from='/' to='/burger-builder' />
            <Route path='/auth' component={asyncAuth} />
            <Route path='/burger-builder' component={BurgerBuilder} />
            {authRoutes}
            <Redirect to='/' />
          </Switch>
        </Layout>
        {/* </BrowserRouter> */}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isAuth: !!state.auth.token,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    authCheckStateDispatch: () => dispatch(authActions.authCheckState()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
