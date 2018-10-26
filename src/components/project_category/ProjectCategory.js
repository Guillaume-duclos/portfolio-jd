import React from 'react';

const ProjectCategory = (props) => {
  if(props.loading === false) {
    return(
      <div className='teaser-title'>
        <h2>0{props.projectIndex + 1}</h2>
        <h3>{props.projectCategory}</h3>
      </div>
    );
  } else {
    return(null);
  }
};

export default ProjectCategory;