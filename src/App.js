import React, { Component } from 'react';
import windowSize from 'react-window-size';
import './App.css';
import projects from './utils/projects';
import Index from './components/Index/Index';
import Toolbar from './components/Toolbar/Toolbar';
import ProjectCard from './components/ProjectCard/ProjectCard';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      xOffsets: [],
      yOffsets: [],
      openWindows: [],
      showMailer: false,
      width: 0,
    }
  }

  componentWillMount() {
    window.addEventListener('resize', this.handleWindowSizeChange);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.handleWindowSizeChange);
  }

  handleWindowSizeChange = () => {
    this.setState({ width: window.innerWidth });
  };

  componentDidMount() {
    const xOffsets = [];
    const yOffsets = [];
    for (var a = 0; a < 50; a++) { // UPDATE WHEN YOU HAVE NEW PROJECTS
      xOffsets[a] = Math.random() * (window.innerWidth - 400);
      yOffsets[a] = Math.random() * (window.innerHeight - 200);
    }
    this.setState({
      xOffsets: xOffsets,
      yOffsets: yOffsets,
    });
  }

  openWindow = (slug) => {
    if (slug === 'resume') {
      this.openResume()
    } else {
      const { openWindows } = this.state;
      const index = openWindows.indexOf(slug);
      if (index === -1) {
        openWindows.push(slug);
      } else {
        openWindows.splice(index, 1);
      }
      this.setState({
        openWindows: openWindows,
      });
    }
  }

  openResume = () => {
    const { openWindows } = this.state;
    openWindows.push('resume');
    this.setState({
      openWindows: openWindows,
    });
  }

  openLink = (url) => {
    window.open(url, '_blank');
  }

  arrayRemove = (arr, value) => {
    return arr.filter(function(ele){
       return ele != value;
    });
  }

  colorMe = () => {
    console.log("color picker");
  }

  mailMe = () => {
    this.setState({
      showMailer: true,
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
    const { width } = this.state;
    const isMobile = width <= 500;

    // if (isMobile) {
    //   return (
    //     <div className="Home">
    //       <h1> hannnn lmao </h1>
    //     </div>
    //   );
    // }

    return (
      <div className="Home">
        <Toolbar name='davidlatimore.me' colorMe={this.colorMe} mail={this.mailMe} />
        {Object.keys(projects).map((item, key) => (
          <ProjectCard
            offsetX={xOffsets[projects[item].id]}
            offsetY={yOffsets[projects[item].id]}
            id={projects[item].id}
            showing={openWindows.includes(item)}
            closeWindow={this.closeWindow}
            key={key}
            slug={item}
            url={projects[item].url}
            name={projects[item].name}
            date={projects[item].date}
            description={projects[item].info}
            openLink={this.openLink}
          />
        ))}
        <ProjectCard
          offsetX={xOffsets[49]}
          offsetY={yOffsets[49]}
          showing={openWindows.includes('resume')}
          closeWindow={this.closeWindow}
          slug={'resume'}
          name={'Resume - Winter 2018'}
        />
        <div className="Home-Index-window">
          <Index openWindow={this.openWindow}/>
        </div>
      </div>
    );
  }
}

export default App;
