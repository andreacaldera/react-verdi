import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { getEndpoints } from '../modules/meta/selectors';

const About = ({ endpoints }) => (
  <div>
    <h1>About</h1>

    <p>
      <strong>react-verdi | app-shop</strong>
    </p>
    <p>
      The following is a list of the applications available within app-shop,
      click on the links to use those application in isolation.
    </p>
    <ul className="about__applications-section">
      <li className="about__application about__application--header">
        <a
          className="application__link"
          target="_app-header"
          href={endpoints.appHeader}
        >
          app-header
        </a>
        featuring React 16, Redux
      </li>
      <li className="about__application about__application--product">
        <a
          className="application__link"
          target="_app-product"
          href={`${endpoints.appProduct}/products`}
        >
          app-product
        </a>
        featuring React 16, Redux
      </li>
      <li className="about__application about__application--checkout">
        <a
          className="application__link"
          target="_app-checkout"
          href={`${endpoints.appCheckout}/checkout`}
        >
          app-checkout
        </a>
        featuring React 15, Redux
      </li>
      <li className="about__application about__application--footer">
        <a
          className="application__link"
          target="_app-footer"
          href={endpoints.appFooter}
        >
          app-footer
        </a>
        featuring React 16
      </li>
    </ul>
  </div>
);

About.props = {
  endpoint: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  endpoints: getEndpoints(state),
});

export default connect(
  mapStateToProps,
  null
)(About);
