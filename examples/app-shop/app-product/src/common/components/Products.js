import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Link from 'react-router-dom/Link';

import {
  ADD_TO_BAG,
  REMOVE_FROM_BAG,
  CHECKOUT,
  SELECT_PRODUCT,
} from '../modules/constants';

import {
  getProductList,
  getProductIdsInBag,
  getSelectedProductId,
} from '../modules/selectors';

class Products extends Component {
  static propTypes = {
    selectedProductId: PropTypes.string,
    products: PropTypes.arrayOf(PropTypes.object).isRequired,
    productIdsInBag: PropTypes.arrayOf(PropTypes.string).isRequired,
    addToBag: PropTypes.func.isRequired,
    checkout: PropTypes.func.isRequired,
    selectProduct: PropTypes.func.isRequired,
  };

  static defaultProps = {
    selectedProductId: null,
  };

  render() {
    const {
      products,
      addToBag,
      checkout,
      productIdsInBag,
      selectedProductId,
      selectProduct,
    } = this.props;
    return (
      <div>
        <h2 className="mb-4">Products</h2>

        {products.map((product) => {
          const isProductInBag = Boolean(
            productIdsInBag.find((id) => id === product.id)
          );
          return (
            <div
              className={`product form-group row ${
                selectedProductId === product.id ? 'product--selected' : ''
              }`}
              key={product.name}
            >
              <div className="col-5">
                <Link
                  to={`/products/${product.id}`}
                  onClick={() => selectProduct(product.id)}
                >
                  {product.name}
                </Link>
              </div>
              <div className="col-2">
                <div className="form-check">
                  <label htmlFor={`add-to-bag-${product.id}`}>
                    <input
                      checked={isProductInBag}
                      id={`add-to-bag-${product.id}`}
                      className="product--add-to-bag form-check-input"
                      type="checkbox"
                      onChange={(e) => addToBag(e, product.id)}
                    />
                    Add to bag
                  </label>
                </div>
              </div>
            </div>
          );
        })}
        <Link
          className="btn btn-primary"
          to="/checkout/basket"
          onClick={checkout}
        >
          Checkout
        </Link>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  products: getProductList(state),
  productIdsInBag: getProductIdsInBag(state),
  selectedProductId: getSelectedProductId(state),
});

const mapDispatchToProps = (dispatch) => ({
  addToBag: (e, productId) => {
    dispatch({
      type: e.target.checked ? ADD_TO_BAG : REMOVE_FROM_BAG,
      payload: productId,
    });
  },
  checkout: () => {
    dispatch({
      type: CHECKOUT,
    });
  },
  selectProduct: (productId) => {
    dispatch({
      type: SELECT_PRODUCT,
      payload: productId,
    });
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Products);
