import React, { Component } from 'react';
import Draggable from 'react-draggable';
import Toolbar from '../Toolbar/Toolbar';
import projects from '../../utils/projects';
import './Index.scss';

class Index extends Component {
  render() {
    const { openWindow, projects } = this.props;
    return (
      <Draggable handle='.Index-handle'>
        <div className="Index-window">
          <div className="Index-handle">
            <h3> Home </h3>
          </div>
          <div className='Index-body'>
            <h1 className="name"> David Latimore II </h1>
            <h4 className="subtitle"> Selected Projects </h4>
            <div className="project-links">
              {projects.map((project, key) => {
                const { name } = project.fields;
                return (
                  <div key={key} className="project-link">
                    <h4 className="project-prefix"> — </h4>
                    <h4 onClick={() => openWindow(name)} className="project-text"> {name} </h4>
                  </div>
                )}
              )}

            </div>
            <div className="hot-links">
              <img src='/img/res-white.svg' onClick={() => this.props.openWindow("resume")} alt="Resume" />
              <img src='/img/github-white.svg' onClick={() => window.open('https://github.com/MagicWilliams', '_blank')} alt="Github" />
              <img src='/img/ig-white.svg' onClick={() => window.open('https://instagram.com/magic.zip', '_blank')} alt="Instagram" />
            </div>
          </div>
        </div>
      </Draggable>
    );
  }
}

export default Index;
