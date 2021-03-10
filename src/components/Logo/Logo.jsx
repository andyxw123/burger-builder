import React from 'react';
import css from './Logo.module.css';

//Import logo here - the final location of the image will be determined
//by webpack when the project is disployed... {burgerLogo} will contain that
//relative path
import burgerLogo from '../../assets/images/burger-logo.png';

const logo = () => (
    <div className={css.Logo}>
        <img src={burgerLogo} alt="MyBurger" />
    </div>
)

export default logo;
