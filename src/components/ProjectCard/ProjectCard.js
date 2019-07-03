import React, { Component } from 'react';
import Draggable from 'react-draggable';
import Toolbar from '../Toolbar/Toolbar';
import './ProjectCard.scss';

class ProjectCard extends Component {
  state = {
    showingInfoSide: true,
  }

  render() {
    const { showingInfoSide } = this.state;
    const { url, date, description, name } = this.props;
    const needUrl = url != undefined && url != null;
    return (
      <Draggable handle='.ProjectCard-handle'>
        <div className="ProjectCard">
          <div className="ProjectCard-handle">
            <Toolbar name={name} close={this.close} flip={this.flip} />
          </div>
          { showingInfoSide && (
            <div>
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
                  <h3 className="body"> {url} </h3>
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
