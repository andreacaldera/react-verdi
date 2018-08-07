import React from 'react';
import { connect } from 'react-redux';

const About = () => (
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
          href="http://localhost:7001"
        >
          app-header
        </a>
        featuring React 16, Redux
      </li>
      <li className="about__application about__application--product">
        <a
          className="application__link"
          target="_app-product"
          href="http://localhost:4001/products"
        >
          app-product
        </a>
        featuring React 16, Redux
      </li>
      <li className="about__application about__application--checkout">
        <a
          className="application__link"
          target="_app-checkout"
          href="http://localhost:5001/checkout"
        >
          app-checkout
        </a>
        featuring React 15, Redux
      </li>
      <li className="about__application about__application--footer">
        <a
          className="application__link"
          target="_app-footer"
          href="http://localhost:6001/"
        >
          app-footer
        </a>
        featuring React 16
      </li>
    </ul>
  </div>
);

export default connect(
  null,
  null
)(About);
