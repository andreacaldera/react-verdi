import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';

class Index extends Component {
  render() {
    return (
      <div>
        <h2>Checkout</h2>
        <Link className="btn btn-secondary mt-3" to="/checkout/basket">
          Basket
        </Link>
        <Link className="ml-2 btn btn-secondary mt-3" to="/checkout/payment">
          Payment
        </Link>
      </div>
    );
  }
}

export default connect(
  null,
  null
)(Index);
