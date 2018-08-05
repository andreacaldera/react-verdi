import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router';

import { getProductsInBag } from '../modules/selectors';

class App extends Component {
  static propTypes = {
    productsInBag: PropTypes.arrayOf(PropTypes.object).isRequired,
  };

  render() {
    const { productsInBag } = this.props;
    const isBasketEmpty = productsInBag.length === 0;

    const basket = isBasketEmpty ? (
      <i>Your basket is empty.</i>
    ) : (
      <ul>{productsInBag.map((product) => <li>{product.name}</li>)}</ul>
    );

    const CheckoutButton = isBasketEmpty ? null : (
      <Link className="ml-2 btn btn-secondary mt-3" to="/checkout/payment">
        Proceed to payment
      </Link>
    );

    return (
      <div>
        <h2>Checkout | Your basket</h2>
        <div>{basket}</div>
        <Link className="btn btn-secondary mt-3" to="/products">
          Continue shopping
        </Link>
        {CheckoutButton}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  productsInBag: getProductsInBag(state),
});

export default connect(
  mapStateToProps,
  null
)(App);
