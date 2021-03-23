import { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import * as authActions from './../../../store/auth/authActions';

class Logout extends Component {
    componentDidMount() {
        this.props.dispatchAuthLogout(); 
    }

    render() {
        return <Redirect to='/' />;
    }
}



const mapDispatchToProps = dispatch => {
    return {
        dispatchAuthLogout: () => dispatch(authActions.authLogout())
    }
}

export default connect(null, mapDispatchToProps)(Logout);
