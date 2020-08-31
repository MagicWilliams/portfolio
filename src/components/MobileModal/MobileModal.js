import React from 'react';

export default function MobileModal(props) {
  const { name, description, references, media } = props.project;
  const { close } = props;
  const needUrl = references.length >= 1;
  const linkLabel = references.length === 1 ? 'Link' : 'Links';
  const openLink = (url) => {
    window.open(url, '_blank');
  }
  return (
    <div className='MobileModal'>
      <img className='icon' src='/img/x.svg' onClick={close} alt='close'/>
      <div className="modal-body">
        <div className='infoBlock'>
          <h3 className="date"> {name} </h3>
        </div>
        { !!media && (
          <img className='project-preview' src={media.fields.file.url} alt='preview' />
        )}
        <div className='infoBlock'>
          <h3 className="header"> What I Did </h3>
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
    </div>
  )
}
