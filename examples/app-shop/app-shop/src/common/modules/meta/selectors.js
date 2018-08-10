import { createSelector } from 'reselect';

import { getMetaSelector } from '../selectors';

export const getFeatureToggles = createSelector(
  getMetaSelector,
  ({ featureToggles }) => featureToggles
);

export const getEndpoints = createSelector(
  getMetaSelector,
  ({ endpoints }) => endpoints
);

export const getActivePage = createSelector(
  getMetaSelector,
  ({ activePage }) => activePage
);
