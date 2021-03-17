import React from 'react';
import Burger from './../../Burger/Burger';
import Button from './../../UI/Button/Button';
import css from './CheckoutSummary.module.css';

const checkoutSummary = (props) => {
  return (
    <div className={css.CheckoutSummary}>
      <h1>Mmmmm... looks tasty!</h1>
      <div style={{ width: '100%', margin: '0 auto' }}></div>
      <Burger ingredients={props.ingredients} />
      <Button btnType='Danger' clicked={props.onCheckoutCancelled}>CANCEL</Button>
      <Button btnType='Success' clicked={props.onCheckoutContinued}>CONTINUE</Button>
    </div>
  );
};

export default checkoutSummary;
