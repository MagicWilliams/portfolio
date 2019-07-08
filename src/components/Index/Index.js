import React, { Component } from 'react';
import Draggable from 'react-draggable';
import Toolbar from '../Toolbar/Toolbar';
import projects from '../../utils/projects';
import resume from '../../assets/img/resume.png';
import github from '../../assets/img/github.png';
import instagram from '../../assets/img/instagram.png';
import './Index.scss';

class Index extends Component {

  close = () => {
    console.log("Close window")
  }

  flip = () => {
    console.log("Flip window")
  }

  openCard = () => {
    console.log("opening card");
  }

  openLink = (url) => {
    console.log("open link at: " + url);
  }

  render() {
    return (
      <Draggable handle='.Index-handle'>
        <div className="Index-window">
          <div className="Index-handle">
            <Toolbar name="index" close={this.close} flip={this.flip} />
          </div>
          <div className='Index-body'>
            <h1 className="name"> david latimore ii </h1>
            <h5 className="subtitle"> chicago-based developer & interface designer </h5>
            <div className="project-links">
              {Object.keys(projects).map((item, key) => (
                <div key={key} className="project-link">
                  <h4 className="project-prefix"> — </h4>
                  <h4 onClick={() => this.props.openWindow(item)} className="project-text"> {projects[item].name} </h4>
                </div>
              ))}
            </div>
            <div className="hot-links">
              <img src={resume} onClick={() => this.openCard("resume")} alt="Resume" />
              <img src={github} onClick={() => window.open('https://github.com/MagicWilliams', '_blank')} alt="Github" />
              <img src={instagram} onClick={() => window.open('https://instagram.com/magic.zip', '_blank')} alt="Instagram" />
            </div>
          </div>
        </div>
      </Draggable>
    );
  }
}

export default Index;
