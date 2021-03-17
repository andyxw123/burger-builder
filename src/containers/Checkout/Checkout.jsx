import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import CheckoutSummary from './../../components/Order/CheckoutSummary/CheckoutSummary';
import ContactData from './ContactData/ContactData';
import $ from 'jquery';

export default class Checkout extends Component {
  state = {
    ingredients: null,
    price: 0
  };

  componentDidMount() {
    const queryString = new URLSearchParams(this.props.location.search);

    // Convert to object
    const ingredients = Object.fromEntries(queryString);
    const price = +ingredients.price || 0;
    delete ingredients.price;

    // Convert all the values to numbers
    $.each(
      Object.keys(ingredients),
      (i, key) => (ingredients[key] = +ingredients[key])
    );

    this.setState({ ingredients: ingredients, price: price });
  }

  componentWillUnmount() {
    this.setState({ ingredients: null });
  }

  checkoutCancelledHandler = () => {
    // this.props.history.goBack();
    this.props.history.replace('/burger-builder');
  };

  checkoutContinuedHandler = () => {
    this.props.history.replace('/checkout/contact-data');
  };

  render() {
    return (
      <div>
        <CheckoutSummary
          ingredients={this.state.ingredients || {}}
          onCheckoutCancelled={this.checkoutCancelledHandler}
          onCheckoutContinued={this.checkoutContinuedHandler}
        />
        <Route
          path={this.props.match.url + '/contact-data'}
          render={(props) => (
            <ContactData
              {...props}
              ingredients={this.state.ingredients}
              price={this.state.price}
            />
          )}
        />
      </div>
    );
  }
}
