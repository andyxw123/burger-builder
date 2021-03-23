import axiosOrder from '../../axios-orders';

import { set } from './../base/actionsBase';

export const PURCHASE_BURGER_SUCCESS = 'PURCHASE_BURGER_SUCCESS';
export const PURCHASE_BURGER_FAIL = 'PURCHASE_BURGER_FAIL';
export const PURCHASE_BURGER_START = 'PURCHASE_BURGER_START';
export const PURCHASE_BURGER_END = 'PURCHASE_BURGER_END';
export const PURCHASE_INIT = 'PURCHASE_INIT';
export const SET_ORDERS = 'SET_ORDERS';
export const SET_IS_ORDERS_LOADING = 'SET_IS_ORDERS_LOADING';
export const SET_ORDERS_ERROR = 'SET_ORDERS_ERROR';

export const purchaseBurgerSuccess = (id, orderData) => {
  return {
    type: PURCHASE_BURGER_SUCCESS,
    orderId: id,
    orderData: orderData,
  };
};

export const purchaseBurgerFail = (error) => {
  return {
    type: PURCHASE_BURGER_FAIL,
    error: error,
  };
};

export const purchaseBurgerStart = () => {
  return {
    type: PURCHASE_BURGER_START,
  };
};

export const purchaseBurgerEnd = () => {
  return {
    type: PURCHASE_BURGER_END,
  };
};

export const purchaseBurgerAsync = (orderData) => {
  return (dispatch, getState) => {
    dispatch(purchaseBurgerStart());
    const token = getState().auth.token;

    axiosOrder
      .post(`orders.json?auth=${token}`, orderData)
      .then((response) => {
        dispatch(purchaseBurgerSuccess(response.data.name, orderData));
      })
      .catch((error) => {
        dispatch(purchaseBurgerFail(error));
      })
      .finally(() => {
        dispatch(purchaseBurgerEnd());
      });
  };
};

export const purchaseInit = () => {
  return {
    type: PURCHASE_INIT,
  };
};

export const setOrders = (orders) => {
  return {
    type: SET_ORDERS,
    payload: orders,
  };
};

export const setIsOrdersLoading = (isLoading) => {
  return {
    type: SET_IS_ORDERS_LOADING,
    payload: isLoading,
  };
};

export const setOrdersError = (error) => {
  return {
    type: SET_ORDERS_ERROR,
    payload: error,
  };
};

export const loadOrdersAsync = (token, userId) => {
  return (dispatch) => {
    dispatch(set("isOrdersLoading", true));
    dispatch(set("orders", null));
    dispatch(set("ordersError", null));

    const queryParams = `?auth=${token}&orderBy="userId"&equalTo="${userId}"`

    axiosOrder
      .get('/orders.json' + queryParams)
      .then((response) => {
        const data = response.data || {};

        const orders = [];
        Object.keys(data).map((key) => orders.push({ id: key, ...data[key] }));

        dispatch(setOrders(orders));
        //dispatch(actions.set("orders", orders));
      })
      .catch((error) => {
        dispatch(setOrdersError(error));
      })
      .finally(() => {
        dispatch(setIsOrdersLoading(false));
      });
  };
};
