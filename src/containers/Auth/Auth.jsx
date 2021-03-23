import React, { Component, Fragment } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import css from './Auth.module.css';
import Form from '../../components/UI/Forms/Form';
import Button from '../../components/UI/Button/Button';
import Spinner from '../../components/UI/Spinner/Spinner';
import * as authActions from '../../store/auth/authActions';
import { checkValidity } from '../../components/UI/Forms/FormControl/FormControl';

class Auth extends Component {
  state = {
    isFormValid: false,
    isSignup: false,
    controls: {
      email: {
        tag: 'input',
        config: {
          type: 'email',
          placeholder: 'Email Address',
        },
        validation: {
          required: true,
          isEmail: true,
        },
        error: null,
        touched: false,
        value: ''
      },
      password: {
        tag: 'input',
        config: {
          type: 'password',
          placeholder: 'Password',
        },
        validation: {
          required: true,
          minLength: 6,
          maxLength: 10,
        },
        error: null,
        touched: false,
        value: ''
      },
    },
  };

  onSubmitHandler = (event) => {
    event.preventDefault();

    if (!this.state.isFormValid) {
      return;
    }

    const values = {
      email: this.state.controls.email.value,
      password: this.state.controls.password.value,
    };

    this.props.dispatchAuthoriseAsync(
      values.email,
      values.password,
      this.state.isSignup
    );
  };

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
    const updatedForm = JSON.parse(JSON.stringify(this.state.controls));

    const field = e.target.name;
    const value = e.target.value;

    updatedForm[field].touched = true;
    updatedForm[field].value = value;
    updatedForm[field].error = checkValidity(
      value,
      updatedForm[field].validation
    );

    this.setState({ controls: updatedForm });

    const isFormValid = this.checkFormValidity(updatedForm);

    this.setState({ isFormValid: isFormValid });
  };

  toggleIsSignUpHandler = (e) => {
    e.preventDefault();

    this.setState((prevState) => {
      return { isSignup: !prevState.isSignup };
    });
  };

  render() {

    if (this.props.isAuth) {
      let redirectTo = new URLSearchParams(this.props.location.search).get("redirect") || '';

      return <Redirect to={redirectTo} />
    }

    let error = null;

    if (this.props.error) {
      error =  <p style={{ color: 'red' }}>{this.props.error.message}</p>
    }

    let form = (
      <Fragment>
        {error}
        <Form
          formConfig={this.state.controls}
          onChange={this.formInputChanged}
          onSubmit={this.onSubmitHandler}
          isValid={this.state.isFormValid}
        >
          <Button btnType='Success' disabled={!this.state.isFormValid}>
            {this.state.isSignup ? 'SIGN UP' : 'SIGN IN'}
          </Button>
          <Button btnType='Danger' clicked={this.toggleIsSignUpHandler}>
            {`SWITCH TO ${this.state.isSignup ? 'SIGN IN' : 'SIGN UP'}`}
          </Button>
        </Form>
      </Fragment>
    );

    if (this.props.isBusy) {
      form = <Spinner />;
    }

    return <div className={css.Auth}>{form}</div>;
  }
}

const mapStateToProps = (state) => {
  return {
    isBusy: state.auth.isBusy,
    error: state.auth.error,
    isAuth: !!state.auth.token
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    dispatchAuthoriseAsync: (email, password, isSignup) =>
      dispatch(authActions.authoriseAsync(email, password, isSignup)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Auth);
