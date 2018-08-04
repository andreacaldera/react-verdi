import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';

class App extends Component {
  render() {
    return (
      <div>
        <h2>Checkout | Payment</h2>
        <p>
          Thanks you for shopping with us, please select payment method to
          complete purchase
        </p>
        <Link className="btn btn-secondary" to="/checkout/basket">
          Return to basket
        </Link>
      </div>
    );
  }
}

export default connect(
  null,
  null
)(App);
