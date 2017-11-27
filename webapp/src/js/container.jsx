import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom'
import WaterMark from './page/watermark/index.jsx';

var Container = function () {
  return (
    <Router>
      <Route path="/" component={WaterMark} />
    </Router>
  );
};

module.exports = Container;
