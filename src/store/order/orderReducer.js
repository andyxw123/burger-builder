import { createReducer } from '@reduxjs/toolkit';

import reducerBase from './../base/reducerBase';

import * as orderActions from './orderActions';

const initialState = {
    orders: [],
    isOrdersLoading: false,
    ordersError: '',
    isBusy: false,
    purchased: false
}

export default createReducer(initialState, {
    ...reducerBase,
    [orderActions.PURCHASE_INIT]: (state) => {
        state.purchased = false;
    },
    [orderActions.PURCHASE_BURGER_START]: (state) => {
        state.isBusy = true
    },
    [orderActions.PURCHASE_BURGER_SUCCESS]: (state, action) => {
        const newOrder = {
            ...action.orderData,
            id: action.orderId
        }

        state.orders = state.orders.concat(newOrder);
        state.purchased = true;
    },
    [orderActions.PURCHASE_BURGER_FAIL]: (state) => {
        state.isBusy = false;
    },
    [orderActions.PURCHASE_BURGER_END]: (state) => {
        state.isBusy = false;
    },
    [orderActions.SET_IS_ORDERS_LOADING]: (state, action) => {
        state.isOrdersLoading = action.payload
    },
    [orderActions.SET_ORDERS_ERROR]: (state, action) => {
        state.ordersError = action.payload
    },
    [orderActions.SET_ORDERS]: (state, action) => {
        state.orders = action.payload
    }
});