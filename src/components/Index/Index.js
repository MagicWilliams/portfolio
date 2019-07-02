import React, { Component } from 'react';
import Toolbar from '../Toolbar/Toolbar';
import './Index.scss';

class Index extends Component {

  constructor(props) {
    super(props);
    this.state = {

    };
  }

  close = () => {
    console.log("Close window")
  }

  flip = () => {
    console.log("Flip window")
  }

  render() {
    return (
      <div className="Index-window">
        <Toolbar name="test" close={this.close} flip={this.flip} />
      </div>
    );
  }
}

export default Index;
