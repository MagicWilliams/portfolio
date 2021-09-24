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
    this._doSignature();
    console.log(window.ethereum);
  }

  setCurrPhoto = name => {
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
    console.log('thanks for visiting');
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
            <h3>Home</h3>
            <h5>Drag Me!</h5>
          </div>
          <div className='Index-body'>
            <h1 className="name"> David Latimore II </h1>
            <h4 className="subtitle"> full-stack developer, interface designer </h4>
            <div className="project-links">
              {projects.map((project, key) => {
                const { name, media } = project.fields;
                const showingPhoto = currPhoto === name;
                if (media) {
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
