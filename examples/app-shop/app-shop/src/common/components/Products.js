import React from 'react';
import { connect } from 'react-redux';

const Products = () => (
  <div>
    The panel below is from&#160;
    <strong>app-products</strong>
  </div>
);

export default connect(
  null,
  null
)(Products);
