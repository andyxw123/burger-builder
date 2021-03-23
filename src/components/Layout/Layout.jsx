import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
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
        <Toolbar isAuth={this.props.isAuthenticated} toggleSideDrawer={this.toggleSideDrawerHandler} />
        <SideDrawer isAuth={this.props.isAuthenticated} open={this.state.showSideDrawer} closed={this.toggleSideDrawerHandler} />
        <main className={css.Content}>{this.props.children}</main>
      </Fragment>
    );
  }
};

const mapStateToProps = state => {
  return {
      isAuthenticated: !!state.auth.token
  }
}


export default connect(mapStateToProps)(Layout);
