import React from 'react';
import { connect } from 'react-redux';

const About = () => (
  <div>
    <h1>
      About
    </h1>

    <p>
      This is a template for React microservices
    </p>
    <p>
      The following is a list of the applications
    </p>
    <ul className="about__applications-section">
      <li className="about__application about__application--header">
        <a target="_app-header" href="http://localhost:7001">
          app-header
        </a>
        <p>
          featuring React 16, Redux
        </p>
      </li>
      <li className="about__application about__application--product">
        <a target="_app-product" href="http://localhost:4001/products">
          app-product
        </a>
        <p>
          featuring React 16, Redux
        </p>
      </li>
      <li className="about__application about__application--checkout">
        <a target="_app-checkout" href="http://localhost:5001/checkout">
          app-checkout
        </a>
        <p>
          featuring React 15, Redux
        </p>
      </li>
      <li className="about__application about__application--footer">
        <a target="_app-footer" href="http://localhost:6001/">
          app-footer
        </a>
        <p>
          featuring React 16
        </p>
      </li>
    </ul>
  </div>
);

export default connect(null, null)(About);
