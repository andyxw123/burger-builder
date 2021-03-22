import axiosOrder from '../../axios-orders';

export const ADD_INGREDIENT = 'ADD_INGREDIENT';
export const REMOVE_INGREDIENT = 'REMOVE_INGREDIENT';
export const SET_INGREDIENTS = 'SET_INGREDIENTS';
export const FETCH_INGREDIENTS_FAILED = 'FETCH_INGREDIENTS_FAILED';

export const addIngredient = (ingKey) => {
  return { type: ADD_INGREDIENT, key: ingKey };
};

export const removeIngredient = (ingKey) => {
  return { type: REMOVE_INGREDIENT, key: ingKey };
};

export const setIngredients = (ingredients) => {
  return { type: SET_INGREDIENTS, payload: ingredients };
};

export const fetchIngredientsFailed = () => {
    return { type: FETCH_INGREDIENTS_FAILED };
}

export const loadIngredientsAsync = () => {
  return (dispatch) => {
    dispatch(setIngredients(null));
    axiosOrder
      .get('/ingredients.json')
      .then(response => {
        dispatch(setIngredients(response.data));
      })
      .catch(error => {
        dispatch(fetchIngredientsFailed());
      });
  };
};
