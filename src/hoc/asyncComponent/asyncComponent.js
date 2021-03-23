import React, { Component } from 'react';
 
//asyncComponent will be passed a promise such as import(..) which will
//be executed when the component is mounted
//e.g. const AsyncNewPost = asyncComp(() => import('./NewPost/NewPost'));
const asyncComponent = (importComponent) => {
  return class extends Component {
    state = {
        component: null,
      };
    
      componentDidMount() {
        importComponent()
            .then(comp => {
                this.setState({ component: comp.default });
            });
      };
    
    render() {
      const Comp = this.state.component;
      return Comp ? <Comp {...this.props} /> : null;
    }
  };
};
 
export default asyncComponent;