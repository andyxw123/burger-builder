import React from 'react';
import css from './Backdrop.module.css';

const backdrop = (props) => (
    props.show ? <div className={css.Backdrop} onClick={props.clicked} style={{ cursor: props.clicked ? 'pointer' : null}} /> : null
)

export default backdrop;
