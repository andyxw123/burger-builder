import React, { Component } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import Layout from './components/Layout/Layout';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';
import Checkout from './containers/Checkout/Checkout';
import Orders from './containers/Orders/Orders';

export default class App extends Component {
  render() {
    return (
      <div>
        {/* <BrowserRouter> ...included in index.js*/}
          <Layout>
            <Switch>
              <Route path='/burger-builder' component={BurgerBuilder} />
              <Route path='/checkout' component={Checkout} />
              <Route path='/orders' component={Orders} />
              <Redirect exact from='/' to='/burger-builder' />
              <Route render={() => <h1 style={{ textAlign: 'center' }}>Not found...</h1>} />
            </Switch>
          </Layout>
        {/* </BrowserRouter> */}
      </div>
    );
  }
}
