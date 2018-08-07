import React, { Component } from 'react';
import { connect } from 'react-redux';
import Link from 'react-router-dom/Link';

import MenuItem from './MenuItem';

class TopNav extends Component {
  render() {
    return (
      <nav className="navbar navbar-toggleable-md fixed-top">
        <button
          className="navbar-toggler navbar-toggler-right"
          type="button"
          data-toggle="collapse"
        >
          <span className="navbar-toggler-icon" />
        </button>
        <div className="navbar-brand">react-verdi | app-shop</div>

        <div className="collapse navbar-collapse">
          <ul className="navbar-nav mr-auto">
            <MenuItem label="Home" to="/" />
            <MenuItem label="Products" to="/products" />
            <MenuItem label="Pretty little red dress" to="/products/one" />
            <MenuItem label="Basket" to="/checkout/basket" />
            <MenuItem label="Payment" to="/checkout/payment" />
            <MenuItem label="About" to="/about" />
          </ul>
        </div>
      </nav>
    );
  }
}

export default connect(
  null,
  null
)(TopNav);
