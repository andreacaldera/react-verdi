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

    const CheckoutButton = isBasketEmpty ? (
      <div className="btn btn-secondary mt-3">Proceed to payment</div>
    ) : (
      <Link
        className="btn btn-secondary mt-3"
        to="/checkout/payment"
        disabled={isBasketEmpty}
      >
        Proceed to payment
      </Link>
    );

    // TODO fix continue shopping link (links from app-checkout to app-shop don't work)
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
