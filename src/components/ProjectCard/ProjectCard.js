import React, { Component } from 'react';
import Draggable from 'react-draggable';
import './ProjectCard.scss';

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
    const { data, bringToTop, openWindows, offsetX, offsetY, openLink, closeWindow } = this.props;
    const { name, references, description, id, media, when } = data;
    const showing = openWindows.includes(name)
    const slug = name;
    const { showingInfoSide } = this.state;
    const needUrl = references.length >= 1;
    const linkLabel = references.length === 1 ? 'Link' : 'Links';
    const hasPhoto = media && media.fields.file.url;
    const layer = openWindows.indexOf(name) === -1 ? -1 : openWindows.indexOf(name) + 2;
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

    return (
      <Draggable bounds='parent' handle='.ProjectCard-handle'>
        <div onClick={() => bringToTop(name)} style={{...showingStyle, ...offsetStyle, ...layerStyle}} className="ProjectCard" id={id}>
          <div className="ProjectCard-handle">
            <h4> {name} </h4>
            <div className='icons'>
              { hasPhoto && !showingInfoSide && (
                <img src='/img/i.svg' className='Toolbar-icon' onClick={this.flip} alt='Show media'/>
              )}
              { hasPhoto && showingInfoSide && (
                <img src='/img/photo.svg' className='Toolbar-icon' onClick={this.flip} alt='Show media'/>
              )}

              <img src='/img/x.svg' className='icon-x' onClick={(e) => closeWindow(slug, e)} alt='Close window'/>
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
                      const { name, link } = references[i].fields;
                      return (
                        <h3 key={i} className='url' onClick={() => openLink(link)} href={link} alt={name}> {name} </h3>
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
