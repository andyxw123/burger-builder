import React, { Component, Fragment } from 'react';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import axiosOrder from '../../axios-orders';
import Spinner from './../../components/UI/Spinner/Spinner';
import axiosErrorHandler from '../../hoc/axiosErrorHandler/axiosErrorHandler';
import $ from 'jquery';

export const INGREDIENT_PRICES = {
  salad: 0.5,
  bacon: 0.6,
  cheese: 0.4,
  meat: 1.3,
};

class BurgerBuilder extends Component {
  state = {
    ingredients: null,
    totalPrice: 4,
    purchasable: false,
    purchasing: false,
    isBusy: false,
    error: null
  };

  componentDidMount() {
    axiosOrder.get('/ingredients.json').then((response) => {
      this.setState({ ingredients: response.data });
    })
    .catch(error => {
      this.setState({ error: true });
    })
  }

  updatePurchaseState = (ingredients) => {
    const sum = Object.keys(ingredients)
      .map((key) => ingredients[key])
      .reduce((sum, el) => sum + el, 0);

    this.setState({ purchasable: sum > 0 });
  };

  addIngredientHandler = (type) => {
    const oldCount = this.state.ingredients[type];
    const updatedCount = oldCount + 1;

    const updatedIngredients = {
      ...this.state.ingredients,
    };

    updatedIngredients[type] = updatedCount;

    const priceAddition = INGREDIENT_PRICES[type];

    const oldPrice = this.state.totalPrice;
    const newPrice = oldPrice + priceAddition;

    this.setState({
      ingredients: updatedIngredients,
      totalPrice: newPrice,
    });

    this.updatePurchaseState(updatedIngredients);
  };

  removeIngredientHandler = (type) => {
    const oldCount = this.state.ingredients[type];

    if (oldCount <= 0) {
      return;
    }

    const updatedCount = oldCount - 1;

    const updatedIngredients = {
      ...this.state.ingredients,
    };

    updatedIngredients[type] = updatedCount;

    const priceDeduction = INGREDIENT_PRICES[type];

    const oldPrice = this.state.totalPrice;
    const newPrice = oldPrice - priceDeduction;

    this.setState({
      ingredients: updatedIngredients,
      totalPrice: newPrice,
    });

    this.updatePurchaseState(updatedIngredients);
  };

  purchaseHandler = () => {
    this.setState({ purchasing: true });
  };

  cancelPurchaseHandler = () => {
    this.setState({ purchasing: false });
  };

  purchaseContinuedHandler = () => {
    this.setState({ isBusy: true });

    this.props.history.push({
        pathname: '/checkout',
        search: $.param({ ...this.state.ingredients, price: this.state.totalPrice})
    });
  };

  render() {
    const disabledInfo = {
      ...this.state.ingredients,
    };

    for (let key in disabledInfo) {
      disabledInfo[key] = disabledInfo[key] <= 0;
    }

    let orderSummary = <Spinner />;

    if (!this.state.isBusy) {
      orderSummary = (
        <OrderSummary
          ingredients={this.state.ingredients}
          totalPrice={this.state.totalPrice}
          purchaseCancelled={this.cancelPurchaseHandler}
          purchaseContinued={this.purchaseContinuedHandler}
        />
      );
    }

    let burger = <Spinner />;

    if (this.state.error) {
       burger = <p>Failed to load ingredients</p>
    } else if (this.state.ingredients) {
      burger = (
        <Fragment>
          <Modal
            show={this.state.purchasing}
            closed={this.cancelPurchaseHandler}
          >
            {orderSummary}
          </Modal>
          <Burger ingredients={this.state.ingredients} />
          <BuildControls
            ingredientAdded={this.addIngredientHandler}
            ingredientRemoved={this.removeIngredientHandler}
            disabled={disabledInfo}
            purchasable={this.state.purchasable}
            price={this.state.totalPrice}
            ordered={this.purchaseHandler}
          />
        </Fragment>
      );
    }

    return <Fragment>{burger}</Fragment>;
  }
}

export default axiosErrorHandler(BurgerBuilder, axiosOrder);
