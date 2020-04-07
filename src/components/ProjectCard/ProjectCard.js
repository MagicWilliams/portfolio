import React, { Component } from 'react';
import Draggable from 'react-draggable';
import Toolbar from '../Toolbar/Toolbar';
import './ProjectCard.scss';
import actualResume from '../../assets/img/actualResume.png'
import closeIcon from '../../assets/img/close.png';

class ProjectCard extends Component {
  state = {
    showingInfoSide: true,
  }

  flip = () => {
    const { showingInfoSide } = this.state;
    this.setState({
      showingInfoSide: !showingInfoSide,
    });
  }

  render() {
    if (!this.props.data) {
      return null;
    }
    const { data, showing, offsetX, offsetY, openLink, layer, closeWindow, isResume } = this.props;
    console.log(data);
    const { name, link, description, id, media, when } = data;
    const slug = name;
    const { showingInfoSide } = this.state;
    const needUrl = !!link;
    const hasPhoto = media && media.fields.file.url;
    const showingStyle = showing ? {
      visibility: 'visible',
    } : {
      visibility: 'hidden',
    };

    const offsetStyle = {
      left: offsetX,
      top: offsetY,
    };

    const layerStyle = {
      zIndex: layer,
    }

    const resumeCardStyle = {
      maxHeight: '400px',
    }

    if (slug === 'resume') {
      return (
        <Draggable handle='.ProjectCard-handle'>
          <div style={{...showingStyle, ...offsetStyle, ...resumeCardStyle, ...layerStyle}} className="ProjectCard" id={id}>
            <div className="ProjectCard-handle">
              <Toolbar name={name} close={() => closeWindow(slug)} flip={this.flip} />
            </div>
            <img className='actualResume' src={actualResume} />
          </div>
        </Draggable>
      )
    }

    return (
      <Draggable handle='.ProjectCard-handle'>
        <div style={{...showingStyle, ...offsetStyle}} className="ProjectCard" id={id}>
          <div className="ProjectCard-handle">
            <h4> {name} </h4>
            <img src={closeIcon} className='Toolbar-icon' onClick={() => closeWindow(slug)} alt='Close window'/>
          </div>
          { showingInfoSide && (
            <div className="ProjectCard-body">
              <div className='infoBlock'>
                <h3 className="date"> {when} </h3>
              </div>
              <div className='infoBlock'>
                <h3 className="body"> {description} </h3>
              </div>
              { needUrl && (
                <div className='infoBlock'>
                  <h3 className="header"> Link </h3>
                  <h3 className="url" onClick={() => openLink(link)}> {link} </h3>
                </div>
              )}
              { hasPhoto && (
                <img className='project-preview' src={media.fields.file.url} alt='preview' />
              )}
            </div>
          )}
          { !showingInfoSide && (
            <h4> showing image </h4>
          )}
        </div>
      </Draggable>
    );
  }
}

export default ProjectCard;
