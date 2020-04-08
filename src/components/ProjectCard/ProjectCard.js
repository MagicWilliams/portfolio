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
    if (!this.props.data) {
      return null;
    }
    const { data, showing, offsetX, offsetY, openLink, layer, closeWindow, isResume } = this.props;
    const { name, references, description, id, media, when } = data;
    const slug = name;
    const { showingInfoSide } = this.state;
    const needUrl = references.length >= 1;
    const linkLabel = references.length === 1 ? 'Link' : 'Links';
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
        <div style={{...showingStyle, ...offsetStyle }} className="ProjectCard" id={id}>
          <div className="ProjectCard-handle">
            <h4> {name} </h4>
            <div className='icons'>
              { hasPhoto && (
                <img src='/img/i.svg' className='Toolbar-icon' onClick={this.flip} alt='Show media'/>
              )}

              <img src='/img/x.svg' className='Toolbar-icon' onClick={() => closeWindow(slug)} alt='Close window'/>
            </div>
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
                  <h3 className="header"> {linkLabel} </h3>
                  <div className='links'>
                    { references.map((ref, i) => {
                      console.log(references[i]);
                      const { name, link } = references[i].fields;
                      return (
                        <h3 className='url' onClick={() => openLink(link)} href={link} alt={name}> {name} </h3>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
          )}
          { !showingInfoSide && (
            <div className="ProjectCard-body">
              <img className='project-preview' src={media.fields.file.url} alt='preview' />
            </div>
          )}
        </div>
      </Draggable>
    );
  }
}

export default ProjectCard;
