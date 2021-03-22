import React, { Component } from 'react';
import { connect } from 'react-redux';

import css from './ContactData.module.css';

import Button from './../../../components/UI/Button/Button';
import Spinner from './../../../components/UI/Spinner/Spinner';
import Form from '../../../components/UI/Forms/Form';

import axiosOrder from '../../../axios-orders';
import axiosErrorHandler from '../../../hoc/axiosErrorHandler/axiosErrorHandler';
import * as ordersActions from '../../../store/order/orderActions';


class ContactData extends Component {
  state = {
    isFormValid: false,
    // Configuration to build the order form
    orderFormConfig: {
      name: {
        tag: 'input',               //The type of form element to create
        label: 'Your Name',         //Text for label above the form element
        config: {                   //Attributes to decorate the form element
          type: 'text',
          placeholder: 'Your Name',
        },
        validation: {               //Validation rules 
          required: true,
        },
        error: null,                //Error message to display below the form element
        touched: false,             //Flag indicating whether the use has "touched" the form element
        value: '',                  //The value of the form element
        onChange: null,             //Change handler function
      },
      street: {
        tag: 'input',
        config: {
          type: 'text',
          placeholder: 'Street',
        },
        validation: {
          required: true,
        },
        error: null,
        touched: false,
        value: '',
      },
      zipCode: {
        tag: 'input',
        config: {
          type: 'text',
          placeholder: 'Postal Code',
        },
        validation: {
          required: true,
          minLength: 5,
          maxLength: 10,
        },
        error: null,
        touched: false,
        value: '',
      },
      country: {
        tag: 'input',
        config: {
          type: 'text',
          placeholder: 'Country',
        },
        validation: {
          required: true,
        },
        error: null,
        touched: false,
        value: '',
      },
      email: {
        tag: 'input',
        config: {
          type: 'email',
          placeholder: 'Email',
        },
        validation: {
          required: true,
        },
        error: null,
        touched: false,
        value: '',
      },
      deliveryMethod: {
        tag: 'select',
        options: [
          { value: 'fastest', display: 'Fastest' },
          { value: 'cheapest', display: 'Cheapest' },
        ],
        value: 'fastest',
      },
    },
  };

  submitOrderHandler = (event) => {
    //Prevent default otherwise the page will be reloaded
    //(with a URL containing form data in key/value)
    event.preventDefault();

    if (!this.state.isFormValid) {
      return;
    }

    const contactData = {};

    //Extract the values from the orderFormConfig
    Object.keys(this.state.orderFormConfig).map(
      (key) => (contactData[key] = this.state.orderFormConfig[key].value)
    );

    const order = {
      ingredients: this.props.ingredients,
      price: this.props.price, //In prod would re-calculate price on the server
      contact: contactData,
    };

    this.props.dispatchPurchaseBurgerAsync(order);
  };

  checkValidity(value, rules) {
    if (!rules) {
      return true;
    }

    let error = null;

    if (rules.required && !value.trim()) {
      error = 'Required';
    }

    if (!error && rules.minLength && value.length < rules.minLength) {
      error = `Min length is ${rules.minLength}`;
    }

    if (!error && rules.maxLength && value.length > rules.maxLength) {
      error = `Max length is ${rules.maxLength}`;
    }

    return error;
  }

  checkFormValidity(formConfig) {
    let isFormValid = true;

    for (let key in formConfig) {
      isFormValid =
        isFormValid &&
        (!(formConfig[key].validation || {}).required ||
          (formConfig[key].touched && !formConfig[key].error));
    }

    return isFormValid;
  }

  //Enable two way binding on the form
  formInputChanged = (e) => {
    //Do a deep copy of the form config first
    const updatedForm = JSON.parse(JSON.stringify(this.state.orderFormConfig));

    const field = e.target.name;
    const value = e.target.value;

    updatedForm[field].touched = true;
    updatedForm[field].value = value;
    updatedForm[field].error = this.checkValidity(
      value,
      updatedForm[field].validation
    );

    this.setState({ orderFormConfig: updatedForm });

    const isFormValid = this.checkFormValidity(updatedForm);

    this.setState({ isFormValid: isFormValid });
  };

  render() {
    let form = (
      <Form
        formConfig={this.state.orderFormConfig}
        onChange={this.formInputChanged}
        onSubmit={this.submitOrderHandler}
        isValid={this.state.isFormValid}
      >
        <Button btnType='Success' disabled={!this.state.isFormValid}>
          PLACE MY ORDER
        </Button>
      </Form>
    );

    if (this.props.isBusy) {
      form = <Spinner message='Placing order...' />;
    }

    return (
      <div className={css.ContactData}>
        {!this.props.isBusy && <h4>Enter your contact info...</h4>}
        {form}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    ingredients: state.burger.ingredients,
    price: state.burger.totalPrice,
    isBusy: state.order.isBusy
  }
};

const mapDispatchToProps = dispatch => {
  return {
    dispatchPurchaseBurgerAsync: (orderData) => dispatch(ordersActions.purchaseBurgerAsync(orderData))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(axiosErrorHandler(ContactData, axiosOrder));