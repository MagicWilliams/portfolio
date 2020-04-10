import React, { Component } from 'react';
import './MobileIndex.scss';

class Index extends Component {
  render() {
    const { setActiveProject, projects, resume } = this.props;
    return (
      <div className="MobileIndex">
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
                  <h4 onClick={(e) => setActiveProject(project.fields)} className="project-text"> {name} </h4>
                </div>
              )}
            )}

          </div>
          <div className="hot-links">
            <img src='/img/res-white.svg' onClick={() => window.open(resume, '_blank')} alt="Resume" />
            <img src='/img/github-white.svg' onClick={() => window.open('https://github.com/MagicWilliams', '_blank')} alt="Github" />
            <img src='/img/ig-white.svg' onClick={() => window.open('https://instagram.com/magic.zip', '_blank')} alt="Instagram" />
          </div>
        </div>
      </div>
    );
  }
}

export default Index;
