import React, { useState, Component } from 'react';
import './App.scss';
import Index from './components/Index/Index';
import Toolbar from './components/Toolbar/Toolbar';
import ProjectCard from './components/ProjectCard/ProjectCard';
import MobileIndex from './components/MobileIndex/MobileIndex';
import ETHJar from './components/ETHJar/ETHJar';
import MobileModal from './components/MobileModal/MobileModal';
import { SketchPicker } from 'react-color';

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
      resume: ''
    }
  }

  async componentDidMount() {
    let projects;
    let resume;

    const getResumeLink = async function() {
      await client.getAsset('1VSv2FYkIoClsmB7SAPDLo').then((res) => {
        resume = res.fields.file.url;
      })
    }

    const getProjects = async function() {
      await client.getEntries({
        content_type: 'project',
      }).then((res) => {
        projects = [...res.items];
      });
    }

    Promise.all([getResumeLink(), getProjects()]).then(() => {
      this.setState({
        projects: projects,
        resume: resume,
        width: null,
      });
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
    const { projects, width, resume } = this.state;
    if (!projects || resume === '') {
      return null
    }
    if (width === null) {
      this.setState({ width: window.innerWidth });
      return null;
    }
    return this.state.width < 500 ? <MobileHome resume={resume} projects={projects} mailMe={this.mailMe} /> : <DesktopHome resume={resume} projects={projects} mailMe={this.mailMe} />;
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
      showPicker: false,
      color: '#E8F4FF',
    }
  }

  componentDidMount() {
    const { xOffsets, yOffsets } = this.state;
    for (var a = 0; a < 50; a++) {
      xOffsets.push(Math.round(window.innerWidth * 0.7  * Math.random()));
      yOffsets.push(Math.round(window.innerHeight * 0.7 * Math.random()));
    }
    this.setState({
      xOffsets,
      yOffsets
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
       return ele !== value;
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

  togglePickerDisplay = () => {
    const { showPicker } = this.state;
    this.setState({
      showPicker: !showPicker,
    });
  }

  changeColor = color => {
    this.setState({ color: color.hex });
  }

  render() {
    const { xOffsets, yOffsets, openWindows, color, showPicker } = this.state;
    const { projects, mailMe, resume } = this.props;
    const bkgColor = {
      background: color,
    }
    return (
      <div style={bkgColor} className="Home">
        <ETHJar />
        <Toolbar toggle={this.togglePickerDisplay} name='davidlatimore.me' handleChangeComplete={this.changeColor} mail={mailMe} />
        { showPicker && (
          <div className='picker'>
            <SketchPicker color={color} onChange={this.changeColor} />
          </div>
        )}
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
            />
          )
        })}
        <ProjectCard
          bringToTop={this.bringToTop}
          closeWindow={this.closeWindow}
          offsetX={xOffsets[49]}
          offsetY={yOffsets[49]}
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
          resume={resume}
        />
      </div>
    );
  }
}

const MobileHome = props => {
  const { projects, mailMe, resume } = props;
  const [activeProject, setActiveProject] = useState({});
  const close = () => {
    setActiveProject({});
  }

  return (
    <div className='mobile-container'>
      <Toolbar isMobile name='davidlatimore.me' mail={mailMe} />
      <div className='MobileHome'>
        <MobileIndex setActiveProject={setActiveProject} resume={resume} close={close} projects={projects} />
        { !!activeProject.name && (
          <MobileModal close={close} project={activeProject} />
        )}
        <style jsx="true"> {`
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
