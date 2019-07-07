import React, { Component } from 'react';
import windowSize from 'react-window-size';
import './App.css';
import projects from './utils/projects';
import Index from './components/Index/Index';
import ProjectCard from './components/ProjectCard/ProjectCard';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      xOffsets: [],
      yOffsets: [],
      openWindows: [],
    }
  }

  componentDidMount() {
    const xOffsets = [];
    const yOffsets = [];
    for (var a = 0; a < 7; a++) {
      xOffsets[a] = Math.random() * (window.innerWidth - 400);
      yOffsets[a] = Math.random() * (window.innerHeight - 300);
    }
    this.setState({
      xOffsets: xOffsets,
      yOffsets: yOffsets,
    });
  }

  openWindow = (slug) => {
    const { openWindows } = this.state;
    if (openWindows.indexOf(slug) === -1) {
      openWindows.push(slug);
      this.setState({
        openWindows: openWindows,
      });
    }
  }

  arrayRemove = (arr, value) => {
    return arr.filter(function(ele){
       return ele != value;
    });
  }

  closeWindow = (slug) => {
    const { openWindows } = this.state;
    openWindows.splice(openWindows.indexOf(slug), 1);
    this.setState({
      openWindows: openWindows,
    });
  }

  render() {
    const { xOffsets, yOffsets, openWindows } = this.state;

    return (
      <div className="Home">
      {Object.keys(projects).map((item, key) => (
        <ProjectCard
          offsetX={xOffsets[projects[item].id]}
          offsetY={yOffsets[projects[item].id]}
          id={projects[item].id}
          showing={openWindows.includes(item)}
          closeWindow={this.closeWindow}
          key={key}
          slug={item}
          name={projects[item].name}
          date={projects[item].date}
          description={projects[item].info}
        />
      ))}
      <div className="Home-Index-window">
        <Index openWindow={this.openWindow}/>
      </div>
      </div>
    );
  }
}

export default App;
