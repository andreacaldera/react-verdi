import { createSelector } from 'reselect';
import { NAMESPACE } from './constants';

export const getRootSelector = (state) => state[NAMESPACE];

export const getMetaSelector = createSelector(
  getRootSelector,
  ({ meta }) => meta
);
