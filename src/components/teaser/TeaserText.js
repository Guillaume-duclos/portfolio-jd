import React from 'react';
import { render, Text } from '@inlet/react-pixi'
import * as PIXI from 'pixi.js'

const TeaserText = (props) => {
  return (
    <div className="teaser-text-container flex">
      <img className="teaser-text" src={props.teaserText} draggable="false" alt=""/>
    </div>
  );
};

export default TeaserText;