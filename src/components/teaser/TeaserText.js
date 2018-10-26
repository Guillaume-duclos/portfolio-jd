import React from 'react';

const TeaserText = (props) => {
  return (
    <div className="teaser-text-container flex">
      <img className="teaser-text" src={props.teaserText} draggable="false" alt=""/>
    </div>
  );
};

export default TeaserText;