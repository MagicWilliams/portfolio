import React, { Component } from 'react';
import Draggable from 'react-draggable';
import Toolbar from '../Toolbar/Toolbar';
import './ProjectCard.scss';
import actualResume from '../../assets/img/actualResume.png'

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
    const { showingInfoSide } = this.state;
    const { url, date, description, name, id, showing, offsetX, offsetY, slug, openLink, layer, closeWindow, isResume } = this.props;
    const needUrl = url != undefined && url != null;
    console.log({
      name: name,
      layer: layer,
    });
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
            <Toolbar name={name} close={() => closeWindow(slug)} flip={this.flip} />
          </div>
          { showingInfoSide && (
            <div className="ProjectCard-body">
              <div className='infoBlock'>
                <h3 className="header"> WHEN </h3>
                <h3 className="body"> {date} </h3>
              </div>
              <div className='infoBlock'>
                <h3 className="header"> WHAT I DID </h3>
                <h3 className="body"> {description} </h3>
              </div>
              { needUrl && (
                <div className='infoBlock'>
                  <h3 className="header"> URL </h3>
                  <h3 className="url" onClick={() => openLink(url)}> {url} </h3>
                </div>
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
