import React from 'react';
import ReactDOM from 'react-dom';
import Container from './container.jsx';

class App extends React.Component {
  render() {
    return (
      <Container />
    );
  }
}

ReactDOM.render(<App />, document.getElementById('app'));