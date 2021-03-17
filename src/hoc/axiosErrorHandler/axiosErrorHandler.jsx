import React, { Component, Fragment } from 'react';
import Modal from '../../components/UI/Modal/Modal';

//axiosErrorHandler is essentially a class factory
const axiosErrorHandler = (WrappedComponent, axios) => {
  return class extends Component {
    state = {
      error: null,
    };

    //Note: Using componentWillMount() rather than componentDidMount() as we wish this to
    //      happen regardless of whether child components are rendered or not.
    //      Also componentWillMount() will be deprecated in the future so may need to deal
    //      within the constructor instead.
    componentWillMount() {
      if (!axios) {
        return;
      }

      //Store references to the interceptors locally so they can be ejected later
      this.requestInterceptor = axios.interceptors.response.use((req) => {
        this.clearError();
        return req;
      });

      this.responseInterceptor = axios.interceptors.response.use(
        (res) => res,
        (error) => {
          this.setState({ error: error });
        }
      );
    }

    componentWillUnmount() {
      //Unhook the interceptors to avoid memory leaks
      axios.interceptors.request.eject(this.requestInterceptor);
      axios.interceptors.response.eject(this.responseInterceptor);
    }

    clearError = () => {
      this.setState({ error: null });
    };

    render() {
      return (
        <Fragment>
          <Modal show={this.state.error} closed={() => this.clearError()}>
            {(this.state.error || {}).message}
          </Modal>
          <WrappedComponent {...this.props} />
        </Fragment>
      );
    }
  };
};

export default axiosErrorHandler;
