import React, { Component } from 'react';
import './Toolbar.scss';
import info from '../../assets/img/info.png';
import close from '../../assets/img/close.png';

class Toolbar extends Component {
  render() {
    return (
      <div className='Toolbar'>
        <p className='Toolbar-name'> {this.props.name} </p>
        <div className='icons'>
          <img src={info} className='Toolbar-icon' onClick={this.props.flip} alt='More info'/>
          <img src={close} className='Toolbar-icon' onClick={this.props.close} alt='Close window'/>
        </div>
      </div>
    );
  }
}

export default Toolbar;
