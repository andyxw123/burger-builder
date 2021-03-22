import React, { Fragment } from 'react';
import css from './Order.module.css';

const order = (props) => {
  const order = props.order;

  const ingredientList = (
    <div className={css.Ingredients}>
      {Object.keys(order.ingredients).map((key, i) => (
        <Fragment>
          {i === 0 && <strong>Ingredients</strong>}
          <div key={key}>
            {key} ({order.ingredients[key]})
          </div>
        </Fragment>
      ))}
    </div>
  );

  const contact = order.contact;

  return (
    <div className={css.Order}>
      <p>
         <strong>Price: </strong>${order.price.toFixed(2)}
      </p>
      {ingredientList}
      <p><strong>Customer: </strong>{contact.name}</p>
    </div>
  );
};

export default order;
