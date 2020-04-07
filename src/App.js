import React, { Component } from 'react';
import windowSize from 'react-window-size';
import './App.scss';
import Index from './components/Index/Index';
import Toolbar from './components/Toolbar/Toolbar';
import ProjectCard from './components/ProjectCard/ProjectCard';

const client = require('contentful').createClient({
  space: process.env.REACT_APP_PORTFOLIO_CONTENTFUL_SPACE_ID,
  accessToken: process.env.REACT_APP_PORTFOLIO_CONTENTFUL_ACCESS_TOKEN
});

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      xOffsets: [],
      yOffsets: [],
      openWindows: [],
      projects: [],
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

  async componentDidMount() {
    const xOffsets = [];
    const yOffsets = [];
    let projects;
    for (var a = 0; a < 50; a++) { // UPDATE WHEN YOU HAVE NEW PROJECTS
      xOffsets[a] = Math.random() * (window.innerWidth - 400);
      yOffsets[a] = Math.random() * (window.innerHeight - 200);
    }
    await client.getEntries({
      content_type: 'project',
    }).then((res) => {
      projects = [...res.items];
    });
    this.setState({
      projects: projects,
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
    const { xOffsets, yOffsets, openWindows, projects } = this.state;
    const { width } = this.state;
    const isMobile = width <= 500;

    return (
      <div className="Home">
        <Toolbar name='davidlatimore.me' colorMe={this.colorMe} mail={this.mailMe} />
        { projects.map((project, key) => {
          const data = project.fields;
          return (
            <ProjectCard
              offsetX={xOffsets[data.id]}
              offsetY={yOffsets[data.id]}
              data={data}
              showing={openWindows.includes(data.name)}
              closeWindow={this.closeWindow}
              key={key}
              layer={2 + openWindows.length + openWindows.indexOf(data.name)}
              openLink={this.openLink}
            />
          )
        })}
        <ProjectCard
          offsetX={xOffsets[49]}
          offsetY={yOffsets[49]}
          showing={openWindows.includes('resume')}
          closeWindow={this.closeWindow}
          slug={'resume'}
          name={'Resume - Winter 2018'}
        />
        <div className="Home-Index-window">
          <Index projects={projects} openWindow={this.openWindow}/>
        </div>
      </div>
    );
  }
}

export default Home;
