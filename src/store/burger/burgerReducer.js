import { createReducer } from '@reduxjs/toolkit';
import reducerBase from './../base/reducerBase';
import * as burgerActions from './burgerActions';

export const INGREDIENT_PRICES = {
  salad: 0.5,
  bacon: 0.6,
  cheese: 0.4,
  meat: 1.3,
};

const initialState = {
  ingredients: null,
  totalPrice: 4,
  error: false,
};

const addIngredient = (state, action) => {
  state.ingredients[action.key] = state.ingredients[action.key] + 1;
  state.totalPrice = state.totalPrice + INGREDIENT_PRICES[action.key];
};

const removeIngredient = (state, action) => {
  state.ingredients[action.key] = state.ingredients[action.key] - 1;
  state.totalPrice = state.totalPrice - INGREDIENT_PRICES[action.key];
};

const setIngredients = (state, action) => {
  if (!action.payload) {
    state.ingredients = initialState.ingredients;
    state.totalPrice = initialState.totalPrice;
    return;
  }

  state.error = false;
  state.ingredients = action.payload;
};

const fetchIngredientsFailed = (state) => {
  state.error = true;
};

export default createReducer(initialState, {
  ...reducerBase,
  [burgerActions.ADD_INGREDIENT]: addIngredient,
  [burgerActions.REMOVE_INGREDIENT]: removeIngredient,
  [burgerActions.SET_INGREDIENTS]: setIngredients,
  [burgerActions.FETCH_INGREDIENTS_FAILED]: fetchIngredientsFailed,
});
