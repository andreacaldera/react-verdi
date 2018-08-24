import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { renderRoutes } from 'react-router-config';

const App = ({ route }) => (
  <div className="header-container">{renderRoutes(route.routes)}</div>
);

App.propTypes = {
  route: PropTypes.shape().isRequired,
};

export default connect(
  null,
  null
)(App);
