import React from 'react';
import ReactDOM from 'react-dom';
import WaterMark from './page/watermark/index.jsx';

class App extends React.Component {
  render() {
    return (
      <WaterMark />
    );
  }
}

ReactDOM.render(<App />, document.getElementById('app'));