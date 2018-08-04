import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class App extends Component {
  static propTypes = {
    children: PropTypes.shape().isRequired,
  };

  render() {
    const { children } = this.props;
    return <div className="checkout-container">{children}</div>;
  }
}

export default connect(
  null,
  null
)(App);
