import React from 'react';

const ProjectCategory = (props) => {
  if (props.loading === false) {
    return (
      <div className={`teaser-title ${props.animationActive ? 'teaser-title-animation-one' : 'teaser-title-animation-two'}`}>
        <h2>{props.projectIndex < 10 ? 0 : null}{parseInt(props.projectIndex, 10) + 1}</h2>
        <h3>{props.projectCategory}</h3>
      </div>
    );
  } else {
    return (null);
  }
};

export default ProjectCategory;