import React, { Component } from 'react';
import { connect } from 'react-redux';

import MenuItem from './MenuItem';

class TopNav extends Component {
  state = {
    displayMenu: false,
  };

  toggleMenu = () => {
    const { displayMenu } = this.state;
    this.setState({ displayMenu: !displayMenu });
  };

  render() {
    const { displayMenu } = this.state;
    return (
      <nav className="navbar navbar-toggleable-md fixed-top navbar-inverse">
        <button
          className="navbar-toggler navbar-toggler-right"
          type="button"
          data-toggle="collapse"
          onClick={this.toggleMenu}
        >
          <span className="navbar-toggler-icon" />
        </button>
        <div className="navbar-brand">react-verdi | app-shop</div>

        <div className={`navbar-collapse ${displayMenu ? '' : 'collapse'}`}>
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
