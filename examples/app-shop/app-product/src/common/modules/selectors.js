import { createSelector } from 'reselect';
import { NAMESPACE } from './constants';

const getRootSelector = (state) => state[NAMESPACE];

export const getProducts = createSelector(
  getRootSelector,
  ({ products }) => products
);

export const getProductList = createSelector(getRootSelector, ({ products }) =>
  Object.values(products)
);

export const getProductIdsInBag = createSelector(
  getRootSelector,
  ({ productIdsInBag }) => productIdsInBag
);

export const getProductsInBag = createSelector(
  [getProducts, getProductIdsInBag],
  (products, productIdsInBag) =>
    Object.values(products).filter(({ id }) => productIdsInBag.includes(id))
);

export const getSelectedProductId = createSelector(
  getRootSelector,
  ({ selectedProductId }) => selectedProductId
);

export const getSelectedProduct = createSelector(
  [getSelectedProductId, getProducts],
  (selectedProductId, products) => products[selectedProductId]
);
