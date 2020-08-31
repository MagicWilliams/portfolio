import React, { Component } from 'react';
import Draggable from 'react-draggable';
import './Index.scss';

class Index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currPhoto: '',
    }
  }

  componentDidMount() {
    this._doSignature()
  }

  setCurrPhoto = name => {
    console.log(name);
    this.setState({
      currPhoto: name,
    });
  }

  clearCurrPhoto = () => {
    this.setState({
      currPhoto: '',
    });
  }

  _doSignature() {
    var styles = [
         'width: 100vw '
       , 'color: #436AFF'
       , 'margin: 100px 20px'
       , 'padding: 100px 20px'
       , 'margin-right: -12px'
       , 'padding-right: 0px'
       , 'padding-bottom: 0px'
       , 'margin-bottom: 0px'
       , 'display: block'
       , 'text-shadow: 0 1px 0 rgba(0, 0, 0, 0)'
       , 'box-shadow: 0 1px 0 rgba(255, 255, 255, 0.4) inset, 0 5px 3px -5px rgba(0, 0, 0, 0.5), 0 -13px 5px -10px rgba(255, 255, 255, 0.4) inset'
       , 'text-align: center'
       , 'font-size: 25px'
       , 'font-family: gilroy-bold'
       , 'font-weight: regular'
    ].join(';');

    var style2 = [
       'position: absolute'
       , 'bottom: 100px'
       , 'color: #436AFF'
       , 'text-align: center'
       , 'margin-left: 6px'
       , 'font-size: 25px'
       , 'font-family: gilroy-bold'
       , 'font-weight: regular'
    ].join(';');

    var style3 = [
       'color: black'
       , 'display: block'
       , 'text-align: center'
       , 'font-size: 14px'
       , 'font-family: gilroy-regular'
       , 'font-weight: regular'
       , 'padding: 20px 50px 180px 80px'
    ].join(';');

    console.log('%c Made by %c magic.zip \n%c davidlatimore.me', styles, style2, style3);
  }

  render() {
    const { openWindow, bringToTop, projects, openWindows, resume } = this.props;
    const { currPhoto } = this.state;
    const layer = openWindows.indexOf('Home') === -1 ? -1 : openWindows.indexOf('Home') + 2;

    const layerStyle = {
      zIndex: layer,
    }

    return (
      <Draggable bounds='parent' handle='.Index-handle' defaultPosition={{x: window.innerWidth / 3, y: 100}}>
        <div style={{...layerStyle}} onClick={() => bringToTop('Home')} className="Index-window">
          <div className="Index-handle">
            <h3> Home </h3>
          </div>
          <div className='Index-body'>
            <h1 className="name"> David Latimore II </h1>
            <h4 className="subtitle"> full-stack developer, interface designer </h4>
            <div className="project-links">
              {projects.map((project, key) => {
                const { name, media } = project.fields;
                const showingPhoto = currPhoto === name;
                if (media) {
                  console.log(name , currPhoto);
                }
                return (
                  <div>
                    <div onMouseOver={() => this.setCurrPhoto(name)} onMouseOut={this.clearCurrPhoto} key={key} className="project-link">
                      <h4 className="project-prefix"> — </h4>
                      <h4 onClick={(e) => openWindow(name, e)} className="project-text"> {name} </h4>
                    </div>
                    {media && showingPhoto && (
                      <img src={media.fields.file.url} className='hover-photo' alt={name} />
                    )}
                  </div>
                )}
              )}

            </div>
            <div className="hot-links">
              <img src='/img/res-white.svg' onClick={() => window.open(resume, '_blank')} alt="Resume" />
              <img src='/img/github-white.svg' onClick={() => window.open('https://github.com/MagicWilliams', '_blank')} alt="Github" />
              <img src='/img/ig-white.svg' onClick={() => window.open('https://instagram.com/magic.zip', '_blank')} alt="Instagram" />
              <a href='mailto:david.latimore@me.com?subject=Hello!'> <img src='/img/mail.svg' alt="Contact" /> </a>
            </div>
          </div>
        </div>
      </Draggable>
    );
  }
}

export default Index;
