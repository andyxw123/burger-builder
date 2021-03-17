import React, { Component } from 'react';
import css from './ContactData.module.css';

import Button from './../../../components/UI/Button/Button';
import Spinner from './../../../components/UI/Spinner/Spinner';
import Form from '../../../components/UI/Forms/Form';

import axiosOrder from '../../../axios-orders';

export default class ContactData extends Component {
  state = {
    isFormValid: false,
    isBusy: false,
    orderFormConfig: {
      name: {
        tag: 'input',
        label: 'Your Name',
        config: {
          type: 'text',
          placeholder: 'Your Name',
        },
        validation: {
          required: true,
        },
        error: null,
        touched: false,
        value: '',
        onChange: null, //(e) => { }
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

    this.setState({ isBusy: true });

    const order = {
      ingredients: this.props.ingredients,
      price: this.props.price, //In prod would re-calculate price on the server
      contact: contactData,
    };

    axiosOrder
      .post('/orders.json', order)
      .then((response) => {
        this.props.history.push('/');
      })
      .catch((error) => console.log(error))
      .finally(() => {
        this.setState({ isBusy: false });
      });
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

    if (this.state.isBusy) {
      form = <Spinner message='Placing order...' />;
    }

    return (
      <div className={css.ContactData}>
        {!this.state.isBusy && <h4>Enter your contact info...</h4>}
        {form}
      </div>
    );
  }
}
