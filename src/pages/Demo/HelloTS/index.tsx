import React, { Component } from 'react';
import Hello from './module/Hello';
class Home extends Component {
  render() {
    return (
      <div style={{ border: '10px solid red' }}>
        <Hello name="Mark" enthusiasmLevel={20} />
      </div>
    );
  }
}

export default Home;
