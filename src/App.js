import React, { Component } from 'react';
import './App.css';
import Index from './components/Index/Index';
import ProjectCard from './components/ProjectCard/ProjectCard';

// import projects from './utils/projects';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      openWindows: [],
    }
  }

  openWindow = slug => { // open
    const { openWindows } = this.state;
    openWindows.push(slug);
    this.setState({
      openWindows: openWindows,
    });
  }

  render() {
    return (
      <div className="Home">
        <div className="Home-Index-window">
          <Index openWindow={this.openWindow}/>
          <ProjectCard name="test" date="lol" description="description" />
        </div>
      </div>
    );
  }
}

export default App;
