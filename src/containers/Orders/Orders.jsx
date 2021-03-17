import React, { Component } from 'react';
import Order from './../../components/Order/Order';
import Spinner from './../../components/UI/Spinner/Spinner';
import axiosOrders from './../../axios-orders';
import axiosErrorHandler from './../../hoc/axiosErrorHandler/axiosErrorHandler';

class Orders extends Component {
  state = {
    orders: [],
    isBusy: false,
  };

  componentDidMount() {
    this.setState({ isBusy: true});
    axiosOrders.get('/orders.json')
        .then(response => {
            if (!response) {
                return;
            }

            const data = response.data;
            const orders = [];

            Object.keys(data).map(key => orders.push({ id:key, ...data[key]}));

            console.log(orders)
            this.setState({ orders: orders });
        })
        .finally(() => {
            this.setState({ isBusy: false});
        })
  }

  render() {
    const orderArray = this.state.orders || [];

    let orders = <h3 style={{ textAlign: 'center'}}>No orders</h3>;

    if (orderArray.length) {
      orders = orderArray.map((order) => <Order key={order.id} order={order} />);
    }

    if (this.state.isBusy) {
      orders = <Spinner message='Loading Orders' />;
    }

    return <div>{orders}</div>;
  }
}

export default axiosErrorHandler(Orders, axiosOrders);
