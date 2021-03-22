import React, { Component } from 'react';
import { connect } from 'react-redux';

import Order from './../../components/Order/Order';
import Spinner from './../../components/UI/Spinner/Spinner';
import axiosOrders from './../../axios-orders';
import axiosErrorHandler from './../../hoc/axiosErrorHandler/axiosErrorHandler';
import * as orderActions from '../../store/order/orderActions';

class Orders extends Component {

  componentDidMount() {
    this.props.dispatchLoadOrdersAsync();
  }

  render() {
    const orderArray = this.props.orders || [];

    let orders = this.props.orders ? <h3 style={{ textAlign: 'center'}}>No orders</h3> : null;

    if (this.props.isLoading) {
      orders = <Spinner message='Loading Orders' />;
    }
    else if (orderArray.length) {
      orders = orderArray.map((order) => <Order key={order.id} order={order} />);
    }
    else if (this.props.error) {
      orders = <h3 style={{ textAlign: 'center', color: 'red'}}>Failed to load orders</h3>
    }

    return <div>{orders}</div>;
  }
}

const mapStateToProps = state => {
  return {
    orders: state.order.orders,
    isLoading: state.order.isOrdersLoading,
    error: state.order.ordersError
  }
}

const mapDispatchToProps = dispatch => {
  return {
    dispatchLoadOrdersAsync: () => dispatch(orderActions.loadOrdersAsync()),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(axiosErrorHandler(Orders, axiosOrders));
