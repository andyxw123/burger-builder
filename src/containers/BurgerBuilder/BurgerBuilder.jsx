import React, { Component, Fragment } from 'react';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import axiosOrder from '../../axios-orders';
import Spinner from './../../components/UI/Spinner/Spinner';
import axiosErrorHandler from '../../hoc/axiosErrorHandler/axiosErrorHandler';

import { connect } from 'react-redux';
import * as burgerActions from '../../store/burger/burgerActions';
import * as orderActions from './../../store/order/orderActions';

class BurgerBuilder extends Component {
  state = {
    purchasing: false,
    isBusy: false,
  };

  componentDidMount() {
    this.props.dispatchLoadIngredientsAsync();
  }

  getPurchaseState = () => {
    const sum = Object.keys(this.props.ingredients || [])
      .map((key) => this.props.ingredients[key])
      .reduce((sum, el) => sum + el, 0);

    return sum > 0;
  };

  purchaseHandler = () => {
    this.setState({ purchasing: true });
  };

  cancelPurchaseHandler = () => {
    this.setState({ purchasing: false });
  };

  purchaseContinuedHandler = () => {
    this.setState({ isBusy: true });

    this.props.dispatchPurchaseInit();

    this.props.history.push('/checkout');
  };

  render() {
    const disabledInfo = {
      ...this.props.ingredients,
    };

    for (let key in disabledInfo) {
      disabledInfo[key] = disabledInfo[key] <= 0;
    }

    let orderSummary = <Spinner />;

    if (!this.state.isBusy) {
      orderSummary = (
        <OrderSummary
          ingredients={this.props.ingredients}
          totalPrice={this.props.totalPrice}
          purchaseCancelled={this.cancelPurchaseHandler}
          purchaseContinued={this.purchaseContinuedHandler}
        />
      );
    }

    let burger = <Spinner />;

    if (this.props.error) {
      burger = <p>Failed to load ingredients</p>;
    } else if (this.props.ingredients) {
      burger = (
        <Fragment>
          <Modal
            show={this.state.purchasing}
            closed={this.cancelPurchaseHandler}
          >
            {orderSummary}
          </Modal>
          <Burger ingredients={this.props.ingredients} />
          <BuildControls
            ingredientAdded={this.props.dispatchAddIngredient}
            ingredientRemoved={this.props.dispatchRemoveIngredient}
            disabled={disabledInfo}
            // this.getPurchaseState() will execute whenever re-rendered, i.e. after adding/removing ingredients
            purchasable={this.getPurchaseState()}
            price={this.props.totalPrice}
            ordered={this.purchaseHandler}
          />
        </Fragment>
      );
    }

    return <Fragment>{burger}</Fragment>;
  }
}

const mapStateToProps = (state) => {
  return {
    ingredients: state.burger.ingredients,
    totalPrice: state.burger.totalPrice,
    error: state.burger.error,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    dispatchAddIngredient: (ingKey) =>
      dispatch({ type: burgerActions.ADD_INGREDIENT, key: ingKey }),
    dispatchRemoveIngredient: (ingKey) =>
      dispatch(burgerActions.removeIngredient(ingKey)),
    dispatchLoadIngredientsAsync: () =>
      dispatch(burgerActions.loadIngredientsAsync()),
    dispatchPurchaseInit: () => dispatch(orderActions.purchaseInit()),
  };
};

let component = connect(mapStateToProps, mapDispatchToProps)(BurgerBuilder);
component = axiosErrorHandler(component, axiosOrder);

export default component;
