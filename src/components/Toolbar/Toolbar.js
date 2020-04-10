import React, { Component } from 'react';
import './Toolbar.scss';
import closeIcon from '../../assets/img/close.png';

const today = new Date();
class Toolbar extends Component {

  componentDidMount() {
    setInterval(this.updateTime, 1000);
  }

  state = {
    time: today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds(),
  };

  cleanTime = (value, period) => {
    if (period === 'seconds' || period === 'minutes') {
      if (value < 10){
        return "0" + value;
      } else {
        return value <= 11 ? value + " AM" : value + " PM";
      }
    }
  }

  updateTime = () => {
    const today = new Date();
    const seconds = today.getSeconds() >= 10 ? today.getSeconds() : '0' + today.getSeconds()
    const minutes = today.getMinutes() >= 10 ? today.getMinutes() : '0' + today.getMinutes()
    const time = today.getHours() + ":" + minutes + ":" + seconds;
    this.setState({
      time: time,
    });
  }
  render() {
    const { name, close, bkg, toggle, isMobile } = this.props;
    const { time } = this.state;

    return (
      <div className='Toolbar'>
        <p className='name'> {name} </p>
          { name === 'davidlatimore.me' && !isMobile ? (
            <div className='icons'>
              <img onClick={toggle} src='/img/color.svg' className='Toolbar-icon' alt='Close window'/>
              <p className='time'> {time} </p>
            </div>
          ) : name === 'index' ? (
            <div className='icons'>
            </div>
          ) : isMobile ? (
            <div>

            </div>
          ) : (
            <div className='icons'>
              <img src={closeIcon} className='Toolbar-icon' onClick={close} alt='Close window'/>
            </div>
          )}
      </div>
    );
  }
}

export default Toolbar;
