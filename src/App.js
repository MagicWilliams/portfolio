import React, { useState, Component } from 'react';
import windowSize from 'react-window-size';
import Draggable from 'react-draggable';

import './App.scss';
import Index from './components/Index/Index';
import Toolbar from './components/Toolbar/Toolbar';
import ProjectCard from './components/ProjectCard/ProjectCard';
import MobileIndex from './components/MobileIndex/MobileIndex';
import MobileModal from './components/MobileModal/MobileModal';

const client = require('contentful').createClient({
  space: process.env.REACT_APP_PORTFOLIO_CONTENTFUL_SPACE_ID,
  accessToken: process.env.REACT_APP_PORTFOLIO_CONTENTFUL_ACCESS_TOKEN
});

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      projects: [],
      width: 0,
    }
  }

  colorMe = () => {
    console.log("color picker");
  }

  mailMe = () => {
    this.setState({
      showMailer: true,
    });
  }

  async componentDidMount() {
    let projects;

    await client.getEntries({
      content_type: 'project',
    }).then((res) => {
      projects = [...res.items];
    });
    this.setState({
      projects: projects,
      width: null,
    });
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

  render() {
    const { projects, width } = this.state;
    console.log(width);
    if (!projects) {
      return null
    }
    if (width === null) {
      this.setState({ width: window.innerWidth });
      return null;
    }
    return this.state.width < 500 ? <MobileHome projects={projects} colorMe={this.colorMe} mailMe={this.mailMe} /> : <DesktopHome projects={projects} colorMe={this.colorMe} mailMe={this.mailMe} />;
  }
}

class DesktopHome extends Component {
  constructor(props) {
    super(props);
    this.state = {
      xOffsets: [],
      yOffsets: [],
      openWindows: ['Home'],
      projects: [],
      showMailer: false,
      topIndex: 2,
    }
  }

  async componentDidMount() {
    const xOffsets = [];
    const yOffsets = [];
    for (var a = 0; a < 50; a++) { // UPDATE WHEN YOU HAVE NEW PROJECTS
      xOffsets[a] = Math.random() * (window.innerWidth * .6);
      yOffsets[a] = Math.random() * (window.innerHeight - 400);
    }

    this.setState({
      xOffsets: xOffsets,
      yOffsets: yOffsets,
    });
  }

  increaseMax = () => {
    const { topIndex } = this.state;
    this.setState({
      topIndex: this.state.topIndex + 1,
    })
  }

  decreaseMax = () => {
    const { topIndex } = this.state;
    this.setState({
      topIndex: this.state.topIndex - 1,
    });
  }

  openWindow = (slug, e) => {
    e.stopPropagation();
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

  bringToTop = name => {
    const { openWindows } = this.state;
    if (openWindows.includes(name)) {
      const i = openWindows.indexOf(name);
      openWindows.splice(i, 1);
    }
    openWindows.push(name);
    this.setState({ openWindows });
  }

  closeWindow = (slug, e) => {
    e.stopPropagation();
    const { openWindows } = this.state;
    openWindows.splice(openWindows.indexOf(slug), 1);
    this.setState({
      openWindows: openWindows,
    });
  }

  render() {
    const { xOffsets, yOffsets, openWindows, topIndex } = this.state;
    const { projects, mailMe, colorMe } = this.props;
    return (
      <div className="Home">
        <Toolbar name='davidlatimore.me' colorMe={colorMe} mail={mailMe} />
        { projects.map((project, key) => {
          const data = project.fields;
          return (
            <ProjectCard
              increaseMax={this.increaseMax}
              decreaseMax={this.decreaseMax}
              bringToTop={this.bringToTop}
              closeWindow={this.closeWindow}
              openLink={this.openLink}
              offsetX={xOffsets[data.id]}
              offsetY={yOffsets[data.id]}
              data={data}
              openWindows={openWindows}
              key={key}
              topIndex={topIndex}
            />
          )
        })}
        <ProjectCard
          bringToTop={this.bringToTop}
          closeWindow={this.closeWindow}
          offsetX={xOffsets[49]}
          offsetY={yOffsets[49]}
          topIndex={topIndex}
          openWindows={openWindows}
          showing={openWindows.includes('resume')}
          slug={'resume'}
          name={'Resume - Winter 2018'}
        />
        <Index
          bringToTop={this.bringToTop}
          increaseMax={this.increaseMax}
          decreaseMax={this.decreaseMax}
          openWindow={this.openWindow}
          openWindows={openWindows}
          projects={projects}
        />
      </div>
    );
  }
}

const MobileHome = props => {
  const { projects, mailMe, colorMe, openLink } = props;
  const [activeProject, setActiveProject] = useState({});
  const close = () => {
    setActiveProject({});
  }
  const showProject = slug => {
    const i = projects.indexOf(activeProject);
    console.log(i);
    setActiveProject(projects[i].fields);
  }

  return (
    <div className='mobile-container'>
      <Toolbar name='davidlatimore.me' colorMe={colorMe} mail={mailMe} />
      <div className='MobileHome'>
        <MobileIndex setActiveProject={setActiveProject} close={close} projects={projects} />
        { !!activeProject.name && (
          <div className='darken'> </div>
        )}
        { !!activeProject.name && (
          <MobileModal close={close} project={activeProject} />
        )}
        <style jsx> {`
          .mobile-container {
            max-height: 100vh;
            overflow: hidden;
          }
          .MobileHome {
            display: flex;
            justify-content: center;
            align-items: center;
          }

          .darken {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100vh;
            background: rgba(0, 0, 0, .75);
          }
        `} </style>
      </div>
    </div>

  )
}



export default App;
