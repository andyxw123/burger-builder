import React, { Fragment } from 'react';
import css from './Spinner.module.css';

const spinner = (props) => {
  return (
    <Fragment>
      {props.message && <h4 style={{ textAlign: 'center'}}>{props.message}</h4>}
      <div className={css.Loader}>Loading...</div>
    </Fragment>
  );
};

export default spinner;
