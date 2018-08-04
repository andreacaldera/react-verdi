import { createSelector } from 'reselect';
import { NAMESPACE } from './constants';

const getRootSelector = (state) => state[NAMESPACE];

export const getSelectedPage = createSelector(
  getRootSelector,
  ({ selectedPage }) => selectedPage
);
