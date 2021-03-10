import React, { Component, Fragment } from 'react';
import css from './Layout.module.css'
import Toolbar from './../Navigation/Toolbar/Toolbar';
import SideDrawer from './../Navigation/SideDrawer/SideDrawer';

class Layout extends Component {
  state = {
    showSideDrawer: false
  }

  toggleSideDrawerHandler = () => {
    this.setState((prevState) => {
      return { showSideDrawer: !prevState.showSideDrawer };
    })
  }

  render() {
    return (
      <Fragment>
        <Toolbar toggleSideDrawer={this.toggleSideDrawerHandler} />
        <SideDrawer open={this.state.showSideDrawer} closed={this.toggleSideDrawerHandler} />
        <main className={css.Content}>{this.props.children}</main>
      </Fragment>
    );
  }
};

export default Layout;
