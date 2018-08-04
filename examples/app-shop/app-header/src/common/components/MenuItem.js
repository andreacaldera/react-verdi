import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Link from 'react-router-dom/Link';

import { getSelectedPage } from '../modules/selectors';

class TopNav extends Component {
  static propTypes = {
    label: PropTypes.string.isRequired,
    to: PropTypes.string.isRequired,
    selectedPage: PropTypes.string,
  };

  static defaultProps = {
    selectedPage: null,
  };

  render() {
    const { selectedPage, label, to } = this.props;
    return (
      <li className={`nav-item ${selectedPage === to ? 'active' : ''}`}>
        <Link className="nav-link" to={to}>
          {label}
        </Link>
      </li>
    );
  }
}

const mapStateToProps = (state) => ({
  selectedPage: getSelectedPage(state),
});

export default connect(
  mapStateToProps,
  null
)(TopNav);
