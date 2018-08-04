import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Link from 'react-router-dom/Link';

import { getSelectedProduct } from '../modules/selectors';

class App extends Component {
  static propTypes = {
    product: PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
    }),
  };

  static defaultProps = {
    product: {},
  };

  render() {
    const {
      product: { id, name },
    } = this.props;
    return (
      <div>
        <h2 className="mb-4">Product details</h2>

        <div className="product-details pb-3 pt-3">
          <div>
            Name: <strong>{name} </strong>
          </div>
          <div>
            ID: <strong>{id}</strong>
          </div>
        </div>
        <Link className="mt-4 btn btn-primary" to="/products" href="/products">
          Back to products
        </Link>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  product: getSelectedProduct(state),
});

export default connect(
  mapStateToProps,
  null
)(App);
