import React, { Component, Fragment } from 'react';
import css from './Modal.module.css';
import Backdrop from './../Backdrop/Backdrop';

class modal extends Component {

  shouldComponentUpdate(nextProps, nextState) {
    //Only re-render the modal (and it's children) if the show flag changes
    return nextProps.show !== this.props.show;
  }

  render() {
    return (
      <Fragment>
        <Backdrop show={this.props.show} clicked={this.props.closed} />
        <div
          style={{
            transform: this.props.show
              ? 'translateY(0) '
              : 'translateY(-100vh)',
            opacity: this.props.show ? '1' : '0',
          }}
          className={css.Modal}
        >
          {this.props.children}
        </div>
      </Fragment>
    );
  }
}

export default modal;
