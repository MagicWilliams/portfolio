import React, { Component } from 'react';
import './Toolbar.scss';
import info from '../../assets/img/info.png';
import closeIcon from '../../assets/img/close.png';
import color from '../../assets/img/color.png';
import mail from '../../assets/img/mail.png';

class Toolbar extends Component {
  render() {
    const { name, colorMe, mailMe, flip, close } = this.props;
    return (
      <div className='Toolbar'>
        <p className='name'> {name} </p>
          { name === 'davidlatimore.me' ? (
            <div className='icons'>
              <img src={color} className='Toolbar-icon' onClick={colorMe} alt='Color me'/>
              <img src={mail} className='Toolbar-icon' onClick={mailMe} alt='Mail me'/>
            </div>
          ) : (
            <div className='icons'>
              <img src={info} className='Toolbar-icon' onClick={flip} alt='More info'/>
              <img src={closeIcon} className='Toolbar-icon' onClick={close} alt='Close window'/>
            </div>
          )}
      </div>
    );
  }
}

export default Toolbar;
