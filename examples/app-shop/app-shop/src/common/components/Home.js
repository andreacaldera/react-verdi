import React from 'react';
import Link from 'react-router-dom/Link';
import { connect } from 'react-redux';

const Home = () => (
  <div>
    <h1>Welcome to your favourite online shop</h1>
    <Link className="btn btn-secondary" to="/about">
      Find out more about&#160;
      <strong>app-shop</strong>
    </Link>
  </div>
);

export default connect(
  null,
  null
)(Home);
