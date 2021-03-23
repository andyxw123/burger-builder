import React, { Component, Fragment } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import Layout from './components/Layout/Layout';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';
import Checkout from './containers/Checkout/Checkout';
import Orders from './containers/Orders/Orders';
import Auth from './containers/Auth/Auth';
import Logout from './containers/Auth/Logout/Logout';
import * as authActions from './store/auth/authActions';

class App extends Component {
  componentDidMount() {
    this.props.authCheckStateDispatch();
  }

  render() {
    let authRoutes = (
      <Fragment>
        <Route path='/checkout' component={Checkout} />
        <Route path='/orders' component={Orders} />
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
            <Route path='/auth' component={Auth} />
            <Route path='/burger-builder' component={BurgerBuilder} />
            {authRoutes}
            <Route
              render={() => (
                <h1 style={{ textAlign: 'center' }}>Not found...</h1>
              )}
            />
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
